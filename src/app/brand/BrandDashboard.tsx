'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface LoopData {
  id: string
  slug: string
  brandName: string
  retailPartner: string
  status: string
  deadline: string
  accentColor: string
  logoUrl: string
}

interface Stats {
  pending: number
  approved: number
  rejected: number
  totalVotes: number
  referralVotes: number
}

interface EntryRow {
  id: string
  entryId: string
  designerName: string
  setName: string
  hook: string
  imageUrl: string
  status: string
  voteCount: number
  referralVotes: number
  createdAt: string
}

type Tab = 'overview' | 'entries' | 'leaderboard' | 'export'
type StatusFilter = 'pending' | 'approved' | 'rejected' | 'all'

function daysLeft(deadline: string) {
  if (!deadline) return null
  const diff = new Date(deadline).getTime() - Date.now()
  const days = Math.ceil(diff / 86400000)
  return days
}

export default function BrandDashboard({ loop, stats: initialStats }: { loop: LoopData; stats: Stats }) {
  const [tab, setTab]                   = useState<Tab>('overview')
  const [stats, setStats]               = useState(initialStats)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending')
  const [entries, setEntries]           = useState<EntryRow[]>([])
  const [page, setPage]                 = useState(1)
  const [hasMore, setHasMore]           = useState(false)
  const [loading, setLoading]           = useState(false)
  const [exporting, setExporting]       = useState(false)

  const loadEntries = useCallback(async (status: StatusFilter, p: number) => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/brand/${loop.id}/entries?status=${status}&page=${p}`)
      const data = await res.json()
      setEntries(prev => p === 1 ? data.entries : [...prev, ...data.entries])
      setHasMore(data.hasMore)
    } finally {
      setLoading(false)
    }
  }, [loop.id])

  useEffect(() => {
    if (tab === 'entries' || tab === 'leaderboard') {
      const s = tab === 'leaderboard' ? 'all' : statusFilter
      setPage(1)
      loadEntries(s, 1)
    }
  }, [tab, statusFilter, loadEntries])

  async function moderate(entryId: string, newStatus: 'approved' | 'rejected') {
    await fetch(`/api/brand/${loop.id}/entries/${entryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setEntries(prev => prev.filter(e => e.entryId !== entryId))
    setStats(prev => ({
      ...prev,
      pending:  prev.pending - 1,
      approved: newStatus === 'approved' ? prev.approved + 1 : prev.approved,
      rejected: newStatus === 'rejected' ? prev.rejected + 1 : prev.rejected,
    }))
  }

  async function downloadExport() {
    setExporting(true)
    try {
      const res = await fetch(`/api/brand/${loop.id}/export`)
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `${loop.slug}-export.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const days   = daysLeft(loop.deadline)
  const total  = stats.pending + stats.approved + stats.rejected
  const accent = loop.accentColor || '#111'

  const TABS: { id: Tab; label: string; badge?: number }[] = [
    { id: 'overview',     label: 'Overview' },
    { id: 'entries',      label: 'Entries',     badge: stats.pending || undefined },
    { id: 'leaderboard',  label: 'Leaderboard' },
    { id: 'export',       label: 'Export' },
  ]

  return (
    <main className="page">
      {/* Header */}
      <div className="brand-portal-header">
        {loop.logoUrl && (
          <img src={loop.logoUrl} alt={loop.brandName} className="brand-portal-logo" />
        )}
        <div>
          <div className="brand-portal-name">{loop.brandName}</div>
          {loop.retailPartner && (
            <div className="brand-portal-partner">× {loop.retailPartner}</div>
          )}
        </div>
        <div className="brand-portal-status" style={{ background: loop.status === 'live' ? '#d4edda' : '#f0f0f0', color: loop.status === 'live' ? '#1a7a1a' : '#555' }}>
          {loop.status.toUpperCase()}
        </div>
      </div>

      {/* Tab bar */}
      <div className="brand-tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`brand-tab${tab === t.id ? ' active' : ''}`}
            style={tab === t.id ? { borderColor: accent, color: accent } : {}}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.badge ? <span className="brand-tab-badge">{t.badge}</span> : null}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ─────────────────────────────── */}
      {tab === 'overview' && (
        <div>
          <div className="brand-stat-grid">
            <div className="brand-stat-card">
              <div className="brand-stat-value">{total.toLocaleString()}</div>
              <div className="brand-stat-label">Total Entries</div>
            </div>
            <div className="brand-stat-card" style={{ borderColor: stats.pending > 0 ? '#f0a500' : undefined }}>
              <div className="brand-stat-value" style={{ color: stats.pending > 0 ? '#b36b00' : undefined }}>
                {stats.pending.toLocaleString()}
              </div>
              <div className="brand-stat-label">Pending Review</div>
            </div>
            <div className="brand-stat-card">
              <div className="brand-stat-value">{stats.approved.toLocaleString()}</div>
              <div className="brand-stat-label">Live on Leaderboard</div>
            </div>
            <div className="brand-stat-card">
              <div className="brand-stat-value">{stats.totalVotes.toLocaleString()}</div>
              <div className="brand-stat-label">Total Votes</div>
            </div>
            <div className="brand-stat-card">
              <div className="brand-stat-value">{stats.referralVotes.toLocaleString()}</div>
              <div className="brand-stat-label">Referral Votes</div>
            </div>
            {days !== null && (
              <div className="brand-stat-card" style={{ borderColor: days <= 3 ? '#c00' : undefined }}>
                <div className="brand-stat-value" style={{ color: days <= 3 ? '#c00' : undefined }}>
                  {days > 0 ? days : 0}
                </div>
                <div className="brand-stat-label">{days <= 0 ? 'Competition Closed' : 'Days Remaining'}</div>
              </div>
            )}
          </div>

          <div className="brand-quick-links">
            <Link href={`/loops/${loop.slug}`} target="_blank" className="brand-quick-link">
              View competition page ↗
            </Link>
            {stats.pending > 0 && (
              <button className="brand-quick-link" style={{ background: accent, color: '#fff', border: 'none', cursor: 'pointer' }}
                onClick={() => setTab('entries')}>
                Review {stats.pending} pending {stats.pending === 1 ? 'entry' : 'entries'} →
              </button>
            )}
          </div>

          <div className="brand-insight-box">
            <div className="brand-insight-title">Your community reach</div>
            <div className="brand-insight-body">
              {stats.referralVotes > 0
                ? `${stats.referralVotes.toLocaleString()} votes came via designer share links — each one represents a friend or follower pulled into the competition organically.`
                : 'Once designers start sharing their entry links, referral votes will appear here.'}
            </div>
            <div className="brand-insight-sub">
              &ldquo;People pay attention because their friend designed it.&rdquo;
            </div>
          </div>
        </div>
      )}

      {/* ── ENTRIES ──────────────────────────────── */}
      {tab === 'entries' && (
        <div>
          <div className="brand-filter-bar">
            {(['pending', 'approved', 'rejected', 'all'] as StatusFilter[]).map(s => (
              <button
                key={s}
                className={`brand-filter-pill${statusFilter === s ? ' active' : ''}`}
                style={statusFilter === s ? { background: accent, color: '#fff', borderColor: accent } : {}}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                {s === 'pending' && stats.pending > 0 && (
                  <span style={{ marginLeft: 5 }}>({stats.pending})</span>
                )}
              </button>
            ))}
          </div>

          {loading && entries.length === 0 ? (
            <div className="brand-loading">Loading…</div>
          ) : entries.length === 0 ? (
            <div className="brand-empty">No {statusFilter === 'all' ? '' : statusFilter} entries yet.</div>
          ) : (
            <>
              <div className="brand-entry-list">
                {entries.map(e => (
                  <div key={e.id} className="brand-entry-item">
                    {e.imageUrl && (
                      <div className="brand-entry-img">
                        <img src={e.imageUrl} alt={e.setName} />
                      </div>
                    )}
                    <div className="brand-entry-body">
                      <div className="brand-entry-name">{e.setName}</div>
                      <div className="brand-entry-designer">by {e.designerName}</div>
                      <div className="brand-entry-hook">{e.hook}</div>
                      <div className="brand-entry-meta">
                        {e.voteCount} votes
                        {e.referralVotes > 0 && ` · ${e.referralVotes} referral`}
                        {' · '}
                        <Link href={`/entry/${e.entryId}`} target="_blank" style={{ textDecoration: 'underline' }}>
                          view ↗
                        </Link>
                      </div>
                    </div>
                    {(statusFilter === 'pending' || statusFilter === 'all') && e.status === 'pending' && (
                      <div className="brand-entry-actions">
                        <button className="brand-approve-btn" onClick={() => moderate(e.entryId, 'approved')}>✓</button>
                        <button className="brand-reject-btn"  onClick={() => moderate(e.entryId, 'rejected')}>✕</button>
                      </div>
                    )}
                    {e.status !== 'pending' && (
                      <div className="brand-entry-status" style={{
                        color: e.status === 'approved' ? '#1a7a1a' : '#888',
                        fontWeight: 900, fontSize: 11, textTransform: 'uppercase', padding: '4px 0',
                      }}>
                        {e.status}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  className="brand-load-more"
                  disabled={loading}
                  onClick={() => {
                    const next = page + 1
                    setPage(next)
                    loadEntries(statusFilter, next)
                  }}
                >
                  {loading ? 'Loading…' : 'Load more'}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* ── LEADERBOARD ──────────────────────────── */}
      {tab === 'leaderboard' && (
        <div>
          {loading && entries.length === 0 ? (
            <div className="brand-loading">Loading…</div>
          ) : entries.length === 0 ? (
            <div className="brand-empty">No approved entries yet.</div>
          ) : (
            <div className="brand-leaderboard">
              {entries.filter(e => e.status === 'approved').map((e, i) => (
                <div key={e.id} className="brand-lb-row">
                  <div className="brand-lb-rank">#{i + 1}</div>
                  {e.imageUrl && (
                    <div className="brand-lb-img">
                      <img src={e.imageUrl} alt={e.setName} />
                    </div>
                  )}
                  <div className="brand-lb-info">
                    <div className="brand-lb-name">{e.setName}</div>
                    <div className="brand-lb-designer">by {e.designerName}</div>
                  </div>
                  <div className="brand-lb-votes">
                    <div className="brand-lb-vote-count">{e.voteCount.toLocaleString()}</div>
                    <div className="brand-lb-vote-label">votes</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── EXPORT ───────────────────────────────── */}
      {tab === 'export' && (
        <div className="brand-export-panel">
          <div className="brand-export-title">Download competition data</div>
          <div className="brand-export-body">
            Exports all entries with designer name, contact, design name, hook, vote count, referral votes, and status.
          </div>
          <button
            className="brand-export-btn"
            style={{ background: accent }}
            onClick={downloadExport}
            disabled={exporting}
          >
            {exporting ? 'Preparing download…' : 'Download CSV'}
          </button>
          <div className="brand-export-note">
            {total.toLocaleString()} entries · last updated live
          </div>
        </div>
      )}
    </main>
  )
}
