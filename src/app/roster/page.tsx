import Link from 'next/link'
import { prisma } from '@/lib/db'
import RosterBrowser from './RosterBrowser'

export const dynamic = 'force-dynamic'

export default async function RosterPage() {
  const profiles = await prisma.partnerApplication.findMany({
    where: { competition: '' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="page">
      <Link className="top-link" href="/">← Home</Link>

      <section className="feed-title">
        <h1>The Roster</h1>
        <div className="subtitle">
          Creators, agencies, and designers available to amplify design competitions.
        </div>
      </section>

      <div style={{ marginBottom: 20 }}>
        <Link
          href="/roster/apply"
          style={{
            display: 'inline-block',
            fontWeight: 900, fontSize: 14,
            padding: '10px 20px',
            background: '#111', color: '#fff',
            borderRadius: 8, textDecoration: 'none',
          }}
        >
          Join the Roster →
        </Link>
      </div>

      <RosterBrowser initial={profiles.map(p => ({
        id: p.id,
        handle: p.handle,
        name: p.name,
        specialty: p.specialty,
        role: p.role,
        reach: p.reach,
        platform: p.platform,
        portfolioUrl: p.portfolioUrl,
      }))} />
    </main>
  )
}
