export const metadata = {
  title: 'Hakkımızda — Manos İstanbul',
  description: 'Kapalıçarşı\'da üç kuşaktır süregelen ince mücevher atölyemiz hakkında.',
};

const TIMELINE = [
  { year: '1962', title: 'Kuruluş', text: 'Niyazi Manos, Kapalıçarşı\'nın taş döşeli sokaklarında küçük bir atölye açar. İlk parça: ince zincir bileklik.' },
  { year: '1988', title: 'İkinci Kuşak', text: 'Oğlu Hasan Manos atölyeyi devralır. Yeşil altın ve rose altın tekniklerini kataloğa ekler.' },
  { year: '2009', title: 'Manos Gold', text: 'Sınırlı sayıda imza seri başlar. Her parça numaralı, her biri kendi sertifikasıyla teslim edilir.' },
  { year: '2024', title: 'Dijital Atölye', text: 'Üçüncü kuşak atölyeyi Avrupa ve Körfez\'e taşır. Kapalıçarşı ruhu, küresel teslimat.' },
];

const VALUES = [
  { no: '01', title: 'El İşçiliği', text: 'Her parça, kalıpla değil elle şekillendirilir. Çekiç izi, ayarın kanıtıdır.' },
  { no: '02', title: '14K Standart', text: '585 damgası olmayan hiçbir parça atölyeden çıkmaz. Bu tartışılmaz.' },
  { no: '03', title: 'Şeffaflık', text: 'Gramaj, taş kalitesi ve üretim süreci her ürün sayfasında yer alır.' },
  { no: '04', title: 'Süreklilik', text: 'Üç kuşaktır aynı tezgâh, aynı teknik. Değişen sadece katalog.' },
];

export default function HakkimizdaPage() {
  return (
    <main>
      {/* HERO */}
      <div className="about-hero">
        <div className="ah-img">
          <img
            src="https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Manos İstanbul Atölye"
          />
          <div className="ah-overlay" />
        </div>
        <div className="ah-content wrap">
          <span className="eyebrow">Hakkımızda</span>
          <h1 className="display ah-title">
            Kapalıçarşı'da<br /><em>üç kuşak.</em>
          </h1>
          <p className="ah-sub">
            1962'den bu yana aynı tezgâhta, aynı titizlikle.<br />
            14 ayar altın ve el işçiliği — başkası değil.
          </p>
        </div>
        <div className="ah-stamp">
          <div className="hallmark" style={{'--sz':'96px',fontSize:'.6rem'}}>
            <b style={{fontSize:'.68rem'}}>585</b>
            <span style={{fontSize:'.36rem'}}>KAPALIÇARŞI</span>
          </div>
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="about-manifesto">
        <div className="wrap am-grid">
          <div className="am-left">
            <span className="eyebrow">Manifesto</span>
            <h2 className="display am-title">
              Bir parça bitmeden önce<br /><em>üç kez tartılır.</em>
            </h2>
          </div>
          <div className="am-right">
            <p>Dökümden sonra, taş oturmadan önce, ciladan sonra. Bu üç tartı sadece gramaj kontrolü değil — bir ritüel. Her kontrol, atölyenin yarım asırlık hafızasını taşır.</p>
            <p>Manos İstanbul'da hiçbir parça seri üretim bantından çıkmaz. Kalıp kullanırız, evet — ama kalıp sadece başlangıçtır. Geri kalanı; zımpara, çekiç, lupa ve sabırdır.</p>
            <p>14 ayar altın seçmemizin nedeni basit: nem almaz, solmaz, cilde zarar vermez. 585 damgası olmayan hiçbir parça atölyemizden çıkmaz.</p>
          </div>
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="about-values">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">İlkelerimiz</span>
              <h2 className="display" style={{fontSize:'clamp(1.8rem,3vw,2.6rem)',marginTop:'.5rem'}}>Dört değer, altmış yıl.</h2>
            </div>
          </div>
          <div className="av-grid">
            {VALUES.map(v => (
              <div key={v.no} className="av-card">
                <span className="av-no eyebrow">{v.no}</span>
                <h3 className="av-title">{v.title}</h3>
                <p className="av-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARİHÇE */}
      <section className="about-timeline">
        <div className="wrap">
          <span className="eyebrow">Tarihçe</span>
          <h2 className="display" style={{fontSize:'clamp(1.8rem,3vw,2.6rem)',marginTop:'.5rem',marginBottom:'3.5rem'}}>
            Altmış yılın kronolojisi.
          </h2>
          <div className="atl-list">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="atl-item">
                <div className="atl-year mono">{t.year}</div>
                <div className="atl-line">
                  <div className="atl-dot" />
                  {i < TIMELINE.length - 1 && <div className="atl-track" />}
                </div>
                <div className="atl-body">
                  <h3 className="atl-title">{t.title}</h3>
                  <p className="atl-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATÖLYE FOTOĞRAFI */}
      <section className="about-workshop">
        <div className="wrap aw-grid">
          <div className="aw-imgs">
            <img className="aw-img-main" src="https://images.pexels.com/photos/8184263/pexels-photo-8184263.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Atölye" />
            <img className="aw-img-sec" src="https://images.pexels.com/photos/10799225/pexels-photo-10799225.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Ürün detay" />
          </div>
          <div className="aw-text">
            <span className="eyebrow">Atölye</span>
            <h2 className="display" style={{fontSize:'clamp(1.8rem,3vw,2.4rem)',margin:'.6rem 0 1.2rem'}}>
              Kapalıçarşı,<br />Nuruosmaniye Caddesi.
            </h2>
            <p style={{color:'var(--stone)',lineHeight:1.75,marginBottom:'1rem'}}>
              Atölyemiz, Kapalıçarşı'nın en eski koridorlarından birinde, 1962'den bu yana aynı adreste. Tezgâhlar değişti, aletler modernleşti — ama teknik aynı.
            </p>
            <p style={{color:'var(--stone)',lineHeight:1.75}}>
              Ziyaret için randevu alabilir, görüntülü danışmanlık ile atölyeyi uzaktan gezebilirsiniz.
            </p>
            <div style={{display:'flex',gap:'1rem',marginTop:'1.8rem',flexWrap:'wrap'}}>
              <a href="https://manosistanbul.com/goruntulu-urun-danismanligi" className="btn-block" style={{maxWidth:220,justifyContent:'center',fontSize:'.82rem'}}>
                Görüntülü Danışmanlık
              </a>
              <a href="/iletisim" className="link-arrow" style={{alignSelf:'center',borderBottom:'1px solid var(--ink)',paddingBottom:'.15rem'}}>
                Ziyaret Randevusu →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RAKAMLAR */}
      <section className="about-numbers">
        <div className="wrap an-grid">
          {[
            { n: '62+', label: 'Yıl Deneyim' },
            { n: '3', label: 'Kuşak Ustası' },
            { n: '145+', label: 'Aktif Ürün' },
            { n: '12K+', label: 'Mutlu Müşteri' },
          ].map(s => (
            <div key={s.label} className="an-item">
              <span className="an-num display">{s.n}</span>
              <span className="an-label eyebrow">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
