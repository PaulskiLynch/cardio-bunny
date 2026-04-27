import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function SwompPage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'swomp' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page" style={{ background: '#0d1a0f' }}>
      <div className="demo-notice">⚠️ Demo Only — This is not a live competition.</div>

      <section className="section swomp-logo-section">
        <img src="/swomp-logo.png" alt="SWOMP WATER+" style={{ maxHeight: 80, maxWidth: '70%', objectFit: 'contain', filter: 'brightness(1)' }} />
      </section>

      <section className="hero swomp-hero">
        <div style={{ width: '100%' }}>
          <div className="swomp-eyebrow">Water + Electrolytes</div>
          <h1 style={{ color: '#d4c5a0' }}>Design the Back of the Can.</h1>
          <div className="subhead" style={{ color: '#a0b89a' }}>Create an original artwork for the back panel of a SWOMP WATER+ can. The community votes. The winner gets printed.</div>
          <div className="hero-actions">
            <Link className="cta swomp-cta" href="/swomp/submit">🌿 SUBMIT YOUR DESIGN</Link>
          </div>
          <img src="/swomp-hero.png" alt="SWOMP WATER+" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" label="SUBMISSIONS CLOSE IN" />
      </section>

      <section className="section swomp-section">
        <h2 style={{ color: '#d4c5a0' }}>Prizes</h2>
        <div className="prize-section">
          <div className="prize-top10" style={{ background: '#1a2e1c', border: '1px solid #2d4a2f' }}>
            <div className="prize-top10-badge" style={{ background: '#3a6b3d' }}>TOP 10</div>
            <div className="prize-top10-text" style={{ color: '#a0b89a' }}>Your design featured in the SWOMP WATER+ community gallery and shared across our channels.</div>
          </div>
          <div className="prize-grand" style={{ background: '#1a2e1c', border: '2px solid #3a6b3d' }}>
            <div className="prize-grand-header">🏆 Grand Winner</div>
            <div className="prize-cash">€1,000</div>
            <div className="prize-items">
              <div className="prize-item">
                <div className="prize-item-icon">🥫</div>
                <div className="prize-item-text"><strong>On the Can:</strong> Your artwork printed on the back panel of the SWOMP WATER+ production can — in stores.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">🌍</div>
                <div className="prize-item-text"><strong>Global Credit:</strong> Your name on every can that carries your design.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📸</div>
                <div className="prize-item-text"><strong>Feature:</strong> Full profile feature across SWOMP WATER+ social and press channels.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section swomp-section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0, color: '#d4c5a0' }}>Community Favourites</h2>
          <div className="card-text" style={{ color: '#a0b89a' }}>Vote for the design you want to see on the can.</div>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#5a7a5c', fontWeight: 700 }}>
              No approved entries yet. Be the first to submit!
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
          <Link href="/designs?competition=swomp" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline', color: '#d4c5a0' }}>See all</Link>
        </div>
      </section>

      <section className="section swomp-section">
        <h2 style={{ color: '#d4c5a0' }}>Create. Vote. Get Printed.</h2>
        <div className="steps">
          <div className="step-card swomp-step">
            <div className="step-number" style={{ background: '#3a6b3d', color: '#d4c5a0' }}>1</div>
            <div className="card-title" style={{ color: '#d4c5a0' }}>DESIGN</div>
            <div className="card-text" style={{ color: '#a0b89a' }}>Create your can artwork. AI, illustration, photography — anything goes.</div>
          </div>
          <div className="step-card swomp-step">
            <div className="step-number" style={{ background: '#3a6b3d', color: '#d4c5a0' }}>2</div>
            <div className="card-title" style={{ color: '#d4c5a0' }}>SHARE</div>
            <div className="card-text" style={{ color: '#a0b89a' }}>Get your entry ID and share your link for community votes.</div>
          </div>
          <div className="step-card swomp-step">
            <div className="step-number" style={{ background: '#3a6b3d', color: '#d4c5a0' }}>3</div>
            <div className="card-title" style={{ color: '#d4c5a0' }}>GET PRINTED</div>
            <div className="card-text" style={{ color: '#a0b89a' }}>Top design goes on the actual can. Your art. In stores. Forever.</div>
          </div>
        </div>
      </section>

      <section className="section swomp-section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2 style={{ color: '#d4c5a0' }}>Drink The SWOMP.</h2>
        <Link className="cta swomp-cta" href="/swomp/submit">SUBMIT YOUR DESIGN</Link>
        <div className="footer-links">
          <Link href="/designs?competition=swomp" style={{ color: '#a0b89a' }}>All Designs</Link>
          <Link href="/help" style={{ color: '#a0b89a' }}>FAQs & Rules</Link>
        </div>
      </section>
    </main>
  )
}
