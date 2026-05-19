import Link from 'next/link'
import { redirect } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs/server'
import { isAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import UsersClient, { type UserRow } from './UsersClient'

export const dynamic = 'force-dynamic'

function fmt(ts: number | null | undefined): string {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function UsersPage() {
  if (!await isAdmin()) redirect('/sign-in')

  const client = await clerkClient()
  const { data: clerkUsers } = await client.users.getUserList({ limit: 500, orderBy: '-created_at' })

  const [voteCounts, entries] = await Promise.all([
    prisma.vote.groupBy({ by: ['userId'], _count: { _all: true } }),
    prisma.entry.findMany({ select: { contact: true } }),
  ])

  const voteMap = Object.fromEntries(voteCounts.map(v => [v.userId, v._count._all]))

  const entryMap: Record<string, number> = {}
  for (const e of entries) {
    const email = e.contact.toLowerCase()
    entryMap[email] = (entryMap[email] ?? 0) + 1
  }

  const rows: UserRow[] = clerkUsers.map(u => {
    const email = u.emailAddresses[0]?.emailAddress ?? ''
    return {
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(' '),
      username: u.username ?? '',
      email,
      imageUrl: u.imageUrl ?? '',
      joinedAt: fmt(u.createdAt),
      lastSignIn: fmt(u.lastSignInAt),
      votes: voteMap[u.id] ?? 0,
      entries: entryMap[email.toLowerCase()] ?? 0,
      role: (u.publicMetadata?.role as string | null) ?? null,
    }
  })

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Users</h1>
        <div className="subtitle">{rows.length} registered · manage roles &amp; access</div>
      </section>

      <div style={{ marginBottom: 20 }}>
        <Link href="/admin" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← Admin
        </Link>
      </div>

      <UsersClient initial={rows} />
    </main>
  )
}
