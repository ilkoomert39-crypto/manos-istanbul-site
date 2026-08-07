'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';

const SORT_OPTIONS = [
  { value: 'default', label: 'Öne Çıkanlar' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'name', label: 'Alfabetik' },
];

export default function UrunlerPage() {
  const [kategori, setKategori] = useState('');
  const [sort, setSort] = useState('default');
  const [view, setView] = useState('grid'); // grid | list

  const isOzel = kategori === 'ozel-koleksiyon';
  const activeCat = CATEGORIES.find((c) => c.slug === kategori);

  const list = useMemo(() => {
    let base = isOzel
      ? PRODUCTS.filter((p) => p.tag === 'Manos Gold')
      : activeCat
      ? PRODUCTS.filter((p) => p.kategori === kategori)
      : PRODUCTS;

    if (sort === 'price-asc') base = [...base].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') base = [...base].sort((a, b) => b.price - a.price);
    else if (sort === 'name') base = [...base].sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    return base;
  }, [kategori, sort, isOzel, activeCat]);

  const heading = isOzel ? 'Özel Koleksiyon' : activeCat ? activeCat.name : 'Tüm Ürünler';
  const lead = isOzel
    ? 'Manos Gold — sınırlı sayıda üretilen imza parçalar.'
    : activeCat
    ? activeCat.desc
    : 'Kapalıçarşı atölyemizde el işçiliğiyle üretilen tüm koleksiyon, tek sayfada.';

  return (
    <main>
      {/* ——— HERO BANNER ——— */}
      <div className="listing-hero">
        <div className="lh-overlay" />
        <div className="lh-content wrap">
          <span className="eyebrow">Katalog</span>
          <h1 className="display lh-title">{heading}</h1>
          <p className="lh-lead">{lead}</p>
        </div>
        <div className="lh-stamp">
          <div className="hallmark" style={{'--sz':'80px',fontSize:'.56rem'}}>
            <b style={{fontSize:'.62rem'}}>585</b>
            <span style={{fontSize:'.34rem'}}>14K ALTIN</span>
          </div>
        </div>
      </div>

      {/* ——— KATEGORİ + SIRALAMAA BAR ——— */}
      <div className="filter-wrap wrap">
        {/* Kategori */}
        <nav className="filter-bar" aria-label="Kategori filtresi">
          <button
            className={!kategori ? 'active' : ''}
            onClick={() => setKategori('')}
          >
            Tümü <span className="fc">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              className={kategori === c.slug ? 'active' : ''}
              onClick={() => setKategori(c.slug)}
            >
              {c.name}
              <span className="fc">
                {PRODUCTS.filter((p) => p.kategori === c.slug).length}
              </span>
            </button>
          ))}
          <button
            className={isOzel ? 'active gold' : 'gold'}
            onClick={() => setKategori('ozel-koleksiyon')}
          >
            ✦ Özel Koleksiyon
          </button>
        </nav>

        {/* Sağ: sıralama + view toggle */}
        <div className="filter-right">
          <span className="filter-count mono">{list.length} ürün</span>
          <select
            className="sort-select mono"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="view-toggle">
            <button
              className={view === 'grid' ? 'on' : ''}
              aria-label="Grid görünümü"
              onClick={() => setView('grid')}
            >
              <svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>
            </button>
            <button
              className={view === 'list' ? 'on' : ''}
              aria-label="Liste görünümü"
              onClick={() => setView('list')}
            >
              <svg viewBox="0 0 16 16"><rect x="1" y="2" width="14" height="3"/><rect x="1" y="7" width="14" height="3"/><rect x="1" y="12" width="14" height="3"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ——— ÜRÜN LİSTESİ ——— */}
      <div className="wrap listing-body">
        {list.length ? (
          <div className={view === 'list' ? 'listing-list' : 'listing-grid'}>
            {list.map((p) => (
              <ProductCard product={p} key={p.id} listView={view === 'list'} />
            ))}
          </div>
        ) : (
          <div className="listing-empty">
            <span className="eyebrow">Sonuç bulunamadı</span>
            <p>Bu kategoride henüz ürün bulunmuyor.</p>
            <button className="link-arrow" style={{borderBottom:'1px solid var(--ink)',paddingBottom:'.2rem',marginTop:'1rem'}} onClick={()=>setKategori('')}>
              Tüm ürünleri gör →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
