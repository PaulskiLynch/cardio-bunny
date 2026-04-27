'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ConfirmedEntry {
  entryId: string
}

export default function SwompSubmitPage() {
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
      setError('Please upload your can design.')
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
      <Link className="top-link" href="/swomp">← Back</Link>

      <div className="portal">
        <header className="portal-header" style={{ background: '#0d1a0f' }}>
          <div className="brand" style={{ color: '#d4c5a0' }}>SWOMP WATER+</div>
          <div className="phase" style={{ color: '#a0b89a' }}>Can Design Competition</div>
        </header>

        <div className="status-row">
          <div>Status: 🟢 Entry Open</div>
          <div>Your ID: <span>{confirmed ? confirmed.entryId : 'GENERATING...'}</span></div>
        </div>

        <div className="prompt-box">
          <div className="prompt-title">Design Guidelines</div>
          <p>Create an original artwork for the back panel of a SWOMP WATER+ can. The winning design gets printed on the actual production can.</p>
          <div className="prompt-section-title">Your design should:</div>
          <ol className="prompt-list">
            <li><strong>Fit a can panel:</strong> Design for a tall, narrow vertical format — the back of a 355ml can.</li>
            <li><strong>Match the brand:</strong> SWOMP WATER+ is dark green, botanical, earthy, premium. Keep it on-brand.</li>
            <li><strong>Be original:</strong> Illustration, digital art, photography, AI — all accepted. Must be your own work.</li>
            <li><strong>Be readable:</strong> Any text must be legible at small sizes on a curved surface.</li>
            <li><strong>Be production-ready:</strong> Clean, high-contrast artwork that can be printed on aluminium.</li>
            <li><strong>No watermarks or borders:</strong> Submit the raw artwork — no frames, no text overlays beyond your design.</li>
          </ol>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="competition" value="swomp" />
            <div className="form-section">
              <label className="form-label" htmlFor="setName">1. What do you call this design?</label>
              <input id="setName" name="setName" type="text" placeholder="e.g. Deep Roots, The Marsh, Bog Standard" required />
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="designerName">2. Your name</label>
              <input id="designerName" name="designerName" type="text" placeholder="Your name or artist alias" required />
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
                4. Upload your can design
                <span className="hint">PNG, JPG or AI — high resolution preferred</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Preview" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">DROP YOUR ARTWORK HERE</div>
                    </>}
                <input ref={fileRef} name="image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </div>
              <div className="upload-rule">All entries are reviewed by moderators before going live.</div>
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="hook">5. Tell us about your design</label>
              <textarea id="hook" name="hook" placeholder="What inspired it? What does it say about SWOMP?" required />
            </div>
            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting} style={{ background: '#2d5a30' }}>
                {submitting ? 'SUBMITTING...' : '🌿 SUBMIT YOUR DESIGN'}
              </button>
              <div className="button-note">By submitting you confirm this is your original work and agree to the competition terms.</div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp" style={{ background: '#2d5a30' }}>
                <div className="stamp-title">SUBMITTED!</div>
                <div className="stamp-id">ENTRY ID: {confirmed.entryId}</div>
              </div>
              <div className="live-text">
                Your design has been sent to the SWOMP team. Once approved it goes live for community voting. Share your link to get votes.
              </div>
              <button className="copy-button" disabled>LINK AVAILABLE AFTER APPROVAL</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
