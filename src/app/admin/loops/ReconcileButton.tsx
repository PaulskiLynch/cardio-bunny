'use client'

import { useState } from 'react'

export default function ReconcileButton() {
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState('')

  async function run() {
    setBusy(true)
    setResult('')
    const res = await fetch('/api/admin/reconcile-votes', { method: 'POST' })
    const json = await res.json()
    setResult(`Checked ${json.checked} entries - ${json.fixed} corrected.`)
    setBusy(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button
        onClick={run}
        disabled={busy}
        style={{
          fontSize: 13, fontWeight: 900, padding: '6px 14px',
          border: '2px solid #ddd', borderRadius: 8, background: '#fff',
          cursor: busy ? 'default' : 'pointer', color: '#555',
        }}
      >
        {busy ? 'Checking…' : '🔁 Reconcile Votes'}
      </button>
      {result && <span style={{ fontSize: 12, color: '#555' }}>{result}</span>}
    </div>
  )
}
