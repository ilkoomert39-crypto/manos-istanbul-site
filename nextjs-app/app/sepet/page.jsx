'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL } from '@/lib/products';

export default function SepetPage() {
  const { items, updateQty, removeItem, total } = useCart();

  return (
    <main>
      <div className="wrap listing-head">
        <span className="eyebrow">Sepetim</span>
        <h1 className="display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: '.6rem' }}>
          Sepetiniz
        </h1>
        <p style={{ color: 'var(--stone)', marginTop: '.6rem' }}>
          Seçtiğiniz parçalar, atölyemizde sizin için üretilmeye hazır.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Sepetiniz şu an boş.</p>
          <Link href="/urunler" className="link-arrow" style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
            Alışverişe başlayın →
          </Link>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-list">
            {items.map((c) => (
              <div className="cart-row" key={c.key}>
                <img src={c.img} alt={c.name} />
                <div>
                  <h4>{c.name}</h4>
                  {c.meta && <div className="meta">{c.meta}</div>}
                  <div className="price mono">{TL(c.price)}</div>
                  <div className="qty-sm">
                    <button onClick={() => updateQty(c.key, c.qty - 1)}>−</button>
                    <span>{c.qty}</span>
                    <button onClick={() => updateQty(c.key, c.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-remove" aria-label="Kaldır" onClick={() => removeItem(c.key)}>
                  ×
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3 className="display">Sipariş Özeti</h3>
            <div className="row">
              <span>Ara Toplam</span>
              <span className="mono">{TL(total)}</span>
            </div>
            <div className="row">
              <span>Kargo</span>
              <span>7.000 ₺ üzeri ücretsiz</span>
            </div>
            <div className="total">
              <span>Toplam</span>
              <span>{TL(total)}</span>
            </div>
            <button className="btn-block" style={{ justifyContent: 'center' }}>
              Siparişi Tamamla
            </button>
            <p style={{ fontSize: '.76rem', color: 'var(--stone)', textAlign: 'center' }}>
              Bu bir tasarım gösterimidir — ödeme adımı bağlı değildir.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
