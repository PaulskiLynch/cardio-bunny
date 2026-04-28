import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return isAdminCookie(store.get('admin_auth')?.value)
}

const DEMOS = [
  {
    slug: 'biedronka',
    status: 'demo',
    brandName: 'Cardio Bunny Polska',
    retailPartner: 'Biedronka',
    market: 'pl',
    heroTitle: 'Twój Projekt. Zrealizowany.',
    heroSubhead: 'Bez doświadczenia. Użyj AI, narysuj szkic lub zrób zdjęcie. Jeśli społeczność to pokocha — zrobimy to.',
    ctaText: 'ZAPISZ SIĘ NA POWIADOMIENIA',
    deadline: '2026-05-31',
    accentColor: '#e8325a',
    pageBg: '',
    logoUrl: '/cardio-bunny-logo.png',
    heroImageUrl: '/hero-image.png',
    brief: 'Zaprojektuj kompletny zestaw odzieży sportowej dla polskiego rynku. Zwycięski projekt może zostać wprowadzony do produkcji i sprzedany we współpracy z partnerem detalicznym.',
    guidelines: JSON.stringify([
      'Prześlij projekt jako JPG, PNG lub PDF.',
      'Projekt musi zawierać komplet: top + legginsy.',
      'Wszelkie style są akceptowane — od minimalistycznego po śmiały.',
      'Dołącz krótki opis inspiracji (maks. 100 słów).',
    ]),
    prizes: JSON.stringify([
      { style: 'top', badge: 'TOP 10', cash: '', description: 'Przykład — top 10 projektów może zostać wyróżnionych przez markę i partnerów detalicznych.' },
      { style: 'grand', badge: '🏆 Zwycięzca Główny', cash: '10 000 PLN', description: 'Sprzedaż ogólnopolska przez partnera detalicznego, globalna ekspozycja w kanałach marki, profil w mediach branżowych i profesjonalna sesja zdjęciowa zwycięskiego projektu.' },
    ]),
    questions: JSON.stringify([
      { id: 'buy', text: 'Czy kupiłbyś ten zestaw w sklepie?', type: 'yes_no', required: true },
      { id: 'price', text: 'Ile zapłaciłbyś za ten zestaw?', type: 'choice', options: ['Poniżej 100 zł', '100–150 zł', '150–200 zł', 'Powyżej 200 zł'], required: true },
      { id: 'style', text: 'Co najbardziej ci się w nim podoba?', type: 'text', required: false },
    ]),
    autoApprove: false,
  },
  {
    slug: 'uk',
    status: 'demo',
    brandName: 'Cardio Bunny UK',
    retailPartner: '',
    market: 'en',
    heroTitle: 'Your Design. Made Real.',
    heroSubhead: 'No experience needed. Use AI, sketch it, or just snap it. If the community loves it, we make it real.',
    ctaText: 'SEE THE DEMO / REGISTER INTEREST',
    deadline: '2026-05-31',
    accentColor: '#e8325a',
    pageBg: '',
    logoUrl: '/cardio-bunny-logo.png',
    heroImageUrl: '/hero-image.png',
    brief: 'Design a matching activewear set for the UK market. The community votes, and the top concept may go into production with a UK retail partner.',
    guidelines: JSON.stringify([
      'Submit as JPG, PNG, or PDF.',
      'Design must include a matching top and leggings set.',
      'All styles welcome — minimalist to bold.',
      'Include a short description of your inspiration (max 100 words).',
    ]),
    prizes: JSON.stringify([
      { style: 'top', badge: 'TOP 10', cash: '', description: 'Example — top 10 designs may be featured by the brand and retail partner.' },
      { style: 'grand', badge: '🏆 Grand Winner', cash: '£2,000', description: 'Global exposure across brand channels worldwide, press feature in fashion and lifestyle media, and a professional photo shoot of the winning design.' },
      { style: 'special', badge: '🛍 Retail Partner', cash: '', description: 'Example — the winning design may be sold through a national UK retail partner. Partner TBA.' },
    ]),
    questions: JSON.stringify([
      { id: 'buy', text: 'Would you buy this set in a store?', type: 'yes_no', required: true },
      { id: 'price', text: 'What would you pay for this set?', type: 'choice', options: ['Under £20', '£20–£40', '£40–£60', 'Over £60'], required: true },
      { id: 'style', text: 'What do you love most about this design?', type: 'text', required: false },
    ]),
    autoApprove: false,
  },
  {
    slug: 'turkiye',
    status: 'demo',
    brandName: 'Cardio Bunny Türkiye',
    retailPartner: '',
    market: 'tr',
    heroTitle: 'Tasarımın. Gerçek Olsun.',
    heroSubhead: 'Deneyim gerekmez. Yapay zeka kullan, çiz veya fotoğrafla. Topluluk beğenirse, gerçeğe dönüştürürüz.',
    ctaText: "DEMO'YU İNCELE / BİLDİRİM AL",
    deadline: '2026-05-31',
    accentColor: '#e8325a',
    pageBg: '',
    logoUrl: '/cardio-bunny-logo.png',
    heroImageUrl: '/hero-image.png',
    brief: 'Türkiye pazarı için eşleşen bir spor giyim seti tasarla. Topluluk oy verir ve en iyi konsept bir perakende ortağıyla üretime girebilir.',
    guidelines: JSON.stringify([
      'JPG, PNG veya PDF olarak gönder.',
      'Tasarım eşleşen top ve tayt içermelidir.',
      'Tüm stiller kabul edilir — minimalistten cesura.',
      'İlhamının kısa bir açıklamasını ekle (maks. 100 kelime).',
    ]),
    prizes: JSON.stringify([
      { style: 'top', badge: 'İLK 10', cash: '', description: 'Örnek — ilk 10 tasarım marka ve perakende ortağı tarafından öne çıkarılabilir.' },
      { style: 'grand', badge: '🏆 Büyük Kazanan', cash: '~125.000 TRY', description: 'Marka kanallarında küresel sergileme, moda medyasında basın haberi ve kazanan tasarım için profesyonel fotoğraf çekimi.' },
      { style: 'special', badge: '🛍 Perakende Ortağı', cash: '', description: 'Örnek — kazanan tasarım ulusal bir perakende ortağı aracılığıyla satılabilir. Ortak duyurusu yakında.' },
    ]),
    questions: JSON.stringify([
      { id: 'buy', text: 'Bu seti bir mağazada satın alır mıydın?', type: 'yes_no', required: true },
      { id: 'price', text: 'Bu set için ne kadar öderdin?', type: 'choice', options: ['500 TL altı', '500–750 TL', '750–1000 TL', '1000 TL üzeri'], required: true },
      { id: 'style', text: 'Bu tasarımda en çok neyi seviyorsun?', type: 'text', required: false },
    ]),
    autoApprove: false,
  },
  {
    slug: 'konkerz',
    status: 'demo',
    brandName: 'Konkerz',
    retailPartner: '',
    market: 'en',
    heroTitle: 'Design the Legend.',
    heroSubhead: "The Grumpy Grandpa is coming to Konkerz Battleballs. We want YOUR vision of the grumpiest, meanest, most battle-hardened old-timer ever swung on a rope. Best design wins.",
    ctaText: '💥 SUBMIT YOUR CHARACTER',
    deadline: '2026-05-31',
    accentColor: '#ff6b00',
    pageBg: '#1a0800',
    logoUrl: '/konkerz-logo.png',
    heroImageUrl: '/konkerz-hero.png',
    brief: 'Design the hero character for the Grumpy Grandpa Battleball. He needs to look battle-hardened, grumpy, and legendary. Make him mean. Make him iconic.',
    guidelines: JSON.stringify([
      'Submit your character design as JPG, PNG, or PDF.',
      'Show the face and key character features clearly.',
      'All art styles welcome — cartoon, realistic, sketch, digital.',
      'Include a short backstory for your Grumpy Grandpa (max 100 words).',
    ]),
    prizes: JSON.stringify([
      { style: 'top', badge: 'TOP 10', cash: '', description: 'Your character featured in the Konkerz Hall of Fame gallery and across all Konkerz socials.' },
      { style: 'grand', badge: '🏆 Grand Winner', cash: '£1,000', description: 'Your Grumpy Grandpa character produced as an official Konkerz Battleball and sold worldwide. Your name on the packaging of every ball sold. Spotlighted in the official Konkerz product launch campaign.' },
    ]),
    questions: JSON.stringify([
      { id: 'buy', text: 'Would you buy this Battleball?', type: 'yes_no', required: true },
      { id: 'vibe', text: 'What is the best thing about this character?', type: 'choice', options: ['The face / expression', 'The art style', 'The backstory concept', 'All of it'], required: false },
    ]),
    autoApprove: false,
  },
  {
    slug: 'swomp',
    status: 'demo',
    brandName: 'SWOMP WATER+',
    retailPartner: '',
    market: 'en',
    heroTitle: 'Design the Back of the Can.',
    heroSubhead: 'Create an original artwork for the back panel of a SWOMP WATER+ can. The community votes. The winner gets printed.',
    ctaText: '🌿 SUBMIT YOUR DESIGN',
    deadline: '2026-05-31',
    accentColor: '#5a9a5c',
    pageBg: '#0d1a0f',
    logoUrl: '/swomp-logo.png',
    heroImageUrl: '/swomp-hero.png',
    brief: 'Design an original artwork for the back panel of a SWOMP WATER+ electrolyte water can. The artwork should feel fresh, natural, and energetic — capturing the SWOMP brand spirit.',
    guidelines: JSON.stringify([
      'Submit as JPG, PNG, or PDF.',
      'Artwork should work on a tall rectangular panel (portrait orientation).',
      'Natural, energetic, and clean aesthetics preferred.',
      'Include a brief description of your concept (max 100 words).',
    ]),
    prizes: JSON.stringify([
      { style: 'top', badge: 'TOP 10', cash: '', description: 'Your design featured in the SWOMP WATER+ community gallery and shared across all channels.' },
      { style: 'grand', badge: '🏆 Grand Winner', cash: '€1,000', description: 'Your artwork printed on the back panel of the SWOMP WATER+ production can — in stores. Your name on every can that carries your design. Full profile feature across SWOMP WATER+ social and press channels.' },
    ]),
    questions: JSON.stringify([
      { id: 'buy', text: 'Would you buy this can based on the design?', type: 'yes_no', required: true },
      { id: 'feel', text: 'What feeling does this design give you?', type: 'choice', options: ['Fresh / natural', 'Energetic', 'Calm / hydrating', 'Bold / striking'], required: false },
    ]),
    autoApprove: false,
  },
]

export async function POST() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const results = []
  for (const demo of DEMOS) {
    try {
      const existing = await prisma.loop.findUnique({ where: { slug: demo.slug } })
      if (existing) {
        results.push({ slug: demo.slug, status: 'skipped — already exists' })
        continue
      }
      await prisma.loop.create({ data: demo })
      results.push({ slug: demo.slug, status: 'created' })
    } catch (err: unknown) {
      results.push({ slug: demo.slug, status: 'error', error: err instanceof Error ? err.message : String(err) })
    }
  }

  return NextResponse.json({ results })
}
