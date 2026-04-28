'use client'

import { useClerk } from '@clerk/nextjs'

export function StudioSignInGate() {
  const { openSignIn } = useClerk()
  return (
    <div className="studio-gate">
      <div className="studio-gate-icon">🔒</div>
      <h2>Studio Access</h2>
      <p>Sign in with your authorised email address to access this competition studio.</p>
      <button
        className="submit-button"
        style={{ marginTop: 8, fontSize: 16 }}
        onClick={() => openSignIn({ fallbackRedirectUrl: window.location.href, signUpFallbackRedirectUrl: window.location.href })}
      >
        Sign In
      </button>
    </div>
  )
}

export function StudioDeniedGate({ email }: { email: string }) {
  return (
    <div className="studio-gate">
      <div className="studio-gate-icon">⛔</div>
      <h2>Access Denied</h2>
      <p><strong>{email}</strong> is not authorised for this studio.</p>
      <p style={{ color: '#888', fontSize: 13 }}>Contact your CrowdLoops account manager to request access.</p>
    </div>
  )
}
