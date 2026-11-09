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
    academicNotice: false,
    employmentNotice: false,
    clubNotice: false,
    [category.field]: true,
    publishedAt: `2026-10-${day}T09:00:00`,
    attachments: [],
    images: [],
  }
})

const reply = (config, result, status = 200) => ({
  data: { isSuccess: status < 400, result },
  status,
  statusText: 'OK',
  headers: {},
  config,
})

const fail = (config, status, message) =>
  Promise.reject(Object.assign(new Error(message), { config, response: { status, data: { message } } }))

const listNotices = ({ academic, employment, club, keyword, page = 0, size = 20 } = {}) => {
  const filtered = NOTICES.filter(
    (n) =>
      (!academic || n.academicNotice) &&
      (!employment || n.employmentNotice) &&
      (!club || n.clubNotice) &&
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
  if (url === '/hero-slides') return Promise.resolve(reply(config, []))
  return fail(config, 503, '미리보기에서는 사용할 수 없는 기능입니다.')
}
