import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import BrandDashboard from './BrandDashboard'

export const dynamic = 'force-dynamic'

export default async function BrandPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in?redirect_url=/brand')

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() ?? ''

  const loop = await prisma.loop.findFirst({
    where: { ownerEmail: email },
  })

  if (!loop) {
    return (
      <main className="page">
        <div className="portal" style={{ marginTop: 20 }}>
          <header className="portal-header">
            <div className="brand">CrowdLoops</div>
            <div className="phase">Brand Portal</div>
          </header>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔒</div>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>No loop linked to this account</div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
              Your email address (<strong>{email}</strong>) isn&apos;t associated with any competition.<br />
              Contact your CrowdLoops manager to get access.
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Load stats in parallel
  const [entryCounts, totals] = await Promise.all([
    prisma.entry.groupBy({
      by: ['status'],
      where: { competition: loop.slug },
      _count: { _all: true },
    }),
    prisma.entry.aggregate({
      where: { competition: loop.slug },
      _sum: { voteCount: true, referralVotes: true },
    }),
  ])

  const stats = {
    pending:      entryCounts.find(e => e.status === 'pending')?._count._all  ?? 0,
    approved:     entryCounts.find(e => e.status === 'approved')?._count._all ?? 0,
    rejected:     entryCounts.find(e => e.status === 'rejected')?._count._all ?? 0,
    totalVotes:   totals._sum.voteCount     ?? 0,
    referralVotes: totals._sum.referralVotes ?? 0,
  }

  const loopData = {
    id:            loop.id,
    slug:          loop.slug,
    brandName:     loop.brandName,
    retailPartner: loop.retailPartner,
    status:        loop.status,
    deadline:      loop.deadline,
    accentColor:   loop.accentColor,
    logoUrl:       loop.logoUrl,
  }

  return <BrandDashboard loop={loopData} stats={stats} />
}
