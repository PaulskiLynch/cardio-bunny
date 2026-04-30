'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const data = new FormData(e.currentTarget)
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="top-link" href="/">← Back</Link>
      <div className="portal" style={{ maxWidth: 560, margin: '0 auto' }}>
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Contact Us</div>
        </header>

        {done ? (
          <div className="form-section" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div className="confirmation">
              <div className="stamp">
                <div className="stamp-title">GOT IT!</div>
              </div>
              <div className="live-text">
                Thanks - we'll be in touch within one business day to set up your demo.
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label className="form-label" htmlFor="name">Your Name</label>
              <input id="name" name="name" type="text" placeholder="Jane Smith" required />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="company">Company / Brand</label>
              <input id="company" name="company" type="text" placeholder="e.g. Tesco, ASOS, Your Brand" required />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="email">Work Email</label>
              <input id="email" name="email" type="email" placeholder="jane@company.com" required />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="phone">
                Phone
                <span className="hint">Optional</span>
              </label>
              <input id="phone" name="phone" type="tel" placeholder="+44..." />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="message">
                What are you looking to solve?
                <span className="hint">Tell us about your market, category, or challenge</span>
              </label>
              <textarea id="message" name="message" placeholder="e.g. We want to test a new activewear line in the UK without committing to production..." required />
            </div>
            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting}>
                {submitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
              <div className="button-note">We typically respond within one business day.</div>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
