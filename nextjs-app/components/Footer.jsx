import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <span className="word">
              <b className="display">Manos</b>
            </span>
            <p>14K Gold. Kapalıçarşı&apos;da üç kuşaktır el işçiliğiyle üretilen ince mücevher.</p>
          </div>
          <div className="foot-col">
            <h5>Katalog</h5>
            <Link href="/urunler?kategori=kupeler">Küpeler</Link>
            <Link href="/urunler?kategori=bileklikler">Bileklikler</Link>
            <Link href="/urunler?kategori=kolyeler">Kolyeler</Link>
            <Link href="/urunler?kategori=yuzukler">Yüzükler</Link>
          </div>
          <div className="foot-col">
            <h5>Kurumsal</h5>
            <a href="https://manosistanbul.com/hakkimizda">Hakkımızda</a>
            <a href="https://manosistanbul.com/teslimat-ve-iade-kosullari">Teslimat &amp; İade</a>
            <a href="https://manosistanbul.com/kvkk-aydinlatma-metni">KVKK</a>
          </div>
          <div className="foot-col">
            <h5>İletişim</h5>
            <span>Nuruosmaniye Cd. No:31, Fatih</span>
            <a href="tel:+902125229262">+90 212 522 92 62</a>
            <a href="https://wa.me/905455229262">WhatsApp</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 MANOS İSTANBUL</span>
          <span>585 · 14K · KAPALIÇARŞI</span>
        </div>
      </div>
    </footer>
  );
}
