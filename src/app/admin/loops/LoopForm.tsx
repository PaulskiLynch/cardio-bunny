'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface PrizeItem {
  _id: string
  style: 'top' | 'grand' | 'special'
  badge: string
  cash: string
  description: string
}

interface FormQuestion {
  _id: string
  text: string
  type: 'yes_no' | 'choice' | 'text'
  optionsRaw: string
  required: boolean
}

export interface LoopInitial {
  id?: string
  inquiryId?: string
  slug: string
  status: string
  brandName: string
  retailPartner: string
  market: string
  heroTitle: string
  heroSubhead: string
  ctaText: string
  deadline: string
  accentColor: string
  logoUrl: string
  heroImageUrl: string
  brief: string
  guidelines: string
  prizes: string
  questions: string
  autoApprove: boolean
  moderatorEmails: string
}

function uid() { return Math.random().toString(36).slice(2, 8) }

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const COLOR_PRESETS = ['#e8325a', '#ff6b00', '#2d5a30', '#1a2340', '#6b3fa0', '#111111']

export default function LoopForm({ initial }: { initial?: LoopInitial }) {
  const router = useRouter()
  const isEdit = !!initial?.id

  const [slug, setSlug]               = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [status, setStatus]           = useState(initial?.status ?? 'demo')
  const [brandName, setBrandName]     = useState(initial?.brandName ?? '')
  const [retailPartner, setRetailPartner] = useState(initial?.retailPartner ?? '')
  const [market, setMarket]           = useState(initial?.market ?? 'en')
  const [heroTitle, setHeroTitle]     = useState(initial?.heroTitle ?? '')
  const [heroSubhead, setHeroSubhead] = useState(initial?.heroSubhead ?? '')
  const [ctaText, setCtaText]         = useState(initial?.ctaText ?? 'Submit Your Design')
  const [deadline, setDeadline]       = useState(initial?.deadline ?? '')
  const [accentColor, setAccentColor] = useState(initial?.accentColor ?? '#e8325a')
  const [logoUrl, setLogoUrl]         = useState(initial?.logoUrl ?? '')
  const [heroImageUrl, setHeroImageUrl] = useState(initial?.heroImageUrl ?? '')
  const [brief, setBrief]             = useState(initial?.brief ?? '')
  const [autoApprove, setAutoApprove] = useState(initial?.autoApprove ?? false)
  const [moderatorEmailsRaw, setModeratorEmailsRaw] = useState(() => {
    try { return (JSON.parse(initial?.moderatorEmails ?? '[]') as string[]).join('\n') } catch { return '' }
  })

  const logoRef     = useRef<HTMLInputElement>(null)
  const heroRef     = useRef<HTMLInputElement>(null)
  const [uploadingLogo, setUploadingLogo]   = useState(false)
  const [uploadingHero, setUploadingHero]   = useState(false)

  async function uploadImage(file: File, setter: (url: string) => void, setBusy: (b: boolean) => void) {
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setter(json.url)
    } catch {
      setError('Image upload failed')
    } finally {
      setBusy(false)
    }
  }

  const [guidelines, setGuidelines] = useState<string[]>(() => {
    try { return JSON.parse(initial?.guidelines ?? '[]') } catch { return [''] }
  })

  const [prizes, setPrizes] = useState<PrizeItem[]>(() => {
    try {
      return (JSON.parse(initial?.prizes ?? '[]') as Omit<PrizeItem, '_id'>[])
        .map(p => ({ ...p, _id: uid() }))
    } catch { return [] }
  })

  const [questions, setQuestions] = useState<FormQuestion[]>(() => {
    try {
      return (JSON.parse(initial?.questions ?? '[]') as Record<string, unknown>[]).map(q => ({
        _id: uid(),
        text: String(q.text ?? ''),
        type: (q.type as FormQuestion['type']) ?? 'yes_no',
        optionsRaw: Array.isArray(q.options) ? (q.options as string[]).join(', ') : '',
        required: Boolean(q.required ?? true),
      }))
    } catch { return [] }
  })

  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  useEffect(() => {
    if (!slugTouched && brandName) setSlug(slugify(brandName))
  }, [brandName, slugTouched])

  // Guideline helpers
  function addGuideline() { setGuidelines(g => [...g, '']) }
  function setGuideline(i: number, v: string) { setGuidelines(g => g.map((x, j) => j === i ? v : x)) }
  function removeGuideline(i: number) { setGuidelines(g => g.filter((_, j) => j !== i)) }

  // Prize helpers
  function addPrize() {
    setPrizes(p => [...p, { _id: uid(), style: 'grand', badge: '🏆 Grand Winner', cash: '', description: '' }])
  }
  function updatePrize(id: string, field: string, v: string) {
    setPrizes(p => p.map(x => x._id === id ? { ...x, [field]: v } : x))
  }
  function removePrize(id: string) { setPrizes(p => p.filter(x => x._id !== id)) }

  // Question helpers
  function addQuestion() {
    setQuestions(q => [...q, { _id: uid(), text: '', type: 'yes_no', optionsRaw: '', required: true }])
  }
  function updateQuestion(id: string, field: string, v: string | boolean) {
    setQuestions(q => q.map(x => x._id === id ? { ...x, [field]: v } : x))
  }
  function removeQuestion(id: string) { setQuestions(q => q.filter(x => x._id !== id)) }

  async function handleSave() {
    setError('')
    if (!brandName.trim()) { setError('Brand name is required'); return }
    if (!slug.trim())       { setError('Slug is required'); return }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      setError('Slug must be lowercase letters, numbers, and hyphens only (no trailing hyphens)')
      return
    }
    if (!heroTitle.trim())  { setError('Headline is required'); return }

    setSaving(true)
    const payload = {
      slug,
      status,
      brandName,
      retailPartner,
      market,
      heroTitle,
      heroSubhead,
      ctaText,
      deadline,
      accentColor,
      logoUrl,
      heroImageUrl,
      brief,
      autoApprove,
      moderatorEmails: JSON.stringify(
        moderatorEmailsRaw.split(/[\n,]+/).map(e => e.trim().toLowerCase()).filter(Boolean)
      ),
      ...(initial?.inquiryId ? { inquiryId: initial.inquiryId } : {}),
      guidelines: JSON.stringify(guidelines.filter(g => g.trim())),
      prizes: JSON.stringify(prizes.map(({ _id, ...p }) => p)),
      questions: JSON.stringify(
        questions.map(({ _id, optionsRaw, ...q }) => ({
          id: slugify(q.text) || uid(),
          text: q.text,
          type: q.type,
          ...(q.type === 'choice' ? { options: optionsRaw.split(',').map(s => s.trim()).filter(Boolean) } : {}),
          required: q.required,
        }))
      ),
    }

    try {
      const url    = isEdit ? `/api/loops/${initial!.id}` : '/api/loops'
      const method = isEdit ? 'PATCH' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Save failed')
      router.push('/admin/loops')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="loop-form">

      {/* ── IDENTITY ─────────────────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Identity</div>
        <div className="loop-field">
          <label>Brand Name *</label>
          <input value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g. Cardio Bunny UK" />
        </div>
        <div className="loop-field">
          <label>
            URL Slug *
            <span className="loop-hint">crowdloops.com/loops/<strong>{slug || '…'}</strong></span>
          </label>
          <input
            value={slug}
            onChange={e => { setSlug(e.target.value); setSlugTouched(true) }}
            placeholder="e.g. cardio-bunny-uk"
          />
        </div>
        <div className="loop-field-row">
          <div className="loop-field">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="demo">Demo</option>
              <option value="live">Live</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="loop-field">
            <label>Market</label>
            <select value={market} onChange={e => setMarket(e.target.value)}>
              <option value="en">English (UK)</option>
              <option value="en-us">English (US)</option>
              <option value="pl">Polish</option>
              <option value="tr">Turkish</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="loop-field">
          <label>Retail Partner <span className="loop-hint">Leave blank until signed</span></label>
          <input value={retailPartner} onChange={e => setRetailPartner(e.target.value)} placeholder="e.g. Biedronka" />
        </div>
      </div>

      {/* ── HERO COPY ────────────────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Hero Copy</div>
        <div className="loop-field">
          <label>Headline *</label>
          <input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} placeholder="e.g. Your Design. Made Real." />
        </div>
        <div className="loop-field">
          <label>Subheadline</label>
          <textarea value={heroSubhead} onChange={e => setHeroSubhead(e.target.value)} rows={2} placeholder="One or two sentences explaining the competition…" />
        </div>
        <div className="loop-field-row">
          <div className="loop-field">
            <label>CTA Button Text</label>
            <input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Submit Your Design" />
          </div>
          <div className="loop-field">
            <label>Deadline</label>
            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ── BRIEF & GUIDELINES ──────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Brief &amp; Guidelines</div>
        <div className="loop-field">
          <label>Design Brief <span className="loop-hint">Shown at the top of the submit form</span></label>
          <textarea value={brief} onChange={e => setBrief(e.target.value)} rows={3} placeholder="Describe what entrants should create…" />
        </div>
        <div className="loop-field">
          <label>Submission Requirements <span className="loop-hint">Each becomes a numbered rule</span></label>
          {guidelines.map((g, i) => (
            <div key={i} className="loop-item-row" style={{ marginBottom: 6 }}>
              <input value={g} onChange={e => setGuideline(i, e.target.value)} placeholder={`Requirement ${i + 1}`} />
              <button className="loop-remove-btn" type="button" onClick={() => removeGuideline(i)}>✕</button>
            </div>
          ))}
          <button className="loop-add-btn" type="button" onClick={addGuideline}>+ Add Requirement</button>
        </div>
      </div>

      {/* ── PRIZES ───────────────────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Prizes</div>
        {prizes.map(p => (
          <div key={p._id} className="loop-item">
            <div className="loop-item-row">
              <select
                value={p.style}
                onChange={e => updatePrize(p._id, 'style', e.target.value)}
                style={{ width: 90, flexShrink: 0 }}
              >
                <option value="top">Top N</option>
                <option value="grand">Grand</option>
                <option value="special">Special</option>
              </select>
              <input
                value={p.badge}
                onChange={e => updatePrize(p._id, 'badge', e.target.value)}
                placeholder="Badge (e.g. TOP 10 or 🏆 Grand Winner)"
                style={{ flex: 1 }}
              />
              <input
                value={p.cash}
                onChange={e => updatePrize(p._id, 'cash', e.target.value)}
                placeholder="Cash (e.g. £2,000)"
                style={{ width: 110, flexShrink: 0 }}
              />
              <button className="loop-remove-btn" type="button" onClick={() => removePrize(p._id)}>✕</button>
            </div>
            <textarea
              value={p.description}
              onChange={e => updatePrize(p._id, 'description', e.target.value)}
              placeholder="Describe what the winner receives…"
              rows={2}
              style={{ marginTop: 6, width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        ))}
        <button className="loop-add-btn" type="button" onClick={addPrize}>+ Add Prize Tier</button>
      </div>

      {/* ── FEEDBACK QUESTIONS ───────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Feedback Questions</div>
        <p className="loop-hint" style={{ marginBottom: 12 }}>
          Voters answer these after they vote. Answers feed the Loop Intelligence dashboard.
        </p>
        {questions.map((q, i) => (
          <div key={q._id} className="loop-item">
            <div className="loop-item-row">
              <span className="loop-q-num">Q{i + 1}</span>
              <input
                value={q.text}
                onChange={e => updateQuestion(q._id, 'text', e.target.value)}
                placeholder="Question text…"
                style={{ flex: 1 }}
              />
              <select
                value={q.type}
                onChange={e => updateQuestion(q._id, 'type', e.target.value)}
                style={{ width: 100, flexShrink: 0 }}
              >
                <option value="yes_no">Yes / No</option>
                <option value="choice">Choice</option>
                <option value="text">Free text</option>
              </select>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, flexShrink: 0 }}>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={e => updateQuestion(q._id, 'required', e.target.checked)}
                />
                Req
              </label>
              <button className="loop-remove-btn" type="button" onClick={() => removeQuestion(q._id)}>✕</button>
            </div>
            {q.type === 'choice' && (
              <input
                value={q.optionsRaw}
                onChange={e => updateQuestion(q._id, 'optionsRaw', e.target.value)}
                placeholder="Options comma-separated: Under £20, £20–£40, £40–£60, £60+"
                style={{ marginTop: 6, width: '100%', boxSizing: 'border-box' }}
              />
            )}
          </div>
        ))}
        <button className="loop-add-btn" type="button" onClick={addQuestion}>+ Add Question</button>
      </div>

      {/* ── APPEARANCE & SETTINGS ────────────────────── */}
      <div className="loop-section">
        <div className="loop-section-title">Appearance &amp; Settings</div>

        {/* Logo */}
        <div className="loop-field">
          <label>Brand Logo <span className="loop-hint">Shown at the top of the competition page</span></label>
          <div className="loop-image-picker" onClick={() => logoRef.current?.click()}>
            {logoUrl
              ? <img src={logoUrl} alt="Logo" className="loop-image-preview" />
              : <div className="loop-image-placeholder">
                  <span className="loop-image-plus">{uploadingLogo ? '…' : '+'}</span>
                  <span>Upload logo</span>
                </div>
            }
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0]
                if (f) uploadImage(f, setLogoUrl, setUploadingLogo)
              }}
            />
          </div>
          {logoUrl && (
            <button type="button" className="loop-image-remove" onClick={() => setLogoUrl('')}>Remove logo</button>
          )}
        </div>

        {/* Hero image */}
        <div className="loop-field">
          <label>Hero Image <span className="loop-hint">Banner shown inside the hero section</span></label>
          <div className="loop-image-picker loop-image-picker-wide" onClick={() => heroRef.current?.click()}>
            {heroImageUrl
              ? <img src={heroImageUrl} alt="Hero" className="loop-image-preview loop-image-preview-wide" />
              : <div className="loop-image-placeholder">
                  <span className="loop-image-plus">{uploadingHero ? '…' : '+'}</span>
                  <span>Upload hero image</span>
                </div>
            }
            <input
              ref={heroRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0]
                if (f) uploadImage(f, setHeroImageUrl, setUploadingHero)
              }}
            />
          </div>
          {heroImageUrl && (
            <button type="button" className="loop-image-remove" onClick={() => setHeroImageUrl('')}>Remove image</button>
          )}
        </div>

        <div className="loop-field">
          <label>Accent Colour</label>
          <div className="loop-color-row">
            {COLOR_PRESETS.map(c => (
              <button
                key={c}
                type="button"
                className={`loop-color-chip${accentColor === c ? ' active' : ''}`}
                style={{ background: c }}
                onClick={() => setAccentColor(c)}
                title={c}
              />
            ))}
            <input
              type="text"
              value={accentColor}
              onChange={e => setAccentColor(e.target.value)}
              placeholder="#e8325a"
              style={{ width: 90 }}
            />
          </div>
        </div>
        <div className="loop-field">
          <label>
            <input
              type="checkbox"
              checked={autoApprove}
              onChange={e => setAutoApprove(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Auto-approve submissions (skip moderation queue)
          </label>
        </div>
        <div className="loop-field">
          <label>
            Studio Moderators
            <span className="loop-hint">One email per line — they get read-only studio access for this loop</span>
          </label>
          <textarea
            value={moderatorEmailsRaw}
            onChange={e => setModeratorEmailsRaw(e.target.value)}
            rows={4}
            placeholder={'buyer@brand.com\nmarketing@partner.com'}
          />
        </div>
      </div>

      {error && (
        <div style={{ color: '#c00', fontWeight: 700, marginBottom: 16, padding: '10px 14px', background: '#fff0f0', borderRadius: 8 }}>
          {error}
        </div>
      )}

      <button className="submit-button" type="button" onClick={handleSave} disabled={saving}>
        {saving ? 'SAVING…' : isEdit ? 'SAVE CHANGES' : 'CREATE LOOP'}
      </button>
    </div>
  )
}
