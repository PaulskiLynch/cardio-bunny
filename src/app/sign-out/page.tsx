'use client'

import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    // Clear all Clerk cookies by expiring them
    const clerkCookies = ['__session', '__client_uat', '__clerk_db_jwt', '__clerk_handshake', '__clerk_redirect_count']
    for (const name of clerkCookies) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=crowdloops.com`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.crowdloops.com`
    }
    // Clear Clerk localStorage/sessionStorage
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('clerk') || key.startsWith('__clerk')) localStorage.removeItem(key)
      }
    } catch {}
    // Hard redirect to sign-in
    window.location.replace('/sign-in')
  }, [])

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ fontWeight: 700, color: '#888' }}>Clearing session…</p>
    </main>
  )
}
