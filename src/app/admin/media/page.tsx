import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/adminAuth'
import { list } from '@vercel/blob'
import MediaLibrary from './MediaLibrary'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  if (!await isAdmin()) redirect('/sign-in')

  const { blobs: raw } = await list({ prefix: 'loops/' })
  const blobs = raw.map(b => ({ ...b, uploadedAt: b.uploadedAt.toISOString() }))

  return (
    <main className="page">
      <div style={{ marginBottom: 20 }}>
        <Link href="/admin" style={{ fontWeight: 900, fontSize: 13, textDecoration: 'underline' }}>
          ← Admin
        </Link>
      </div>
      <section className="feed-title">
        <h1>Media Library</h1>
        <div className="subtitle">{blobs.length} file{blobs.length !== 1 ? 's' : ''} in storage</div>
      </section>
      <MediaLibrary initial={blobs} />
    </main>
  )
}
