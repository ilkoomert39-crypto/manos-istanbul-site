'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { getProductBySlug, getRelated, TL } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const COLORS = [
  { key: 'sari', label: 'Sarı Altın', cls: 'sw-sari' },
  { key: 'yesil', label: 'Yeşil Altın', cls: 'sw-yesil' },
  { key: 'rose', label: 'Rose Altın', cls: 'sw-rose' },
];
const SIZES = Array.from({ length: 11 }, (_, i) => 7 + i);

// Rastgele stok & FOMO
function getRand(slug, min, max) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h << 5) - h + slug.charCodeAt(i);
  return min + (Math.abs(h) % (max - min + 1));
}

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);
  const { addItem, toggleFav, isFav, addRecentlyViewed } = useCart();

  const [imgI, setImgI] = useState(0);
  const [color, setColor] = useState(COLORS[0].key);
  const [size, setSize] = useState(null);
  const [sizeErr, setSizeErr] = useState(false);
  const [sizeShake, setSizeShake] = useState(false);
  const [qty, setQty] = useState(1);
  const [mbarOn, setMbarOn] = useState(false);
  const [sizeModal, setSizeModal] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

  const liked = product ? isFav(product.slug) : false;
  const isRing = product?.kategori === 'yuzukler';
  const stok = product ? getRand(product.slug, 2, 12) : 0;
  const viewers = product ? getRand(product.slug + 'v', 3, 18) : 0;
  const weekSales = product ? getRand(product.slug + 'w', 4, 24) : 0;
  const lowStock = stok <= 4;

  useEffect(() => {
    setImgI(0); setColor(COLORS[0].key); setSize(null); setQty(1); setImgLoaded(false);
  }, [params.slug]);

  useEffect(() => {
    if (product) addRecentlyViewed(product);
  }, [params.slug]);

  useEffect(() => {
    const fn = () => setMbarOn(window.scrollY > 440);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightbox) return;
    const fn = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setImgI(i => (i + 1) % product.images.length);
      if (e.key === 'ArrowLeft') setImgI(i => (i - 1 + product.images.length) % product.images.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox, product]);

  if (!product) {
    return (
      <main className="wrap" style={{ padding: '6rem 3rem', textAlign: 'center' }}>
        <h1 className="display">Ürün bulunamadı.</h1>
        <Link href="/urunler" className="link-arrow" style={{ borderColor: 'var(--ink)', color: 'var(--ink)', marginTop: '1rem', display: 'inline-flex', borderBottom: '1px solid', paddingBottom: '.15rem' }}>
          Tüm ürünlere dön →
        </Link>
      </main>
    );
  }

  const related = getRelated(product.slug, 4);

  function handleAdd() {
    if (isRing && !size) {
      setSizeErr(true);
      setSizeShake(true);
      setTimeout(() => setSizeShake(false), 600);
      document.getElementById('size-select')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const colorLabel = COLORS.find(c => c.key === color).label;
    const meta = isRing ? `${colorLabel} · Ölçü ${size}` : colorLabel;
    addItem(product, { qty, meta });
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.desc, url });
    } else {
      navigator.clipboard.writeText(url);
      setShareMsg('Link kopyalandı!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.desc,
    image: product.images,
    sku: `Manos-${String(product.id).padStart(4, '0')}`,
    brand: { '@type': 'Brand', name: 'Manos İstanbul' },
    offers: {
      '@type': 'Offer',
      url: `https://manos-istanbul-site.vercel.app/urunler/${product.slug}`,
      priceCurrency: 'TRY',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main>
        <nav className="crumbs" aria-label="Gezinme">
          <Link href="/">Ana Sayfa</Link><span>/</span>
          <Link href={`/urunler`}>Koleksiyon</Link><span>/</span>
          <Link href={`/urunler?kategori=${product.kategori}`}>{product.kind.split(' · ')[0]}</Link><span>/</span>
          <b>{product.name}</b>
        </nav>

        <div className="pdp">
          {/* GALERİ */}
          <section className="gallery" aria-label="Ürün görselleri">
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={i} className={i === imgI ? 'on' : ''} onClick={() => { setImgI(i); setImgLoaded(false); }}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="stage">
              {!imgLoaded && <div className="img-skeleton"/>}
              <img
                src={product.images[imgI]}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity .3s' }}
              />
              <button className="stage-zoom" aria-label="Büyüt" onClick={() => setLightbox(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </button>
              <div className="hallmark">
                <b>585</b><span>14K El İşç.</span>
              </div>
            </div>
            <div className="note-line">
              <svg viewBox="0 0 24 24"><path d="M12 3l7 8-7 10-7-10 7-8Z"/><path d="M5 11h14"/></svg>
              <p><b>Atölyeden not:</b> Bu parça sipariş üzerine Kapalıçarşı atölyemizde sizin için üretilir. Taş elde seçilir, tek tek mıhlanır.</p>
            </div>
          </section>

          {/* BİLGİ */}
          <section className="info">
            <p className="kind">{product.kind} · Manos-{String(product.id).padStart(4, '0')}</p>
            <h1 className="display">{product.name}</h1>

            {/* FOMO bildirimleri */}
            <div className="pdp-fomo">
              {lowStock && (
                <div className="fomo-item fomo-stock">
                  <span className="fomo-dot red"/>
                  Son <b>{stok} adet</b> kaldı — hemen sipariş verin
                </div>
              )}
              <div className="fomo-item">
                <span className="fomo-dot green"/>
                <b>{viewers}</b> kişi şu an bu ürünü inceliyor
              </div>
              <div className="fomo-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--brass)" strokeWidth="1.4" style={{width:13,height:13}}><path d="M12 22V12M12 12l-4 4M12 12l4 4M6 8h12"/></svg>
                Bu hafta <b>{weekSales} kez</b> sipariş verildi
              </div>
            </div>

            <div className="price-row">
              <span className="price">{TL(product.price)}</span>
              <span className="price-note">KDV dahil · yurtiçi kargo ücretsiz</span>
            </div>
            <p className="desc">{product.desc}</p>

            {/* Stok badge */}
            <div className={`stock-badge ${lowStock ? 'stock-low' : 'stock-ok'}`}>
              {lowStock ? `⚠ Son ${stok} adet` : `✓ Stokta · ${stok} adet`}
            </div>

            {/* Renk */}
            <div className="opt">
              <div className="opt-head">
                <h4>Altın Rengi</h4>
                <span>{COLORS.find(c => c.key === color).label}</span>
              </div>
              <div className="swatches">
                {COLORS.map(c => (
                  <button key={c.key} className={`swatch ${c.cls} ${color === c.key ? 'on' : ''}`} aria-label={c.label} onClick={() => setColor(c.key)} />
                ))}
              </div>
            </div>

            {/* Yüzük ölçüsü */}
            {isRing && (
              <div className={`opt ${sizeShake ? 'shake' : ''}`} id="size-select">
                <div className="opt-head">
                  <h4>Yüzük Ölçüsü</h4>
                  <button onClick={() => setSizeModal(true)}>Ölçü Rehberi</button>
                </div>
                <div className="sizes">
                  {SIZES.map(s => (
                    <button key={s} className={size === s ? 'on' : ''} onClick={() => { setSize(s); setSizeErr(false); }}>{s}</button>
                  ))}
                </div>
                {sizeErr && <p style={{ color: '#B23A2E', fontSize: '.8rem', marginTop: '.4rem' }}>Lütfen bir ölçü seçin.</p>}
              </div>
            )}

            {/* Satın al */}
            <div className="buy-row">
              <div className="qty-lg">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="mono">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn-block" onClick={handleAdd}>
                Sepete Ekle — <span className="mono">{TL(product.price * qty)}</span>
              </button>
              <button
                className={`fav-btn ${liked ? 'liked' : ''}`}
                aria-label={liked ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                onClick={() => toggleFav(product)}
              >
                <svg viewBox="0 0 24 24" style={{ fill: liked ? 'var(--brass)' : 'none', stroke: liked ? 'var(--brass)' : 'var(--ink)' }}>
                  <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z"/>
                </svg>
              </button>
            </div>

            {/* Paylaş */}
            <div className="pdp-share">
              <button className="share-btn" onClick={handleShare}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{width:15,height:15}}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
                Paylaş
              </button>
              <a className="wa-ask" href={`https://wa.me/905455229262?text=Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`}>
                <svg viewBox="0 0 24 24" fill="#25D366" style={{width:15,height:15}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.541 4.063 1.487 5.776L0 24l6.39-1.676A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.72.975.992-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp'tan sorun
              </a>
              {shareMsg && <span className="share-feedback mono">{shareMsg}</span>}
            </div>

            {/* Spesifikasyon */}
            <div className="specs">
              <div><span>Ayar</span><span>14K · 585</span></div>
              <div><span>Ağırlık</span><span>~{product.weight}</span></div>
              <div><span>Üretim</span><span>5–7 iş günü</span></div>
              <div><span>Ürün Kodu</span><span>Manos-{String(product.id).padStart(4, '0')}</span></div>
              <div><span>Garanti</span><span>2 yıl Manos garantisi</span></div>
            </div>

            {/* Accordion */}
            <div className="acc">
              <details open>
                <summary>Bakım Önerileri</summary>
                <div>Parfüm, deniz suyu ve kimyasallardan uzak tutun; kullanmadığınızda kadife kesesinde saklayın. Yılda bir kez ücretsiz parlatma için atölyeye getirin.</div>
              </details>
              <details>
                <summary>Üretim &amp; Kargolama</summary>
                <div>Sipariş üzerine üretilir; süre 5–7 iş günüdür. Yurtiçi teslimat 1–2, yurtdışı (UPS) 2–4 iş günü sürer.</div>
              </details>
              <details>
                <summary>Değişim &amp; İade</summary>
                <div>Ölçü değişimi ilk 30 gün ücretsizdir. Kullanılmamış ürünlerde 14 gün içinde iade kabul edilir.</div>
              </details>
              <details>
                <summary>Güvenli Ödeme</summary>
                <div>256-bit SSL ile şifrelenmiş, 3D Secure destekli ödeme altyapısı. Kredi/banka kartı, havale/EFT ve kapıda ödeme seçenekleri.</div>
              </details>
            </div>

            {/* Güven rozetleri */}
            <div className="pdp-trust">
              {[
                { icon: '🔒', text: 'Güvenli Ödeme' },
                { icon: '↩', text: '14 Gün İade' },
                { icon: '◈', text: 'Ayar Sertifikası' },
                { icon: '🚚', text: 'Ücretsiz Kargo' },
              ].map(t => (
                <div key={t.text} className="pdp-trust-item">
                  <span>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* İlgili ürünler */}
        <section className="rel">
          <div className="wrap">
            <div className="section-top">
              <div><span className="eyebrow">Tamamlayın</span><h2 className="display" style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',marginTop:'.4rem'}}>Birlikte şık durur.</h2></div>
              <Link href="/urunler" className="link-arrow" style={{ alignSelf: 'flex-end', borderBottom: '1px solid var(--ink)', paddingBottom: '.15rem' }}>Tümü →</Link>
            </div>
            <div className="rel-grid">
              {related.map(p => <ProductCard product={p} key={p.id} />)}
            </div>
          </div>
        </section>

        {/* Mobil alt bar */}
        <div className={`mbar ${mbarOn ? 'on' : ''}`}>
          <div className="mp">
            <i>{product.name}</i>
            <b>{TL(product.price)}</b>
          </div>
          <button className="btn-block" style={{minHeight:46}} onClick={handleAdd}>Sepete Ekle</button>
        </div>

        {/* Lightbox */}
        {lightbox && (
          <>
            <div className="lightbox-overlay" onClick={() => setLightbox(false)} />
            <div className="lightbox">
              <button className="lb-close" onClick={() => setLightbox(false)} aria-label="Kapat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:20,height:20}}><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <button className="lb-arrow lb-prev" onClick={() => setImgI(i => (i - 1 + product.images.length) % product.images.length)} aria-label="Önceki">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6"/></svg>
              </button>
              <img src={product.images[imgI]} alt={product.name} className="lb-img" />
              <button className="lb-arrow lb-next" onClick={() => setImgI(i => (i + 1) % product.images.length)} aria-label="Sonraki">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6"/></svg>
              </button>
              <div className="lb-count mono">{imgI + 1} / {product.images.length}</div>
            </div>
          </>
        )}

        {/* Ölçü rehberi modal */}
        {isRing && (
          <div className={`modal ${sizeModal ? 'on' : ''}`}>
            <div className="modal-card">
              <button className="modal-close" onClick={() => setSizeModal(false)}>×</button>
              <h3 className="display">Ölçü Rehberi</h3>
              <p>Mevcut bir yüzüğünüzün iç çapını ölçüp tabloda karşılığını bulun.</p>
              <table className="size-table">
                <thead><tr><th>Ölçü</th><th>İç Çap</th><th>Çevre</th></tr></thead>
                <tbody>
                  {[[8,'15,3mm','48mm'],[10,'15,9mm','50mm'],[12,'16,5mm','52mm'],[14,'17,2mm','54mm'],[16,'17,8mm','56mm']].map(([s,d,c]) => (
                    <tr key={s}><td>{s}</td><td>{d}</td><td>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {sizeModal && <div className="overlay on" onClick={() => setSizeModal(false)} />}
      </main>
    </>
  );
}
