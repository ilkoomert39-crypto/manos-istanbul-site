'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL } from '@/lib/products';

export default function RecentlyViewed() {
  const { recentlyViewed } = useCart();
  if (!recentlyViewed || recentlyViewed.length < 2) return null;

  return (
    <section className="section rv-section">
      <div className="wrap">
        <div className="section-top" style={{marginBottom:'2rem'}}>
          <div>
            <span className="eyebrow">Geçmiş</span>
            <h2 className="display" style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',marginTop:'.4rem'}}>Son incelenenler.</h2>
          </div>
        </div>
        <div className="rv-grid">
          {recentlyViewed.slice(0,4).map(p => (
            <Link key={p.slug} href={`/urunler/${p.slug}`} className="rv-card">
              <div className="rv-img">
                <img src={p.img} alt={p.name} loading="lazy"/>
              </div>
              <span className="rv-kind">{p.kind}</span>
              <span className="rv-name">{p.name}</span>
              <span className="rv-price mono">{TL(p.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
