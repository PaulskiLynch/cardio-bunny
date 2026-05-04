import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAdminCookie } from '@/lib/adminAuth'
import { list } from '@vercel/blob'
import MediaLibrary from './MediaLibrary'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const store = await cookies()
  if (!isAdminCookie(store.get('admin_auth')?.value)) redirect('/admin')

  const { blobs } = await list({ prefix: 'loops/' })

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
