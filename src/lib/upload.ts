import { put } from '@vercel/blob'
import { randomBytes } from 'crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_BYTES = 20 * 1024 * 1024 // 20 MB

// Magic byte signatures for server-side content validation
const MAGIC: Record<string, (b: Uint8Array) => boolean> = {
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png':  (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  'image/webp': (b) => b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46
                    && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  'application/pdf': (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46,
}

export async function validateEntryImage(file: File): Promise<string | null> {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Only JPG, PNG, WebP, or PDF files are accepted.'
  if (file.size > MAX_BYTES) return 'File must be under 20 MB.'

  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  const check = MAGIC[file.type]
  if (check && !check(header)) return 'File content does not match the declared type.'

  return null
}

export async function saveImage(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `entries/${randomBytes(16).toString('hex')}.${ext}`
  const { url } = await put(filename, file, { access: 'public', contentType: file.type })
  return url
}
