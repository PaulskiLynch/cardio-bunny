'use client'

import { useState } from 'react'
import Link from 'next/link'
import './investors.css'

const RED   = '#E8325A'
const DARK  = '#0A0A0A'
const CREAM = '#FAFAF8'
const MID   = '#888888'
const BORDER = '#E5E0D8'

const DEMOS = [
  {
    label: 'Fashion', cat: 'Activewear', href: '/loops/cbpolska',
    brand: 'Cardio Bunny × Retail Partner',
    sub: '1,420', votes: '12,500', buy: '74%', score: '9.2',
    tags: ['#BOLD', '#NEON', '#GYM'],
  },
  {
    label: 'Beverage', cat: 'Can Design', href: '/loops/swomp',
    brand: 'SWOMP WATER+ × Euro Retail',
    sub: '892', votes: '8,100', buy: '68%', score: '8.7',
    tags: ['#FRESH', '#CLEAN', '#NATURAL'],
  },
  {
    label: 'Toys', cat: 'Character Design', href: '/loops/konkerz',
    brand: 'Konkerz × Global Retail',
    sub: '2,104', votes: '18,300', buy: '81%', score: '9.5',
    tags: ['#GRUMPY', '#BATTLE', '#ICONIC'],
  },
  {
    label: 'Footwear', cat: 'Sneaker Design', href: '/loops/uk',
    brand: 'Brand TBC × Retail Partner',
    sub: '1,677', votes: '14,200', buy: '77%', score: '9.1',
    tags: ['#STREET', '#BOLD', '#COLOUR'],
  },
]

