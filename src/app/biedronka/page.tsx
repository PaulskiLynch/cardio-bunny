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
      <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ maxHeight: 56, maxWidth: '45%', objectFit: 'contain' }} />
          <img src="/biedronka.png" alt="Biedronka" style={{ maxHeight: 56, maxWidth: '45%', objectFit: 'contain' }} />
        </div>
        <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555' }}>Polska</div>
      </section>

      <section className="hero">
        <div>
          <h1>Twój Projekt. Zrealizowany.</h1>
          <div className="subhead">Bez doświadczenia. Użyj AI, narysuj szkic lub zrób zdjęcie. Jeśli społeczność to pokocha — zrobimy to.</div>
          <div className="hero-actions">
            <Link className="cta" href="/biedronka/submit">🚀 ZACZNIJ PROJEKTOWAĆ / ZAPISZ SIĘ</Link>
          </div>
          <img src="/hero-image.png" alt="" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" label="ZGŁOSZENIA ZAMYKAJĄ SIĘ ZA" />
      </section>

      <section className="section">
        <h2>Co Możesz Wygrać</h2>
        <div className="reward-grid">
          <div className="reward-card">
            <div className="icon">🏆</div>
            <div className="card-title">WYGRAJ</div>
            <div className="card-text">Twoja kolekcja może zostać wybrana, wyprodukowana i sprzedana.</div>
          </div>
          <div className="reward-card">
            <div className="icon">💸</div>
            <div className="card-title">ZARABIAJ</div>
            <div className="card-text">Możesz zarobić procent od zysków ze sprzedanych sztuk.</div>
          </div>
          <div className="reward-card">
            <div className="icon">🚀</div>
            <div className="card-title">SKALUJ</div>
            <div className="card-text">Cardio Bunny pomoże przekształcić zwycięski projekt w produkt dostępny w sklepach.</div>
          </div>
          <div className="reward-card">
            <div className="icon">🌟</div>
            <div className="card-title">UZNANIE</div>
            <div className="card-text">Twoje imię i zgłoszenie będzie widoczne dla społeczności i fanów marki.</div>
          </div>
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
            <div className="card-text">Najlepsze projekty są produkowane i sprzedawane przez Cardio Bunny.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Gotowy zmienić swoje życie?</h2>
        <Link className="cta cta-dark" href="/biedronka/submit">WEJDŹ DO AKADEMII</Link>
        <div className="footer-links">
          <Link href="/designs?competition=biedronka">Wszystkie Projekty</Link>
          <Link href="/help">FAQ i Zasady</Link>
        </div>
      </section>
    </main>
  )
}
