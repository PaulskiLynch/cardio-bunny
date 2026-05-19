'use client'

import { useState } from 'react'

interface Entry {
  id: string
  entryId: string
  designerName: string
  contact: string
  setName: string
  hook: string
  imageUrl: string
  competition: string
  createdAt: string
}

export function AdminCard({ entry, onDone }: { entry: Entry; onDone: () => void }) {
  const [busy, setBusy] = useState(false)

  async function action(status: 'approved' | 'rejected') {
    setBusy(true)
    await fetch(`/api/admin/entries/${entry.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    onDone()
  }

  return (
    <div className="admin-card">
      <div className="admin-image">
        {entry.imageUrl
          ? <img src={entry.imageUrl} alt={entry.setName} />
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#777', fontWeight: 900 }}>No Image</div>}
      </div>
      <div className="admin-body">
        <div className="admin-meta" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontWeight: 900, background: '#111', color: '#fff', fontSize: 10, padding: '2px 7px', borderRadius: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {entry.competition}
          </span>
          <span>{entry.entryId}</span>
        </div>
        <div className="admin-name">{entry.designerName} - {entry.setName}</div>
        <div className="admin-meta">{entry.contact}</div>
        <div className="admin-hook">{entry.hook}</div>
        <div className="admin-actions">
          <button className="btn-approve" disabled={busy} onClick={() => action('approved')}>
            {busy ? '...' : 'APPROVE'}
          </button>
          <button className="btn-reject" disabled={busy} onClick={() => action('rejected')}>
            {busy ? '...' : 'REJECT'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function AdminList({ initial }: { initial: Entry[] }) {
  const [entries, setEntries] = useState(initial)

  function remove(id: string) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  if (entries.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#777', fontWeight: 700 }}>
        No pending entries. All caught up.
      </div>
    )
  }

  return (
    <>
      {entries.map(e => (
        <AdminCard key={e.id} entry={e} onDone={() => remove(e.id)} />
      ))}
    </>
  )
}

