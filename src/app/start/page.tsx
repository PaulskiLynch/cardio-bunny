'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Fashion / Apparel', 'Beverages', 'Toys & Games', 'Lifestyle & Home', 'Beauty & Personal Care', 'Sports & Fitness', 'Food & Snacks', 'Other']
const MARKETS = ['United Kingdom', 'Poland', 'Turkey', 'Ireland', 'Germany', 'France', 'United States', 'Other']
const LANGUAGES = ['English', 'Polish', 'Turkish', 'German', 'French', 'Other']
const CAMPAIGN_TYPES = [
  { value: 'demo',  label: 'Demo',         desc: 'See how it works with a live example page — no real entries or prizes.' },
  { value: 'pilot', label: 'Private Pilot', desc: 'Real entries, real votes — invitation only, not publicly listed.' },
  { value: 'live',  label: 'Live Campaign', desc: 'Fully public competition, open to all. We launch when you\'re ready.' },
]

export default function StartPage() {
  const [form, setForm] = useState({
    brandName: '', retailPartner: '', productCategory: '', market: '', language: 'English',
    brief: '', prize: '', campaignType: 'demo', contactName: '', email: '', phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <nav className="site-nav">
        <Link href="/" className="site-nav-brand">CrowdLoops</Link>
        <div className="site-nav-links">
          <Link href="/#case-studies" className="site-nav-link">Live Loops</Link>
          <Link href="/" className="site-nav-link">For Retailers</Link>
          <Link href="/start" className="site-nav-link active">Start</Link>
        </div>
      </nav>

      <section className="start-hero">
        <div className="b2b-eyebrow">Start a Competition</div>
        <h1 className="start-headline">Launch a branded product challenge. Let your customers help decide what gets made.</h1>
        <p className="start-sub">CrowdLoops helps brands and retailers collect designs, votes, feedback, price signals, and notify-me intent — before production starts. Tell us about your brand and we&apos;ll turn it into a Loop.</p>
      </section>

      {done ? (
        <div className="start-success">
          <div className="start-success-icon">✓</div>
          <h2>Thanks — we&apos;ll help turn this into a Loop.</h2>
          <div className="start-next-steps">
            <div className="start-step"><span className="start-step-num">1</span><span>We review your brief and respond within one business day.</span></div>
            <div className="start-step"><span className="start-step-num">2</span><span>We configure your branded page — hero, prizes, questions, rules.</span></div>
            <div className="start-step"><span className="start-step-num">3</span><span>You approve the layout, rules, and launch date.</span></div>
            <div className="start-step"><span className="start-step-num">4</span><span>Your Loop goes live.</span></div>
          </div>
          <Link href="/" className="cta cta-dark" style={{ marginTop: 28, display: 'inline-block' }}>← Back to home</Link>
        </div>
      ) : (
        <form className="start-form" onSubmit={handleSubmit}>

          <div className="start-form-section">
            <div className="start-form-heading">About Your Brand</div>

            <div className="start-field">
              <label className="start-label" htmlFor="brandName">Brand name *</label>
              <input id="brandName" value={form.brandName} onChange={e => set('brandName', e.target.value)} placeholder="e.g. Cardio Bunny" required />
            </div>

            <div className="start-field">
              <label className="start-label" htmlFor="retailPartner">Retail partner, if any <span className="start-hint">Leave blank until signed</span></label>
              <input id="retailPartner" value={form.retailPartner} onChange={e => set('retailPartner', e.target.value)} placeholder="e.g. Biedronka, TESCO, none yet" />
            </div>

            <div className="start-field-row">
              <div className="start-field">
                <label className="start-label" htmlFor="productCategory">Product category</label>
                <select id="productCategory" value={form.productCategory} onChange={e => set('productCategory', e.target.value)}>
                  <option value="">— Select —</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="start-field">
                <label className="start-label" htmlFor="market">Market / country</label>
                <select id="market" value={form.market} onChange={e => set('market', e.target.value)}>
                  <option value="">— Select —</option>
                  {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="start-field">
              <label className="start-label" htmlFor="language">Primary language</label>
              <select id="language" value={form.language} onChange={e => set('language', e.target.value)}>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="start-form-section">
            <div className="start-form-heading">The Challenge</div>

            <div className="start-field">
              <label className="start-label" htmlFor="brief">What do you want people to design? *</label>
              <textarea
                id="brief"
                value={form.brief}
                onChange={e => set('brief', e.target.value)}
                rows={4}
                placeholder="e.g. A matching women's activewear set — top and leggings. Colourful, bold, gym-ready. Suitable for a 16–35 female audience."
                required
              />
            </div>

            <div className="start-field">
              <label className="start-label" htmlFor="prize">Prize or reward idea <span className="start-hint">Optional — we can help design this</span></label>
              <input id="prize" value={form.prize} onChange={e => set('prize', e.target.value)} placeholder="e.g. Cash prize + design goes into production, or just brand recognition" />
            </div>
          </div>

          <div className="start-form-section">
            <div className="start-form-heading">Type of Launch</div>
            <div className="start-radio-group">
              {CAMPAIGN_TYPES.map(t => (
                <label key={t.value} className={`start-radio-card${form.campaignType === t.value ? ' selected' : ''}`}>
                  <input type="radio" name="campaignType" value={t.value} checked={form.campaignType === t.value} onChange={() => set('campaignType', t.value)} />
                  <div>
                    <div className="start-radio-label">{t.label}</div>
                    <div className="start-radio-desc">{t.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="start-form-section">
            <div className="start-form-heading">Your Contact Details</div>

            <div className="start-field-row">
              <div className="start-field">
                <label className="start-label" htmlFor="contactName">Your name *</label>
                <input id="contactName" value={form.contactName} onChange={e => set('contactName', e.target.value)} placeholder="First and last name" required />
              </div>
              <div className="start-field">
                <label className="start-label" htmlFor="email">Email *</label>
                <input id="email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@brand.com" required />
              </div>
            </div>

            <div className="start-field">
              <label className="start-label" htmlFor="phone">Phone / WhatsApp <span className="start-hint">Optional</span></label>
              <input id="phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 000000" />
            </div>
          </div>

          {error && (
            <div style={{ color: '#c00', fontWeight: 700, padding: '10px 14px', background: '#fff0f0', borderRadius: 8, marginBottom: 8 }}>
              {error}
            </div>
          )}

          <button className="submit-button" type="submit" disabled={submitting} style={{ fontSize: 15, letterSpacing: '0.06em' }}>
            {submitting ? 'SENDING...' : 'START MY LOOP →'}
          </button>

          <div style={{ fontSize: 12, color: '#aaa', marginTop: 12, lineHeight: 1.6 }}>
            No commitment. We review every inquiry before any Loop goes live. Your details will only be used to configure your Loop.
          </div>
        </form>
      )}
    </main>
  )
}
