import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { list, del } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/webm',
]

async function checkAdmin() {
  const store = await cookies()
  return isAdminCookie(store.get('admin_auth')?.value)
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { blobs } = await list({ prefix: 'loops/' })
  return NextResponse.json({ blobs })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  // Only check admin cookie on the browser token-request, not on Vercel's server callback
  if (body.type === 'blob.generate-client-token') {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    return await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: 100 * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: pathname,
      }),
      onUploadCompleted: async () => {},
    }) as NextResponse
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  await del(url)
  return NextResponse.json({ ok: true })
}
