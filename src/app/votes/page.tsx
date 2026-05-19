import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function VotesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const votes = await prisma.vote.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  const entryIds = votes.map(v => v.entryId)
  const entries = entryIds.length
    ? await prisma.entry.findMany({ where: { entryId: { in: entryIds } } })
    : []

  const entryMap = Object.fromEntries(entries.map(e => [e.entryId, e]))

  const byLoop: Record<string, typeof votes> = {}
  for (const v of votes) {
    if (!byLoop[v.competition]) byLoop[v.competition] = []
    byLoop[v.competition].push(v)
  }

  return (
    <main className="page">
      <section className="feed-title">
        <h1>My Votes</h1>
        <div className="subtitle">{votes.length} vote{votes.length !== 1 ? 's' : ''} across {Object.keys(byLoop).length} competition{Object.keys(byLoop).length !== 1 ? 's' : ''}</div>
      </section>

      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>← Home</Link>
      </div>

      {votes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#777', fontWeight: 700 }}>
          You haven&apos;t voted yet. <Link href="/" style={{ textDecoration: 'underline' }}>Browse competitions →</Link>
        </div>
      ) : (
        Object.entries(byLoop).map(([competition, compVotes]) => (
          <div key={competition} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 900 }}>{competition}</h2>
              <Link href={`/loops/${competition}`} style={{ fontSize: 12, fontWeight: 700, textDecoration: 'underline', color: '#888' }}>
                View loop →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {compVotes.map(v => {
                const entry = entryMap[v.entryId]
                return (
                  <div key={v.entryId} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', borderRadius: 8, padding: '10px 14px', border: '1px solid #eee' }}>
                    {entry?.imageUrl && (
                      <img src={entry.imageUrl} alt={entry.setName} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {entry?.setName ?? v.entryId}
                      </div>
                      {entry && (
                        <div style={{ fontSize: 12, color: '#888' }}>by {entry.designerName} · {entry.voteCount} vote{entry.voteCount !== 1 ? 's' : ''}</div>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: '#aaa', flexShrink: 0 }}>
                      {new Date(v.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                    {v.isReferral && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: '#fff0c0', color: '#a67c00', padding: '2px 7px', borderRadius: 20 }}>referral</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </main>
  )
}
