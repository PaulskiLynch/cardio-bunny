import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import PartnerForm from './PartnerForm'

export const dynamic = 'force-dynamic'

export default async function PartnerApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug } })
  if (!loop) notFound()

  if (!loop.rosterEnabled) {
    return (
      <main className="page">
        <Link className="top-link" href={`/loops/${slug}`}>← Back to competition</Link>
        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#777' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>Partner applications are closed</div>
          <div style={{ fontSize: 14 }}>{loop.brandName} is not accepting partner applications for this competition.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <Link className="top-link" href={`/loops/${slug}`}>← Back to competition</Link>
      <PartnerForm slug={slug} brandName={loop.brandName} />
    </main>
  )
}
