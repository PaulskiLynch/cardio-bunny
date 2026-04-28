'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Props {
  prevId: string | null
  nextId: string | null
  current: number
  total: number
}

export default function EntryNav({ prevId, nextId, current, total }: Props) {
  const router = useRouter()
  const touchStartX = useRef<number | null>(null)

  function goPrev() { if (prevId) router.push(`/entry/${prevId}`) }
  function goNext() { if (nextId) router.push(`/entry/${nextId}`) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) goNext()
    else if (diff < -50) goPrev()
    touchStartX.current = null
  }

  return (
    <div
      className="entry-nav"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="entry-nav-btn"
        onClick={goPrev}
        disabled={!prevId}
        aria-label="Previous entry"
      >
        ←
      </button>
      <div className="entry-nav-counter">
        {current} <span>of</span> {total}
      </div>
      <button
        className="entry-nav-btn"
        onClick={goNext}
        disabled={!nextId}
        aria-label="Next entry"
      >
        →
      </button>
    </div>
  )
}
