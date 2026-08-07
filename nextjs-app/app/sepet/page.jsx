'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL } from '@/lib/products';

const KARGO_LIMIT = 20000;

const STEPS = ['Sepet', 'Teslimat', 'Ödeme', 'Onay'];

export default function SepetPage() {
  const { items, updateQty, removeItem, total } = useCart();
  const [step, setStep] = useState(0);
  const [note, setNote] = useState('');
  const [gift, setGift] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const kargo = total >= KARGO_LIMIT ? 0 : 299;
  const indirim = couponApplied ? Math.round(total * 0.1) : 0;
  const genel = total - indirim + kargo;
  const progress = Math.min((total / KARGO_LIMIT) * 100, 100);

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === 'MANOS10') {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  }

  if (items.length === 0) {
    return (
      <main>
        <div className="cart-empty-luxury">
          <div className="cel-stamp">
            <div className="hallmark" style={{'--sz':'110px',fontSize:'.64rem'}}>
              <b>585</b><span>14K</span>
            </div>
          </div>
          <span className="eyebrow">Sepetiniz</span>
          <h1 className="display" style={{fontSize:'clamp(2rem,4vw,3rem)',marginTop:'.6rem'}}>Henüz boş</h1>
          <p style={{color:'var(--stone)',marginTop:'.8rem',maxWidth:'34ch',textAlign:'center'}}>
            Kapalıçarşı atölyemizden seçtiğiniz parçalar burada sizi bekleyecek.
          </p>
          <Link href="/urunler" className="btn-block" style={{marginTop:'2rem',maxWidth:'240px',justifyContent:'center'}}>
            Koleksiyonu Keşfet →
          </Link>
          <div className="cel-perks">
            {[
              { icon: '✦', t: 'Ücretsiz Kargo', s: '20.000 ₺ üzeri siparişlerde' },
              { icon: '◈', t: 'İade Garantisi', s: '14 gün içinde koşulsuz iade' },
              { icon: '◇', t: 'Orijinal Sertifika', s: 'Her takıya ayar belgesi' },
            ].map((p) => (
              <div key={p.t} className="cel-perk">
                <span className="cel-icon">{p.icon}</span>
                <b>{p.t}</b>
                <span>{p.s}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* ——— BREADCRUMB STEPS ——— */}
      <div className="cart-steps-bar">
        <div className="cart-steps-inner wrap">
          {STEPS.map((s, i) => (
            <div key={s} className={`cstep ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <span className="cstep-num">{i < step ? '✓' : i + 1}</span>
              <span className="cstep-label">{s}</span>
              {i < STEPS.length - 1 && <span className="cstep-sep">—</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="cart-luxury wrap">
        {/* ——— SOL: ÜRÜNLER ——— */}
        <div className="cl-left">
          <div className="cl-head">
            <h1 className="display" style={{fontSize:'1.7rem'}}>Sepetiniz</h1>
            <span className="mono" style={{color:'var(--stone)',fontSize:'.78rem'}}>{items.length} parça</span>
          </div>

          {/* Kargo progress */}
          {total < KARGO_LIMIT && (
            <div className="kargo-bar">
              <div className="kb-top">
                <span>Ücretsiz kargoya <b className="mono">{TL(KARGO_LIMIT - total)}</b> kaldı</span>
                <span className="mono" style={{color:'var(--stone)',fontSize:'.72rem'}}>{Math.round(progress)}%</span>
              </div>
              <div className="kb-track"><div className="kb-fill" style={{width:`${progress}%`}}/></div>
            </div>
          )}
          {total >= KARGO_LIMIT && (
            <div className="kargo-ok">
              <span>✦ Ücretsiz kargo hakkı kazandınız</span>
            </div>
          )}

          {/* Ürün satırları */}
          <div className="cl-items">
            {items.map((c) => (
              <div className="cl-row" key={c.key}>
                <div className="cl-img-wrap">
                  <img src={c.img} alt={c.name} />
                  <div className="cl-img-shine" />
                </div>
                <div className="cl-info">
                  <div>
                    <h4 className="cl-name">{c.name}</h4>
                    {c.meta && <div className="cl-meta mono">{c.meta}</div>}
                    <div className="cl-badges">
                      <span>14K Altın</span>
                      <span>Sertifikalı</span>
                      <span>El Yapımı</span>
                    </div>
                  </div>
                  <div className="cl-actions">
                    <div className="qty-luxury">
                      <button onClick={() => updateQty(c.key, c.qty - 1)}>−</button>
                      <span className="mono">{c.qty}</span>
                      <button onClick={() => updateQty(c.key, c.qty + 1)}>+</button>
                    </div>
                    <span className="cl-price mono">{TL(c.price * c.qty)}</span>
                    <button className="cl-remove" onClick={() => removeItem(c.key)} aria-label="Kaldır">
                      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sipariş notu + Hediye */}
          <div className="cl-extras">
            <div className="cl-extra-item">
              <label className="cl-toggle">
                <input type="checkbox" checked={gift} onChange={e=>setGift(e.target.checked)}/>
                <span className="cl-toggle-box"/>
                <span>Hediye paketi (ücretsiz, el yazısı kart)</span>
              </label>
            </div>
            <div className="cl-extra-item">
              <textarea
                className="cl-note"
                placeholder="Sipariş notu (özel istek, kişiselleştirme…)"
                value={note}
                onChange={e=>setNote(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Kupon */}
          <div className="cl-coupon">
            <input
              className="cl-coupon-input mono"
              placeholder="İndirim kodu"
              value={coupon}
              onChange={e=>{setCoupon(e.target.value);setCouponError(false)}}
              onKeyDown={e=>e.key==='Enter'&&applyCoupon()}
            />
            <button className="cl-coupon-btn" onClick={applyCoupon}>Uygula</button>
            {couponApplied && <span className="cl-coupon-ok">✓ %10 indirim uygulandı</span>}
            {couponError && <span className="cl-coupon-err">Geçersiz kod</span>}
          </div>

          <Link href="/urunler" className="cl-back">← Alışverişe Devam Et</Link>
        </div>

        {/* ——— SAĞ: ÖZET ——— */}
        <aside className="cl-summary">
          <div className="cls-header">
            <span className="eyebrow">Sipariş Özeti</span>
            <div className="cls-stamp">
              <div className="hallmark" style={{'--sz':'56px',fontSize:'.46rem'}}>
                <b style={{fontSize:'.52rem'}}>585</b>
                <span style={{fontSize:'.28rem'}}>14K</span>
              </div>
            </div>
          </div>

          <div className="cls-lines">
            <div className="cls-line">
              <span>Ara Toplam</span>
              <span className="mono">{TL(total)}</span>
            </div>
            {couponApplied && (
              <div className="cls-line green">
                <span>İndirim (%10)</span>
                <span className="mono">−{TL(indirim)}</span>
              </div>
            )}
            <div className="cls-line">
              <span>Kargo</span>
              <span className="mono">{kargo === 0 ? 'Ücretsiz' : TL(kargo)}</span>
            </div>
            {gift && (
              <div className="cls-line">
                <span>Hediye Paketi</span>
                <span className="mono" style={{color:'var(--brass)'}}>Ücretsiz</span>
              </div>
            )}
          </div>

          <div className="cls-total">
            <span className="display" style={{fontSize:'1.1rem'}}>Toplam</span>
            <span className="mono" style={{fontSize:'1.3rem'}}>{TL(genel)}</span>
          </div>

          {/* Taksit */}
          <div className="cls-taksit">
            <span className="eyebrow" style={{fontSize:'.62rem'}}>Taksit Seçenekleri</span>
            {[3, 6, 9, 12].map(n => (
              <div key={n} className="cls-taksit-row">
                <span className="mono">{n} taksit</span>
                <span className="mono">{TL(Math.ceil(genel / n))}/ay</span>
              </div>
            ))}
          </div>

          <button className="cls-btn" onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))}>
            <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:'none',stroke:'currentColor',strokeWidth:1.5}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Güvenli Ödemeye Geç
          </button>

          <div className="cls-pay-icons">
            {['VISA', 'MC', 'AMEX', 'TR'].map(b => (
              <span key={b} className="cls-pay-badge mono">{b}</span>
            ))}
          </div>

          <div className="cls-trust">
            {[
              { icon: '🔒', t: '256-bit SSL Şifreleme' },
              { icon: '◈', t: '14 Gün İade Garantisi' },
              { icon: '✦', t: 'Orijinallik Sertifikası' },
            ].map(t => (
              <div key={t.t} className="cls-trust-item">
                <span>{t.icon}</span>
                <span>{t.t}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/902121234567?text=Merhaba, sipariş hakkında bilgi almak istiyorum."
            className="cls-wa"
            target="_blank" rel="noopener"
          >
            <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:'#25D366'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.541 4.063 1.487 5.776L0 24l6.39-1.676A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.72.975.992-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
            Whatsapp ile Sipariş Ver
          </a>
        </aside>
      </div>
    </main>
  );
}
