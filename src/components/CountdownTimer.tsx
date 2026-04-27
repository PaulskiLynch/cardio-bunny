'use client'

import { useEffect, useState } from 'react'

function pad(n: number) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ deadline = '2026-05-31T23:59:59Z', label = 'SUBMISSIONS CLOSE IN' }: { deadline?: string; label?: string }) {
  const DEADLINE = new Date(deadline)
  const [parts, setParts] = useState({ d: '00', h: '00', m: '00', s: '00' })

  useEffect(() => {
    function tick() {
      const diff = DEADLINE.getTime() - Date.now()
      if (diff <= 0) { setParts({ d: '00', h: '00', m: '00', s: '00' }); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="countdown">
      <div className="countdown-label">{label}</div>
      <div className="countdown-time">{parts.d}:{parts.h}:{parts.m}:{parts.s}</div>
      <div className="countdown-small">DAYS : HOURS : MINS : SECS</div>
    </div>
  )
}
