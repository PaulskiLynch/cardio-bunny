import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_BYTES = 20 * 1024 * 1024 // 20 MB

export function validateEntryImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Only JPG, PNG, WebP, or PDF files are accepted.'
  if (file.size > MAX_BYTES) return 'File must be under 20 MB.'
  return null
}

export async function saveImage(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `entries/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { url } = await put(filename, file, { access: 'public', contentType: file.type })
  return url
}
