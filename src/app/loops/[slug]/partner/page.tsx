'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

export default function PartnerApplyPage() {
  const { slug } = useParams<{ slug: string }>()

  const [handle, setHandle]       = useState('')
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
      body: JSON.stringify({ competition: slug, handle, role, reach, platform, portfolioUrl: portfolio }),
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
      <Link className="top-link" href={`/loops/${slug}`}>← Back to competition</Link>

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
              The brand team will review your profile. If there&apos;s a fit, they&apos;ll reach out directly.
            </div>
            <Link href={`/loops/${slug}`} style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
              ← Back to competition
            </Link>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-section">
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
                Raise your hand to amplify this competition. The brand can browse the Roster and reach out directly — no middlemen.
              </p>

              <label className="form-label" htmlFor="handle">
                Your handle or name <span style={{ color: '#c00' }}>*</span>
                <span className="hint">e.g. @fitmoves_uk or Studio Bloom</span>
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
                <span className="hint">Instagram, TikTok, portfolio site — anything that shows your style</span>
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
