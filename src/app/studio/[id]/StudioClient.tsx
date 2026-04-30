'use client'

import { useState } from 'react'

export interface EntryRow {
  id: string
  entryId: string
  designerName: string
  contact: string
  setName: string
  hook: string
  imageUrl: string | null
  voteCount: number
  status: string
}

const STATUS_NEXT: Record<string, { label: string; value: string; color: string }[]> = {
  pending:  [{ label: 'Approve', value: 'approved', color: '#1a5c1a' }, { label: 'Reject',  value: 'rejected', color: '#a00' }],
  approved: [{ label: 'Reject',  value: 'rejected', color: '#a00' },   { label: 'Reset',   value: 'pending',  color: '#888' }],
  rejected: [{ label: 'Approve', value: 'approved', color: '#1a5c1a' }, { label: 'Reset',   value: 'pending',  color: '#888' }],
}

function useEntries(initial: EntryRow[]) {
  const [entries, setEntries] = useState(initial)
  const [busy, setBusy] = useState<string | null>(null)

  async function setStatus(id: string, status: string) {
    setBusy(id + status)
    try {
      const res = await fetch(`/api/admin/entries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const data = await res.json()
        setEntries(prev => prev.map(e => e.id === id ? { ...e, status: data.status } : e))
      }
    } finally {
      setBusy(null)
    }
  }

  return { entries, setStatus, busy }
}

/* ── Full Entries Table ──────────────────────────────────── */
export function StudioEntriesTable({ initial, accentColor }: { initial: EntryRow[]; accentColor: string }) {
  const { entries, setStatus, busy } = useEntries(initial)
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = filter === 'all' ? entries : entries.filter(e => e.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {['all', 'approved', 'pending', 'rejected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '4px 12px', borderRadius: 20, border: '1.5px solid',
              fontSize: 12, fontWeight: 900, cursor: 'pointer',
              background: filter === f ? '#111' : 'transparent',
              color: filter === f ? '#fff' : '#555',
              borderColor: filter === f ? '#111' : '#ddd',
            }}
          >
            {f === 'all' ? `All (${entries.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${entries.filter(e => e.status === f).length})`}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="studio-empty">No entries in this view.</div>
      ) : (
        <div className="studio-table-wrap">
          <table className="studio-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Designer</th>
                <th>Set Name</th>
                <th style={{ textAlign: 'right' }}>Votes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((e, i) => (
                <>
                  <tr key={e.id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
                    <td style={{ color: '#aaa', fontWeight: 700 }}>{i + 1}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{e.entryId}</td>
                    <td style={{ fontWeight: 700 }}>{e.designerName}</td>
                    <td>{e.setName}</td>
                    <td style={{ fontWeight: 900, textAlign: 'right' }}>{e.voteCount}</td>
                    <td><span className={`studio-badge studio-badge-${e.status}`}>{e.status}</span></td>
                    <td onClick={ev => ev.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {e.imageUrl && (
                          <a
                            href={e.imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: 11, fontWeight: 900, textDecoration: 'underline', color: accentColor }}
                          >
                            View
                          </a>
                        )}
                        {(STATUS_NEXT[e.status] ?? []).map(action => (
                          <button
                            key={action.value}
                            disabled={busy === e.id + action.value}
                            onClick={() => setStatus(e.id, action.value)}
                            style={{
                              background: 'none', border: 'none', padding: 0,
                              fontSize: 11, fontWeight: 900, cursor: 'pointer',
                              textDecoration: 'underline', color: action.color,
                              opacity: busy === e.id + action.value ? 0.4 : 1,
                            }}
                          >
                            {busy === e.id + action.value ? '…' : action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                  {expanded === e.id && (
                    <tr key={e.id + '-exp'}>
                      <td colSpan={7} style={{ padding: '0 14px 14px', background: '#fafafa' }}>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 10 }}>
                          {e.imageUrl && (
                            <img src={e.imageUrl} alt={e.setName} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                          )}
                          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                            <div><strong>Contact:</strong> {e.contact}</div>
                            <div><strong>Hook:</strong> {e.hook}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ── Moderation Queue ────────────────────────────────────── */
export function StudioModeration({ initial }: { initial: EntryRow[] }) {
  const { entries, setStatus, busy } = useEntries(initial)
  const pending = entries.filter(e => e.status === 'pending')

  if (pending.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#777', fontWeight: 700 }}>
        No pending entries. All caught up.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {pending.map(e => (
        <div key={e.id} className="admin-card">
          <div className="admin-image">
            {e.imageUrl
              ? <img src={e.imageUrl} alt={e.setName} />
              : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#777', fontWeight: 900 }}>No Image</div>}
          </div>
          <div className="admin-body">
            <div className="admin-meta" style={{ fontFamily: 'monospace', fontSize: 11 }}>{e.entryId}</div>
            <div className="admin-name">{e.designerName} - {e.setName}</div>
            <div className="admin-meta">{e.contact}</div>
            <div className="admin-hook">{e.hook}</div>
            <div className="admin-actions">
              <button
                className="btn-approve"
                disabled={!!busy}
                onClick={() => setStatus(e.id, 'approved')}
              >
                {busy === e.id + 'approved' ? '...' : 'APPROVE'}
              </button>
              <button
                className="btn-reject"
                disabled={!!busy}
                onClick={() => setStatus(e.id, 'rejected')}
              >
                {busy === e.id + 'rejected' ? '...' : 'REJECT'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
