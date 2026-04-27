import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import LoopSubmitForm from './LoopSubmitForm'

export const dynamic = 'force-dynamic'

export default async function LoopSubmitPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug } })
  if (!loop || loop.status === 'closed') notFound()

  let guidelines: string[] = []
  try { guidelines = JSON.parse(loop.guidelines) } catch { /* ignore */ }

  return (
    <LoopSubmitForm
      slug={loop.slug}
      brandName={loop.brandName}
      brief={loop.brief}
      guidelines={guidelines}
      ctaText={loop.ctaText}
      accentColor={loop.accentColor}
      status={loop.status}
    />
  )
}
