import PageHero from '../../components/common/PageHero'
import heroCurriculum from '../../assets/images/brand/hero-curriculum.jpg'
import ChapterNav from '../../components/common/ChapterNav'
import { CURRICULUM_SECTIONS } from '../../constants/aboutNav'
import { COURSES } from '../../data/courses'
import './Courses.css'

const semesterLabel = (semester) => semester.replace(',', '·')

export default function Courses() {
  return (
    <div className="courses">
      <PageHero photo photoSrc={heroCurriculum} title={['학년별 교과목']} />

      <div className="container page-layout">
        <ChapterNav sections={CURRICULUM_SECTIONS} />

        <main className="page-layout__main">
          <section className="page-section">
            <h2>학년별 교과목</h2>

            <table className="courses__table">
              <thead>
                <tr>
                  <th scope="col">학년</th>
                  <th scope="col">학기</th>
                  <th scope="col">이수</th>
                  <th scope="col">과목명</th>
                  <th scope="col">과목 소개</th>
                  <th scope="col">과목 구분</th>
                  <th scope="col">학점</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((course) => (
                  <tr key={course.name}>
                    <td className="courses__cell--center" data-label="학년">
                      {course.year}
                    </td>
                    <td className="courses__cell--center" data-label="학기">
                      {semesterLabel(course.semester)}
                    </td>
                    <td className="courses__cell--center" data-label="이수">
                      {course.type}
                    </td>
                    <td className="courses__name">
                      <strong>{course.name}</strong>
                      <span>{course.nameEn}</span>
                    </td>
                    <td className="courses__desc">{course.description}</td>
                    <td className="courses__cell--center" data-label="과목 구분">
                      {course.format || '-'}
                    </td>
                    <td className="courses__cell--center" data-label="학점">
                      {course.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  )
}
