import PageHero from '../../components/common/PageHero'
import heroAbout from '../../assets/images/brand/hero-about.jpg'
import ChapterNav from '../../components/common/ChapterNav'
import EmptyState from '../../components/common/EmptyState'
import { ABOUT_SECTIONS } from '../../constants/aboutNav'

export default function Greeting() {
  return (
    <div className="greeting">
      <PageHero photo photoSrc={heroAbout} title={['학과장 인사말']} />

      <div className="container page-layout">
        <ChapterNav sections={ABOUT_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>학과장 인사말</h2>
            <EmptyState title="학과장 인사말을 준비하고 있습니다." />
          </section>
        </main>
      </div>
    </div>
  )
}
