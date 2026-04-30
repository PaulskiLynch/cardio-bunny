import Link from 'next/link'
import DemoVoteCard from './DemoVoteCard'

export const metadata = {
  title: 'Cardio Bunny x Retail Partner | Next Top Ladies Activewear Designer',
  description: 'A viral competition to discover a rising talent who will design an outfit for Cardio Bunny\'s next collection.',
}

const PINK = '#FF2D6B'

const HOW_IT_WORKS = [
  { n: '1', text: 'We launch the competition. Your name on it. Our name on it.' },
  { n: '2', text: 'Anyone can enter. Sketch. Photo. AI. No design degree needed.' },
  { n: '3', text: 'Entrants share to win. Friends vote. Friends enter. It goes viral - for free.' },
  { n: '4', text: 'Every vote collects answers to simple questions: Price? Colour? Gym only or everyday?' },
  { n: '5', text: 'We get a dashboard showing exactly what customers want.' },
  { n: '6', text: 'The winner is hand-picked. You approve. Quality is curated.' },
]

const PRIZES = [
  { label: '£5,000',            detail: 'Cash' },
  { label: 'Production',        detail: 'Their design made real - sold with our retail partner' },
  { label: 'Miami photoshoot',  detail: 'Professional shoot of the outfit' },
  { label: 'Global showrooms',  detail: 'Their name and design displayed in NY, Miami, Montreal, Warsaw, India, China, Dubai' },
]

const BENEFITS = [
  { label: 'Viral PR',               desc: 'A positive story: you help discover the next generation of design talent.' },
  { label: 'Consumer intelligence',  desc: 'Ask any question you want. Price, colour, sizing, occasions, features - real market data from real customers, before you commit to production.' },
  { label: 'Low risk',               desc: 'You don\'t commit to anything until you see the data and the designs.' },
  { label: 'Ready-made collection',  desc: 'A customer-validated activewear line - with a story behind every piece.' },
]

export default function PitchPage() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', background: '#fff', color: '#1a1a1a', lineHeight: 1.5 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <img
            src="/cardio-bunny-logo.png"
            alt="Cardio Bunny"
            style={{ height: 40, width: 'auto', filter: 'brightness(0)' }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#666', letterSpacing: '0.3px' }}>
            <strong style={{ color: '#1a1a1a' }}>Cardio Bunny</strong> x Retail Partner
          </span>
        </div>

        {/* Hero image */}
        <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 36 }}>
          <img
            src="/hero-image.png"
            alt="Cardio Bunny activewear"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 340, objectFit: 'cover' }}
          />
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
            The idea
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 6vw, 36px)', fontWeight: 800, letterSpacing: '-0.3px', marginBottom: 14, lineHeight: 1.15 }}>
            Next Top Ladies<br />Activewear Designer
          </h1>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.5 }}>
            A viral competition to discover a rising talent who will design an outfit for Cardio Bunny's next collection - together with you.
          </p>
        </div>

        {/* How it works */}
        <SectionHeading>How it works</SectionHeading>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
          <tbody>
            {HOW_IT_WORKS.map(row => (
              <tr key={row.n} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '14px 16px 14px 0', width: 32, fontWeight: 700, color: PINK, verticalAlign: 'top', fontSize: 15 }}>{row.n}</td>
                <td style={{ padding: '14px 0', fontSize: 15, color: '#333', verticalAlign: 'top' }}>{row.text}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* What the winner gets */}
        <SectionHeading>What the winner gets</SectionHeading>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
          <tbody>
            {PRIZES.map(row => (
              <tr key={row.label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '14px 16px 14px 0', width: 160, fontWeight: 700, color: PINK, verticalAlign: 'top', fontSize: 14 }}>{row.label}</td>
                <td style={{ padding: '14px 0', fontSize: 15, color: '#333', verticalAlign: 'top' }}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
          <strong>Top 10 entrants</strong> get a day's training with Cardio Bunny designers and your team - so final designs are production-ready.
        </p>

        {/* What our retail partner gets */}
        <SectionHeading>What our retail partner gets</SectionHeading>
        <div style={{ marginBottom: 8 }}>
          {BENEFITS.map(row => (
            <div key={row.label} style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '16px 0', gap: 16 }}>
              <div style={{ width: 160, flexShrink: 0, fontWeight: 700, color: PINK, fontSize: 14 }}>{row.label}</div>
              <div style={{ flex: 1, fontSize: 15, color: '#333' }}>{row.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats box */}
        <div style={{ background: '#f8f8f8', borderLeft: `4px solid ${PINK}`, borderRadius: 12, padding: '24px 28px', margin: '36px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 14 }}>
            One number to know
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: PINK, marginRight: 32 }}>1,400 submissions</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: PINK }}>12,000 votes</span>
          </div>
          <div style={{ fontSize: 14, color: '#555' }}>
            A full demand dashboard - from our last activewear competition in Poland.
          </div>
        </div>

        {/* Demo vote card */}
        <SectionHeading>See how voting works</SectionHeading>
        <p style={{ fontSize: 15, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
          This is what your customers see. Every vote triggers three quick questions.
          Their answers go straight into your demand dashboard.
        </p>
        <DemoVoteCard />

        {/* Next step */}
        <div style={{ border: '1px solid #eee', borderRadius: 16, padding: '36px 28px', textAlign: 'center', marginBottom: 48 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Next step</h3>
          <p style={{ color: '#555', marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
            A 15-minute call to explore a partnership.<br />
            No pitch. No slides. Just a conversation about finding great design talent together.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: PINK,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '14px 36px',
              borderRadius: 40,
              fontSize: 16,
            }}
          >
            Book a 15-minute call →
          </Link>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: 24, textAlign: 'center', fontSize: 13, color: '#999' }}>
          <div style={{ fontWeight: 700, color: '#333', marginBottom: 6, fontSize: 15 }}>Cardio Bunny</div>
          <div style={{ color: '#777' }}>
            Paul Lynch &nbsp;|&nbsp;
            <a href="mailto:Paul@CardioBunny.com" style={{ color: '#777' }}>Paul@CardioBunny.com</a>
            &nbsp;|&nbsp; +48 577 611 336
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: '#bbb' }}>
            Powered by <a href="/" style={{ color: '#bbb' }}>CrowdLoops</a>
          </div>
        </div>

      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 600px) {
          .pitch-benefit-row { flex-direction: column !important; }
          .pitch-benefit-label { width: auto !important; margin-bottom: 4px; }
          .pitch-stats-num span { display: block; margin-bottom: 8px; }
        }
      `}</style>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 18,
      fontWeight: 800,
      margin: '40px 0 18px',
      paddingBottom: 8,
      borderBottom: `3px solid ${PINK}`,
      display: 'inline-block',
    }}>
      {children}
    </div>
  )
}
