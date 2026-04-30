'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const ROLES = [
  { value: 'creator',  label: 'Creator / Influencer' },
  { value: 'agency',   label: 'Agency' },
  { value: 'pr',       label: 'PR Consultant' },
  { value: 'designer', label: 'Independent Designer' },
]

const REACHES = [
  { value: 'nano',  label: 'Nano - under 10K' },
  { value: 'micro', label: 'Micro - 10K to 100K' },
  { value: 'mid',   label: 'Mid-tier - 100K to 500K' },
  { value: 'macro', label: 'Macro - 500K+' },
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
  const [portfolio, setPortfolio]   = useState('')
  const [avatarUrl, setAvatarUrl]   = useState('')
  const [followers, setFollowers]   = useState('')
  const [engagement, setEngagement] = useState('')
  const [location, setLocation]     = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState('')

  async function uploadImage(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setAvatarUrl(json.url)
    } catch {
      setError('Image upload failed - try again.')
    } finally {
      setUploading(false)
    }
  }

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
      body: JSON.stringify({ competition: '', handle, name, specialty, role, reach, platform, portfolioUrl: portfolio, avatarUrl, followers, engagement, location }),
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
                <span className="hint">Optional - shown alongside your handle</span>
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
                <option value="">- Select -</option>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="reach">
                Approximate reach <span style={{ color: '#c00' }}>*</span>
              </label>
              <select id="reach" value={reach} onChange={e => setReach(e.target.value)} required>
                <option value="">- Select -</option>
                {REACHES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="platform">
                Primary platform <span style={{ color: '#c00' }}>*</span>
              </label>
              <select id="platform" value={platform} onChange={e => setPlatform(e.target.value)} required>
                <option value="">- Select -</option>
                {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="followers">
                Followers / reach
                <span className="hint">e.g. 42k followers, 18 active clients, PR reach: 2.4M</span>
              </label>
              <input
                id="followers"
                value={followers}
                onChange={e => setFollowers(e.target.value)}
                placeholder="e.g. 42k followers"
              />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="engagement">
                Engagement / results
                <span className="hint">e.g. 4.8% eng., Avg. reach: 1.2M, 12 trade outlets</span>
              </label>
              <input
                id="engagement"
                value={engagement}
                onChange={e => setEngagement(e.target.value)}
                placeholder="e.g. 4.8% engagement"
              />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="location">
                Location
                <span className="hint">City and country</span>
              </label>
              <input
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Dublin, IE"
              />
            </div>

            <div className="form-section">
              <label className="form-label">
                Content sample image
                <span className="hint">One image that shows your style - a post, campaign shot, or portfolio piece</span>
              </label>
              <div
                className="loop-image-picker"
                onClick={() => fileRef.current?.click()}
                style={{ cursor: 'pointer' }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Sample" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <div className="loop-image-placeholder">
                    <span className="loop-image-plus">{uploading ? '…' : '+'}</span>
                    <span>{uploading ? 'Uploading…' : 'Upload image'}</span>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f) }}
                />
              </div>
              {avatarUrl && (
                <button type="button" className="loop-image-remove" onClick={() => setAvatarUrl('')}>Remove image</button>
              )}
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="portfolio">
                Link to your work
                <span className="hint">Instagram, TikTok, portfolio - anything that shows your style</span>
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
