import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

export async function POST(req: NextRequest) {
  const store = await cookies()
  if (store.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file || !file.size) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `loops/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { url } = await put(filename, file, { access: 'public' })

  return NextResponse.json({ url })
}
