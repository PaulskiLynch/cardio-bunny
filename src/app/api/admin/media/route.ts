import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { list, put, del } from '@vercel/blob'

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/webm',
]
const MAX_BYTES = 100 * 1024 * 1024 // 100 MB

async function checkAdmin() {
  const store = await cookies()
  return isAdminCookie(store.get('admin_auth')?.value)
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { blobs } = await list({ prefix: 'loops/' })
  return NextResponse.json({ blobs })
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file || !file.size) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 100 MB.' }, { status: 400 })
  }

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
  const filename = `loops/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { url } = await put(filename, file, { access: 'public', contentType: file.type })
  return NextResponse.json({ url })
}

export async function DELETE(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  await del(url)
  return NextResponse.json({ ok: true })
}
