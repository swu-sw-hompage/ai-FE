import jeongYeonwoo from '../assets/images/faculty/jeong-yeonwoo.jpg'
import hongHelen from '../assets/images/faculty/hong-helen.jpg'

// 교수진 페이지에 이 순서 그대로 표시된다. homepage는 있는 교수님만 적는다.
export const FACULTY = [
  {
    name: '정연우',
    position: '조교수',
    email: 'jeongyw@swu.ac.kr',
    degree: 'Sogang University, Ph.D.',
    research: '데이터베이스, 인공지능 시스템',
    homepage: 'https://scap.swu.ac.kr',
    photo: jeongYeonwoo,
  },
  {
    name: '홍헬렌',
    position: '교수',
    email: 'hlhong@swu.ac.kr',
    degree: '이화여자대학교 공학박사',
    research: '인공지능 및 영상분석',
    homepage: 'https://sites.google.com/view/vcmilab/home',
    photo: hongHelen,
  },
]
