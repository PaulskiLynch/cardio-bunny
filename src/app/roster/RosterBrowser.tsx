'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const ROLE_LABEL: Record<string, string> = {
  creator:  'Creator',
  agency:   'Agency',
  pr:       'PR Consultant',
  designer: 'Ind. Designer',
}

const REACH_LABEL: Record<string, string> = {
  nano:  'Nano <10K',
  micro: 'Micro 10K-100K',
  mid:   'Mid 100K-500K',
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
  followers: string
  engagement: string
  location: string
}

function cleanHandle(p: Profile): string | null {
  if (!p.name) return null
  const ch = p.handle.replace('@', '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const cn = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (ch.includes(cn) || cn.includes(ch)) return null
  return p.handle
}

export default function RosterBrowser({ initial }: { initial: Profile[] }) {
  const [search, setSearch]           = useState('')
  const [roleFilter, setRole]         = useState('all')
  const [reachFilter, setReach]       = useState('all')
  const [platformFilter, setPlatform] = useState('all')
  const [spotIdx, setSpotIdx]         = useState(0)

  const q = search.toLowerCase()

  const filtered = initial.filter(p => {
    if (q && !p.handle.toLowerCase().includes(q) && !p.name.toLowerCase().includes(q) &&
        !p.specialty.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false
    if (roleFilter     !== 'all' && p.role     !== roleFilter)     return false
    if (reachFilter    !== 'all' && p.reach    !== reachFilter)    return false
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false
    return true
  })

  useEffect(() => { setSpotIdx(0) }, [search, roleFilter, reachFilter, platformFilter])

  const spot = filtered[spotIdx]
  const hasFilters = search || roleFilter !== 'all' || reachFilter !== 'all' || platformFilter !== 'all'

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
      {/* Search */}
      <input
        className="roster-search-bar"
        type="search"
        placeholder="Search by name, niche, location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Filters — three scrollable pill rows, always visible */}
      <div className="roster-filter-bar">
        {(['all', 'creator', 'agency', 'pr', 'designer'] as const).map(v => (
          <button key={v} className={`roster-pill${roleFilter === v ? ' active' : ''}`}
            style={roleFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
            onClick={() => setRole(v)}>
            {v === 'all' ? 'All types' : ROLE_LABEL[v]}
          </button>
        ))}
      </div>
      <div className="roster-filter-bar">
        {(['all', 'nano', 'micro', 'mid', 'macro'] as const).map(v => (
          <button key={v} className={`roster-pill${reachFilter === v ? ' active' : ''}`}
            style={reachFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
            onClick={() => setReach(v)}>
            {v === 'all' ? 'All reach' : REACH_LABEL[v]}
          </button>
        ))}
      </div>
      <div className="roster-filter-bar" style={{ marginBottom: 14 }}>
        {(['all', 'tiktok', 'instagram', 'youtube', 'multi'] as const).map(v => (
          <button key={v} className={`roster-pill${platformFilter === v ? ' active' : ''}`}
            style={platformFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
            onClick={() => setPlatform(v)}>
            {v === 'all' ? 'All platforms' : PLATFORM_LABEL[v]}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        {hasFilters && (
          <button onClick={() => { setSearch(''); setRole('all'); setReach('all'); setPlatform('all') }}
            style={{ marginLeft: 10, fontWeight: 700, fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#888' }}>
            Clear all
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#777', fontWeight: 700 }}>
          No profiles match.
        </div>
      ) : (
        <>
          {/* Spotlight card */}
          {spot && (
            <div className="roster-spotlight">
              <div className="roster-spotlight-header">
                <span className="roster-spotlight-label">Featured Booster</span>
                <div className="roster-spotlight-nav">
                  <button className="roster-spotlight-nav-btn"
                    onClick={() => setSpotIdx(i => Math.max(0, i - 1))}
                    disabled={spotIdx === 0}>←</button>
                  <span className="roster-spotlight-counter">{spotIdx + 1} / {filtered.length}</span>
                  <button className="roster-spotlight-nav-btn"
                    onClick={() => setSpotIdx(i => Math.min(filtered.length - 1, i + 1))}
                    disabled={spotIdx === filtered.length - 1}>→</button>
                </div>
              </div>

              <div className="roster-spotlight-card">
                <div className="roster-spotlight-img">
                  {spot.avatarUrl
                    ? <img src={spot.avatarUrl} alt={spot.name || spot.handle} />
                    : <span style={{ fontSize: 40 }}>📷</span>
                  }
                </div>
                <div className="roster-spotlight-body">
                  <div className="roster-spotlight-name">{spot.name || spot.handle}</div>
                  {cleanHandle(spot) && (
                    <div className="roster-spotlight-handle">{cleanHandle(spot)}</div>
                  )}
                  {spot.specialty && (
                    <div className="roster-spotlight-spec">{spot.specialty}</div>
                  )}
                  {[spot.followers, spot.engagement, spot.location].filter(Boolean).length > 0 && (
                    <div className="roster-spotlight-stats">
                      {[spot.followers, spot.engagement, spot.location].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  <div className="roster-spotlight-badges">
                    <span className="roster-spotlight-badge">{ROLE_LABEL[spot.role] ?? spot.role}</span>
                    <span className="roster-spotlight-badge">{PLATFORM_LABEL[spot.platform] ?? spot.platform}</span>
                    <span className="roster-spotlight-badge">{REACH_LABEL[spot.reach] ?? spot.reach}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Link href="/contact" className="roster-spotlight-invite">Invite to Loop →</Link>
                    {spot.portfolioUrl && (
                      <a href={spot.portfolioUrl} target="_blank" rel="noopener noreferrer" className="roster-spotlight-view">
                        View work ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          <div className="roster-list">
            {filtered.map((p, i) => {
              const statParts = [p.followers, p.engagement, p.location].filter(Boolean)
              const handle = cleanHandle(p)
              return (
                <div key={p.id}
                  className={`roster-list-card${i === spotIdx ? ' roster-list-card-active' : ''}`}
                  onClick={() => setSpotIdx(i)}
                  style={{ cursor: 'pointer' }}>
                  <div className="roster-list-img">
                    {p.avatarUrl
                      ? <img src={p.avatarUrl} alt={p.handle} />
                      : <span style={{ fontSize: 28 }}>📷</span>
                    }
                  </div>
                  <div className="roster-list-body">
                    <div className="roster-handle" style={{ fontSize: 15, marginBottom: 2 }}>{p.name || p.handle}</div>
                    {handle && <div className="roster-real-name">{handle}</div>}
                    {p.specialty && <div className="roster-specialty" style={{ marginBottom: 6 }}>{p.specialty}</div>}
                    {statParts.length > 0 && <div className="roster-stat-line">{statParts.join(' · ')}</div>}
                    <div className="roster-badges" style={{ marginTop: 8, marginBottom: 10 }}>
                      <span className="roster-badge">{ROLE_LABEL[p.role] ?? p.role}</span>
                      <span className="roster-badge">{PLATFORM_LABEL[p.platform] ?? p.platform}</span>
                      <span className="roster-badge">{REACH_LABEL[p.reach] ?? p.reach}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <Link href="/contact" className="roster-invite-btn">Invite to Loop</Link>
                      {p.portfolioUrl && (
                        <a href={p.portfolioUrl} target="_blank" rel="noopener noreferrer" className="roster-view-btn">
                          View work ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
