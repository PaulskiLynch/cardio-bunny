import { createHmac } from 'crypto'

export function adminToken(): string {
  return createHmac('sha256', process.env.ADMIN_PASSWORD ?? 'no-secret')
    .update('crowdloops-admin-v1')
    .digest('hex')
}

export function isAdminCookie(value: string | undefined): boolean {
  return !!value && value === adminToken()
}
