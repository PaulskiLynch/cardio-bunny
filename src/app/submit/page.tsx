'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ConfirmedEntry {
  entryId: string
}

export default function SubmitPage() {
  const [preview, setPreview]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed]   = useState<ConfirmedEntry | null>(null)
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
    const form = e.currentTarget
    const data = new FormData(form)
    if (!data.get('image') || !(data.get('image') as File).size) {
      setError('Please upload a design image.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/entries', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setConfirmed({ entryId: json.entryId })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="top-link" href="/">← Back</Link>

      <div className="portal">
        <header className="portal-header">
          <div className="brand">CARDIO BUNNY ACADEMY</div>
          <div className="phase">Phase 1: Design Open Call</div>
        </header>

        <div className="status-row">
          <div>Status: 🟢 Entry Open</div>
          <div>Your ID: <span>{confirmed ? confirmed.entryId : 'GENERATING...'}</span></div>
        </div>

        <div className="prompt-box">
          <div className="prompt-title">Image Guidelines</div>
          <p>Create a fashion design concept image for a matching women's athletic Top and Legging set for Cardio Bunny.</p>
          <div className="prompt-section-title">The image must clearly show:</div>
          <ol className="prompt-list">
            <li><strong>Full outfit:</strong> A sports top / crop top / bra top with matching full-length leggings.</li>
            <li><strong>Clear front view:</strong> Show the outfit from the front on a standing model or mannequin, head-to-toe.</li>
            <li><strong>Fashion design focus:</strong> Clean, simple background: white, light grey, studio, or minimal runway.</li>
            <li><strong>Realistic activewear style:</strong> Sleek, fitted, sporty. Suitable for gym, yoga, running, or lifestyle wear.</li>
            <li><strong>Strong visual concept:</strong> Unique colours, patterns, prints, panels, mesh, seams, texture, logos, or bold styling.</li>
            <li><strong>No distractions:</strong> No extra clothing, bags, heavy props, messy backgrounds, text, or watermarks.</li>
            <li><strong>Production-friendly:</strong> Should look possible to manufacture and sell as a Cardio Bunny collection.</li>
          </ol>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label className="form-label" htmlFor="setName">
                1. What do you call this set?
              </label>
              <input id="setName" name="setName" type="text" placeholder="e.g. Tropical Vibe" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="designerName">
                2. Your name
              </label>
              <input id="designerName" name="designerName" type="text" placeholder="Your name or alias" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="contact">
                3. Email or WhatsApp
                <span className="hint">So we can reach you if you win</span>
              </label>
              <input id="contact" name="contact" type="text" placeholder="email@example.com or +353..." required />
            </div>

            <div className="form-section">
              <div className="form-label">
                4. Upload your design
                <span className="hint">Must show a top and a legging</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Preview" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">DRAG YOUR PICTURE HERE</div>
                    </>}
                <input
                  ref={fileRef}
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                />
              </div>
              <div className="upload-rule">AI images, sketches, or mirror selfies are all okay.</div>
              <div className="upload-rule"><strong>Note:</strong> All uploaded images are checked by moderators before going live.</div>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="hook">
                5. Why is this cool?
              </label>
              <textarea id="hook" name="hook" placeholder="Tell us in one short sentence..." required />
            </div>

            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting}>
                {submitting ? 'SUBMITTING...' : '🚀 JOIN THE ACADEMY'}
              </button>
              <div className="button-note">By clicking, you're in the running for global showrooms and 20% profits.</div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp">
                <div className="stamp-title">SUBMITTED!</div>
                <div className="stamp-id">ENTRY ID: {confirmed.entryId}</div>
              </div>
              <div className="live-text">
                Your entry has been sent to moderators. Once approved, you'll get your live link to share for votes.
              </div>
              <button className="copy-button" disabled>LINK AVAILABLE AFTER APPROVAL</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
