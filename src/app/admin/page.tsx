import { cookies } from 'next/headers'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { AdminList, LoginForm } from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')?.value

  if (auth !== process.env.ADMIN_PASSWORD) {
    return (
      <main className="page">
        <LoginForm />
      </main>
    )
  }

  const pending = await prisma.entry.findMany({
    where: { status: 'pending' },
    orderBy: { createdAt: 'asc' },
  })

  const counts = await prisma.entry.groupBy({
    by: ['status'],
    _count: true,
  })

  const byStatus = Object.fromEntries(counts.map(c => [c.status, c._count]))

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Moderation</h1>
        <div className="subtitle">
          Pending: {byStatus.pending ?? 0} &nbsp;·&nbsp;
          Approved: {byStatus.approved ?? 0} &nbsp;·&nbsp;
          Rejected: {byStatus.rejected ?? 0}
        </div>
      </section>

      <div style={{ marginBottom: 14, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
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

      <AdminList initial={pending.map(e => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
      }))} />
    </main>
  )
}
