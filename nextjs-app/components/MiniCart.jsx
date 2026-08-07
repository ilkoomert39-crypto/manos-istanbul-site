'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL, PRODUCTS } from '@/lib/products';

export default function MiniCart() {
  const { items, miniOpen, setMiniOpen, updateQty, removeItem, total, addItem } = useCart();

  const kargo = total >= 20000 ? 0 : 299;
  const progress = Math.min((total / 20000) * 100, 100);

  const suggestions = PRODUCTS
    .filter(p => !items.find(i => i.slug === p.slug))
    .slice(0, 2);

  if (!miniOpen) return null;

  return (
    <>
      <div className="mc-overlay" onClick={() => setMiniOpen(false)} />
      <aside className="mc-panel">

        {/* Başlık */}
        <div className="mc-head">
          <span className="display" style={{ fontSize: '1.1rem' }}>Sepet</span>
          <span className="mono mc-count">{items.length} ürün</span>
          <button className="mc-close" onClick={() => setMiniOpen(false)} aria-label="Kapat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Kargo progress */}
        {total > 0 && total < 20000 && (
          <div className="mc-kargo">
            <span>Ücretsiz kargoya <b className="mono">{TL(20000 - total)}</b> kaldı</span>
            <div className="mc-kargo-track">
              <div className="mc-kargo-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {total >= 20000 && (
          <div className="mc-kargo-ok">✦ Ücretsiz kargo kazandınız</div>
        )}

        {/* Boş */}
        {items.length === 0 ? (
          <div className="mc-empty">
            <p>Sepetiniz boş.</p>
            <Link
              href="/urunler"
              className="btn-block"
              style={{ marginTop: '1rem', justifyContent: 'center', fontSize: '.8rem' }}
              onClick={() => setMiniOpen(false)}
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <>
            {/* Ürünler */}
            <div className="mc-items">
              {items.map(c => (
                <div key={c.key} className="mc-row">
                  <Link href={`/urunler/${c.slug}`} onClick={() => setMiniOpen(false)}>
                    <img src={c.img} alt={c.name} />
                  </Link>
                  <div className="mc-info">
                    <Link href={`/urunler/${c.slug}`} onClick={() => setMiniOpen(false)} className="mc-name">
                      {c.name}
                    </Link>
                    {c.meta && <span className="mc-meta mono">{c.meta}</span>}
                    <div className="mc-row-foot">
                      <div className="mc-qty">
                        <button onClick={() => updateQty(c.key, c.qty - 1)}>−</button>
                        <span>{c.qty}</span>
                        <button onClick={() => updateQty(c.key, c.qty + 1)}>+</button>
                      </div>
                      <span className="mc-price mono">{TL(c.price * c.qty)}</span>
                    </div>
                  </div>
                  <button className="mc-remove" onClick={() => removeItem(c.key)} aria-label="Kaldır">×</button>
                </div>
              ))}
            </div>

            {/* Öneriler */}
            {suggestions.length > 0 && (
              <div className="mc-suggest">
                <span className="eyebrow" style={{ fontSize: '.6rem', display: 'block', marginBottom: '.8rem' }}>
                  Bunları da beğenebilirsiniz
                </span>
                <div className="mc-suggest-list">
                  {suggestions.map(p => (
                    <div key={p.id} className="mc-suggest-item">
                      <img src={p.images[0]} alt={p.name} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="mc-name" style={{ fontSize: '.78rem' }}>{p.name}</div>
                        <div className="mc-price mono" style={{ fontSize: '.76rem' }}>{TL(p.price)}</div>
                      </div>
                      <button className="mc-add-small" onClick={() => addItem(p)} aria-label="Sepete ekle">+</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alt */}
            <div className="mc-foot">
              <div className="mc-total">
                <span>Toplam</span>
                <span className="mono">{TL(total + kargo)}</span>
              </div>
              {kargo > 0 && (
                <span className="mc-kargo-note mono">+ {TL(kargo)} kargo</span>
              )}
              <Link
                href="/sepet"
                className="btn-block mc-checkout"
                onClick={() => setMiniOpen(false)}
              >
                Sepete Git →
              </Link>
              <button className="mc-continue" onClick={() => setMiniOpen(false)}>
                Alışverişe devam et
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
