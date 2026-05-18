import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

// Sliding window rate limiters per endpoint category
export const voteLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, '1 h'),   // 60 votes per user per hour
  prefix: 'rl:vote',
})

export const submitLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 h'),    // 5 submissions per IP per hour
  prefix: 'rl:submit',
})

export const formLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 h'),   // 10 form posts per IP per hour
  prefix: 'rl:form',
})

// Returns the real client IP from Vercel/proxy headers
export function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
