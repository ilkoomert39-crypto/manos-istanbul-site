'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TL } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, variant = '' }) {
  const { addItem, toggleFav } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <article className={`product ${variant}`}>
      <div className="p-frame">
        {product.tag && <span className="p-tag">{product.tag}</span>}
        <button
          className="p-fav"
          aria-label="Favorilere ekle"
          onClick={() => {
            setLiked((v) => !v);
            toggleFav(!liked);
          }}
        >
          <svg viewBox="0 0 24 24" style={{ fill: liked ? 'var(--brass)' : 'none', stroke: liked ? 'var(--brass)' : 'var(--ink)' }}>
            <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z" />
          </svg>
        </button>
        <Link href={`/urunler/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>
        <div className="hallmark p-mark">
          <b>585</b>
          <span>{product.weight}</span>
        </div>
      </div>
      <div className="p-body">
        <div>
          <h3 className="p-name">{product.name}</h3>
          <span className="p-kind">{product.kind}</span>
        </div>
        <span className="p-price mono">{TL(product.price)}</span>
      </div>
      <button className="p-add" onClick={() => addItem(product)}>
        Sepete ekle +
      </button>
    </article>
  );
}
