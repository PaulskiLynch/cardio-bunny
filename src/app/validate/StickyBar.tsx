'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 500) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`mkt-sticky${visible ? ' visible' : ''}`}>
      <span className="mkt-sticky-text">Validate products in any category - before you produce them.</span>
      <Link href="/contact" className="mkt-sticky-cta">Book a demo →</Link>
    </div>
  )
}
