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

interface Profile {
  id: string
  handle: string
  name: string
  specialty: string
  role: string
  reach: string
  platform: string
  portfolioUrl: string
}

export default function RosterBrowser({ initial }: { initial: Profile[] }) {
  const [roleFilter, setRole]       = useState('all')
  const [reachFilter, setReach]     = useState('all')
  const [platformFilter, setPlatform] = useState('all')

  const filtered = initial.filter(p => {
    if (roleFilter     !== 'all' && p.role     !== roleFilter)     return false
    if (reachFilter    !== 'all' && p.reach    !== reachFilter)    return false
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false
    return true
  })

  if (initial.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: '#777', fontWeight: 700 }}>
        No profiles yet — be the first to join the Roster.
      </div>
    )
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
              style={roleFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => { setRole(v) }}
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
              style={reachFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => { setReach(v) }}
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
              style={platformFilter === v ? { background: '#111', color: '#fff', borderColor: '#111' } : {}}
              onClick={() => { setPlatform(v) }}
            >
              {v === 'all' ? 'All Platforms' : PLATFORM_LABEL[v]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: '#aaa', marginBottom: 16 }}>
        {filtered.length} profile{filtered.length !== 1 ? 's' : ''}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#777', fontWeight: 700 }}>
          No profiles match this filter.
        </div>
      ) : (
        <div className="roster-grid">
          {filtered.map(p => (
            <div key={p.id} className="roster-profile-card">
              <div className="roster-handle">{p.handle}</div>
              {p.name && <div className="roster-real-name">{p.name}</div>}
              {p.specialty && <div className="roster-specialty">{p.specialty}</div>}
              <div className="roster-badges">
                <span className="roster-badge">{ROLE_LABEL[p.role] ?? p.role}</span>
                <span className="roster-badge">{REACH_LABEL[p.reach] ?? p.reach}</span>
                <span className="roster-badge">{PLATFORM_LABEL[p.platform] ?? p.platform}</span>
              </div>
              {p.portfolioUrl && (
                <a
                  href={p.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="roster-portfolio-link"
                >
                  View work ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
