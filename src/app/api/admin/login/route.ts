import { NextRequest } from 'next/server'
import { adminToken } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    await new Promise(r => setTimeout(r, 500))
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = Response.json({ ok: true })
  res.headers.set(
    'Set-Cookie',
    `admin_auth=${adminToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
  )
  return res
}
