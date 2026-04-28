'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InquiryActions({ id, status }: { id: string; status: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function setStatus(next: string) {
    setBusy(true)
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    router.refresh()
    setBusy(false)
  }

  async function deleteInquiry() {
    if (!confirm('Delete this inquiry? This cannot be undone.')) return
    setBusy(true)
    await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
    router.refresh()
    setBusy(false)
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
      {status !== 'reviewed' && status !== 'converted' && status !== 'declined' && (
        <button
          className="inq-action-btn"
          style={{ background: '#1a4a8a', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => setStatus('reviewed')}
          disabled={busy}
        >
          ✓ Mark Reviewed
        </button>
      )}
      {status !== 'declined' && status !== 'converted' && (
        <button
          className="inq-action-btn"
          style={{ background: '#eee', color: '#888', border: 'none', cursor: 'pointer' }}
          onClick={() => setStatus('declined')}
          disabled={busy}
        >
          ✕ Decline
        </button>
      )}
      {status === 'declined' && (
        <button
          className="inq-action-btn"
          style={{ background: '#eee', color: '#888', border: 'none', cursor: 'pointer' }}
          onClick={() => setStatus('new')}
          disabled={busy}
        >
          ↩ Reopen
        </button>
      )}
      <button
        className="inq-action-btn"
        style={{ background: '#fee', color: '#c00', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}
        onClick={deleteInquiry}
        disabled={busy}
      >
        🗑 Delete
      </button>
    </div>
  )
}
