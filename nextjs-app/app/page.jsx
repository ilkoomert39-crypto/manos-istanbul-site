import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import RecentlyViewed from '@/components/RecentlyViewed';

export const metadata = {
  title: 'Manos İstanbul — 14K Altın Mücevher, Kapalıçarşı',
  description: "Kapalıçarşı'da üç kuşaktır el işçiliğiyle üretilen 14 ayar altın mücevherler. Yüzük, kolye, küpe ve bileklik.",
};

const TESTIMONIALS = [
  { ad: 'Zeynep A.', sehir: 'İstanbul', yildiz: 5, text: 'Luna Eye yüzüğü aldım, üç aydır her gün takıyorum. Ayar belgesi ve kutulama muhteşemdi. Gerçek anlamda lüks deneyim.' },
  { ad: 'Selin K.', sehir: 'Ankara', yildiz: 5, text: 'Görüntülü danışmanlık ile taş seçimini yaptık. Kolye beklediğimden çok daha güzel geldi. Kesinlikle tekrar alacağım.' },
  { ad: 'Melis T.', sehir: 'İzmir', yildiz: 5, text: 'Annem için hediye aldım. Ambalajı açarken ikimiz de duygulandık. Kalitesi fiyatının çok üzerinde.' },
];

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 6);
  const newArrivals = PRODUCTS.filter(p => p.tag === 'Yeni' || p.tag === 'Manos Gold').slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <HeroSlider />

      {/* USP STRIP */}
      <section className="usp-strip">
        <div className="wrap usp-list">
          {[
            { n: '01', title: 'Ücretsiz Kargo', text: '20.000 ₺ üzeri yurtiçi; yurtdışına UPS ile 2–4 iş günü.' },
            { n: '02', title: 'Görüntülü Danışmanlık', text: 'Ölçü ve taş seçimini uzman eşliğinde canlı yapın.' },
            { n: '03', title: 'Orijinallik Sertifikası', text: 'Her ürünle 585 ayar belgesi teslim edilir.' },
          ].map(u => (
            <div key={u.n} className="usp-item">
              <span className="n">{u.n}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KATEGORİLER */}
      <section className="section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Koleksiyonlar</span>
              <h2 className="display" style={{fontSize:'clamp(1.9rem,3.4vw,2.7rem)',marginTop:'.5rem'}}>Dört kategori.</h2>
            </div>
            <p style={{maxWidth:'36ch',color:'var(--stone)',fontSize:'.94rem'}}>Her kategori, atölyemizde el işçiliğiyle üretilen kendi karakterini taşır.</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c, idx) => (
              <Link className="cat-card" href={`/urunler?kategori=${c.slug}`} key={c.slug}>
                <img src={c.img} alt={c.name} loading="lazy" />
                <span className="cat-no">{String(idx + 1).padStart(2, '0')} / 04</span>
                <span className="cat-body">
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-sub">{c.desc}</span>
                  <span className="cat-link">Keşfedin →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YENİ GELENLER */}
      <section className="section" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Yeni Gelenler</span>
              <h2 className="display" style={{fontSize:'clamp(1.9rem,3.4vw,2.7rem)',marginTop:'.5rem'}}>Atölyeden yeni çıkanlar.</h2>
            </div>
            <Link href="/urunler" className="link-arrow" style={{alignSelf:'flex-end',borderBottom:'1px solid var(--ink)',paddingBottom:'.15rem'}}>
              Tümünü Gör →
            </Link>
          </div>
          <div className="bento">
            {featured.map((p) => (
              <ProductCard product={p} variant={p.big ? 'big' : 'reg'} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO / ALINTI */}
      <section className="quote-sec">
        <div className="quote-grid">
          <div className="quote-img">
            <img src="https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Manos İstanbul atölye" />
          </div>
          <div className="quote-body">
            <span className="quote-mark">&ldquo;</span>
            <p className="q">Bir parça bitmeden önce üç kez tartılır: dökümden sonra, taş oturmadan önce, ciladan sonra.</p>
            <span className="quote-cite">— Atölye, Kapalıçarşı · 1962'den bu yana</span>
            <Link href="/hakkimizda" className="link-arrow" style={{color:'var(--gold)',borderColor:'var(--gold)',marginTop:'1rem',display:'inline-flex',gap:'.5rem',alignItems:'center',borderBottom:'1px solid',paddingBottom:'.2rem'}}>
              Hikayemizi okuyun →
            </Link>
          </div>
        </div>
      </section>

      {/* ÖZEL KOLEKSİYON BANNER */}
      <section className="special-banner">
        <div className="wrap sb-inner">
          <div>
            <span className="eyebrow" style={{color:'var(--gold)'}}>Sınırlı Sayıda</span>
            <h2 className="display" style={{fontSize:'clamp(1.9rem,3.4vw,2.8rem)',marginTop:'.5rem',color:'var(--paper)'}}>
              Manos Gold Koleksiyonu
            </h2>
            <p style={{color:'#C9BFAE',marginTop:'.8rem',maxWidth:'44ch',lineHeight:1.7}}>
              Her parça numaralı, her biri kendi sertifikasıyla teslim edilir. Kuyumculuğun özeti.
            </p>
          </div>
          <div className="sb-actions">
            <Link href="/urunler?kategori=ozel-koleksiyon" className="btn-block sb-btn">
              Koleksiyonu Keşfet →
            </Link>
            <a href="https://manosistanbul.com/goruntulu-urun-danismanligi" className="link-arrow" style={{color:'var(--gold)',borderColor:'var(--gold)',borderBottom:'1px solid',paddingBottom:'.15rem'}}>
              Görüntülü Danışmanlık
            </a>
          </div>
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section className="section testimonials-section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Yorumlar</span>
              <h2 className="display" style={{fontSize:'clamp(1.9rem,3.4vw,2.7rem)',marginTop:'.5rem'}}>Müşterilerimiz anlatıyor.</h2>
            </div>
            <div className="tst-rating">
              <span className="tst-stars">★★★★★</span>
              <span className="mono" style={{fontSize:'.76rem',color:'var(--stone)'}}>4,9 / 5 · 240+ değerlendirme</span>
            </div>
          </div>
          <div className="tst-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tst-card">
                <div className="tst-stars-row">{'★'.repeat(t.yildiz)}</div>
                <p className="tst-text">{t.text}</p>
                <div className="tst-meta">
                  <span className="tst-name">{t.ad}</span>
                  <span className="tst-city mono">{t.sehir}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GÜVEN ROZETLERI */}
      <section className="trust-bar">
        <div className="wrap trust-inner">
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M16 3L5 8v8c0 7 4.8 12.5 11 14 6.2-1.5 11-7 11-14V8L16 3z"/>
              <path d="M11 16l3.5 3.5L21 13"/>
            </svg>
            <span className="trust-label">256-bit SSL</span>
            <span className="trust-sub">Güvenli ödeme altyapısı</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 16a10 10 0 1 0 10-10"/>
              <path d="M6 8v8h8"/>
            </svg>
            <span className="trust-label">14 Gün İade</span>
            <span className="trust-sub">Koşulsuz iade garantisi</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M16 4l2.9 8.7H28l-7.4 5.4 2.8 8.6L16 21.6l-7.4 5.1 2.8-8.6L4 12.7h9.1z"/>
            </svg>
            <span className="trust-label">Ayar Sertifikası</span>
            <span className="trust-sub">Her ürünle 585 belgesi</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M8 10c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
              <path d="M6 14h20v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V14z"/>
              <path d="M13 20c0-1.7 1.3-3 3-3s3 1.3 3 3v6h-6v-6z"/>
            </svg>
            <span className="trust-label">El Yapımı</span>
            <span className="trust-sub">Kapalıçarşı atölyesi</span>
          </div>
          <div className="trust-item">
            <svg className="trust-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M2 20h20V10H2z"/>
              <path d="M22 14h4l4 6v4h-8"/>
              <circle cx="8" cy="24" r="3"/>
              <circle cx="24" cy="24" r="3"/>
            </svg>
            <span className="trust-label">Hızlı Kargo</span>
            <span className="trust-sub">1–3 iş günü teslimat</span>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      {/* INSTAGRAM / VİSUAL GRID */}
      <section className="section insta-section">
        <div className="wrap">
          <div className="section-top" style={{marginBottom:'2rem'}}>
            <div>
              <span className="eyebrow">@manosistanbul</span>
              <h2 className="display" style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',marginTop:'.4rem'}}>Instagram'da takip edin.</h2>
            </div>
            <a href="https://instagram.com/manosistanbul" target="_blank" rel="noopener" className="link-arrow" style={{alignSelf:'flex-end',borderBottom:'1px solid var(--ink)',paddingBottom:'.15rem'}}>
              Profili Ziyaret Et →
            </a>
          </div>
          <div className="insta-grid">
            {[32382386, 8184263, 15272716, 8706570, 10799225, 12144990].map((id, i) => (
              <a key={id} href="https://instagram.com/manosistanbul" target="_blank" rel="noopener" className="insta-cell">
                <img src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`} alt="" loading="lazy" />
                <div className="insta-hover">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:22,height:22}}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
