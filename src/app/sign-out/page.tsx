'use client'

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'

export default function SignOutPage() {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut({ redirectUrl: '/sign-in' })
  }, [signOut])

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ fontWeight: 700, color: '#888' }}>Signing out…</p>
    </main>
  )
}
