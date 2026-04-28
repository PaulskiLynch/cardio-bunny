'use client'

import { useState } from 'react'

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

export interface RosterApp {
  id: string
  handle: string
  name: string
  specialty: string
  role: string
  reach: string
  platform: string
  portfolioUrl: string
  status: string
}

export default function RosterDeck({ initial, accentColor }: { initial: RosterApp[], accentColor: string }) {
  const [apps, setApps]           = useState(initial)
  const [roleFilter, setRole]     = useState('all')
  const [reachFilter, setReach]   = useState('all')
  const [platformFilter, setPlatform] = useState('all')
  const [index, setIndex]         = useState(0)
  const [busy, setBusy]           = useState(false)

  const filtered = apps.filter(a => {
    if (roleFilter     !== 'all' && a.role     !== roleFilter)     return false
    if (reachFilter    !== 'all' && a.reach    !== reachFilter)    return false
    if (platformFilter !== 'all' && a.platform !== platformFilter) return false
    return true
  })

  const safeIndex = Math.min(index, Math.max(0, filtered.length - 1))
  const current   = filtered[safeIndex]
  const total     = filtered.length

  function prev() { setIndex(i => Math.max(0, i - 1)) }
  function next() { setIndex(i => Math.min(total - 1, i + 1)) }

  function changeFilter(setter: (v: string) => void, val: string) {
    setter(val)
    setIndex(0)
  }

  async function setStatus(status: string) {
    if (!current || busy) return
    setBusy(true)
    await fetch(`/api/partner-apply/${current.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setApps(prev => prev.map(a => a.id === current.id ? { ...a, status } : a))
    if (safeIndex < total - 1) setIndex(i => i + 1)
    setBusy(false)
  }

  if (apps.length === 0) {
    return <div className="studio-empty">No partner applications yet. Share the Roster link to start collecting.</div>
  }

  return (
    <div>
      {/* Filters */}
      <div className="roster-filters">
        <div className="roster-filter-group">
          {['all', 'creator', 'agency', 'pr', 'designer'].map(v => (
            <button
              key={v}
              className={`roster-pill${roleFilter === v ? ' active' : ''}`}
              style={roleFilter === v ? { background: accentColor, color: '#fff', borderColor: accentColor } : {}}
              onClick={() => changeFilter(setRole, v)}
            >
              {v === 'all' ? 'All Roles' : ROLE_LABEL[v]}
            </button>
          ))}
        </div>
        <div className="roster-filter-group">
          {['all', 'nano', 'micro', 'mid', 'macro'].map(v => (
            <button
              key={v}
              className={`roster-pill${reachFilter === v ? ' active' : ''}`}
              style={reachFilter === v ? { background: accentColor, color: '#fff', borderColor: accentColor } : {}}
              onClick={() => changeFilter(setReach, v)}
            >
              {v === 'all' ? 'All Reach' : REACH_LABEL[v]}
            </button>
          ))}
        </div>
        <div className="roster-filter-group">
          {['all', 'tiktok', 'instagram', 'youtube', 'multi'].map(v => (
            <button
              key={v}
              className={`roster-pill${platformFilter === v ? ' active' : ''}`}
              style={platformFilter === v ? { background: accentColor, color: '#fff', borderColor: accentColor } : {}}
              onClick={() => changeFilter(setPlatform, v)}
            >
              {v === 'all' ? 'All Platforms' : PLATFORM_LABEL[v]}
            </button>
          ))}
        </div>
      </div>

      {/* Deck */}
      {total === 0 ? (
        <div className="studio-empty">No applications match this filter.</div>
      ) : (
        <>
          {/* Nav */}
          <div className="roster-nav">
            <button className="roster-nav-btn" onClick={prev} disabled={safeIndex === 0}>←</button>
            <span className="roster-nav-counter">{safeIndex + 1} / {total}</span>
            <button className="roster-nav-btn" onClick={next} disabled={safeIndex === total - 1}>→</button>
          </div>

          {/* Card */}
          <div className={`roster-card${current.status === 'shortlisted' ? ' roster-card-shortlisted' : current.status === 'passed' ? ' roster-card-passed' : ''}`}>
            {current.status === 'shortlisted' && (
              <div className="roster-status-flag" style={{ background: accentColor }}>★ Shortlisted</div>
            )}
            {current.status === 'passed' && (
              <div className="roster-status-flag" style={{ background: '#aaa' }}>Passed</div>
            )}

            <div className="roster-handle">{current.handle}</div>
            {current.name && <div className="roster-real-name">{current.name}</div>}
            {current.specialty && <div className="roster-specialty">{current.specialty}</div>}

            <div className="roster-badges">
              <span className="roster-badge">{ROLE_LABEL[current.role] ?? current.role}</span>
              <span className="roster-badge">{REACH_LABEL[current.reach] ?? current.reach}</span>
              <span className="roster-badge">{PLATFORM_LABEL[current.platform] ?? current.platform}</span>
            </div>

            {current.portfolioUrl && (
              <a
                href={current.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="roster-portfolio-link"
              >
                View work ↗
              </a>
            )}

            <div className="roster-actions">
              <button
                className="roster-action-btn roster-shortlist"
                style={{ borderColor: accentColor, color: accentColor }}
                onClick={() => setStatus('shortlisted')}
                disabled={busy || current.status === 'shortlisted'}
              >
                ★ Shortlist
              </button>
              <button
                className="roster-action-btn roster-pass"
                onClick={() => setStatus('passed')}
                disabled={busy || current.status === 'passed'}
              >
                ✕ Pass
              </button>
              {current.status !== 'new' && (
                <button
                  className="roster-action-btn"
                  style={{ color: '#888' }}
                  onClick={() => setStatus('new')}
                  disabled={busy}
                >
                  ↩ Reset
                </button>
              )}
            </div>
          </div>

          {/* Shortlist summary */}
          {apps.filter(a => a.status === 'shortlisted').length > 0 && (
            <div className="roster-shortlist-summary">
              <strong>Shortlisted ({apps.filter(a => a.status === 'shortlisted').length}):</strong>{' '}
              {apps.filter(a => a.status === 'shortlisted').map(a => a.handle).join(', ')}
            </div>
          )}
        </>
      )}
    </div>
  )
}
