'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const ROLE_LABEL: Record<string, string> = {
  creator:  'Creator',
  agency:   'Agency',
  pr:       'PR Consultant',
  designer: 'Ind. Designer',
}

const REACH_LABEL: Record<string, string> = {
  nano:  'Nano <10K',
  micro: 'Micro 10K–100K',
  mid:   'Mid 100K–500K',
  macro: 'Macro 500K+',
}

const PLATFORM_LABEL: Record<string, string> = {
  tiktok:    'TikTok',
  instagram: 'Instagram',
  youtube:   'YouTube',
  multi:     'Multi-platform',
}

interface Profile {
  id: string
  handle: string
  name: string
  specialty: string
  role: string
  reach: string
  platform: string
  portfolioUrl: string
  avatarUrl: string
}

export default function RosterBrowser({ initial }: { initial: Profile[] }) {
  const [roleFilter, setRole]         = useState('all')
  const [reachFilter, setReach]       = useState('all')
  const [platformFilter, setPlatform] = useState('all')
  const [index, setIndex]             = useState(0)
  const touchStartX = useRef<number | null>(null)

  const filtered = initial.filter(p => {
    if (roleFilter     !== 'all' && p.role     !== roleFilter)     return false
    if (reachFilter    !== 'all' && p.reach    !== reachFilter)    return false
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false
    return true
  })

  const total      = filtered.length
  const safeIndex  = Math.min(index, Math.max(0, total - 1))
  const current    = filtered[safeIndex]

  function changeFilter(setter: (v: string) => void, val: string) {
    setter(val)
    setIndex(0)
  }

  function prev() { setIndex(i => Math.max(0, i - 1)) }
  function next() { setIndex(i => Math.min(total - 1, i + 1)) }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -50) next()
    else if (dx > 50) prev()
    touchStartX.current = null
  }

  if (initial.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: '#777' }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>No profiles yet.</div>
        <Link href="/roster/apply" style={{ fontWeight: 900, textDecoration: 'underline' }}>Be the first to join →</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Filters */}
      <div className="roster-filters">
        <div className="roster-filter-group">
          {['all', 'creator', 'agency', 'pr', 'designer'].map(v => (
            <button key={v} className={`roster-pill${roleFilter === v ? ' active' : ''}`}
              style={roleFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => changeFilter(setRole, v)}>
              {v === 'all' ? 'All Roles' : ROLE_LABEL[v]}
            </button>
          ))}
        </div>
        <div className="roster-filter-group">
          {['all', 'nano', 'micro', 'mid', 'macro'].map(v => (
            <button key={v} className={`roster-pill${reachFilter === v ? ' active' : ''}`}
              style={reachFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => changeFilter(setReach, v)}>
              {v === 'all' ? 'All Reach' : REACH_LABEL[v]}
            </button>
          ))}
        </div>
        <div className="roster-filter-group">
          {['all', 'tiktok', 'instagram', 'youtube', 'multi'].map(v => (
            <button key={v} className={`roster-pill${platformFilter === v ? ' active' : ''}`}
              style={platformFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => changeFilter(setPlatform, v)}>
              {v === 'all' ? 'All Platforms' : PLATFORM_LABEL[v]}
            </button>
          ))}
        </div>
      </div>

      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#777', fontWeight: 700 }}>
          No profiles match this filter.
        </div>
      ) : (
        <>
          {/* Nav */}
          <div className="roster-nav">
            <button className="roster-nav-btn" onClick={prev} disabled={safeIndex === 0}>←</button>
            <span className="roster-nav-counter">{safeIndex + 1} / {total}</span>
            <button className="roster-nav-btn" onClick={next} disabled={safeIndex === total - 1}>→</button>
          </div>

          {/* Card */}
          <div
            className="roster-public-card"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Content sample image */}
            {current.avatarUrl ? (
              <div className="roster-public-image">
                <img src={current.avatarUrl} alt={current.handle} />
              </div>
            ) : (
              <div className="roster-public-image roster-public-image-placeholder">
                <span style={{ fontSize: 40 }}>📷</span>
              </div>
            )}

            <div className="roster-public-body">
              <div className="roster-handle">{current.handle}</div>
              {current.name && <div className="roster-real-name">{current.name}</div>}
              {current.specialty && <div className="roster-specialty">{current.specialty}</div>}

              <div className="roster-badges" style={{ marginTop: 12 }}>
                <span className="roster-badge">{ROLE_LABEL[current.role] ?? current.role}</span>
                <span className="roster-badge">{REACH_LABEL[current.reach] ?? current.reach}</span>
                <span className="roster-badge">{PLATFORM_LABEL[current.platform] ?? current.platform}</span>
              </div>

              {current.portfolioUrl && (
                <a href={current.portfolioUrl} target="_blank" rel="noopener noreferrer" className="roster-portfolio-link" style={{ marginTop: 16, display: 'inline-block' }}>
                  View work ↗
                </a>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#aaa' }}>
            Swipe or use arrows to browse · {total} profile{total !== 1 ? 's' : ''}
          </div>
        </>
      )}
    </div>
  )
}
