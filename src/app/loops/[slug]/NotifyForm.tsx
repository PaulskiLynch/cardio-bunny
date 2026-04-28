'use client'

import { useState } from 'react'

const COPY = {
  demo:   { heading: 'Be the first to know.',   sub: 'Get notified when this competition goes live.' },
  live:   { heading: 'Get the winner announcement.', sub: 'We\'ll email you when results are in.' },
  closed: { heading: 'More competitions coming.', sub: 'Get notified about our next open call.' },
}

export default function NotifyForm({ competition, status, accent }: { competition: string; status: string; accent: string }) {
  const [email, setEmail]   = useState('')
  const [done, setDone]     = useState(false)
  const [busy, setBusy]     = useState(false)
  const [error, setError]   = useState('')

  const copy = COPY[status as keyof typeof COPY] ?? COPY.live

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competition, email }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '24px 20px', marginTop: 4 }}>
      {done ? (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
          <div style={{ fontWeight: 900, fontSize: 16 }}>You&apos;re on the list!</div>
          <div style={{ fontSize: 13, color: '#777', marginTop: 6 }}>We&apos;ll be in touch.</div>
        </div>
      ) : (
        <>
          <div style={{ fontWeight: 950, fontSize: 17, letterSpacing: '-0.02em', marginBottom: 4 }}>{copy.heading}</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>{copy.sub}</div>
          <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, fontFamily: 'inherit' }}
            />
            <button
              type="submit"
              disabled={busy}
              style={{
                background: accent, color: '#fff', border: 'none',
                borderRadius: 8, padding: '10px 18px', fontWeight: 900,
                fontSize: 13, cursor: 'pointer', flexShrink: 0,
                opacity: busy ? 0.6 : 1, fontFamily: 'inherit',
              }}
            >
              {busy ? '…' : 'NOTIFY ME'}
            </button>
          </form>
          {error && <div style={{ color: '#c00', fontSize: 13, marginTop: 8, fontWeight: 700 }}>{error}</div>}
        </>
      )}
    </div>
  )
}
