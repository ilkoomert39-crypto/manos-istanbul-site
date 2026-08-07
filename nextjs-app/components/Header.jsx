'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS, TL, CATEGORIES } from '@/lib/products';
import MiniCart from '@/components/MiniCart';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { count, favCount, miniOpen, setMiniOpen } = useCart();
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mnavOpen, setMnavOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef(null);
  const searchRef = useRef(null);
  const hoverTimer = useRef(null);
  const searchInputRef = useRef(null);

  /* scroll gölgesi */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* body scroll kilidi */
  useEffect(() => {
    if (mnavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mnavOpen]);

  /* dışarı tıklama + ESC */
  useEffect(() => {
    function onDocClick(e) {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !e.target.closest('#searchBtn')
      ) {
        setSearchOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setSearchOpen(false);
        setMnavOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  /* arama açılınca input focus */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const query = q.trim().toLocaleLowerCase('tr');
  const hits = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLocaleLowerCase('tr').includes(query) ||
          p.kind.toLocaleLowerCase('tr').includes(query)
      ).slice(0, 4)
    : [];

  const catImg = (slug) => CATEGORIES.find((c) => c.slug === slug)?.img;

  return (
    <>
      {/* ——— UTIL BAR ——— */}
      <div className="util-bar">
        <div className="util-in">
          <div className="util-l">
            <span className="promo">
              <svg viewBox="0 0 24 24">
                <path d="M2 16V6a1 1 0 0 1 1-1h11v11" />
                <path d="M14 9h4l3 3v4h-2" />
                <circle cx="7" cy="18" r="1.6" />
                <circle cx="17" cy="18" r="1.6" />
              </svg>
              7.000 ₺ üzeri kargo ücretsiz
            </span>
            <a href="tel:+902125229262">+90 212 522 92 62</a>
          </div>
          <div className="util-r">
            <a href="https://manosistanbul.com/siparis-takibi">Sipariş Takibi</a>
            <a href="https://manosistanbul.com/goruntulu-urun-danismanligi">Görüntülü Danışmanlık</a>
            <span>TRY ₺</span>
          </div>
        </div>
      </div>

      {/* ——— HEADER ——— */}
      <header className={scrolled ? 'hdr-scrolled' : ''}>
        <div className="head-in">
          {/* Sol nav */}
          <div className="head-l">
            <nav aria-label="Ana menü">
              <Link href="/urunler">Yeni Gelenler</Link>
              <div
                className={`has-mega ${megaOpen ? 'open' : ''}`}
                ref={megaRef}
              >
                <button
                  className="mega-trigger"
                  aria-expanded={megaOpen}
                  onMouseEnter={() => { clearTimeout(hoverTimer.current); setMegaOpen(true); }}
                  onMouseLeave={() => { hoverTimer.current = setTimeout(() => setMegaOpen(false), 150); }}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  Ürünler
                  <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div
                  className="mega"
                  onMouseEnter={() => clearTimeout(hoverTimer.current)}
                  onMouseLeave={() => { hoverTimer.current = setTimeout(() => setMegaOpen(false), 150); }}
                >
                  <div className="mega-in">
                    {CATEGORIES.map((c) => (
                      <div className="mega-col" key={c.slug}>
                        <h5>
                          <img src={c.img} alt="" />
                          {c.name}
                        </h5>
                        <Link href={`/urunler?kategori=${c.slug}`} onClick={() => setMegaOpen(false)}>
                          {c.desc}
                        </Link>
                        <Link className="all" href={`/urunler?kategori=${c.slug}`} onClick={() => setMegaOpen(false)}>
                          Tüm {c.name} →
                        </Link>
                      </div>
                    ))}
                    <Link href="/urunler?kategori=ozel-koleksiyon" className="mega-feat" onClick={() => setMegaOpen(false)}>
                      <img src={catImg('kolyeler')} alt="Manos Gold" />
                      <span className="mega-feat-txt">
                        <span>Yeni Koleksiyon</span>
                        <h4 className="display">Manos Gold</h4>
                        <span>Keşfet →</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Logo */}
          <Link href="/" className="word" aria-label="Manos İstanbul">
            <svg className="word-mark" viewBox="0 0 24 24">
              <path d="M12 3l7 4v6c0 4.5-3 8-7 8s-7-3.5-7-8V7Z" />
              <path d="M9 8l3-2 3 2M12 6v14" />
            </svg>
            <b className="display">Manos</b>
          </Link>

          {/* Sağ nav + ikonlar */}
          <div className="head-r">
            <nav aria-label="Kurumsal menü">
              <Link href="/urunler?kategori=ozel-koleksiyon">
                Özel Koleksiyon<span className="nav-tag">YENİ</span>
              </Link>
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/iletisim">İletişim</Link>
            </nav>
            <span className="icon-divider" />
            <div className="head-icons">
              <button
                id="searchBtn"
                className="icon-btn"
                aria-label="Ara"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </button>
              <Link href="/favoriler" className="icon-btn" aria-label="Favoriler">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z" />
                </svg>
                <span className={`count ${favCount > 0 ? 'on' : ''}`}>{favCount}</span>
              </Link>
              <Link href="/sepet" className="icon-btn" aria-label="Sepet" onClick={(e)=>{e.preventDefault();setMiniOpen(v=>!v)}}>
                <svg viewBox="0 0 24 24">
                  <path d="M6 8h12l-1 12H7L6 8Z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>
                <span className={`count ${count > 0 ? 'on' : ''}`}>{count}</span>
              </Link>
              {/* Burger — sadece mobilde görünür */}
              <button
                className="icon-btn burger"
                aria-label="Menüyü aç"
                aria-expanded={mnavOpen}
                onClick={() => setMnavOpen(true)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Arama paneli */}
        <div className={`search ${searchOpen ? 'on' : ''}`} ref={searchRef}>
          <div className="search-in">
            <div className="search-field">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ne arıyorsunuz?"
                autoComplete="off"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && q.trim()) { setSearchOpen(false); setQ(''); window.location.href = '/ara?q=' + encodeURIComponent(q.trim()); } }}
              />
              <button
                className="search-close"
                aria-label="Kapat"
                onClick={() => { setSearchOpen(false); setQ(''); }}
              >
                ×
              </button>
            </div>
            {!query && (
              <div className="search-hint">
                Popüler: <b>Luna Eye</b>, <b>Kolye</b>, <b>Kelepçe</b>
              </div>
            )}
            {query && (
              <div className="search-results">
                {hits.length ? (
                  <>
                    <h6>Ürün Önerileri</h6>
                    <div className="sr-grid">
                      {hits.map((p) => (
                        <Link
                          className="sr-card"
                          href={`/urunler/${p.slug}`}
                          key={p.id}
                          onClick={() => { setSearchOpen(false); setQ(''); }}
                        >
                          <span className="sr-img">
                            <img src={p.images[0]} alt={p.name} />
                          </span>
                          <span className="sr-name">{p.name}</span>
                          <span className="sr-kind">{p.kind}</span>
                          <span className="sr-price mono">{TL(p.price)}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="sr-empty">"{q.trim()}" için sonuç bulunamadı.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ——— MOBİL OVERLAY ——— */}
      {mnavOpen && (
        <div
          className="mnav-overlay"
          onClick={() => setMnavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ——— MOBİL MENÜ (drawer) ——— */}
      <div className={`mnav ${mnavOpen ? 'mnav-open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobil menü">
        {/* Başlık */}
        <div className="mnav-head">
          <span className="display mnav-brand">Manos</span>
          <button
            className="mnav-close-btn"
            aria-label="Menüyü kapat"
            onClick={() => setMnavOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ana linkler */}
        <nav className="mnav-nav">
          <Link href="/" className="mnav-link" onClick={() => setMnavOpen(false)}>
            Ana Sayfa
          </Link>
          <Link href="/urunler" className="mnav-link" onClick={() => setMnavOpen(false)}>
            Yeni Gelenler
          </Link>

          {/* Kategoriler accordion */}
          <div className="mnav-acc">
            <button
              className="mnav-link mnav-acc-btn"
              onClick={() => setCatsOpen((v) => !v)}
              aria-expanded={catsOpen}
            >
              Ürünler
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ transform: catsOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className={`mnav-cats ${catsOpen ? 'mnav-cats-open' : ''}`}>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/urunler?kategori=${c.slug}`}
                  className="mnav-cat-link"
                  onClick={() => setMnavOpen(false)}
                >
                  <span>{c.name}</span>
                  <span className="mnav-cat-desc">{c.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/urunler?kategori=ozel-koleksiyon" className="mnav-link mnav-gold" onClick={() => setMnavOpen(false)}>
            ✦ Özel Koleksiyon
          </Link>
          <Link href="/hakkimizda" className="mnav-link" onClick={() => setMnavOpen(false)}>Hakkımızda</Link>
          <Link href="/iletisim" className="mnav-link" onClick={() => setMnavOpen(false)}>İletişim</Link>
        </nav>

        {/* Alt bilgi */}
        <div className="mnav-foot">
          <Link href="/sepet" className="mnav-cart-btn" onClick={() => setMnavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            Sepete Git
            {count > 0 && <span className="mnav-count">{count}</span>}
          </Link>
          <a href="tel:+902125229262" className="mnav-tel">+90 212 522 92 62</a>
        </div>
      </div>
    </>
  );
}
