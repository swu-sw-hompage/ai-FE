import PageHero from '../../components/common/PageHero'
import ChapterNav from '../../components/common/ChapterNav'
import { FACULTY } from '../../data/faculty'
import heroFaculty from '../../assets/images/brand/hero-faculty-lounge.jpg'
import './Faculty.css'

const SECTIONS = [{ id: 'faculty-list', label: '교수진' }]

const ICONS = {
  email: <path d="M2 4h12v8H2zM2 4.5l6 4.5 6-4.5" />,
  degree: <path d="M8 3 1.5 6.5 8 10l6.5-3.5zM4 8v3.5c1.2 1 2.6 1.5 4 1.5s2.8-.5 4-1.5V8" />,
  research: <path d="M6.8 2.5a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6zM10 10l3.8 3.8" />,
}

function Meta({ icon, label, children }) {
  return (
    <div className="faculty__meta">
      <span className="faculty__meta-label">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {ICONS[icon]}
        </svg>
        {label}
      </span>
      <div className="faculty__meta-value">{children}</div>
    </div>
  )
}

export default function Faculty() {
  return (
    <div className="faculty">
      <PageHero photo photoSrc={heroFaculty} title={['교수진']} />

      <div className="container page-layout">
        <ChapterNav sections={SECTIONS} />

        <main className="page-layout__main">
          <section id="faculty-list" className="page-section">
            <h2 className="faculty__page-title">교수진</h2>

            <p className="faculty__group-label">전임교수</p>
            <div className="faculty__list">
              {FACULTY.map((professor) => (
                <article className="faculty__card" key={professor.email}>
                  <img
                    className="faculty__photo"
                    src={professor.photo}
                    alt={`${professor.name} ${professor.position}`}
                  />
                  <div className="faculty__body">
                    <div className="faculty__head">
                      <h3>
                        {professor.name} {professor.position}
                      </h3>
                      {professor.homepage && (
                        <a
                          className="faculty__homepage"
                          href={professor.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          홈페이지
                          <svg viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M4 2h6v6M10 2 2.5 9.5" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="faculty__meta-row">
                      <Meta icon="email" label="이메일">
                        <a href={`mailto:${professor.email}`}>{professor.email}</a>
                      </Meta>
                      <Meta icon="degree" label="학위">
                        {professor.degree}
                      </Meta>
                      <Meta icon="research" label="연구">
                        {professor.research}
                      </Meta>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
