export interface PrizeItem {
  style: 'top' | 'grand' | 'special'
  badge: string
  cash: string
  description: string
}

export interface RulesVars {
  competitionName: string
  brandName: string
  retailPartner: string
  country: string
  startDate: string
  endDate: string
  prizes: PrizeItem[]
  grandPrizeCash: string
  eligibilityAge: number
  sponsorLegalName: string
  sponsorContactEmail: string
  status: 'demo' | 'live' | 'closed'
  slug: string
  brief: string
  guidelines: string[]
  isDemo: boolean
}

const MARKET_COUNTRY: Record<string, string> = {
  pl: 'Poland',
  en: 'International',
  tr: 'Türkiye',
  uk: 'United Kingdom',
  ie: 'Ireland',
  de: 'Germany',
  fr: 'France',
}

function formatDate(iso: string): string {
  if (!iso) return 'TBC'
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch {
    return iso
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildRulesVars(loop: Record<string, any>): RulesVars {
  let prizes: PrizeItem[] = []
  let guidelines: string[] = []
  try { prizes = JSON.parse(loop.prizes) } catch { /* */ }
  try { guidelines = JSON.parse(loop.guidelines) } catch { /* */ }

  const grandPrize = prizes.find(p => p.style === 'grand')
  const grandPrizeCash = grandPrize?.cash ?? ''
  const country = MARKET_COUNTRY[loop.market] ?? 'International'

  return {
    competitionName: loop.retailPartner
      ? `${loop.brandName} × ${loop.retailPartner}`
      : loop.brandName,
    brandName: loop.brandName,
    retailPartner: loop.retailPartner ?? '',
    country,
    startDate: formatDate(loop.createdAt),
    endDate: loop.deadline ? formatDate(`${loop.deadline}T23:59:59Z`) : 'TBC',
    prizes,
    grandPrizeCash,
    eligibilityAge: 18,
    sponsorLegalName: loop.brandName,
    sponsorContactEmail: 'contact@crowdloops.com',
    status: loop.status as 'demo' | 'live' | 'closed',
    slug: loop.slug,
    brief: loop.brief ?? '',
    guidelines,
    isDemo: loop.status === 'demo',
  }
}

export function statusLabel(status: string): { label: string; colour: string } {
  if (status === 'live') return { label: 'Live — entries open', colour: '#1a7a1a' }
  if (status === 'closed') return { label: 'Closed', colour: '#888' }
  return { label: 'Demo — illustrative only', colour: '#b45000' }
}
