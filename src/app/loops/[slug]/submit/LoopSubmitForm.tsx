'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface Props {
  slug: string
  brandName: string
  logoUrl: string
  brief: string
  guidelines: string[]
  ctaText: string
  accentColor: string
  status: string
}

export default function LoopSubmitForm({ slug, brandName, logoUrl, brief, guidelines, ctaText, accentColor, status }: Props) {
  const [preview, setPreview]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed]   = useState<string | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)
    if (!data.get('image') || !(data.get('image') as File).size) {
      setError('Please upload a design image.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/entries', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setConfirmed(json.entryId)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="top-link" href={`/loops/${slug}`}>← Back</Link>

      <div className="portal">
        <header className="portal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {logoUrl && (
              <img src={logoUrl} alt={brandName} style={{ height: 64, maxWidth: 180, objectFit: 'contain' }} />
            )}
            <div className="brand">{brandName}</div>
          </div>
          <div className="phase">Design Open Call</div>
        </header>

        {status === 'demo' && (
          <div style={{ background: '#fff8e1', border: '1px solid #f5c542', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7a5c00', marginBottom: 16, lineHeight: 1.5 }}>
            ⚠️ Demo - This is not a live competition. Submissions are for demonstration purposes only.
          </div>
        )}

        <div className="status-row">
          <div>Status: 🟢 {status === 'demo' ? 'Demo Open' : 'Entry Open'}</div>
          <div>Your ID: <span>{confirmed ?? 'GENERATING...'}</span></div>
        </div>

        {(brief || guidelines.length > 0) && (
          <div className="prompt-box">
            {brief && (
              <>
                <div className="prompt-title">Design Brief</div>
                <p>{brief}</p>
              </>
            )}
            {guidelines.length > 0 && (
              <>
                <div className="prompt-section-title">Submission Requirements</div>
                <ol className="prompt-list">
                  {guidelines.map((g, i) => <li key={i}>{g}</li>)}
                </ol>
              </>
            )}
          </div>
        )}

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="competition" value={slug} />

            <div className="form-section">
              <label className="form-label" htmlFor="setName">1. What do you call this design?</label>
              <input id="setName" name="setName" type="text" placeholder="e.g. Tropical Vibe" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="designerName">2. Your name</label>
              <input id="designerName" name="designerName" type="text" placeholder="Your name or alias" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="contact">
                3. Email or WhatsApp
                <span className="hint">So we can reach you if you win</span>
              </label>
              <input id="contact" name="contact" type="text" placeholder="email@example.com or phone..." required />
            </div>

            <div className="form-section">
              <div className="form-label">
                4. Upload your design
                <span className="hint">Image file, max 20MB</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Preview" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">DRAG YOUR PICTURE HERE</div>
                    </>
                }
                <input
                  ref={fileRef}
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                />
              </div>
              <div className="upload-rule">AI images, sketches, or photos are all welcome. You must hold all rights to any content you submit.</div>
              <div className="upload-rule"><strong>Note:</strong> All uploads are reviewed by moderators before going live.</div>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="hook">5. Why is this cool?</label>
              <textarea id="hook" name="hook" placeholder="Tell us in one short sentence…" required />
            </div>

            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button
                className="submit-button"
                type="submit"
                disabled={submitting}
                style={{ background: accentColor, borderColor: accentColor }}
              >
                {submitting ? 'SUBMITTING...' : `🚀 ${ctaText || 'SUBMIT YOUR DESIGN'}`}
              </button>
              <div className="button-note">
                By submitting, you confirm this is your own work and that you hold all necessary rights to it (including any AI-generated content). You grant a licence to display, promote, and - for selected entries - develop your design for production, subject to the official rules and technical, legal, and commercial review. You agree to the <a href="/legal" style={{ color: 'inherit' }}>competition terms and privacy policy</a>.
              </div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp">
                <div className="stamp-title">SUBMITTED!</div>
                <div className="stamp-id">ENTRY ID: {confirmed}</div>
              </div>
              <div className="live-text">
                Your entry is in the moderation queue. We&apos;ll review it shortly.
              </div>
              <a
                className="copy-button"
                href={`/my-entry?id=${confirmed}`}
                style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}
              >
                TRACK YOUR ENTRY →
              </a>
              <div style={{ marginTop: 12, fontSize: 12, color: '#aaa' }}>
                Bookmark that page to check your status and vote count.
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
