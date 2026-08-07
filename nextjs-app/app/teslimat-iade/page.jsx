export const metadata = { title: 'Teslimat & İade — Manos İstanbul' };

const SECTIONS = [
  {
    title: 'Teslimat Koşulları',
    items: [
      '20.000 ₺ ve üzeri siparişlerde yurtiçi kargo ücretsizdir.',
      'Yurtiçi teslimat: sipariş onayından itibaren 1–3 iş günü.',
      'Yurtdışı teslimat: UPS ile 2–5 iş günü (ücrete tabidir).',
      'Siparişler hafta içi 15:00\'e kadar verildiğinde aynı gün kargoya verilir.',
      'Kargo takip numarası, gönderi sonrası SMS ve e-posta ile iletilir.',
    ],
  },
  {
    title: 'İade & Değişim',
    items: [
      'Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz.',
      'İade edilen ürün kullanılmamış, orijinal paketinde ve sertifikasıyla birlikte olmalıdır.',
      'Özel sipariş ve kişiselleştirilmiş ürünler (gravür, ölçü değişikliği) iade kapsamı dışındadır.',
      'Onaylı iade için info@manosistanbul.com adresine yazmanız yeterlidir.',
      'Para iadesi, ürün bize ulaştıktan sonra 5 iş günü içinde yapılır.',
    ],
  },
  {
    title: 'Garanti',
    items: [
      'Tüm ürünler 2 yıl Manos İstanbul garantisi kapsamındadır.',
      'Ayar belgesi (585 sertifikası) her ürünle birlikte teslim edilir.',
      'Üretim hatası kaynaklı sorunlarda ücretsiz onarım veya değişim yapılır.',
      'Normal kullanım yıpranması ve kaza kaynaklı hasarlar garanti kapsamı dışındadır.',
    ],
  },
];

export default function TeslimatPage() {
  return (
    <main>
      <div className="policy-hero">
        <div className="wrap">
          <span className="eyebrow">Bilgi</span>
          <h1 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',marginTop:'.6rem',color:'var(--paper)'}}>Teslimat & İade</h1>
        </div>
      </div>
      <div className="wrap policy-body">
        {SECTIONS.map(s => (
          <div key={s.title} className="policy-section">
            <h2 className="policy-heading">{s.title}</h2>
            <ul className="policy-list">
              {s.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
        <div className="policy-cta">
          <p>Sorularınız için <a href="/iletisim">iletişim formunu</a> kullanabilir veya <a href="tel:+902125229262">+90 212 522 92 62</a> numarasını arayabilirsiniz.</p>
        </div>
      </div>
    </main>
  );
}
