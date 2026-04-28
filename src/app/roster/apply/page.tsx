'use client'

import { useState } from 'react'
import Link from 'next/link'

const ROLES = [
  { value: 'creator',  label: 'Creator / Influencer' },
  { value: 'agency',   label: 'Agency' },
  { value: 'pr',       label: 'PR Consultant' },
  { value: 'designer', label: 'Independent Designer' },
]

const REACHES = [
  { value: 'nano',  label: 'Nano — under 10K' },
  { value: 'micro', label: 'Micro — 10K to 100K' },
  { value: 'mid',   label: 'Mid-tier — 100K to 500K' },
  { value: 'macro', label: 'Macro — 500K+' },
]

const PLATFORMS = [
  { value: 'tiktok',    label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube',   label: 'YouTube' },
  { value: 'multi',     label: 'Multi-platform' },
]

export default function RosterApplyPage() {
  const [handle, setHandle]       = useState('')
  const [name, setName]           = useState('')
  const [specialty, setSpecialty] = useState('')
  const [role, setRole]           = useState('')
  const [reach, setReach]         = useState('')
  const [platform, setPlatform]   = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!handle || !role || !reach || !platform) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/partner-apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition: '', handle, name, specialty, role, reach, platform, portfolioUrl: portfolio }),
    })
    if (res.ok) {
      setDone(true)
    } else {
      const json = await res.json().catch(() => ({}))
      setError(json.error ?? 'Something went wrong.')
    }
    setSubmitting(false)
  }

  return (
    <main className="page">
      <Link className="top-link" href="/roster">← The Roster</Link>

      <div className="portal">
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Join the Roster</div>
        </header>

        {done ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>You&apos;re on the Roster</div>
            <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24 }}>
              Your profile is now visible to brands running competitions on CrowdLoops. If there&apos;s a fit, they&apos;ll reach out directly.
            </div>
            <Link href="/roster" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
              ← Back to the Roster
            </Link>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
              List yourself once. Brands across all CrowdLoops competitions can find you and reach out directly.
            </p>

            <div className="form-section">
              <label className="form-label" htmlFor="handle">
                Handle <span style={{ color: '#c00' }}>*</span>
                <span className="hint">Your social handle or brand name</span>
              </label>
              <input
                id="handle"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                placeholder="@yourhandle"
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="name">
                Your name
                <span className="hint">Optional — shown alongside your handle</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Jamie O'Brien"
              />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="specialty">
                Specialty
                <span className="hint">e.g. Activewear Content, TikTok Growth, Fashion PR</span>
              </label>
              <input
                id="specialty"
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                placeholder="What you do best"
              />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="role">
                What best describes you? <span style={{ color: '#c00' }}>*</span>
              </label>
              <select id="role" value={role} onChange={e => setRole(e.target.value)} required>
                <option value="">— Select —</option>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="reach">
                Approximate reach <span style={{ color: '#c00' }}>*</span>
              </label>
              <select id="reach" value={reach} onChange={e => setReach(e.target.value)} required>
                <option value="">— Select —</option>
                {REACHES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="platform">
                Primary platform <span style={{ color: '#c00' }}>*</span>
              </label>
              <select id="platform" value={platform} onChange={e => setPlatform(e.target.value)} required>
                <option value="">— Select —</option>
                {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="portfolio">
                Link to your work
                <span className="hint">Instagram, TikTok, portfolio — anything that shows your style</span>
              </label>
              <input
                id="portfolio"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
                placeholder="https://"
                type="url"
              />
            </div>

            {error && (
              <div style={{ background: '#fff0f0', color: '#c00', padding: '12px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
                {error}
              </div>
            )}

            <button className="submit-button" type="submit" disabled={submitting}>
              {submitting ? 'SUBMITTING…' : 'JOIN THE ROSTER'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
