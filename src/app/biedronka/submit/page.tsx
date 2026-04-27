'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ConfirmedEntry {
  entryId: string
}

export default function BiedronkaSubmitPage() {
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
      setError('Proszę przesłać zdjęcie projektu.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/entries', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Zgłoszenie nie powiodło się')
      setConfirmed({ entryId: json.entryId })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Coś poszło nie tak')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="top-link" href="/biedronka">← Wróć</Link>

      <div className="portal">
        <header className="portal-header">
          <div className="brand">Cardio Bunny & Biedronka</div>
          <div className="phase">Faza 1: Otwarty Nabór Projektów</div>
        </header>

        <div className="status-row">
          <div>Status: 🟢 Zgłoszenia Otwarte</div>
          <div>Twój numer: <span>{confirmed ? confirmed.entryId : 'GENEROWANIE...'}</span></div>
        </div>

        <div className="prompt-box">
          <div className="prompt-title">Wytyczne dotyczące zdjęć</div>
          <p>Stwórz zdjęcie koncepcyjne projektu mody przedstawiające kobiecy zestaw sportowy — top i legginsy — dla Cardio Bunny.</p>
          <div className="prompt-section-title">Zdjęcie musi wyraźnie przedstawiać:</div>
          <ol className="prompt-list">
            <li><strong>Pełny strój:</strong> Top sportowy / crop top / biustonosz sportowy z dopasowanymi legginsami pełnej długości.</li>
            <li><strong>Wyraźny widok z przodu:</strong> Pokaż strój od przodu na stojącej modelce lub manekinie, od głowy do stóp.</li>
            <li><strong>Skupienie na projekcie mody:</strong> Czyste, proste tło: białe, jasnoszare, studyjne lub minimalistyczne.</li>
            <li><strong>Realistyczny styl odzieży sportowej:</strong> Elegancki, dopasowany, sportowy. Odpowiedni do siłowni, jogi, biegania lub noszenia na co dzień.</li>
            <li><strong>Silna koncepcja wizualna:</strong> Unikalne kolory, wzory, nadruki, panele, siatka, szwy, tekstura, logo lub odważna stylizacja.</li>
            <li><strong>Bez rozpraszaczy:</strong> Bez dodatkowej odzieży, torebek, ciężkich rekwizytów, chaotycznego tła, tekstu ani znaków wodnych.</li>
            <li><strong>Przyjazny dla produkcji:</strong> Powinien wyglądać jak projekt możliwy do wyprodukowania i sprzedaży jako kolekcja Cardio Bunny.</li>
          </ol>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="competition" value="biedronka" />
            <div className="form-section">
              <label className="form-label" htmlFor="setName">
                1. Jak nazywasz ten zestaw?
              </label>
              <input id="setName" name="setName" type="text" placeholder="np. Tropikalna Energia" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="designerName">
                2. Twoje imię
              </label>
              <input id="designerName" name="designerName" type="text" placeholder="Twoje imię lub pseudonim" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="contact">
                3. Email lub WhatsApp
                <span className="hint">Abyśmy mogli się z Tobą skontaktować, jeśli wygrasz</span>
              </label>
              <input id="contact" name="contact" type="text" placeholder="email@example.com lub +48..." required />
            </div>

            <div className="form-section">
              <div className="form-label">
                4. Prześlij swój projekt
                <span className="hint">Musi przedstawiać top i legginsy</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Podgląd" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">PRZECIĄGNIJ ZDJĘCIE TUTAJ</div>
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
              <div className="upload-rule">Obrazy AI, szkice lub selfie w lustrze są akceptowane.</div>
              <div className="upload-rule"><strong>Uwaga:</strong> Wszystkie przesłane zdjęcia są sprawdzane przez moderatorów przed publikacją.</div>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="hook">
                5. Dlaczego to jest wyjątkowe?
              </label>
              <textarea id="hook" name="hook" placeholder="Powiedz nam w jednym krótkim zdaniu..." required />
            </div>

            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting}>
                {submitting ? 'WYSYŁANIE...' : '🚀 DOŁĄCZ DO AKADEMII'}
              </button>
              <div className="button-note">Klikając, masz szansę na globalne salony i 20% zysków ze sprzedaży.</div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp">
                <div className="stamp-title">WYSŁANO!</div>
                <div className="stamp-id">NUMER ZGŁOSZENIA: {confirmed.entryId}</div>
              </div>
              <div className="live-text">
                Twoje zgłoszenie zostało wysłane do moderatorów. Po zatwierdzeniu otrzymasz link do udostępnienia i zbierania głosów.
              </div>
              <button className="copy-button" disabled>LINK DOSTĘPNY PO ZATWIERDZENIU</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
