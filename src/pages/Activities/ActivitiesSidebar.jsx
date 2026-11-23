import { Link } from 'react-router-dom'
import { ACTIVITY_LATEST_YEAR, SHOW_GRADUATION_PROJECTS } from '../../constants/activities'
import '../../components/common/ChapterNav.css'

// 메뉴(학과 활동 → 학생 활동 / 학과 행사 / 소학회)와 같은 항목.
// 졸업프로젝트 연도는 여기에 늘어놓지 않고 학생 활동 페이지 안의 연도 선택에서 고른다.
const activityLinks = (activeYear) => [
  { key: 'projects', to: `/activities/${activeYear ?? ACTIVITY_LATEST_YEAR}`, label: '학생 활동' },
  { key: 'events', to: '/activities/events', label: '학과 행사' },
  { key: 'clubs', to: '/activities/clubs', label: '소학회' },
].filter((item) => SHOW_GRADUATION_PROJECTS || item.key !== 'projects')

// 다른 페이지(학과 소개 등)의 ChapterNav와 똑같은 모양을 쓰도록 같은 클래스를 사용한다.
// activeKey: 'projects' | 'events' | 'clubs'. activeYear는 학생 활동 링크의 연도.
// 모바일에서는 아래 ActivitiesMobileTabs를 쓰므로 이 사이드바는 숨김(.activities__sidebar).
export default function ActivitiesSidebar({ activeYear, activeKey = 'projects' }) {
  return (
    <aside className="activities__sidebar">
      <nav className="chapter-nav" aria-label="페이지 내 이동">
        <p className="chapter-nav__label">ON THIS PAGE</p>
        <ul className="chapter-nav__list">
          {activityLinks(activeYear).map((item) => (
            <li key={item.key} className={item.key === activeKey ? 'is-active' : ''}>
              <span className="chapter-nav__bar" />
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

// 모바일 전용 상단 탭 (데스크톱에서는 숨김)
export function ActivitiesMobileTabs({ activeYear, activeKey = 'projects' }) {
  return (
    <nav className="activities__mobile-tabs" aria-label="학과 활동 분류">
      {activityLinks(activeYear).map((item) => (
        <Link
          key={item.key}
          to={item.to}
          className={item.key === activeKey ? 'activities__mobile-tab is-active' : 'activities__mobile-tab'}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
