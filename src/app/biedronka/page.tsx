import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function BiedronkaPage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'biedronka' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page">
      <div className="demo-notice">⚠️ DEMO — To nie jest aktywny konkurs. Ta strona pokazuje przykładowy format wydarzenia CrowdLoops. Zgłoszenia, głosy, nagrody i produkcja są pokazane wyłącznie demonstracyjnie.</div>

      <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '20px 24px' }}>
        <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ maxHeight: 56, maxWidth: '60%', objectFit: 'contain' }} />
        <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555' }}>Polska</div>
      </section>

      <section className="hero">
        <div>
          <h1>Twój Projekt. Zrealizowany.</h1>
          <div className="subhead">Bez doświadczenia. Użyj AI, narysuj szkic lub zrób zdjęcie. Jeśli społeczność to pokocha — zrobimy to.</div>
          <div className="hero-actions">
            <Link className="cta" href="/biedronka/submit">🚀 ZOBACZ DEMO / ZAPISZ SIĘ NA POWIADOMIENIA</Link>
          </div>
          <img src="/hero-image.png" alt="" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" label="ZGŁOSZENIA ZAMYKAJĄ SIĘ ZA" />
      </section>

      <section className="section">
        <h2>Przykładowe nagrody</h2>
        <div className="prize-section">
          <div className="prize-top10">
            <div className="prize-top10-badge">TOP 10</div>
            <div className="prize-top10-text">Przykład — top 10 projektów może zostać wyróżnionych przez markę i partnerów detalicznych.</div>
          </div>
          <div className="prize-grand">
            <div className="prize-grand-header">🏆 Zwycięzca Główny</div>
            <div className="prize-cash">10 000 PLN</div>
            <div className="prize-items">
              <div className="prize-item">
                <div className="prize-item-icon">🛍</div>
                <div className="prize-item-text"><strong>Sprzedaż Ogólnopolska:</strong> Przykład — zwycięski projekt może zostać wyprodukowany i sprzedawany w sklepach partnera detalicznego.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">🌍</div>
                <div className="prize-item-text"><strong>Światowa Ekspozycja:</strong> Przykład — imię autora i projekt mogą zostać zaprezentowane w kanałach marki.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📰</div>
                <div className="prize-item-text"><strong>Prasa:</strong> Przykład — profil zwycięzcy może zostać przedstawiony w mediach branżowych.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📸</div>
                <div className="prize-item-text"><strong>Produkcja:</strong> Przykład — zwycięski projekt może otrzymać profesjonalną sesję zdjęciową.</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#555', lineHeight: 1.6 }}>
          Zwycięzca jest wyłaniany na podstawie głosów publiczności, weryfikacji kwalifikowalności, oceny marki i zgodności z regulaminem. Zwycięski projekt może zostać rozwinięty pod kątem produkcji po przeglądzie technicznym, prawnym, bezpieczeństwa i handlowym.
        </div>
      </section>

      <section className="section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Ulubione Społeczności</h2>
          <div className="card-text">Głosuj na projekty, które chcesz zobaczyć w sprzedaży.</div>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 700 }}>
              Brak zatwierdzonych zgłoszeń. Bądź pierwszy!
            </div>
          )}
          {top4.map(entry => (
            <VoteCard
              key={entry.id}
              entryId={entry.entryId}
              setName={entry.setName}
              designerName={entry.designerName}
              imageUrl={entry.imageUrl}
              initialVotes={entry.voteCount}
              competition="biedronka"
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/designs?competition=biedronka" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>Zobacz wszystkie</Link>
        </div>
      </section>

      <section className="section">
        <h2>Twórz. Dziel się. Wygrywaj.</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="card-title">PRZEŚLIJ</div>
            <div className="card-text">Prześlij swój pomysł na Top i Legginsy. AI, szkic lub zdjęcie — wszystko akceptowane.</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="card-title">UDOSTĘPNIJ</div>
            <div className="card-text">Otrzymaj oficjalny numer i udostępnij link, aby zbierać głosy.</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="card-title">IDŹ GLOBALNIE</div>
            <div className="card-text">W prawdziwym konkursie — najlepsze projekty mogą zostać wyprodukowane i sprzedane przez Cardio Bunny.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Chcesz zobaczyć, jak działa taki konkurs?</h2>
        <Link className="cta cta-dark" href="/biedronka/submit">PRZEŚLIJ PRZYKŁADOWY PROJEKT</Link>
        <div className="footer-links">
          <Link href="/designs?competition=biedronka">Wszystkie Projekty</Link>
          <Link href="/legal">Regulamin i Prywatność</Link>
        </div>
      </section>
    </main>
  )
}
