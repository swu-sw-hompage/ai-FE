import PageHero from '../../components/common/PageHero'
import heroAbout from '../../assets/images/brand/hero-about.jpg'
import educationGoals from '../../assets/images/content/education-goals.png'
import talent from '../../assets/images/content/talent.png'
import ChapterNav from '../../components/common/ChapterNav'
import { ABOUT_SECTIONS } from '../../constants/aboutNav'
import './EducationGoals.css'

export default function EducationGoals() {
  return (
    <div className="education-goals">
      <PageHero photo photoSrc={heroAbout} title={['교육 목표 및 인재상']} />

      <div className="container page-layout">
        <ChapterNav sections={ABOUT_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>교육 목표</h2>
            <img
              className="education-goals__figure"
              src={educationGoals}
              alt="지(전문 지식), 덕(윤리와 신뢰), 술(실무와 융합)을 갖춘 융합형 AI 전문 인재"
            />
          </section>

          <section className="page-section">
            <h2>인재상</h2>
            <img
              className="education-goals__figure education-goals__figure--talent"
              src={talent}
              alt="AI 실무형 인재, AI 융합형 인재, AI 전주기 인재, AI 신뢰형 인재, AI 대응형 인재"
            />
          </section>
        </main>
      </div>
    </div>
  )
}
