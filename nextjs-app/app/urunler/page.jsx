'use client';

import { useState, useMemo, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES, TL } from '@/lib/products';

const SORT_OPTIONS = [
  { value: 'default', label: 'Öne Çıkanlar' },
  { value: 'price-asc', label: 'Fiyat ↑' },
  { value: 'price-desc', label: 'Fiyat ↓' },
  { value: 'name', label: 'Alfabetik' },
];

const ALTIN_TURU = ['Sarı Altın', 'Yeşil Altın', 'Rose Altın'];
const PRICE_RANGES = [
  { label: '0 — 15.000 ₺', min: 0, max: 15000 },
  { label: '15.000 — 30.000 ₺', min: 15000, max: 30000 },
  { label: '30.000 — 50.000 ₺', min: 30000, max: 50000 },
  { label: '50.000 ₺ +', min: 50000, max: Infinity },
];

const MIN_PRICE = Math.min(...PRODUCTS.map(p => p.price));
const MAX_PRICE = Math.max(...PRODUCTS.map(p => p.price));

function FilterPanel({ filters, setFilters, onClose }) {
  const [localMin, setLocalMin] = useState(filters.minPrice ?? MIN_PRICE);
  const [localMax, setLocalMax] = useState(filters.maxPrice ?? MAX_PRICE);

  function toggleKategori(slug) {
    setFilters(f => ({
      ...f,
      kategoriler: f.kategoriler.includes(slug)
        ? f.kategoriler.filter(k => k !== slug)
        : [...f.kategoriler, slug],
    }));
  }

  function toggleAltin(a) {
    setFilters(f => ({
      ...f,
      altinTurleri: f.altinTurleri.includes(a)
        ? f.altinTurleri.filter(x => x !== a)
        : [...f.altinTurleri, a],
    }));
  }

  function applyPrice() {
    setFilters(f => ({ ...f, minPrice: localMin, maxPrice: localMax }));
  }

  function togglePriceRange(r) {
    setFilters(f => ({ ...f, minPrice: r.min, maxPrice: r.max }));
    setLocalMin(r.min);
    setLocalMax(r.max === Infinity ? MAX_PRICE : r.max);
  }

  function resetAll() {
    setFilters({ kategoriler: [], altinTurleri: [], minPrice: null, maxPrice: null, tags: [] });
    setLocalMin(MIN_PRICE);
    setLocalMax(MAX_PRICE);
  }

  function toggleTag(t) {
    setFilters(f => ({
      ...f,
      tags: f.tags.includes(t) ? f.tags.filter(x => x !== t) : [...f.tags, t],
    }));
  }

  const activeCount = filters.kategoriler.length + filters.altinTurleri.length + filters.tags.length
    + (filters.minPrice !== null ? 1 : 0);

  return (
    <>
      <div className="fp-overlay" onClick={onClose} />
      <aside className="fp-panel">
        {/* Başlık */}
        <div className="fp-head">
          <span className="fp-title">Filtrele</span>
          {activeCount > 0 && (
            <button className="fp-reset" onClick={resetAll}>Temizle ({activeCount})</button>
          )}
          <button className="fp-close" onClick={onClose} aria-label="Kapat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="fp-body">
          {/* Kategori */}
          <div className="fp-section">
            <h3 className="fp-section-title">Kategori</h3>
            {CATEGORIES.map(c => {
              const count = PRODUCTS.filter(p => p.kategori === c.slug).length;
              const active = filters.kategoriler.includes(c.slug);
              return (
                <label key={c.slug} className={`fp-check ${active ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleKategori(c.slug)}
                  />
                  <span className="fp-check-box" />
                  <span className="fp-check-label">{c.name}</span>
                  <span className="fp-check-count mono">{count}</span>
                </label>
              );
            })}
          </div>

          {/* Fiyat Aralığı — hazır seçenekler */}
          <div className="fp-section">
            <h3 className="fp-section-title">Fiyat Aralığı</h3>
            {PRICE_RANGES.map(r => {
              const isActive = filters.minPrice === r.min && filters.maxPrice === r.max;
              return (
                <label key={r.label} className={`fp-check ${isActive ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="priceRange"
                    checked={isActive}
                    onChange={() => togglePriceRange(r)}
                  />
                  <span className="fp-check-box fp-radio-box" />
                  <span className="fp-check-label">{r.label}</span>
                </label>
              );
            })}

            {/* Manuel slider */}
            <div className="fp-price-range">
              <div className="fp-price-inputs">
                <div className="fp-price-field">
                  <label className="fp-micro">Min</label>
                  <input
                    type="number"
                    className="fp-price-input mono"
                    value={localMin}
                    min={MIN_PRICE}
                    max={localMax}
                    step={1000}
                    onChange={e => setLocalMin(Number(e.target.value))}
                    onBlur={applyPrice}
                  />
                </div>
                <span className="fp-price-sep">—</span>
                <div className="fp-price-field">
                  <label className="fp-micro">Max</label>
                  <input
                    type="number"
                    className="fp-price-input mono"
                    value={localMax}
                    min={localMin}
                    max={MAX_PRICE}
                    step={1000}
                    onChange={e => setLocalMax(Number(e.target.value))}
                    onBlur={applyPrice}
                  />
                </div>
              </div>
              <button className="fp-apply" onClick={applyPrice}>Uygula</button>
            </div>
          </div>

          {/* Altın Türü */}
          <div className="fp-section">
            <h3 className="fp-section-title">Altın Türü</h3>
            {ALTIN_TURU.map(a => (
              <label key={a} className={`fp-check ${filters.altinTurleri.includes(a) ? 'active' : ''}`}>
                <input type="checkbox" checked={filters.altinTurleri.includes(a)} onChange={() => toggleAltin(a)} />
                <span className="fp-check-box" />
                <span className="fp-check-label">{a}</span>
              </label>
            ))}
          </div>

          {/* Etiketler */}
          <div className="fp-section">
            <h3 className="fp-section-title">Özellik</h3>
            {['Yeni', 'Manos Gold', 'Yeşil Altın'].map(t => (
              <label key={t} className={`fp-check ${filters.tags.includes(t) ? 'active' : ''}`}>
                <input type="checkbox" checked={filters.tags.includes(t)} onChange={() => toggleTag(t)} />
                <span className="fp-check-box" />
                <span className="fp-check-label">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="fp-foot">
          <button className="btn-block" style={{justifyContent:'center'}} onClick={onClose}>
            Sonuçları Gör
          </button>
        </div>
      </aside>
    </>
  );
}

export default function UrunlerPage() {
  const [sort, setSort] = useState('default');
  const [view, setView] = useState('grid');
  const [panelOpen, setPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    kategoriler: [],
    altinTurleri: [],
    minPrice: null,
    maxPrice: null,
    tags: [],
  });

  const activeCount = filters.kategoriler.length + filters.altinTurleri.length
    + filters.tags.length + (filters.minPrice !== null ? 1 : 0);

  const list = useMemo(() => {
    let base = [...PRODUCTS];

    if (filters.kategoriler.length > 0)
      base = base.filter(p => filters.kategoriler.includes(p.kategori));

    if (filters.tags.length > 0)
      base = base.filter(p => p.tag && filters.tags.includes(p.tag));

    if (filters.minPrice !== null)
      base = base.filter(p => p.price >= filters.minPrice);

    if (filters.maxPrice !== null && filters.maxPrice !== Infinity)
      base = base.filter(p => p.price <= filters.maxPrice);

    // altın türü — tag veya kind üzerinden yaklaştırma
    if (filters.altinTurleri.length > 0) {
      base = base.filter(p =>
        filters.altinTurleri.some(a => {
          if (a === 'Yeşil Altın') return p.tag === 'Yeşil Altın';
          if (a === 'Rose Altın') return p.tag === 'Rose Altın';
          return !p.tag || (p.tag !== 'Yeşil Altın' && p.tag !== 'Rose Altın');
        })
      );
    }

    if (sort === 'price-asc') base.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') base.sort((a, b) => b.price - a.price);
    else if (sort === 'name') base.sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    return base;
  }, [filters, sort]);

  return (
    <main>
      {/* HERO */}
      <div className="listing-hero">
        <div className="lh-overlay" />
        <div className="lh-content wrap">
          <span className="eyebrow">Katalog</span>
          <h1 className="display lh-title">Koleksiyon</h1>
          <p className="lh-lead">Kapalıçarşı atölyemizde el işçiliğiyle üretilen tüm koleksiyon.</p>
        </div>
        <div className="lh-stamp">
          <div className="hallmark" style={{'--sz':'80px',fontSize:'.56rem'}}>
            <b style={{fontSize:'.62rem'}}>585</b>
            <span style={{fontSize:'.34rem'}}>14K ALTIN</span>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="listing-toolbar wrap">
        <div className="ltb-left">
          {/* Filtre butonu */}
          <button className={`ltb-filter-btn ${panelOpen ? 'active' : ''}`} onClick={() => setPanelOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M7 12h10M11 18h2"/>
            </svg>
            Filtrele
            {activeCount > 0 && <span className="ltb-badge">{activeCount}</span>}
          </button>

          {/* Aktif filtre etiketleri */}
          {activeCount > 0 && (
            <div className="ltb-tags">
              {filters.kategoriler.map(k => (
                <span key={k} className="ltb-tag">
                  {CATEGORIES.find(c => c.slug === k)?.name}
                  <button onClick={() => setFilters(f => ({...f, kategoriler: f.kategoriler.filter(x => x !== k)}))}>×</button>
                </span>
              ))}
              {filters.tags.map(t => (
                <span key={t} className="ltb-tag">
                  {t}
                  <button onClick={() => setFilters(f => ({...f, tags: f.tags.filter(x => x !== t)}))}>×</button>
                </span>
              ))}
              {filters.minPrice !== null && (
                <span className="ltb-tag">
                  {TL(filters.minPrice)} — {filters.maxPrice === Infinity ? '∞' : TL(filters.maxPrice)}
                  <button onClick={() => setFilters(f => ({...f, minPrice: null, maxPrice: null}))}>×</button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="ltb-right">
          <span className="filter-count mono">{list.length} ürün</span>
          <select className="sort-select mono" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="view-toggle">
            <button className={view === 'grid' ? 'on' : ''} aria-label="Grid" onClick={() => setView('grid')}>
              <svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>
            </button>
            <button className={view === 'list' ? 'on' : ''} aria-label="Liste" onClick={() => setView('list')}>
              <svg viewBox="0 0 16 16"><rect x="1" y="2" width="14" height="3"/><rect x="1" y="7" width="14" height="3"/><rect x="1" y="12" width="14" height="3"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ÜRÜNLER */}
      <div className="wrap listing-body">
        {list.length ? (
          <div className={view === 'list' ? 'listing-list' : 'listing-grid'}>
            {list.map(p => <ProductCard product={p} key={p.id} listView={view === 'list'} />)}
          </div>
        ) : (
          <div className="listing-empty">
            <span className="eyebrow">Sonuç bulunamadı</span>
            <p>Bu filtrelere uyan ürün bulunmuyor.</p>
            <button
              className="link-arrow"
              style={{borderBottom:'1px solid var(--ink)',paddingBottom:'.2rem',marginTop:'1rem'}}
              onClick={() => setFilters({ kategoriler:[], altinTurleri:[], minPrice:null, maxPrice:null, tags:[] })}
            >
              Filtreleri temizle →
            </button>
          </div>
        )}
      </div>

      {/* FİLTRE PANELİ */}
      {panelOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </main>
  );
}
