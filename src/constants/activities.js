// 졸업프로젝트(학생 활동) 공개 여부. 신설 전공이라 첫 졸업생이 나올 때까지 메뉴·화면·관리자 메뉴에서 숨긴다.
// 공개할 때는 true로 바꾸고, 아래 ACTIVITY_START_YEAR·ACTIVITY_LATEST_YEAR를 첫 졸업 연도로 맞춘다.
// (지금 연도와 ACTIVITY_SOURCE_URLS는 소프트웨어학과 값이다)
export const SHOW_GRADUATION_PROJECTS = false

// 학과 활동 메뉴를 눌렀을 때 처음 보여줄 화면
const ACTIVITY_START_YEAR = 2020

// 홈페이지에 공개할 마지막 졸업연도. 새 연도의 졸업프로젝트를 공개할 때 이 값만 올린다.
export const ACTIVITY_LATEST_YEAR = 2025

const yearsDescending = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => to - i)

// 학생 활동 페이지·메뉴에 보이는 연도 (공개 연도까지만)
export const ACTIVITY_YEARS = yearsDescending(ACTIVITY_START_YEAR, ACTIVITY_LATEST_YEAR)

// 관리자 작성 화면용: 아직 공개 전인 올해 작품도 미리 등록할 수 있도록 올해까지 포함한다.
export const ADMIN_ACTIVITY_YEARS = yearsDescending(
  ACTIVITY_START_YEAR,
  Math.max(ACTIVITY_LATEST_YEAR, new Date().getFullYear()),
)

export const ACTIVITY_SOURCE_URLS = {
  2020: 'http://sw.swu.ac.kr/학생활동/졸업프로젝트/',
  2021: 'http://sw.swu.ac.kr/학생활동/2021년도-졸업프로젝트/',
  2022: 'http://sw.swu.ac.kr/학생활동/2022년도-졸업프로젝트/',
  2023: 'http://sw.swu.ac.kr/학생활동/2023년도-졸업프로젝트-2/',
  2024: 'http://sw.swu.ac.kr/학생활동/2024년도-졸업작품전시회-2/',
  2025: 'http://sw.swu.ac.kr/학생활동/2025년도-졸업프로젝트/',
}

// 학과 활동 메뉴를 눌렀을 때 처음 보여줄 화면
export const ACTIVITIES_HOME = SHOW_GRADUATION_PROJECTS ? `/activities/${ACTIVITY_LATEST_YEAR}` : '/activities/events'
