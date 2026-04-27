import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function KonkerzPage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'konkerz' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page" style={{ background: '#1a0800' }}>
      <div className="demo-notice">⚠️ Demo Only — This is not a live competition.</div>

      <section className="section" style={{ background: '#1a0800', display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <img src="/konkerz-logo.png" alt="Konkerz" style={{ maxHeight: 100, maxWidth: '80%', objectFit: 'contain' }} />
      </section>

      <section className="hero" style={{ background: '#1a0800' }}>
        <div style={{ width: '100%' }}>
          <div className="konkerz-eyebrow">Grumpy Grandpa Battleballs</div>
          <h1 style={{ color: '#ff6b00', textShadow: '0 0 30px rgba(255,107,0,0.4)' }}>Design the Legend.</h1>
          <div className="subhead" style={{ color: '#c8905a' }}>The Grumpy Grandpa is coming to Konkerz Battleballs. We want YOUR vision of the grumpiest, meanest, most battle-hardened old-timer ever swung on a rope. Best design wins.</div>
          <div className="hero-actions">
            <Link className="cta konkerz-cta" href="/konkerz/submit">💥 SUBMIT YOUR CHARACTER</Link>
          </div>
          <img src="/konkerz-hero.png" alt="Konkerz Battleballs" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" label="SUBMISSIONS CLOSE IN" />
      </section>

      <section className="section" style={{ background: '#1a0800' }}>
        <h2 style={{ color: '#ff6b00' }}>Prizes</h2>
        <div className="prize-section">
          <div className="prize-top10" style={{ background: '#2a1000', border: '1px solid #6b3a00' }}>
            <div className="prize-top10-badge" style={{ background: '#8b3a00' }}>TOP 10</div>
            <div className="prize-top10-text" style={{ color: '#c8905a' }}>Your character featured in the Konkerz Hall of Fame gallery and across all Konkerz socials.</div>
          </div>
          <div className="prize-grand" style={{ background: 'linear-gradient(135deg, #2a1000, #3d1500)', border: '2px solid #ff6b00' }}>
            <div className="prize-grand-header" style={{ color: '#ff6b00' }}>🏆 Grand Winner</div>
            <div className="prize-cash">£1,000</div>
            <div className="prize-items">
              <div className="prize-item">
                <div className="prize-item-icon">🎮</div>
                <div className="prize-item-text"><strong>On the Ball:</strong> Your Grumpy Grandpa character produced as an official Konkerz Battleball and sold worldwide.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">🌍</div>
                <div className="prize-item-text"><strong>Creator Credit:</strong> Your name on the packaging of every Grumpy Grandpa Battleball sold.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📣</div>
                <div className="prize-item-text"><strong>Launch Feature:</strong> Spotlighted in the official Konkerz product launch campaign.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">🔗</div>
                <div className="prize-item-text"><strong>More at:</strong> <a href="https://konkerz.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b00' }}>konkerz.com</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#1a0800' }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0, color: '#ff6b00' }}>Community Favourites</h2>
          <div className="card-text" style={{ color: '#c8905a' }}>Vote for the Grumpy Grandpa you want to see made.</div>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b3a00', fontWeight: 700 }}>
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
              competition="konkerz"
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/designs?competition=konkerz" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline', color: '#ff6b00' }}>See all</Link>
        </div>
      </section>

      <section className="section" style={{ background: '#1a0800' }}>
        <h2 style={{ color: '#ff6b00' }}>Design. Submit. Get Made.</h2>
        <div className="steps">
          <div className="step-card" style={{ background: '#2a1000', borderColor: '#6b3a00' }}>
            <div className="step-number" style={{ background: '#8b3a00', color: '#ff6b00' }}>1</div>
            <div className="card-title" style={{ color: '#ff6b00' }}>DESIGN</div>
            <div className="card-text" style={{ color: '#c8905a' }}>Draw, render, or generate your Grumpy Grandpa. Make him mean. Make him legendary.</div>
          </div>
          <div className="step-card" style={{ background: '#2a1000', borderColor: '#6b3a00' }}>
            <div className="step-number" style={{ background: '#8b3a00', color: '#ff6b00' }}>2</div>
            <div className="card-title" style={{ color: '#ff6b00' }}>BATTLE</div>
            <div className="card-text" style={{ color: '#c8905a' }}>Share your entry ID. Rally the community. Most votes wins.</div>
          </div>
          <div className="step-card" style={{ background: '#2a1000', borderColor: '#6b3a00' }}>
            <div className="step-number" style={{ background: '#8b3a00', color: '#ff6b00' }}>3</div>
            <div className="card-title" style={{ color: '#ff6b00' }}>GET MADE</div>
            <div className="card-text" style={{ color: '#c8905a' }}>Your character ships worldwide. On a rope. Ready to battle.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#1a0800', textAlign: 'center', padding: '34px 20px' }}>
        <h2 style={{ color: '#ff6b00' }}>Who's Your Grumpy Grandpa?</h2>
        <Link className="cta konkerz-cta" href="/konkerz/submit">💥 SUBMIT YOUR CHARACTER</Link>
        <div className="footer-links">
          <Link href="/designs?competition=konkerz" style={{ color: '#c8905a' }}>All Entries</Link>
          <a href="https://konkerz.com" target="_blank" rel="noopener noreferrer" style={{ color: '#c8905a' }}>konkerz.com</a>
          <Link href="/legal" style={{ color: '#c8905a' }}>Terms &amp; Privacy</Link>
        </div>
      </section>
    </main>
  )
}
