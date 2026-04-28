import { cookies } from 'next/headers'
import Link from 'next/link'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import { AdminList, LoginForm } from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>
}) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')?.value

  if (!isAdminCookie(auth)) {
    return (
      <main className="page">
        <LoginForm />
      </main>
    )
  }

  const { brand } = await searchParams
  const competitionFilter = brand ?? undefined

  const [pending, counts, competitions] = await Promise.all([
    prisma.entry.findMany({
      where: { status: 'pending', ...(competitionFilter ? { competition: competitionFilter } : {}) },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.entry.groupBy({
      by: ['status'],
      _count: true,
      where: competitionFilter ? { competition: competitionFilter } : undefined,
    }),
    prisma.entry.findMany({
      distinct: ['competition'],
      select: { competition: true },
      orderBy: { competition: 'asc' },
    }),
  ])

  const byStatus = Object.fromEntries(counts.map(c => [c.status, c._count]))
  const brands = competitions.map(c => c.competition)

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Moderation</h1>
        <div className="subtitle">
          Pending: {byStatus.pending ?? 0} &nbsp;·&nbsp;
          Approved: {byStatus.approved ?? 0} &nbsp;·&nbsp;
          Rejected: {byStatus.rejected ?? 0}
          {competitionFilter && <> &nbsp;·&nbsp; <em>{competitionFilter}</em></>}
        </div>
      </section>

      <div style={{ marginBottom: 14, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <Link href="/admin/inquiries" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          📥 Inquiries
        </Link>
        <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          🔁 Loops
        </Link>
        <Link href="/admin/intelligence" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          📊 Loop Intelligence
        </Link>
        <Link href="/designs" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          View public designs
        </Link>
        <Link href="/" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          Home
        </Link>
      </div>

      {/* Brand filter tabs */}
      {brands.length > 0 && (
        <div className="intel-tabs" style={{ marginBottom: 20 }}>
          <Link
            href="/admin"
            className={`intel-tab${!competitionFilter ? ' active' : ''}`}
          >
            All brands
          </Link>
          {brands.map(b => (
            <Link
              key={b}
              href={`/admin?brand=${encodeURIComponent(b)}`}
              className={`intel-tab${competitionFilter === b ? ' active' : ''}`}
            >
              {b}
            </Link>
          ))}
        </div>
      )}

      <AdminList initial={pending.map(e => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
      }))} />
    </main>
  )
}
