import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import heroCurriculum from '../../assets/images/brand/hero-curriculum.jpg'
import ChapterNav from '../../components/common/ChapterNav'
import SegmentTabs from '../../components/common/SegmentTabs'
import { CURRICULUM_SECTIONS } from '../../constants/aboutNav'
import { COURSES } from '../../data/courses'
import './Roadmap.css'

// 전공로드맵 그림의 트랙. 두 트랙에 공통인 과목에 해당 트랙 과목을 더해 보여주고, 트랙 과목은 '추천'으로 표시한다.
const TRACK_TABS = [
  {
    id: 'platform',
    no: '01',
    name: 'AI·데이터 플랫폼',
    heading: 'AI·데이터 플랫폼 분야',
    subtitle: 'AI, 데이터 분석을 위한 시스템을 설계하고 운영하는 진로',
  },
  {
    id: 'guardrail',
    no: '02',
    name: 'AI 가드레일 설계',
    heading: 'AI 모델 가드레일 설계 분야',
    subtitle: '안전하고 투명한 AI 모델과 파이프라인을 개발하는 진로',
  },
]

const courseTag = (course) => {
  if (course.type === '전필') return '필수'
  return course.track ? '추천' : '선택'
}

const LEGEND = [
  { tag: '필수', className: 'required' },
  { tag: '선택', className: 'elective' },
  { tag: '추천', className: 'recommended' },
]

function RoadmapLegend() {
  return (
    <div className="roadmap__legend" aria-label="이수구분 표시">
      {LEGEND.map((item) => (
        <span className="roadmap__legend-item" key={item.tag}>
          <span className={`roadmap__legend-mark roadmap__legend-mark--${item.className}`} />
          {item.tag}
        </span>
      ))}
    </div>
  )
}

function Chevron({ open }) {
  return (
    <svg
      className={open ? 'roadmap__mobile-chevron roadmap__mobile-chevron--open' : 'roadmap__mobile-chevron'}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MobileYearTabs({ years, active, onChange }) {
  return (
    <div className="roadmap__year-tabs">
      {years.map((label, i) => (
        <button
          key={label}
          type="button"
          className={i === active ? 'roadmap__year-tab roadmap__year-tab--active' : 'roadmap__year-tab'}
          onClick={() => onChange(i)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function MobileCourseItem({ course, expanded, onToggle }) {
  return (
    <div className={expanded ? 'roadmap__mobile-course roadmap__mobile-course--open' : 'roadmap__mobile-course'}>
      <button type="button" className="roadmap__mobile-course-row" onClick={onToggle}>
        <span
          className={
            course.tag === '필수'
              ? 'roadmap__mobile-course-mark roadmap__mobile-course-mark--required'
              : course.tag === '추천'
                ? 'roadmap__mobile-course-mark roadmap__mobile-course-mark--recommended'
                : 'roadmap__mobile-course-mark roadmap__mobile-course-mark--elective'
          }
        />
        <span className="roadmap__mobile-course-text">
          <span className="roadmap__mobile-course-title">{course.title}</span>
          <span
            className={
              course.tag === '필수'
              ? 'roadmap__mobile-course-tag roadmap__mobile-course-tag--required'
              : course.tag === '추천'
                ? 'roadmap__mobile-course-tag roadmap__mobile-course-tag--recommended'
                : 'roadmap__mobile-course-tag roadmap__mobile-course-tag--elective'
            }
          >
            {course.tag}
          </span>
        </span>
        <Chevron open={expanded} />
      </button>
      {expanded && (
        <div className="roadmap__mobile-course-desc">
          <strong>{course.title}</strong>
          <p>{course.desc}</p>
        </div>
      )}
    </div>
  )
}

function CourseItem({ course, flip }) {
  return (
    <div className={flip ? 'roadmap__course roadmap__course--flip' : 'roadmap__course'}>
      <span
        className={
          course.tag === '필수'
              ? 'roadmap__course-mark roadmap__course-mark--required'
              : course.tag === '추천'
                ? 'roadmap__course-mark roadmap__course-mark--recommended'
                : 'roadmap__course-mark roadmap__course-mark--elective'
        }
      />
      <div className="roadmap__course-body">
        <p className="roadmap__course-title">{course.title}</p>
        <span
          className={
            course.tag === '필수'
              ? 'roadmap__course-tag roadmap__course-tag--required'
              : course.tag === '추천'
                ? 'roadmap__course-tag roadmap__course-tag--recommended'
                : 'roadmap__course-tag roadmap__course-tag--elective'
          }
        >
          {course.tag}
        </span>
      </div>
      <div className="roadmap__tooltip">
        <strong>{course.title}</strong>
        <p>{course.desc}</p>
      </div>
    </div>
  )
}

export default function Roadmap() {
  // ?track=guardrail 처럼 주소로 트랙 탭을 지정할 수 있다.
  const [searchParams, setSearchParams] = useSearchParams()
  const trackParam = searchParams.get('track')
  const track = TRACK_TABS.find((t) => t.id === trackParam) ?? TRACK_TABS[0]
  const setTrackId = (id) => {
    setSearchParams({ track: id }, { replace: true, preventScrollReset: true })
    setMobileYear(0)
    setOpenCourses(new Set())
  }
  const displayYears = [1, 2, 3, 4].map((year) => ({
    no: String(year).padStart(2, '0'),
    year: `${year}학년`,
    courses: COURSES.filter((c) => c.year === year && (!c.track || c.track === track.id)).map((c) => ({
      title: c.name,
      tag: courseTag(c),
      desc: c.description,
    })),
  }))
  const [mobileYear, setMobileYear] = useState(0)
  const [openCourses, setOpenCourses] = useState(new Set())
  const toggleCourse = (title) =>
    setOpenCourses((prev) => {
      const next = new Set(prev)
      if (!next.delete(title)) next.add(title)
      return next
    })

  return (
    <div className="roadmap">
      <PageHero photo photoSrc={heroCurriculum} title={['전공로드맵']} />

      <div className="container page-layout">
        <ChapterNav sections={CURRICULUM_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>전공로드맵</h2>

            <SegmentTabs
              label="전공로드맵 진로 선택"
              items={TRACK_TABS.map((t) => ({ id: t.id, no: t.no, label: t.name }))}
              active={track.id}
              onChange={setTrackId}
            />

            <div className="roadmap__intro">
              <div className="roadmap__intro-head">
                <p className="roadmap__intro-title">{track.heading}</p>
                <p className="roadmap__intro-summary">{track.subtitle}</p>
              </div>
            </div>

            <RoadmapLegend />

            <div className="roadmap__years">
              {displayYears.map((y) => (
                <div className="roadmap__year" key={y.year}>
                  <span className="roadmap__year-no">{y.no}</span>
                  <strong className="roadmap__year-title">{y.year}</strong>
                  <span className="roadmap__year-rule" />
                </div>
              ))}

              {displayYears.map((y) => (
                <div className="roadmap__semester" key={y.year}>
                  {y.courses.map((course) => (
                    <CourseItem course={course} flip={y.no === '04'} key={course.title} />
                  ))}
                </div>
              ))}
            </div>

            <div className="roadmap__mobile-roadmap">
              <MobileYearTabs years={displayYears.map((y) => y.year)} active={mobileYear} onChange={setMobileYear} />

              <div className="roadmap__mobile-semester">
                {displayYears[mobileYear].courses.map((course) => (
                  <MobileCourseItem
                    key={course.title}
                    course={course}
                    expanded={openCourses.has(course.title)}
                    onToggle={() => toggleCourse(course.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
