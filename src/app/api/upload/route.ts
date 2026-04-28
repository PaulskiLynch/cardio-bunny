import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  const store = await cookies()
  if (!isAdminCookie(store.get('admin_auth')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file || !file.size) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG, WebP, and GIF images are allowed.' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image must be under 10 MB.' }, { status: 400 })
  }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `loops/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { url } = await put(filename, file, { access: 'public', contentType: file.type })

  return NextResponse.json({ url })
}
