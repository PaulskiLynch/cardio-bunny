'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ConfirmedEntry {
  entryId: string
}

export default function KonkerzSubmitPage() {
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
      setError('Please upload your character design.')
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
      <Link className="top-link" href="/konkerz">← Back</Link>

      <div className="portal">
        <header className="portal-header" style={{ background: '#1a0800' }}>
          <div className="brand" style={{ color: '#ff6b00' }}>KONKERZ</div>
          <div className="phase" style={{ color: '#c8905a' }}>Grumpy Grandpa Character Design</div>
        </header>

        <div className="status-row">
          <div>Status: 🟢 Entry Open</div>
          <div>Your ID: <span>{confirmed ? confirmed.entryId : 'GENERATING...'}</span></div>
        </div>

        <div className="prompt-box">
          <div className="prompt-title">Character Design Guidelines</div>
          <p>Design the hero character for the Grumpy Grandpa Konkerz Battleball. The winning design gets produced as an official Konkerz product sold worldwide.</p>
          <div className="prompt-section-title">Your character must:</div>
          <ol className="prompt-list">
            <li><strong>Be a sphere:</strong> Konkerz Battleballs are round — design a face/character for a ball shape on a rope.</li>
            <li><strong>Be grumpy:</strong> Think angry, weathered, battle-worn grandpa energy. Mean but iconic.</li>
            <li><strong>Have strong facial features:</strong> Bold eyes, expression lines, dramatic brows — it needs to read from a distance.</li>
            <li><strong>Be original:</strong> 3D renders, illustrations, hand-drawn, AI-assisted — all accepted. Must be your own work.</li>
            <li><strong>Show the front face clearly:</strong> Full-on view of the character face. Clean background preferred.</li>
            <li><strong>Be production-ready:</strong> High contrast, clean lines — must work moulded in rubber/plastic.</li>
            <li><strong>No copyrighted characters:</strong> Must be 100% original — no existing IP.</li>
          </ol>
          <div style={{ marginTop: 10, fontSize: 12, color: '#888' }}>
            See existing Konkerz Battleballs for style reference at <a href="https://konkerz.com" target="_blank" rel="noopener noreferrer">konkerz.com</a>
          </div>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="competition" value="konkerz" />
            <div className="form-section">
              <label className="form-label" htmlFor="setName">1. What do you call your character?</label>
              <input id="setName" name="setName" type="text" placeholder="e.g. Grandpa Fury, Old Man Grudge, The Grumbler" required />
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
              <input id="contact" name="contact" type="text" placeholder="email@example.com or +44..." required />
            </div>
            <div className="form-section">
              <div className="form-label">
                4. Upload your character design
                <span className="hint">PNG, JPG or AI — high resolution preferred</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Preview" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">DROP YOUR CHARACTER HERE</div>
                    </>}
                <input ref={fileRef} name="image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </div>
              <div className="upload-rule">All entries reviewed by the Konkerz team before going live.</div>
            </div>
            <div className="form-section">
              <label className="form-label" htmlFor="hook">5. Tell us about your Grumpy Grandpa</label>
              <textarea id="hook" name="hook" placeholder="What's his story? Why is he so grumpy? What makes him the ultimate Battleball?" required />
            </div>
            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting} style={{ background: '#8b3a00' }}>
                {submitting ? 'SUBMITTING...' : '💥 SUBMIT YOUR CHARACTER'}
              </button>
              <div className="button-note">By submitting you confirm this is your original work and agree to the competition terms.</div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp" style={{ background: '#8b3a00' }}>
                <div className="stamp-title">SUBMITTED!</div>
                <div className="stamp-id">ENTRY ID: {confirmed.entryId}</div>
              </div>
              <div className="live-text">
                Your character has been sent to the Konkerz team. Once approved it goes live for community voting. Share your link to rally votes!
              </div>
              <button className="copy-button" disabled>LINK AVAILABLE AFTER APPROVAL</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
