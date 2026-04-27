'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface ConfirmedEntry {
  entryId: string
}

export default function TurkiyeSubmitPage() {
  const [preview, setPreview]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed]   = useState<ConfirmedEntry | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    if (!data.get('image') || !(data.get('image') as File).size) {
      setError('Lütfen bir tasarım görseli yükleyin.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/entries', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gönderim başarısız oldu')
      setConfirmed({ entryId: json.entryId })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Bir şeyler ters gitti')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="top-link" href="/turkiye">← Geri</Link>

      <div className="portal">
        <header className="portal-header">
          <div className="brand">Cardio Bunny Türkiye</div>
          <div className="phase">Faz 1: Açık Tasarım Çağrısı</div>
        </header>

        <div className="status-row">
          <div>Durum: 🟢 Başvurular Açık</div>
          <div>Numaranız: <span>{confirmed ? confirmed.entryId : 'OLUŞTURULUYOR...'}</span></div>
        </div>

        <div className="prompt-box">
          <div className="prompt-title">Görsel Yönergeleri</div>
          <p>Cardio Bunny için eşleşen bir kadın atletik Top ve Tayt seti moda tasarım konsept görseli oluşturun.</p>
          <div className="prompt-section-title">Görsel açıkça göstermelidir:</div>
          <ol className="prompt-list">
            <li><strong>Tam kıyafet:</strong> Eşleşen tam uzunlukta taytlarla birlikte bir spor top / crop top / spor sutyen.</li>
            <li><strong>Net ön görünüm:</strong> Kıyafeti ayakta duran bir model veya manken üzerinde önden, baştan ayağa gösterin.</li>
            <li><strong>Moda tasarım odağı:</strong> Temiz, sade arka plan: beyaz, açık gri, stüdyo veya minimal pist.</li>
            <li><strong>Gerçekçi spor giyim tarzı:</strong> Şık, dar kesim, sportif. Spor salonu, yoga, koşu veya günlük kullanıma uygun.</li>
            <li><strong>Güçlü görsel konsept:</strong> Eşsiz renkler, desenler, baskılar, paneller, file, dikişler, doku, logolar veya cesur stil.</li>
            <li><strong>Dikkat dağıtıcı unsur yok:</strong> Ekstra kıyafet, çanta, ağır aksesuar, dağınık arka plan, metin veya filigran yok.</li>
            <li><strong>Üretime uygun:</strong> Cardio Bunny koleksiyonu olarak üretilip satılabilir görünmelidir.</li>
          </ol>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="competition" value="turkiye" />
            <div className="form-section">
              <label className="form-label" htmlFor="setName">
                1. Bu sete ne ad veriyorsunuz?
              </label>
              <input id="setName" name="setName" type="text" placeholder="örn. Tropikal Enerji" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="designerName">
                2. Adınız
              </label>
              <input id="designerName" name="designerName" type="text" placeholder="Adınız veya takma adınız" required />
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="contact">
                3. E-posta veya WhatsApp
                <span className="hint">Kazanırsanız sizinle iletişime geçebilmemiz için</span>
              </label>
              <input id="contact" name="contact" type="text" placeholder="email@example.com veya +90..." required />
            </div>

            <div className="form-section">
              <div className="form-label">
                4. Tasarımınızı yükleyin
                <span className="hint">Bir top ve tayt göstermelidir</span>
              </div>
              <div className="upload-box" onClick={() => fileRef.current?.click()}>
                {preview
                  ? <img src={preview} alt="Önizleme" />
                  : <>
                      <div className="upload-plus">+</div>
                      <div className="upload-main">RESMİNİZİ BURAYA SÜRÜKLEYIN</div>
                    </>}
                <input
                  ref={fileRef}
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                />
              </div>
              <div className="upload-rule">Yapay zeka görselleri, çizimler veya ayna selfileri kabul edilmektedir. Gönderdiğiniz tüm içeriklerin haklarına sahip olmalısınız — üçüncü taraf karakterler, ünlüler veya tescilli imgeler içermeyin.</div>
              <div className="upload-rule"><strong>Not:</strong> Yüklenen tüm görseller yayına girmeden önce moderatörler tarafından incelenir.</div>
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="hook">
                5. Bu neden harika?
              </label>
              <textarea id="hook" name="hook" placeholder="Bize kısa bir cümleyle anlatın..." required />
            </div>

            <div className="form-section">
              {error && <div style={{ color: '#c00', marginBottom: 12, fontWeight: 700 }}>{error}</div>}
              <button className="submit-button" type="submit" disabled={submitting}>
                {submitting ? 'GÖNDERİLİYOR...' : '🚀 TASARIMINI GÖNDER'}
              </button>
              <div className="button-note">Göndererek, bunun kendi çalışmanız olduğunu ve gerekli tüm haklara sahip olduğunuzu (yapay zeka içerikleri dahil) onaylıyorsunuz. Seçilen girdiler için tasarımınızı görüntüleme, tanıtma ve teknik, yasal ve ticari incelemeye tabi olarak üretime geliştirme amacıyla lisans veriyorsunuz. <a href="/legal" style={{ color: 'inherit' }}>Yarışma şartlarını ve gizlilik politikasını</a> kabul ediyorsunuz.</div>
            </div>
          </form>
        ) : (
          <div className="form-section">
            <div className="confirmation">
              <div className="stamp">
                <div className="stamp-title">GÖNDERİLDİ!</div>
                <div className="stamp-id">KATILIM NO: {confirmed.entryId}</div>
              </div>
              <div className="live-text">
                Başvurunuz moderatörlere gönderildi. Onaylandıktan sonra oy toplamak için paylaşabileceğiniz bir link alacaksınız.
              </div>
              <button className="copy-button" disabled>LİNK ONAYDAN SONRA KULLANILABILIR</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
