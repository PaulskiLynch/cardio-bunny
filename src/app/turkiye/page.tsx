import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function TurkiyePage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'turkiye' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page">
      <div className="demo-notice">⚠️ Yalnızca Demo — Bu aktif bir yarışma değildir.</div>

      <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '20px 24px' }}>
        <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ maxHeight: 56, maxWidth: '60%', objectFit: 'contain' }} />
        <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555' }}>Türkiye</div>
      </section>

      <section className="hero">
        <div>
          <h1>Tasarımın. Gerçek Olsun.</h1>
          <div className="subhead">Deneyim gerekmez. Yapay zeka kullan, çiz veya fotoğrafla. Topluluk beğenirse, gerçeğe dönüştürürüz.</div>
          <div className="hero-actions">
            <Link className="cta" href="/turkiye/submit">🚀 TASARIMA BAŞLA / ŞİMDİ KATIL</Link>
          </div>
          <img src="/hero-image.png" alt="" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" label="BAŞVURULAR KAPANIYOR" />
      </section>

      <section className="section">
        <h2>Ödüller</h2>
        <div className="prize-section">
          <div className="prize-top10">
            <div className="prize-top10-badge">İLK 10</div>
            <div className="prize-top10-text">Cardio Bunny küresel tasarım ekibiyle 1 tam gün eğitim.</div>
          </div>
          <div className="prize-grand">
            <div className="prize-grand-header">🏆 Büyük Kazanan</div>
            <div className="prize-cash">~125.000 TRY</div>
            <div className="prize-items">
              <div className="prize-item">
                <div className="prize-item-icon">🌍</div>
                <div className="prize-item-text"><strong>Küresel Şöhret:</strong> Adın ve tasarımın uluslararası Cardio Bunny showroomlarında sergilenecek. 🇺🇸 🇦🇪 🇮🇳 🇬🇧 🇨🇦</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📰</div>
                <div className="prize-item-text"><strong>Basın:</strong> Önde gelen bir moda dergisinde özel profil makalesi.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📸</div>
                <div className="prize-item-text"><strong>Prodüksiyon:</strong> Miami'de kazanan koleksiyonun profesyonel fotoğraf çekimi.</div>
              </div>
            </div>
          </div>
          <div className="prize-tba">
            <div className="prize-item-icon">🛍</div>
            <div className="prize-tba-label">Perakende Ortağı: Açıklanacak — Tasarımın ulusal mağazalarda satılabilir. Ortak duyurusu yakında.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Topluluk Favorileri</h2>
          <div className="card-text">Görmek istediğin tasarımlara oy ver.</div>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 700 }}>
              Henüz onaylı başvuru yok. İlk sen ol!
            </div>
          )}
          {top4.map(entry => (
            <VoteCard
              key={entry.id}
              entryId={entry.entryId}
              setName={entry.setName}
              designerName={entry.designerName}
              imageUrl={entry.imageUrl}
              initialVotes={entry.voteCount}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/designs?competition=turkiye" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>Tümünü gör</Link>
        </div>
      </section>

      <section className="section">
        <h2>Yarat. Paylaş. Kazan.</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="card-title">YÜKLE</div>
            <div className="card-text">Top ve Tayt fikrini paylaş. Yapay zeka, çizim veya fotoğraf kabul edilir.</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="card-title">PAYLAŞ</div>
            <div className="card-text">Resmi numaranı al ve oy toplamak için linkini paylaş.</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="card-title">GLOBAL OL</div>
            <div className="card-text">En iyi tasarımlar Cardio Bunny tarafından üretilir ve satılır.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Hayatını değiştirmeye hazır mısın?</h2>
        <Link className="cta cta-dark" href="/turkiye/submit">AKADEMİYE KATIL</Link>
        <div className="footer-links">
          <Link href="/designs?competition=turkiye">Tüm Tasarımlar</Link>
          <Link href="/help">SSS ve Kurallar</Link>
        </div>
      </section>
    </main>
  )
}
