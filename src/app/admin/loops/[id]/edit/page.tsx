import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { LoginForm } from '../../../AdminClient'
import LoopForm, { type LoopInitial } from '../../LoopForm'

export const dynamic = 'force-dynamic'

export default async function EditLoopPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return <main className="page"><LoginForm /></main>
  }

  const { id } = await params
  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) notFound()

  const initial: LoopInitial = {
    id: loop.id,
    slug: loop.slug,
    status: loop.status,
    brandName: loop.brandName,
    retailPartner: loop.retailPartner,
    market: loop.market,
    heroTitle: loop.heroTitle,
    heroSubhead: loop.heroSubhead,
    ctaText: loop.ctaText,
    deadline: loop.deadline,
    accentColor: loop.accentColor,
    brief: loop.brief,
    guidelines: loop.guidelines,
    prizes: loop.prizes,
    questions: loop.questions,
    autoApprove: loop.autoApprove,
  }

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Edit Loop</h1>
        <div className="subtitle">{loop.brandName}</div>
      </section>
      <div style={{ marginBottom: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← All Loops
        </Link>
        <Link href={`/loops/${loop.slug}`} style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          View public page ↗
        </Link>
        <Link href={`/studio/${loop.id}`} style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          Studio ↗
        </Link>
      </div>
      <LoopForm initial={initial} />
    </main>
  )
}
