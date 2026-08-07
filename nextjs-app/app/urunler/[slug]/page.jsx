'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProductBySlug, getRelated, TL } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const COLORS = [
  { key: 'sari', label: 'Sarı Altın', cls: 'sw-sari' },
  { key: 'yesil', label: 'Yeşil Altın', cls: 'sw-yesil' },
  { key: 'rose', label: 'Rose Altın', cls: 'sw-rose' },
];
const SIZES = Array.from({ length: 11 }, (_, i) => 7 + i); // 7–17

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);
  const { addItem, toggleFav } = useCart();

  const [imgI, setImgI] = useState(0);
  const [color, setColor] = useState(COLORS[0].key);
  const [size, setSize] = useState(null);
  const [sizeErr, setSizeErr] = useState(false);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [mbarOn, setMbarOn] = useState(false);
  const [sizeModal, setSizeModal] = useState(false);

  const isRing = product?.kategori === 'yuzukler';

  useEffect(() => {
    setImgI(0);
    setColor(COLORS[0].key);
    setSize(null);
    setQty(1);
  }, [params.slug]);

  useEffect(() => {
    function onScroll() {
      setMbarOn(window.scrollY > 420);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!product) {
    return (
      <main className="wrap" style={{ padding: '6rem 3rem', textAlign: 'center' }}>
        <h1 className="display">Ürün bulunamadı.</h1>
        <p style={{ marginTop: '1rem' }}>
          <Link href="/urunler" className="link-arrow" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
            Tüm ürünlere dön →
          </Link>
        </p>
      </main>
    );
  }

  const related = getRelated(product.slug, 4);

  function handleAdd() {
    if (isRing && !size) {
      setSizeErr(true);
      document.getElementById('size-select')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const colorLabel = COLORS.find((c) => c.key === color).label;
    const meta = isRing ? `${colorLabel} · Ölçü ${size}` : colorLabel;
    addItem(product, { qty, meta });
  }

  return (
    <main>
      <nav className="crumbs" aria-label="Gezinme">
        <Link href="/">Ana Sayfa</Link>
        <span>/</span>
        <Link href={`/urunler?kategori=${product.kategori}`}>{product.kind.split(' · ')[0]}</Link>
        <span>/</span>
        <b>{product.name}</b>
      </nav>

      <div className="pdp">
        <section className="gallery" aria-label="Ürün görselleri">
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button key={i} className={i === imgI ? 'on' : ''} onClick={() => setImgI(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="stage">
            <img src={product.images[imgI]} alt={product.name} />
            <div className="hallmark">
              <b>585</b>
              <span>14K El İşç.</span>
            </div>
          </div>
          <div className="note-line">
            <svg viewBox="0 0 24 24">
              <path d="M12 3l7 8-7 10-7-10 7-8Z" />
              <path d="M5 11h14" />
            </svg>
            <p>
              <b>Atölyeden not:</b> Bu parça sipariş üzerine, Kapalıçarşı&apos;daki atölyemizde sizin için üretilir.
              Taş elde seçilir, tek tek mıhlanır.
            </p>
          </div>
        </section>

        <section className="info">
          <p className="kind">{product.kind} · Manos-{String(product.id).padStart(4, '0')}</p>
          <h1 className="display">{product.name}</h1>
          <div className="price-row">
            <span className="price">{TL(product.price)}</span>
            <span className="price-note">KDV dahil · yurtiçi kargo ücretsiz</span>
          </div>
          <p className="desc">{product.desc}</p>

          <div className="opt">
            <div className="opt-head">
              <h4>Altın Rengi</h4>
              <span>{COLORS.find((c) => c.key === color).label}</span>
            </div>
            <div className="swatches">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  className={`swatch ${c.cls} ${color === c.key ? 'on' : ''}`}
                  aria-label={c.label}
                  onClick={() => setColor(c.key)}
                />
              ))}
            </div>
          </div>

          {isRing && (
            <div className="opt" id="size-select">
              <div className="opt-head">
                <h4>Yüzük Ölçüsü</h4>
                <button onClick={() => setSizeModal(true)}>Ölçü Rehberi</button>
              </div>
              <div className="sizes">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    className={size === s ? 'on' : ''}
                    onClick={() => {
                      setSize(s);
                      setSizeErr(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeErr && (
                <p style={{ color: '#B23A2E', fontSize: '.8rem' }}>Lütfen bir ölçü seçin.</p>
              )}
            </div>
          )}

          <div className="buy-row">
            <div className="qty-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="mono">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn-block" onClick={handleAdd}>
              Sepete Ekle — <span className="mono">{TL(product.price * qty)}</span>
            </button>
            <button
              className={`fav-btn ${liked ? 'liked' : ''}`}
              aria-label="Favorilere ekle"
              onClick={() => {
                setLiked((v) => !v);
                toggleFav(!liked);
              }}
            >
              <svg viewBox="0 0 24 24" style={{ fill: liked ? 'var(--brass)' : 'none', stroke: liked ? 'var(--brass)' : 'var(--ink)' }}>
                <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z" />
              </svg>
            </button>
          </div>

          <a className="wa-ask" href="https://wa.me/905455229262">
            <svg viewBox="0 0 32 32">
              <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c2 1.1 4.2 1.6 6.4 1.4 6.6-.6 11.6-6.3 11.2-12.9C28.6 8.6 22.9 3 16 3Z" />
            </svg>
            Bu ürün hakkında WhatsApp&apos;tan sorun
          </a>

          <div className="specs">
            <div><span>Ayar</span><span>14K · 585</span></div>
            <div><span>Ağırlık</span><span>~{product.weight}</span></div>
            <div><span>Üretim</span><span>5–7 iş günü</span></div>
            <div><span>Ürün Kodu</span><span>Manos-{String(product.id).padStart(4, '0')}</span></div>
          </div>

          <div className="acc">
            <details open>
              <summary>Bakım Önerileri</summary>
              <div>
                Parfüm, deniz suyu ve kimyasallardan uzak tutun; kullanmadığınızda kadife kesesinde saklayın. Yılda
                bir kez ücretsiz parlatma için atölyeye getirin.
              </div>
            </details>
            <details>
              <summary>Üretim &amp; Kargolama</summary>
              <div>
                Sipariş üzerine üretilir; süre 5–7 iş günüdür. Yurtiçi teslimat 1–2, yurtdışı (UPS) 2–4 iş günü sürer.
              </div>
            </details>
            <details>
              <summary>Değişim &amp; İade</summary>
              <div>Ölçü değişimi ilk 30 gün ücretsizdir. Kullanılmamış ürünlerde 14 gün içinde iade kabul edilir.</div>
            </details>
          </div>
        </section>
      </div>

      <section className="rel">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Tamamlayın</span>
              <h2>Birlikte şık durur.</h2>
            </div>
            <Link href="/urunler" className="wa-ask" style={{ alignSelf: 'flex-end' }}>
              Tüm ürünler →
            </Link>
          </div>
          <div className="rel-grid">
            {related.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      <div className={`mbar ${mbarOn ? 'on' : ''}`}>
        <div className="mp">
          <i>{product.name}</i>
          <b>{TL(product.price)}</b>
        </div>
        <button className="btn-block" onClick={handleAdd}>
          Sepete Ekle
        </button>
      </div>

      {isRing && (
        <div className={`modal ${sizeModal ? 'on' : ''}`}>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setSizeModal(false)}>
              ×
            </button>
            <h3 className="display">Ölçü Rehberi</h3>
            <p>Mevcut bir yüzüğünüzün iç çapını ölçüp tabloda karşılığını bulun.</p>
            <table className="size-table">
              <thead>
                <tr><th>Ölçü</th><th>İç Çap</th><th>Çevre</th></tr>
              </thead>
              <tbody>
                <tr><td>8</td><td>15,3mm</td><td>48mm</td></tr>
                <tr><td>10</td><td>15,9mm</td><td>50mm</td></tr>
                <tr><td>12</td><td>16,5mm</td><td>52mm</td></tr>
                <tr><td>14</td><td>17,2mm</td><td>54mm</td></tr>
                <tr><td>16</td><td>17,8mm</td><td>56mm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {sizeModal && <div className="overlay on" onClick={() => setSizeModal(false)} />}
    </main>
  );
}
