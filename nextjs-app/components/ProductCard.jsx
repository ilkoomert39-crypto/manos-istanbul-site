'use client';
import Link from 'next/link';
import { useState } from 'react';
import { TL } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';

const QuickView = dynamic(() => import('@/components/QuickView'), { ssr: false });

export default function ProductCard({ product, variant = '', listView = false }) {
  const { addItem, toggleFav, isFav } = useCart();
  const [qvOpen, setQvOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const liked = isFav(product.slug);

  if (listView) {
    return (
      <article className="product-list-row">
        <Link href={`/urunler/${product.slug}`} className="plr-img">
          {!imgLoaded && <div className="img-skeleton"/>}
          <img src={product.images[0]} alt={product.name} loading="lazy" onLoad={() => setImgLoaded(true)} style={{opacity:imgLoaded?1:0,transition:'opacity .3s'}}/>
          {product.tag && <span className="p-tag">{product.tag}</span>}
        </Link>
        <div className="plr-body">
          <div>
            <span className="p-kind">{product.kind}</span>
            <h3 className="plr-name">{product.name}</h3>
            <p className="plr-desc">{product.desc}</p>
            <div className="plr-specs">
              <span className="mono">585 · 14K</span><span>·</span><span>~{product.weight}</span><span>·</span><span>5–7 iş günü</span>
            </div>
          </div>
        </div>
        <div className="plr-right">
          <span className="plr-price mono">{TL(product.price)}</span>
          <button className="btn-block plr-add" onClick={() => addItem(product)}>Sepete Ekle +</button>
          <button className="plr-fav" aria-label="Favorilere ekle" onClick={() => toggleFav(product)}>
            <svg viewBox="0 0 24 24" style={{fill:liked?'var(--brass)':'none',stroke:liked?'var(--brass)':'var(--ink)',width:18,height:18,strokeWidth:1.4}}>
              <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z"/>
            </svg>
          </button>
        </div>
      </article>
    );
  }

  return (
    <>
      <article className={`product ${variant}`}>
        <div className="p-frame">
          {product.tag && <span className="p-tag">{product.tag}</span>}
          <button className="p-fav" aria-label={liked ? 'Favorilerden çıkar' : 'Favorilere ekle'} onClick={() => toggleFav(product)}>
            <svg viewBox="0 0 24 24" style={{fill:liked?'var(--brass)':'none',stroke:liked?'var(--brass)':'var(--ink)'}}>
              <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z"/>
            </svg>
          </button>
          <Link href={`/urunler/${product.slug}`}>
            {!imgLoaded && <div className="img-skeleton" style={{position:'absolute',inset:0}}/>}
            <img src={product.images[0]} alt={product.name} loading="lazy" onLoad={() => setImgLoaded(true)} style={{opacity:imgLoaded?1:0,transition:'opacity .4s'}}/>
          </Link>
          <button className="p-quickview" onClick={() => setQvOpen(true)} aria-label="Hızlı önizleme">
            Hızlı Bak
          </button>
          <div className="hallmark p-mark"><b>585</b><span>{product.weight}</span></div>
        </div>
        <div className="p-body">
          <div>
            <h3 className="p-name">{product.name}</h3>
            <span className="p-kind">{product.kind}</span>
          </div>
          <span className="p-price mono">{TL(product.price)}</span>
        </div>
        <button className="p-add" onClick={() => addItem(product)}>Sepete ekle +</button>
      </article>
      {qvOpen && <QuickView product={product} onClose={() => setQvOpen(false)} />}
    </>
  );
}