export default function InvestorsPage() {
  const [active, setActive] = useState(0)
  const demo = DEMOS[active]

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: 'antialiased' as const, color: DARK, background: CREAM }}>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,250,248,0.9)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${BORDER}`, height: 60, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', color: DARK, textDecoration: 'none' }}>CrowdLoops</Link>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 600 }}>
          <a href="#shift" style={{ color: MID, textDecoration: 'none' }}>The Shift</a>
          <a href="#how" style={{ color: MID, textDecoration: 'none' }}>How It Works</a>
          <a href="#pilot" style={{ color: MID, textDecoration: 'none' }}>Pilot</a>
          <a href="#vision" style={{ color: MID, textDecoration: 'none' }}>Vision</a>
        </div>
        <Link href="/contact" style={{ background: DARK, color: '#fff', padding: '8px 18px', borderRadius: 40, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Book a Call →</Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ background: DARK, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: RED, marginBottom: 24 }}>
              Investor Overview · 2026
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#fff', marginBottom: 24 }}>
              Customers are<br />becoming product<br />creators.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#777', marginBottom: 40, maxWidth: 460 }}>
              CrowdLoops helps brands launch AI-accessible product competitions that generate demand signals, customer insight, and validated product shortlists before production begins.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 56 }}>
              <Link href="/loops/cbpolska" style={{ background: RED, color: '#fff', padding: '12px 24px', borderRadius: 40, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>View Live Demo →</Link>
              <Link href="/contact" style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', padding: '12px 24px', borderRadius: 40, fontWeight: 700, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>Book a 20-Minute Call</Link>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
              {[
                { val: '12.5k', label: 'verified voters' },
                { val: '3,841', label: 'notify-me signups' },
                { val: '98.2%', label: 'vote quality' },
              ].map(m => (
                <div key={m.label} className="inv-pill" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 40, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: 14, color: '#fff' }}>{m.val}</span>
                  <span style={{ fontSize: 12, color: '#555' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock Dashboard */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 40px 100px rgba(0,0,0,0.5)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Browser chrome */}
              <div style={{ background: '#F5F1EB', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ flex: 1, background: '#fff', borderRadius: 5, padding: '3px 10px', fontSize: 11, color: '#999', fontFamily: 'monospace' }}>studio.crowdloops.com</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, color: '#22C55E' }}>
                  <span className="inv-live-dot" />LIVE
                </div>
              </div>

              {/* Dashboard body */}
              <div style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#bbb' }}>CROWDLOOPS STUDIO</span>
                  <span style={{ fontSize: 9, background: RED, color: '#fff', padding: '2px 7px', borderRadius: 20, fontWeight: 700, letterSpacing: '0.06em' }}>LIVE</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 18 }}>Cardio Bunny × Retail Partner (UK) · D-12</div>

                {/* KPI tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
                  {[
                    { v: '1,420', l: 'Submissions' },
                    { v: '12.5k', l: 'Voters' },
                    { v: '3,841', l: 'Notify-Me' },
                    { v: '98.2%', l: 'Quality' },
                  ].map(m => (
                    <div key={m.l} style={{ background: CREAM, borderRadius: 8, padding: '10px 6px', textAlign: 'center' as const }}>
                      <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' }}>{m.v}</div>
                      <div style={{ fontSize: 9, color: MID, marginTop: 2 }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Style signals */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 11 }}>
                  <span style={{ color: MID }}>Style Signals</span>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#BOLD', '#NEON', '#GYM'].map(t => (
                      <span key={t} style={{ background: '#F0EDE8', borderRadius: 4, padding: '2px 6px', fontWeight: 700, fontSize: 10 }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Price preference */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: MID, marginBottom: 7 }}>Price Preference</div>
                  {[
                    { l: 'Under £20', w: 10 },
                    { l: '£20–£40', w: 28 },
                    { l: '£40–£60', w: 48 },
                    { l: 'Over £60', w: 14 },
                  ].map(b => (
                    <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 52, fontSize: 9, color: MID, flexShrink: 0 }}>{b.l}</div>
                      <div style={{ flex: 1, background: '#F0EDE8', borderRadius: 3, height: 6 }}>
                        <div style={{ width: `${b.w}%`, height: '100%', background: RED, borderRadius: 3 }} />
                      </div>
                      <div style={{ width: 22, fontSize: 9, color: MID, textAlign: 'right' as const }}>{b.w}%</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 11 }}>
                  <span style={{ color: MID }}>Shortlist</span>
                  <span style={{ fontWeight: 700, color: '#22C55E' }}>✓ Top 5 ready for buyer review</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, background: DARK, color: '#fff', border: 'none', borderRadius: 6, padding: '8px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Review Shortlist</button>
                  <button style={{ flex: 1, background: '#F5F1EB', color: DARK, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '8px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Export Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSITIONING BANNER ──────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 40px', textAlign: 'center' as const, borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ maxWidth: 880, margin: '0 auto', fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', fontWeight: 700, lineHeight: 1.45, letterSpacing: '-0.02em', color: DARK }}>
          CrowdLoops helps brands validate product demand before production by turning customers into creators, voters, and purchase-intent signals.
        </p>
      </section>

      {/* ── THE SHIFT ───────────────────────────────────── */}
      <section id="shift" style={{ background: CREAM, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 64, textAlign: 'center' as const }}>The Shift</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            <div style={{ borderTop: `2px solid ${BORDER}`, paddingTop: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: MID, marginBottom: 32 }}>THE OLD MODEL</div>
              {['Brands guess.', 'Inventory gets committed.', 'Markdown risk appears months later.'].map(t => (
                <div key={t} style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ccc', textDecoration: 'line-through', textDecorationColor: '#ddd', marginBottom: 20, lineHeight: 1.2 }}>{t}</div>
              ))}
            </div>

            <div style={{ borderTop: `2px solid ${DARK}`, paddingTop: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: RED, marginBottom: 32 }}>THE NEW MODEL</div>
              {['Customers create.', 'Communities vote.', 'Demand becomes visible before production.'].map(t => (
                <div key={t} style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.02em', color: DARK, marginBottom: 20, lineHeight: 1.2 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NOW ─────────────────────────────────────── */}
      <section style={{ background: DARK, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#444', marginBottom: 16, textAlign: 'center' as const }}>Why Now</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textAlign: 'center' as const, marginBottom: 64 }}>Four forces converging.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              { n: '01', title: 'AI creation tools', desc: 'Anyone can now generate product concepts. The barrier to design has collapsed.' },
              { n: '02', title: 'Community commerce', desc: 'Consumers want participation, not just consumption. Passive buying is in decline.' },
              { n: '03', title: 'Retail uncertainty', desc: 'Brands need lower-risk buying decisions. The era of big inventory bets is ending.' },
              { n: '04', title: 'First-party data', desc: 'Retailers need direct customer insight. Third-party signals are disappearing.' },
            ].map(item => (
              <div key={item.n} style={{ background: '#111', padding: '40px 28px', borderTop: `2px solid ${RED}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: RED, marginBottom: 20, letterSpacing: '0.08em' }}>{item.n}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' as const, marginTop: 52 }}>
            <span style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              CrowdLoops sits at the intersection.
            </span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how" style={{ background: '#fff', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 16, textAlign: 'center' as const }}>How CrowdLoops Works</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 80 }}>From brief to validated shortlist.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { n: '01', title: 'Launch', sub: 'White-label branded competition deployed in 48 hours.', items: [] },
              { n: '02', title: 'Create', sub: 'Customers submit concepts from anywhere.', items: ['AI-generated designs', 'Sketches & mockups', 'Photos & renders'] },
              { n: '03', title: 'Validate', sub: 'Verified votes capture purchase-intent signals.', items: ['Price sensitivity', 'Colour preference', 'Purchase intent', 'Style demand'] },
              { n: '04', title: 'Decide', sub: 'Brands receive a data-backed shortlist.', items: ['Validated concepts', 'Audience growth', 'Demand dashboards', 'Buyer-ready shortlist'] },
            ].map((step, i) => (
              <div className="inv-step-card" key={step.n} style={{ padding: '40px 28px', border: `1px solid ${BORDER}`, borderLeft: i > 0 ? 'none' : `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: RED, marginBottom: 16, letterSpacing: '-0.03em' }}>{step.n}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: DARK, marginBottom: 12, letterSpacing: '-0.02em' }}>{step.title}</div>
                <div style={{ fontSize: 13, color: MID, lineHeight: 1.7, marginBottom: step.items.length ? 16 : 0 }}>{step.sub}</div>
                {step.items.map(item => (
                  <div key={item} style={{ fontSize: 12, color: '#555', display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ color: RED, flexShrink: 0 }}>→</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO PANEL ──────────────────────────────────── */}
      <section style={{ background: CREAM, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 16, textAlign: 'center' as const }}>Live Demo Panel</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 48 }}>See it in action.</h2>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center' as const, marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 2, background: '#EDEBE6', borderRadius: 12, padding: 4 }}>
              {DEMOS.map((d, i) => (
                <button key={d.label} className="inv-tab" onClick={() => setActive(i)} style={{ padding: '8px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active === i ? '#fff' : 'transparent', fontWeight: active === i ? 800 : 600, fontSize: 13, color: active === i ? DARK : MID, boxShadow: active === i ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demo card */}
          <div style={{ background: '#fff', borderRadius: 20, border: `1px solid ${BORDER}`, padding: '48px', maxWidth: 800, margin: '0 auto', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 6 }}>{demo.cat}</div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{demo.brand}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FDF4', borderRadius: 40, padding: '6px 14px' }}>
                <span className="inv-live-dot" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>LIVE</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Submissions', val: demo.sub },
                { label: 'Verified Votes', val: demo.votes },
                { label: '"Would Buy"', val: demo.buy },
                { label: 'Shortlist Score', val: `${demo.score}/10` },
              ].map(m => (
                <div key={m.label} style={{ textAlign: 'center' as const, padding: '20px 10px', background: CREAM, borderRadius: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: DARK, marginBottom: 4 }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: MID, fontWeight: 600 }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 36 }}>
              <span style={{ fontSize: 12, color: MID }}>Style signals:</span>
              {demo.tags.map(t => (
                <span key={t} style={{ background: '#F0EDE8', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{t}</span>
              ))}
            </div>

            <Link href={demo.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: DARK, color: '#fff', padding: '12px 24px', borderRadius: 40, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Explore Demo Loop →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CB PILOT ────────────────────────────────────── */}
      <section id="pilot" style={{ background: DARK, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: RED, marginBottom: 24 }}>The Pilot</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 24, lineHeight: 1.2 }}>
                Cardio Bunny has green-lit the first CrowdLoops pilot.
              </h2>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.85, marginBottom: 40 }}>
                Cardio Bunny is an international activewear brand operating across EU, UK, and GCC markets. They are running the first live CrowdLoops competition — validating a new product line with their community before a single unit goes into production.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { val: '2,000+', label: 'Target submissions' },
                  { val: '20k+', label: 'Target voters' },
                  { val: '5k+', label: 'Target notify-me' },
                ].map(m => (
                  <div key={m.label} style={{ borderTop: '1px solid #222', paddingTop: 20 }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>{m.val}</div>
                    <div style={{ fontSize: 12, color: '#444' }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/loops/cbpolska" style={{ display: 'inline-flex', gap: 8, background: RED, color: '#fff', padding: '12px 24px', borderRadius: 40, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                View the Live Pilot →
              </Link>
            </div>

            {/* Mock loop card */}
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 20, padding: '40px' }}>
              <img src="/crowdloops-logo.png" alt="Cardio Bunny" style={{ height: 36, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7, marginBottom: 24, display: 'block' }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Cardio Bunny Design Challenge</div>
              <div style={{ fontSize: 13, color: '#444', marginBottom: 28, lineHeight: 1.65 }}>
                Design a matching activewear set. The community votes. The winning concept goes into production.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                {[
                  { v: '1,420', l: 'Entries' },
                  { v: '12.5k', l: 'Voters' },
                  { v: '74%', l: 'Would Buy' },
                ].map(m => (
                  <div key={m.l} style={{ background: '#1a1a1a', borderRadius: 10, padding: '16px 8px', textAlign: 'center' as const }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: '#444', marginTop: 3 }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#22C55E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="inv-live-dot" />Campaign Live
              </div>
            </div>
          </div>

          {/* Quote */}
          <div style={{ marginTop: 80, borderTop: '1px solid #1a1a1a', paddingTop: 60, textAlign: 'center' as const }}>
            <blockquote style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.5, maxWidth: 680, margin: '0 auto', fontStyle: 'normal' }}>
              "The future customer is not just a buyer.<br />They're part of the creation process."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── WHAT RETAILERS BUY ──────────────────────────── */}
      <section style={{ background: '#fff', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 16, textAlign: 'center' as const }}>The Product</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 12 }}>You are not selling competitions.</h2>
          <p style={{ fontSize: 18, color: MID, textAlign: 'center' as const, marginBottom: 64 }}>You are selling business outcomes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              { icon: '📦', title: 'Inventory de-risking', desc: 'Validate demand before committing to production runs. Reduce markdown risk before a unit is cut.' },
              { icon: '✅', title: 'Product validation', desc: 'Real purchase-intent data from real customers. Not surveys — expressed preference under real conditions.' },
              { icon: '📈', title: 'Audience growth', desc: 'Every campaign builds a segmented, engaged audience with expressed preferences and purchase signals.' },
              { icon: '🔍', title: 'Consumer insight', desc: 'Price sensitivity, style preference, and demand signals — structured and ready for your buying team.' },
              { icon: '🚀', title: 'Community-powered launches', desc: 'Products that communities helped choose go to market with built-in advocates who already want to buy.' },
              { icon: '📊', title: 'Demand intelligence', desc: 'A living dashboard of what your customers want — before you produce it. Exportable for retail buyers.' },
            ].map(item => (
              <div key={item.title} style={{ padding: '40px 32px', border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em' }}>{item.title}</div>
                <div style={{ fontSize: 14, color: MID, lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ───────────────────────────── */}
      <section style={{ background: CREAM, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 16, textAlign: 'center' as const }}>Platform</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 64 }}>Enterprise-ready from day one.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {[
              'White-label portals',
              'Moderation workflows',
              'Verified voting',
              'Fraud detection',
              'Entrant IP management',
              'GDPR compliance',
              'Demand dashboards',
              'Exportable reports',
              'Shortlist management',
            ].map(f => (
              <div key={f} className="inv-feature-row" style={{ background: '#fff', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${BORDER}` }}>
                <span style={{ color: '#22C55E', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG VISION ──────────────────────────────────── */}
      <section id="vision" style={{ background: DARK, padding: '140px 40px', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#333', marginBottom: 40 }}>The Vision</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.05, marginBottom: 48 }}>
            The future of product development will be community-driven.
          </h2>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.85, marginBottom: 20, maxWidth: 680, margin: '0 auto 20px' }}>
            AI has made product imagination accessible to everyone.
          </p>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.85, maxWidth: 680, margin: '0 auto' }}>
            CrowdLoops gives brands the infrastructure to safely harness that creativity at scale — building a new layer of intelligence between customers and production decisions.
          </p>
        </div>
      </section>

      {/* ── BUSINESS MODEL ──────────────────────────────── */}
      <section style={{ background: '#fff', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: MID, marginBottom: 16, textAlign: 'center' as const }}>Business Model</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 64 }}>Four revenue streams.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              { n: '01', title: 'SaaS Campaign Fees', desc: 'Brands pay to launch branded validation loops on the platform.' },
              { n: '02', title: 'Enterprise Infrastructure', desc: 'Always-on validation systems for major retailers and buying groups.' },
              { n: '03', title: 'Demand Intelligence', desc: 'Consumer insight reports, trend data, and structured demand analytics.' },
              { n: '04', title: 'Booster Network', desc: 'Creator and influencer amplification to drive entries and verified votes.' },
            ].map(item => (
              <div key={item.n} style={{ padding: '40px 28px', border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.1em', marginBottom: 20 }}>{item.n}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MID, lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + FOOTER ────────────────────────────────── */}
      <section style={{ background: DARK, padding: '120px 40px', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
            Ready to validate products before production?
          </h2>
          <p style={{ fontSize: 16, color: '#555', marginBottom: 40 }}>Book a 20-minute call or explore the platform with a live demo.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' as const, flexWrap: 'wrap' as const, marginBottom: 80 }}>
            <Link href="/contact" style={{ background: '#fff', color: DARK, padding: '14px 28px', borderRadius: 40, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>Book Demo</Link>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '14px 28px', borderRadius: 40, fontWeight: 800, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>Partner With CrowdLoops</Link>
          </div>
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 40 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Paul Lynch</div>
            <div style={{ fontSize: 13, color: '#444', marginBottom: 8 }}>Founder</div>
            <a href="mailto:paul@crowdloops.com" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>paul@crowdloops.com</a>
            <div style={{ marginTop: 32, fontSize: 12, color: '#2a2a2a' }}>© 2026 CrowdLoops</div>
          </div>
        </div>
      </section>

    </div>
  )
}
