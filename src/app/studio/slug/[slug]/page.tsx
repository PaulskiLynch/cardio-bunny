import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export default async function StudioBySlug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug }, select: { id: true } })
  if (!loop) notFound()
  redirect(`/studio/${loop.id}`)
}
