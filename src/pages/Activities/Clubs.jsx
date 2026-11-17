import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import EmptyState from '../../components/common/EmptyState'
import ActivitiesSidebar, { ActivitiesMobileTabs } from './ActivitiesSidebar'
import { getNotices, formatNoticeDate } from '../../api/notice'
import { getPageWindow } from '../../utils/pagination'
import heroActivities from '../../assets/images/brand/hero-activities.jpg'
import iconPrev from '../../assets/icons/pagination-prev.svg'
import iconNext from '../../assets/icons/pagination-next.svg'
import './Activities.css'
import '../Notice/Notice.css'

const PAGE_SIZE = 15

// 소학회 — 글은 공지와 같은 곳에 소학회 분류(clubNotice)로 저장하고, 화면만 학과 활동 아래에 둔다.
export default function Clubs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    getNotices({ club: true, page: page - 1, size: PAGE_SIZE })
      .then((result) => {
        if (cancelled) return
        const content = result?.content ?? []
        setPosts([...content.filter((n) => n.pinned), ...content.filter((n) => !n.pinned)])
        setTotalPages(Math.max(1, result?.totalPages ?? 1))
      })
      .catch(() => {
        if (!cancelled) setError('소학회 글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [page])

  const goToPage = (n) => {
    setSearchParams(n === 1 ? {} : { page: String(n) })
    document.getElementById('club-list')?.scrollIntoView({ block: 'start' })
  }

  return (
    <div className="activities">
      <PageHero photo photoSrc={heroActivities} title={['학과 활동']} />

      <ActivitiesMobileTabs activeKey="clubs" />

      <div className="container page-layout">
        <ActivitiesSidebar activeKey="clubs" />

        <main className="page-layout__main">
          <section id="club-list" className="page-section">
            <h2>소학회</h2>

            {error && (
              <p className="notice__error" role="alert">
                {error}
              </p>
            )}
            {!error && loading && <p className="notice__loading">불러오는 중...</p>}
            {!error && !loading && posts.length === 0 && (
              <EmptyState
                title="등록된 소학회 글이 없습니다"
                description="소학회 소개와 모집 소식이 올라오면 이곳에서 볼 수 있어요."
              />
            )}

            {!error && !loading && posts.length > 0 && (
              <ul className="notice__list">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link to={`/activities/clubs/${post.id}${page > 1 ? `?page=${page}` : ''}`}>
                      {post.pinned && <span className="notice__pin">필독</span>}
                      <span className="notice__title">{post.title}</span>
                    </Link>
                    <span className="notice__date">{formatNoticeDate(post.publishedAt ?? post.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <nav className="notice__pagination" aria-label="소학회 페이지">
                <button
                  type="button"
                  className="notice__page-arrow"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  aria-label="이전 페이지"
                >
                  <img src={iconPrev} alt="" />
                </button>
                {getPageWindow(page, totalPages).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={n === page ? 'notice__page-num is-active' : 'notice__page-num'}
                    onClick={() => goToPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  className="notice__page-arrow"
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  aria-label="다음 페이지"
                >
                  <img src={iconNext} alt="" />
                </button>
              </nav>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
