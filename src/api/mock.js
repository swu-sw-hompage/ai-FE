// VITE_USE_MOCK=true로 빌드하면 백엔드 없이 샘플 응답을 돌려준다 (교수님 확인용 미리보기).
// 실제 공지가 아니므로 제목에 [샘플]을 붙인다. 운영 빌드에서는 이 값을 켜지 않는다.
const CATEGORIES = [
  { label: '학사', field: 'academicNotice', param: 'academic' },
  { label: '취업', field: 'employmentNotice', param: 'employment' },
  { label: '소학회', field: 'clubNotice', param: 'club' },
]

const NOTICES = Array.from({ length: 24 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length]
  const day = String(28 - i).padStart(2, '0')
  return {
    id: 24 - i,
    title: `[샘플] ${category.label} 공지 예시 ${24 - i}`,
    content: '미리보기용 샘플 공지입니다. 실제 공지는 사이트 운영을 시작하면 등록합니다.',
    pinned: i < 2,
    status: 'PUBLISHED',
    academicNotice: false,
    employmentNotice: false,
    clubNotice: false,
    [category.field]: true,
    publishedAt: `2026-10-${day}T09:00:00`,
    attachments: [],
    images: [],
  }
})

// 미리보기 전용 관리자 계정. 백엔드가 없어서 화면에서만 확인하고, 글 저장 같은 쓰기는 여전히 막혀 있다.
// 이 값은 배포된 JS 안에 그대로 보이므로 실제 운영 비밀번호를 여기 넣지 않는다.
// 운영 관리자 계정은 백엔드의 ADMIN_BOOTSTRAP_EMAIL·ADMIN_BOOTSTRAP_PASSWORD로 따로 만든다.
const PREVIEW_ADMIN = { email: 'ai@swu.ac.kr', password: 'preview-aYyBJPBu' }

const base64Url = (value) => btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

// 로그인 유지 시간은 8시간. auth.js가 exp를 읽어 만료를 처리한다.
const previewToken = () =>
  [base64Url({ alg: 'none' }), base64Url({ sub: PREVIEW_ADMIN.email, exp: Math.floor(Date.now() / 1000) + 8 * 3600 }), 'preview'].join('.')

const emptyPage = { content: [], totalPages: 0, totalElements: 0 }

const reply = (config, result, status = 200) => ({
  data: { isSuccess: status < 400, result },
  status,
  statusText: 'OK',
  headers: {},
  config,
})

const fail = (config, status, message) =>
  Promise.reject(Object.assign(new Error(message), { config, response: { status, data: { message } } }))

// admin이 true면 관리자 목록처럼 '전체'에 소학회 글도 포함한다.
const listNotices = ({ academic, employment, club, keyword, page = 0, size = 20 } = {}, admin = false) => {
  const filtered = NOTICES.filter(
    (n) =>
      (!academic || n.academicNotice) &&
      (!employment || n.employmentNotice) &&
      // 소학회 글은 학과 활동 > 소학회에서만 보이고, 공지 목록에는 섞이지 않는다.
      (club ? n.clubNotice : admin || !n.clubNotice) &&
      (!keyword || n.title.includes(keyword) || n.content.includes(keyword)),
  )
  const sorted = [...filtered.filter((n) => n.pinned), ...filtered.filter((n) => !n.pinned)]
  return {
    content: sorted.slice(page * size, (page + 1) * size),
    totalPages: Math.ceil(sorted.length / size),
    totalElements: sorted.length,
  }
}

export const mockAdapter = (config) => {
  const url = config.url ?? ''
  if (config.method === 'post' && url === '/admin/auth/login') {
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data ?? {})
    if (body.email?.trim() === PREVIEW_ADMIN.email && body.password === PREVIEW_ADMIN.password) {
      return Promise.resolve(reply(config, { accessToken: previewToken() }))
    }
    return fail(config, 401, '아이디 또는 비밀번호가 올바르지 않습니다.')
  }
  if (config.method !== 'get') {
    if (url.startsWith('/analytics')) return Promise.resolve(reply(config, null))
    return fail(config, 503, '미리보기에서는 사용할 수 없는 기능입니다.')
  }
  if (url === '/notices') return Promise.resolve(reply(config, listNotices(config.params)))

  const noticeId = url.match(/^\/notices\/(\d+)$/)?.[1]
  if (noticeId) {
    const notice = NOTICES.find((n) => String(n.id) === noticeId)
    if (!notice) return fail(config, 404, '공지를 찾을 수 없습니다.')
    return Promise.resolve(reply(config, notice))
  }
  // 관리자 화면 조회. 임시저장 글은 없는 것으로 보여준다.
  if (url === '/admin/notices') {
    if (config.params?.status === 'DRAFT') return Promise.resolve(reply(config, emptyPage))
    return Promise.resolve(reply(config, listNotices(config.params, true)))
  }
  const adminNoticeId = url.match(/^\/admin\/notices\/(\d+)$/)?.[1]
  if (adminNoticeId) {
    const notice = NOTICES.find((n) => String(n.id) === adminNoticeId)
    if (!notice) return fail(config, 404, '공지를 찾을 수 없습니다.')
    return Promise.resolve(reply(config, notice))
  }
  if (url === '/admin/department-events' || url === '/admin/subscribers') {
    return Promise.resolve(reply(config, emptyPage))
  }
  if (url === '/admin/graduation-projects/years' || url === '/admin/hero-slides') {
    return Promise.resolve(reply(config, []))
  }
  // 졸업프로젝트·학과 행사는 미리보기에서 빈 목록으로 보여준다.
  if (url === '/graduation-projects' || url === '/department-events') {
    return Promise.resolve(reply(config, { content: [], totalPages: 0, totalElements: 0 }))
  }
  if (url === '/hero-slides') return Promise.resolve(reply(config, []))
  return fail(config, 503, '미리보기에서는 사용할 수 없는 기능입니다.')
}
