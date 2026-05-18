export function generateEntryId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const bytes = new Uint8Array(5)
  crypto.getRandomValues(bytes)
  let id = 'CH25-'
  for (let i = 0; i < 5; i++) id += chars[bytes[i] % chars.length]
  return id
}
