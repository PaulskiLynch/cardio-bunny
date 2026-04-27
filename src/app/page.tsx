import Link from 'next/link'

export default function CrowdLoopsHome() {
  return (
    <main className="page">
      <section className="hero" style={{ textAlign: 'center' }}>
        <div style={{ width: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.7 }}>Welcome to</div>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: 12 }}>CrowdLoops</h1>
          <div className="subhead">The platform where communities, retailers and brand owners build products together. Vote for your favourites. Win if yours gets picked.</div>
        </div>
      </section>

      <section className="section">
        <h2>Active Events</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <Link href="/biedronka" style={{ textDecoration: 'none' }}>
            <div className="event-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ height: 36, objectFit: 'contain' }} />
                <img src="/biedronka.png" alt="Biedronka" style={{ height: 36, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title">Cardio Bunny x Biedronka</div>
              <div className="event-card-text">Design a matching activewear set. Top community vote gets produced and sold in Biedronka stores.</div>
              <div className="event-card-status open">🟢 Entry Open</div>
            </div>
          </Link>

          <Link href="/uk" style={{ textDecoration: 'none' }}>
            <div className="event-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ height: 36, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title">Cardio Bunny UK</div>
              <div className="event-card-text">Design a matching activewear set for the UK market. Top community vote gets produced and sold.</div>
              <div className="event-card-status open">🟢 Entry Open</div>
            </div>
          </Link>

        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>How CrowdLoops Works</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="card-title">ENTER</div>
            <div className="card-text">Pick an active event and submit your design idea.</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="card-title">VOTE</div>
            <div className="card-text">The community votes for the designs they want to see made.</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="card-title">WIN</div>
            <div className="card-text">Top designs get produced and sold by the brand partner.</div>
          </div>
        </div>
      </section>
    </main>
  )
}
