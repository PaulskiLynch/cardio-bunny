import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import { StudioEntriesTable, StudioModeration } from './StudioClient'
import { StudioSignInGate, StudioDeniedGate } from './StudioGate'
import RosterDeck from './RosterDeck'
import { getQuestions, type Question } from '@/lib/questions'

export const dynamic = 'force-dynamic'

const ADMIN_TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'entries',     label: 'Entries' },
  { id: 'moderation',  label: 'Moderation' },
  { id: 'feedback',    label: 'Feedback' },
  { id: 'roster',      label: 'Roster' },
  { id: 'exports',     label: 'Exports' },
  { id: 'settings',    label: 'Settings' },
]

const MODERATOR_TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'entries',     label: 'Entries' },
  { id: 'moderation',  label: 'Moderation' },
  { id: 'feedback',    label: 'Feedback' },
  { id: 'roster',      label: 'Roster' },
  { id: 'exports',     label: 'Exports' },
]

function pct(n: number, total: number) {
  if (!total) return 0
  return Math.round((n / total) * 100)
}

export default async function StudioPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const [cookieStore, clerkUser, { id }, { tab = 'overview' }] = await Promise.all([
    cookies(),
    currentUser(),
    params,
    searchParams,
  ])

  const isAdmin = isAdminCookie(cookieStore.get('admin_auth')?.value)
  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ?? ''

  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) notFound()

  let moderatorEmails: string[] = []
  try { moderatorEmails = JSON.parse(loop.moderatorEmails).map((e: string) => e.toLowerCase()) } catch {}

  const isModerator = !isAdmin && userEmail && moderatorEmails.includes(userEmail)

  if (!isAdmin && !isModerator) {
    return (
      <main className="page">
        {userEmail
          ? <StudioDeniedGate email={userEmail} />
          : <StudioSignInGate />}
      </main>
    )
  }

  const TABS = isAdmin ? ADMIN_TABS : MODERATOR_TABS

  const [entries, feedbackRows, notifyCount, rosterApps] = await Promise.all([
    prisma.entry.findMany({
      where: { competition: loop.slug },
      orderBy: { voteCount: 'desc' },
    }),
    prisma.feedbackResponse.findMany({
      where: { competition: loop.slug },
      select: { questionId: true, answer: true },
    }),
    prisma.notifySignup.count({ where: { competition: loop.slug } }),
    prisma.partnerApplication.findMany({
      where: { competition: loop.slug },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const totalEntries  = entries.length
  const approvedCount = entries.filter(e => e.status === 'approved').length
  const pendingCount  = entries.filter(e => e.status === 'pending').length
  const rejectedCount = entries.filter(e => e.status === 'rejected').length
  const totalVotes    = entries.reduce((sum, e) => sum + e.voteCount, 0)

  let questions: Question[] = []
  try { questions = JSON.parse(loop.questions) } catch { /* ignore */ }
  if (questions.length === 0) questions = getQuestions(loop.slug)

  const grouped: Record<string, Record<string, number>> = {}
  for (const r of feedbackRows) {
    if (!grouped[r.questionId]) grouped[r.questionId] = {}
    grouped[r.questionId][r.answer] = (grouped[r.questionId][r.answer] || 0) + 1
  }
  const firstQId = questions[0]?.id
  const totalRespondents = firstQId
    ? Object.values(grouped[firstQId] ?? {}).reduce((a, b) => a + b, 0)
    : 0

  const accent = loop.accentColor || '#e8325a'

  const entryRows = entries.map(e => ({
    id: e.id,
    entryId: e.entryId,
    designerName: e.designerName,
    contact: e.contact,
    setName: e.setName,
    hook: e.hook,
    imageUrl: e.imageUrl,
    voteCount: e.voteCount,
    status: e.status,
  }))

  const STATUS_MAP: Record<string, string> = { demo: '🟡 Demo', live: '🟢 Live', closed: '⚫ Closed' }

  return (
    <main className="page">

      {/* ── Studio Header ──────────────────────────────── */}
      <div className="studio-header">
        <div className="studio-header-eyebrow">CrowdLoops Studio</div>
        <div className="studio-header-title">
          {loop.brandName}
          {loop.market && loop.market !== 'en' && (
            <span className="studio-header-market"> — {loop.market.toUpperCase()}</span>
          )}
        </div>
        <div className="studio-header-status">
          <span className="studio-header-status-dot" style={{ background: loop.status === 'live' ? '#2a7a2a' : loop.status === 'closed' ? '#555' : '#b36b00' }} />
          {STATUS_MAP[loop.status] ?? loop.status}
          <span style={{ color: '#bbb', margin: '0 8px' }}>·</span>
          <Link href={`/loops/${loop.slug}`} style={{ color: '#888', fontSize: 12, textDecoration: 'underline' }}>
            View public page ↗
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────── */}
      <div className="studio-stats">
        <div className="studio-stat">
          <div className="studio-stat-value">{totalEntries}</div>
          <div className="studio-stat-label">Submissions</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value" style={{ color: '#2a7a2a' }}>{approvedCount}</div>
          <div className="studio-stat-label">Approved</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value" style={{ color: pendingCount > 0 ? '#b36b00' : '#111' }}>{pendingCount}</div>
          <div className="studio-stat-label">Pending</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value" style={{ color: rejectedCount > 0 ? '#c00' : '#111' }}>{rejectedCount}</div>
          <div className="studio-stat-label">Rejected</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value">{totalVotes.toLocaleString()}</div>
          <div className="studio-stat-label">Votes</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value">{totalRespondents}</div>
          <div className="studio-stat-label">Feedback Responses</div>
        </div>
        <div className="studio-stat">
          <div className="studio-stat-value">{notifyCount}</div>
          <div className="studio-stat-label">Notify-Me Signups</div>
        </div>
      </div>

      {/* ── Tab Nav ────────────────────────────────────── */}
      <div className="studio-tabs">
        {TABS.map(t => (
          <Link
            key={t.id}
            href={`/studio/${id}?tab=${t.id}`}
            className={`studio-tab${tab === t.id ? ' active' : ''}`}
            style={tab === t.id ? { borderBottomColor: accent, color: '#111' } : {}}
          >
            {t.label}
            {t.id === 'moderation' && pendingCount > 0 && (
              <span className="studio-tab-badge" style={{ background: accent }}>{pendingCount}</span>
            )}
            {t.id === 'roster' && rosterApps.filter(a => a.status === 'new').length > 0 && (
              <span className="studio-tab-badge" style={{ background: accent }}>{rosterApps.filter(a => a.status === 'new').length}</span>
            )}
          </Link>
        ))}
      </div>

      {/* ── Tab Content ────────────────────────────────── */}
      <div className="studio-tab-body">

        {/* Overview */}
        {tab === 'overview' && (
          <>
            <div className="studio-section-title">Top Entries by Votes</div>
            {entries.length === 0 ? (
              <div className="studio-empty">No entries yet.</div>
            ) : (
              <div className="studio-table-wrap">
                <table className="studio-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Designer</th>
                      <th>Set Name</th>
                      <th style={{ textAlign: 'right' }}>Votes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.slice(0, 5).map((e, i) => (
                      <tr key={e.id}>
                        <td style={{ color: '#aaa', fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{e.entryId}</td>
                        <td style={{ fontWeight: 700 }}>{e.designerName}</td>
                        <td>{e.setName}</td>
                        <td style={{ fontWeight: 900, textAlign: 'right' }}>{e.voteCount}</td>
                        <td><span className={`studio-badge studio-badge-${e.status}`}>{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {entries.length > 5 && (
              <div style={{ marginTop: 10 }}>
                <Link href={`/studio/${id}?tab=entries`} style={{ fontSize: 13, fontWeight: 900, textDecoration: 'underline' }}>
                  View all {entries.length} entries →
                </Link>
              </div>
            )}
          </>
        )}

        {/* Entries */}
        {tab === 'entries' && (
          <>
            <div className="studio-section-title">All Entries</div>
            <StudioEntriesTable initial={entryRows} accentColor={accent} />
          </>
        )}

        {/* Moderation */}
        {tab === 'moderation' && (
          <>
            <div className="studio-section-title">
              Moderation Queue
              <span style={{ fontWeight: 400, fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                Pending: {pendingCount} · Approved: {approvedCount} · Rejected: {rejectedCount}
              </span>
            </div>
            <StudioModeration initial={entryRows} />
          </>
        )}

        {/* Feedback */}
        {tab === 'feedback' && (
          <>
            <div className="studio-section-title">
              Voter Feedback
              <span style={{ fontWeight: 400, fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                {totalRespondents} respondents
              </span>
            </div>
            {questions.length === 0 ? (
              <div className="studio-empty">No feedback questions configured for this loop.</div>
            ) : feedbackRows.length === 0 ? (
              <div className="studio-empty">No feedback collected yet.</div>
            ) : (
              questions.map(q => {
                const qData  = grouped[q.id] ?? {}
                const qTotal = Object.values(qData).reduce((a, b) => a + b, 0)
                return (
                  <div key={q.id} className="intel-section">
                    <div className="intel-q-text">{q.text}</div>
                    <div className="intel-q-meta">{qTotal} responses</div>
                    {(q.type === 'yes_no' || q.type === 'choice') && (
                      <div className="intel-bars">
                        {(q.type === 'yes_no' ? ['YES', 'NO'] : (q.options ?? [])).map(opt => {
                          const count = qData[opt] ?? 0
                          const p = pct(count, qTotal)
                          return (
                            <div key={opt} className="intel-bar-row">
                              <div className="intel-bar-label">{opt}</div>
                              <div className="intel-bar-track">
                                <div className="intel-bar-fill" style={{ width: `${p}%`, background: accent }} />
                              </div>
                              <div className="intel-bar-pct">{p}%</div>
                              <div className="intel-bar-count">({count})</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                    {q.type === 'text' && (
                      <ul className="intel-responses">
                        {Object.entries(qData).slice(0, 30).map(([answer, count], i) => (
                          <li key={i} className="intel-response-item">
                            &ldquo;{answer}&rdquo;
                            {count > 1 && <span style={{ marginLeft: 8, fontSize: 11, color: '#aaa', fontWeight: 700 }}>×{count}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })
            )}
          </>
        )}

        {/* Roster */}
        {tab === 'roster' && (
          <>
            <div className="studio-section-title">
              Partner Roster
              <span style={{ fontWeight: 400, fontSize: 13, color: '#aaa', marginLeft: 10 }}>
                {rosterApps.length} application{rosterApps.length !== 1 ? 's' : ''}
                {rosterApps.filter(a => a.status === 'shortlisted').length > 0 && ` · ${rosterApps.filter(a => a.status === 'shortlisted').length} shortlisted`}
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
              Share this link so creators and agencies can apply:{' '}
              <a
                href={`/loops/${loop.slug}/partner`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 900, textDecoration: 'underline', color: accent }}
              >
                crowdloops.com/loops/{loop.slug}/partner ↗
              </a>
            </div>
            <RosterDeck
              initial={rosterApps.map(a => ({
                id: a.id,
                handle: a.handle,
                role: a.role,
                reach: a.reach,
                platform: a.platform,
                portfolioUrl: a.portfolioUrl,
                status: a.status,
              }))}
              accentColor={accent}
            />
          </>
        )}

        {/* Exports */}
        {tab === 'exports' && (
          <>
            <div className="studio-section-title">Exports</div>
            <div className="studio-export-card">
              <div className="studio-export-title">All Entries — CSV</div>
              <div className="studio-export-desc">
                Entry ID, designer name, contact, set name, description, votes, status, submitted date.
                {' '}{totalEntries} rows.
              </div>
              <Link
                href={`/api/studio/${loop.id}/export`}
                className="studio-export-btn"
                style={{ background: accent }}
              >
                ↓ Download CSV
              </Link>
            </div>
          </>
        )}

        {/* Settings */}
        {tab === 'settings' && (
          <>
            <div className="studio-section-title">Loop Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link
                href={`/admin/loops/${loop.id}/edit`}
                className="studio-export-btn"
                style={{ background: '#111', display: 'inline-block' }}
              >
                Edit Loop →
              </Link>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
                <div><strong>Slug:</strong> {loop.slug}</div>
                <div><strong>Status:</strong> {loop.status}</div>
                <div><strong>Market:</strong> {loop.market}</div>
                <div><strong>Auto-approve:</strong> {loop.autoApprove ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* ── Back nav ───────────────────────────────────── */}
      {isAdmin && (
        <div style={{ marginTop: 32 }}>
          <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 13, textDecoration: 'underline', color: '#888' }}>
            ← All Loops
          </Link>
        </div>
      )}

    </main>
  )
}
