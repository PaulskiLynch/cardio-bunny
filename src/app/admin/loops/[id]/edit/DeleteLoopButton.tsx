'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteLoopButton({ id }: { id: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this loop? This cannot be undone.')) return
    setBusy(true)
    const res = await fetch(`/api/loops/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/loops')
    } else {
      alert('Delete failed.')
      setBusy(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      style={{
        background: 'none', border: 'none', padding: 0,
        fontWeight: 900, fontSize: 14, textDecoration: 'underline',
        color: '#c00', cursor: 'pointer', opacity: busy ? 0.5 : 1,
        marginLeft: 'auto',
      }}
    >
      {busy ? 'Deleting…' : 'Delete Loop'}
    </button>
  )
}
