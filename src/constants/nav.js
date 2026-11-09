export const NAV_ITEMS = [
  { label: '인공지능전공', path: '/about' },
  { label: '교육과정', path: '/curriculum' },
  { label: '교수진', path: '/faculty' },
  { label: '공지사항', path: '/notice' },
]

// 헤더 호버 메가메뉴 컬럼 — NAV_ITEMS의 path를 key로 매칭
export const MEGA_MENU_COLUMNS = [
  {
    key: '/about',
    title: '인공지능전공',
    links: [
      { to: '/about', label: '학과 소개' },
      { to: '/about/education-goals', label: '교육 목표 및 인재상' },
      { to: '/about/greeting', label: '학과장 인사말' },
      { to: '/about/location', label: '찾아오시는 길' },
    ],
  },
  {
    key: '/curriculum',
    title: '교육과정',
    links: [
      { to: '/curriculum', label: '교육과정' },
      { to: '/curriculum/courses', label: '학년별 교과목' },
      { to: '/curriculum/roadmap', label: '전공로드맵' },
    ],
  },
  {
    key: '/faculty',
    title: '교수진',
    links: [{ to: '/faculty', label: '교수진 소개' }],
  },
  {
    key: '/notice',
    title: '공지사항',
    links: [
      { to: '/notice', label: '전체' },
      { to: '/notice?filter=academic', label: '학사' },
      { to: '/notice?filter=employment', label: '취업' },
      { to: '/notice?filter=club', label: '소학회' },
    ],
  },
]

// 모바일 햄버거 메뉴용 — 메가메뉴와 같다.
export const MOBILE_MENU_COLUMNS = MEGA_MENU_COLUMNS
