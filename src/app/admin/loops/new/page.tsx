import { cookies } from 'next/headers'
import Link from 'next/link'
import { LoginForm } from '../../AdminClient'
import LoopForm from '../LoopForm'

export const dynamic = 'force-dynamic'

export default async function NewLoopPage() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return <main className="page"><LoginForm /></main>
  }

  return (
    <main className="page">
      <section className="feed-title">
        <h1>New Loop</h1>
      </section>
      <div style={{ marginBottom: 20 }}>
        <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← All Loops
        </Link>
      </div>
      <LoopForm />
    </main>
  )
}
