import { put } from '@vercel/blob'

export async function saveImage(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `entries/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { url } = await put(filename, file, { access: 'public' })
  return url
}
