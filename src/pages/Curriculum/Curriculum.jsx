import PageHero from '../../components/common/PageHero'
import heroCurriculum from '../../assets/images/brand/hero-curriculum.jpg'
import ChapterNav from '../../components/common/ChapterNav'
import { CURRICULUM_SECTIONS } from '../../constants/aboutNav'
import './Curriculum.css'

const PILLARS = [
  { no: '01', title: '전공 기초', desc: 'AI 개념과 작동원리를 학습하는 기초 역량을 기릅니다.' },
  { no: '02', title: '전공 핵심', desc: '딥러닝, 자료구조, 프로그래밍 등 핵심 전공 역량을 다집니다.' },
  { no: '03', title: '트랙 선택', desc: 'AI 시스템 엔지니어 트랙, AI 안전 분석가 트랙으로 전문 분야를 넓혀갑니다.' },
  { no: '04', title: '융합 프로젝트', desc: '다양한 산업 현장에서 발생하는 AI 융합형 문제를 발굴하고 해결합니다.' },
]

export default function Curriculum() {
  return (
    <div className="curriculum">
      <PageHero photo photoSrc={heroCurriculum} title={['교육과정']} />

      <div className="container page-layout">
        <ChapterNav sections={CURRICULUM_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>교육과정 안내</h2>
            <p className="curriculum__lead">
              전공 기초에서 전공 핵심, 트랙 선택, 프로젝트까지 이어지는 학습 구조입니다.
            </p>

            <div className="curriculum__pillars">
              {PILLARS.map((p) => (
                <div className="curriculum__pillar" key={p.no}>
                  <span className="curriculum__pillar-no">{p.no}</span>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
