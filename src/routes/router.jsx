import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import EducationGoals from '../pages/About/EducationGoals'
import Greeting from '../pages/About/Greeting'
import Location from '../pages/About/Location'
import Curriculum from '../pages/Curriculum/Curriculum'
import Roadmap from '../pages/Curriculum/Roadmap'
import Courses from '../pages/Curriculum/Courses'
import Faculty from '../pages/Faculty/Faculty'
import Notice from '../pages/Notice/Notice'
import NoticeDetail from '../pages/Notice/NoticeDetail'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import AdminAccounts from '../pages/Admin/AdminAccounts'
import AdminNoticeList from '../pages/Admin/AdminNoticeList'
import AdminCapstoneList from '../pages/Admin/AdminCapstoneList'
import AdminSubscribers from '../pages/Admin/AdminSubscribers'
import AdminHeroSlides from '../pages/Admin/AdminHeroSlides'
import NoticeWrite from '../pages/Admin/NoticeWrite'
import CapstoneWrite from '../pages/Admin/CapstoneWrite'
import AdminEventList from '../pages/Admin/AdminEventList'
import EventWrite from '../pages/Admin/EventWrite'
import DevStats from '../pages/Dev/DevStats'
import RequireAdmin from './RequireAdmin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'about/education-goals', element: <EducationGoals /> },
      { path: 'about/greeting', element: <Greeting /> },
      { path: 'about/location', element: <Location /> },
      { path: 'curriculum', element: <Curriculum /> },
      { path: 'curriculum/courses', element: <Courses /> },
      { path: 'curriculum/roadmap', element: <Roadmap /> },
      { path: 'faculty', element: <Faculty /> },
      { path: 'notice', element: <Notice /> },
      { path: 'notice/:id', element: <NoticeDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/login', element: <Login /> },
  // 개발자용 통계. 메뉴에는 없고 주소로만 들어간다 (접근 키 필요).
  { path: '/dev/stats', element: <DevStats /> },
  // 관리자 첫 화면은 가장 많이 쓰는 공지사항 관리.
  { path: '/admin', element: <Navigate to="/admin/notices" replace /> },
  { path: '/admin/accounts', element: <RequireAdmin><AdminAccounts /></RequireAdmin> },
  { path: '/admin/subscribers', element: <RequireAdmin><AdminSubscribers /></RequireAdmin> },
  { path: '/admin/hero', element: <RequireAdmin><AdminHeroSlides /></RequireAdmin> },
  { path: '/admin/notices', element: <RequireAdmin><AdminNoticeList /></RequireAdmin> },
  { path: '/admin/notices/new', element: <RequireAdmin><NoticeWrite /></RequireAdmin> },
  { path: '/admin/notices/:id/edit', element: <RequireAdmin><NoticeWrite /></RequireAdmin> },
  { path: '/admin/capstone', element: <RequireAdmin><AdminCapstoneList /></RequireAdmin> },
  { path: '/admin/capstone/new', element: <RequireAdmin><CapstoneWrite /></RequireAdmin> },
  { path: '/admin/capstone/:id/edit', element: <RequireAdmin><CapstoneWrite /></RequireAdmin> },
  { path: '/admin/events', element: <RequireAdmin><AdminEventList /></RequireAdmin> },
  { path: '/admin/events/new', element: <RequireAdmin><EventWrite /></RequireAdmin> },
  { path: '/admin/events/:id/edit', element: <RequireAdmin><EventWrite /></RequireAdmin> },
])
