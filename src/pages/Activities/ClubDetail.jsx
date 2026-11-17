import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import EmptyState from '../../components/common/EmptyState'
import MarkdownLite from '../../components/common/MarkdownLite'
import ActivitiesSidebar, { ActivitiesMobileTabs } from './ActivitiesSidebar'
import { getNoticeById, getAdjacentNotices, formatNoticeDate } from '../../api/notice'
import heroActivities from '../../assets/images/brand/hero-activities.jpg'
import './Activities.css'
import '../Notice/Notice.css'
import '../Notice/NoticeDetail.css'

// 소학회 글 상세. 글 자체는 공지(clubNotice)라서 공지 상세와 같은 모양으로 보여준다.
export default function ClubDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  // 소학회 글 안에서의 이전/다음글. 찾는 동안은 'pending'
  const [adjacent, setAdjacent] = useState('pending')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLoadError(false)
    getNoticeById(id)
      .then((result) => {
        // 소학회 글이 아니면 이 주소에서는 없는 글로 본다
        if (!cancelled) setPost(result?.clubNotice ? result : null)
      })
      .catch((err) => {
        if (cancelled) return
        setPost(null)
        if (err.status !== 404 && err.status !== 400) setLoadError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    let cancelled = false
    setAdjacent('pending')
    getAdjacentNotices(id, { club: true })
      .then((result) => {
        if (!cancelled) setAdjacent(result)
      })
      .catch(() => {
        if (!cancelled) setAdjacent(null)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const query = searchParams.toString()
  const suffix = query ? `?${query}` : ''
  const listHref = `/activities/clubs${suffix}`
  const adjacentPending = adjacent === 'pending'

  const adjacentRow = (label, target) => (
    <div className="notice-detail__adjacent-row">
      <span className="notice-detail__adjacent-label">{label}</span>
      {adjacentPending ? (
        <span className="notice-detail__adjacent-empty">불러오는 중...</span>
      ) : target ? (
        <Link to={`/activities/clubs/${target.id}${suffix}`}>{target.title}</Link>
      ) : (
        <span className="notice-detail__adjacent-empty">{label}이 없습니다.</span>
      )}
    </div>
  )

  return (
    <div className="activities">
      <PageHero photo photoSrc={heroActivities} title={['학과 활동']} />

      <ActivitiesMobileTabs activeKey="clubs" />

      <div className="container page-layout">
        <ActivitiesSidebar activeKey="clubs" />

        <main className="page-layout__main">
          <section className="page-section">
            <h2 className="activities__page-title">소학회</h2>

            {loading ? (
              <p className="notice__loading">불러오는 중...</p>
            ) : loadError ? (
              <EmptyState
                title="글을 불러오지 못했습니다"
                description="잠시 후 다시 시도해 주세요."
                actions={[{ label: '목록으로 돌아가기', to: listHref }]}
              />
            ) : !post ? (
              <EmptyState
                title="글을 찾을 수 없습니다"
                description="삭제되었거나 주소가 바뀌었을 수 있어요. 목록에서 다시 찾아봐 주세요."
                actions={[{ label: '목록으로 돌아가기', to: listHref }]}
              />
            ) : (
              <div className="notice-detail__article">
                <div className="notice-detail__header">
                  <p className="notice-detail__category">소학회</p>
                  <h1>{post.title}</h1>
                  <p className="notice-detail__date">{formatNoticeDate(post.publishedAt ?? post.createdAt)}</p>
                </div>

                <div className="notice-detail__body">
                  <MarkdownLite text={post.content ?? ''} />

                  {(post.images ?? []).length > 0 && (
                    <div className="notice-detail__images">
                      {post.images.map((src) => (
                        <img key={src} src={src} alt="" />
                      ))}
                    </div>
                  )}
                </div>

                {(post.attachments ?? []).length > 0 && (
                  <div className="notice-detail__attachments">
                    <p className="notice-detail__attachments-title">첨부파일</p>
                    <div className="notice-detail__attachments-divider" />
                    {post.attachments.map((att) => {
                      const rawUrl = att.url ?? att.fileUrl ?? ''
                      return (
                        <a
                          key={rawUrl}
                          href={rawUrl.replace(/^=+/, '')}
                          target="_blank"
                          rel="noreferrer"
                          className="notice-detail__attachment-row"
                        >
                          <span>{att.name ?? att.fileName}</span>
                          <span className="notice-detail__attachment-download">다운로드 ↓</span>
                        </a>
                      )
                    })}
                  </div>
                )}

                <div className="notice-detail__adjacent">
                  {adjacentRow('이전글', adjacentPending ? null : adjacent?.previousPost)}
                  <div className="notice-detail__adjacent-divider" />
                  {adjacentRow('다음글', adjacentPending ? null : adjacent?.nextPost)}
                </div>

                <div className="notice-detail__actions">
                  <Link to={listHref} className="notice-detail__back-btn">
                    목록으로
                  </Link>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
