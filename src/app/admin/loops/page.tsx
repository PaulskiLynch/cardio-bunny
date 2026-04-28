import { cookies } from 'next/headers'
import Link from 'next/link'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import { LoginForm } from '../AdminClient'
import DeleteLoopButton from './[id]/edit/DeleteLoopButton'
import ReconcileButton from './ReconcileButton'

export const dynamic = 'force-dynamic'

const STATUS_LABEL: Record<string, string> = {
  demo: '🟡 Demo',
  live: '🟢 Live',
  closed: '⚫ Closed',
}

export default async function LoopsAdminPage() {
  const cookieStore = await cookies()
  if (!isAdminCookie(cookieStore.get('admin_auth')?.value)) {
    return <main className="page"><LoginForm /></main>
  }

  const loops = await prisma.loop.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Loops</h1>
        <div className="subtitle">All competition loops</div>
      </section>

      <div style={{ marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/admin" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← Moderation
        </Link>
        <Link href="/admin/loops/new" className="loop-create-btn">+ New Loop</Link>
        <ReconcileButton />
      </div>

      {loops.length === 0 ? (
        <div style={{ color: '#777', fontWeight: 700, padding: '40px 0', textAlign: 'center' }}>
          No loops yet. <Link href="/admin/loops/new" style={{ textDecoration: 'underline' }}>Create your first one.</Link>
        </div>
      ) : (
        <div className="loop-list">
          {loops.map(loop => (
            <div key={loop.id} className="loop-list-item">
              <div className="loop-list-meta">
                <div className="loop-list-name">{loop.brandName}</div>
                <div className="loop-list-slug">crowdloops.com/loops/{loop.slug}</div>
                <div className="loop-list-status">{STATUS_LABEL[loop.status] ?? loop.status}</div>
              </div>
              <div className="loop-list-actions">
                <Link href={`/loops/${loop.slug}`} className="loop-action-link">View</Link>
                <Link href={`/studio/${loop.id}`} className="loop-action-link">Studio</Link>
                <Link href={`/admin/loops/${loop.id}/edit`} className="loop-action-link">Edit</Link>
                <DeleteLoopButton id={loop.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
