'use client';
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState([]);
  const [toast, setToast] = useState({ msg: '', type: 'ok', key: 0 });
  const [miniOpen, setMiniOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // localStorage hydrate
  useEffect(() => {
    try {
      const saved = localStorage.getItem('manos_cart');
      if (saved) setItems(JSON.parse(saved));
      const savedFavs = localStorage.getItem('manos_favs');
      if (savedFavs) setFavs(JSON.parse(savedFavs));
      const rv = localStorage.getItem('manos_rv');
      if (rv) setRecentlyViewed(JSON.parse(rv));
    } catch {}
  }, []);

  // localStorage sync
  useEffect(() => {
    try { localStorage.setItem('manos_cart', JSON.stringify(items)); } catch {}
  }, [items]);
  useEffect(() => {
    try { localStorage.setItem('manos_favs', JSON.stringify(favs)); } catch {}
  }, [favs]);
  useEffect(() => {
    try { localStorage.setItem('manos_rv', JSON.stringify(recentlyViewed)); } catch {}
  }, [recentlyViewed]);

  const showToast = useCallback((msg, type = 'ok') => {
    setToast(t => ({ msg, type, key: t.key + 1 }));
  }, []);

  function addItem(product, opts = {}) {
    const key = `${product.slug}-${opts.meta || 'standart'}`;
    setItems(cur => {
      const found = cur.find(c => c.key === key);
      if (found) return cur.map(c => c.key === key ? { ...c, qty: c.qty + (opts.qty || 1) } : c);
      return [...cur, { key, id: product.id, slug: product.slug, name: product.name, price: product.price, qty: opts.qty || 1, img: product.images[0], meta: opts.meta || '' }];
    });
    showToast('Sepete eklendi');
    setMiniOpen(true);
  }

  function updateQty(key, qty) {
    setItems(cur => qty < 1 ? cur.filter(c => c.key !== key) : cur.map(c => c.key === key ? { ...c, qty } : c));
  }

  function removeItem(key) {
    const item = items.find(c => c.key === key);
    setItems(cur => cur.filter(c => c.key !== key));
    if (item) showToast(`"${item.name}" kaldırıldı`, 'warn');
  }

  function toggleFav(product) {
    const exists = favs.find(f => f.slug === product.slug);
    if (exists) {
      setFavs(f => f.filter(x => x.slug !== product.slug));
      showToast('Favorilerden çıkarıldı', 'warn');
    } else {
      setFavs(f => [...f, { id: product.id, slug: product.slug, name: product.name, price: product.price, img: product.images[0], kind: product.kind }]);
      showToast('Favorilere eklendi ♥');
    }
  }

  function isFav(slug) { return favs.some(f => f.slug === slug); }

  function addRecentlyViewed(product) {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.slug !== product.slug);
      return [{ slug: product.slug, name: product.name, price: product.price, img: product.images[0], kind: product.kind }, ...filtered].slice(0, 6);
    });
  }

  const count = useMemo(() => items.reduce((a, c) => a + c.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a, c) => a + c.qty * c.price, 0), [items]);
  const favCount = favs.length;

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, count, total, favs, favCount, toggleFav, isFav, showToast, toast, miniOpen, setMiniOpen, recentlyViewed, addRecentlyViewed }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart, CartProvider içinde kullanılmalı');
  return ctx;
}
