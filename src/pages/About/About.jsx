import PageHero from '../../components/common/PageHero'
import heroAbout from '../../assets/images/brand/hero-about.jpg'
import majorCompetency from '../../assets/images/content/major-competency.png'
import ChapterNav from '../../components/common/ChapterNav'
import { ABOUT_SECTIONS } from '../../constants/aboutNav'
import './About.css'

const LEARNING_CARDS = [
  {
    no: '01',
    title: '수학·데이터·소프트웨어',
    desc: '인공지능 산업에 필요한 수학·데이터·소프트웨어 기반의 핵심 기술을 습득합니다.',
  },
  {
    no: '02',
    title: 'AI 시스템 전 생애주기 수행',
    desc: '데이터 수집, 학습, 배포, 운영에 이르는 인공지능 기술의 전 생애주기를 교육합니다.',
  },
  {
    no: '03',
    title: 'AI 융합 문제 해결',
    desc: '다양한 산업 및 도메인과의 융합을 통해 인공지능 기반 솔루션을 구현합니다.',
  },
]

export default function About() {
  return (
    <div className="about">
      <PageHero photo photoSrc={heroAbout} title={['학과 소개']} />

      <div className="container page-layout">
        <ChapterNav sections={ABOUT_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>학과 특징</h2>
            <div className="about__learning-grid">
              {LEARNING_CARDS.map((card) => (
                <div className="about__learning-card" key={card.no}>
                  <span className="about__learning-no">{card.no}</span>
                  <strong>{card.title}</strong>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="page-section">
            <h2>전공 능력</h2>
            <img
              className="about__figure"
              src={majorCompetency}
              alt="인공지능전공 전공능력: AI 핵심기술 이해·평가 능력, AI+X 융합 문제해결 능력, AI 시스템 전주기 개발 능력, AI 윤리·신뢰성 실천 능력, 자기주도 성장·협업 능력"
            />
          </section>
        </main>
      </div>
    </div>
  )
}
