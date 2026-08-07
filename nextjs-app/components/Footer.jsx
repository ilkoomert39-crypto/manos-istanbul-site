'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      {/* Bülten şeridi */}
      <div className="foot-news">
        <div className="wrap foot-news-in">
          <div>
            <span className="eyebrow">Bülten</span>
            <h3 className="display" style={{fontSize:'clamp(1.4rem,2.8vw,2rem)',marginTop:'.4rem'}}>
              Yeni koleksiyonlardan ilk siz haberdar olun.
            </h3>
          </div>
          <form className="foot-news-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="E-posta adresiniz" className="foot-news-input" required />
            <button type="submit" className="foot-news-btn">Abone Ol</button>
          </form>
        </div>
      </div>

      {/* Ana footer */}
      <div className="foot-main">
        <div className="wrap">
          <div className="foot-grid">
            {/* Marka */}
            <div className="foot-brand">
              <div className="foot-logo">
                <div className="hallmark" style={{'--sz':'52px',fontSize:'.42rem'}}>
                  <b style={{fontSize:'.48rem'}}>585</b>
                  <span style={{fontSize:'.26rem'}}>14K</span>
                </div>
                <span className="display foot-logo-name">Manos</span>
              </div>
              <p>14K Gold. Kapalıçarşı'da üç kuşaktır el işçiliğiyle üretilen ince mücevher.</p>
              <div className="foot-socials">
                <a href="https://instagram.com/manosistanbul" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://pinterest.com/manosistanbul" target="_blank" rel="noopener" aria-label="Pinterest">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                </a>
                <a href="https://wa.me/905455229262" target="_blank" rel="noopener" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.541 4.063 1.487 5.776L0 24l6.39-1.676A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.72.975.992-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
                </a>
              </div>
            </div>

            <div className="foot-col">
              <h5>Koleksiyon</h5>
              <Link href="/urunler">Tüm Ürünler</Link>
              <Link href="/urunler?kategori=kupeler">Küpeler</Link>
              <Link href="/urunler?kategori=bileklikler">Bileklikler</Link>
              <Link href="/urunler?kategori=kolyeler">Kolyeler</Link>
              <Link href="/urunler?kategori=yuzukler">Yüzükler</Link>
              <Link href="/urunler?kategori=ozel-koleksiyon">Özel Koleksiyon</Link>
            </div>

            <div className="foot-col">
              <h5>Manos</h5>
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/iletisim">İletişim</Link>
              <a href="https://manosistanbul.com/goruntulu-urun-danismanligi">Görüntülü Danışmanlık</a>
              <a href="https://manosistanbul.com/siparis-takibi">Sipariş Takibi</a>
              <Link href="/teslimat-iade">Teslimat & İade</Link>
              <Link href="/kvkk">KVKK</Link>
            </div>

            <div className="foot-col">
              <h5>İletişim</h5>
              <span>Nuruosmaniye Cd. No:31<br/>Fatih / İstanbul</span>
              <a href="tel:+902125229262">+90 212 522 92 62</a>
              <a href="mailto:info@manosistanbul.com">info@manosistanbul.com</a>
              <span className="foot-hours">
                Pzt–Cmt: 09:00–19:00
              </span>
            </div>
          </div>

          <div className="foot-base">
            <span>© 2026 Manos İstanbul · Tüm hakları saklıdır.</span>
            <div className="foot-trust">
              {['SSL', '3D Secure', 'KVKK', '14K 585'].map(b => (
                <span key={b} className="foot-badge mono">{b}</span>
              ))}
            </div>
            <span className="mono" style={{fontSize:'.62rem'}}>585 · 14K · KAPALIÇARŞI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
