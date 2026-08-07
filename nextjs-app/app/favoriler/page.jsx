'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL } from '@/lib/products';

export default function FavorilerPage() {
  const { favs, toggleFav, addItem } = useCart();

  return (
    <main>
      <div className="listing-hero" style={{height:220}}>
        <div className="lh-overlay"/>
        <div className="lh-content wrap">
          <span className="eyebrow">Listelerim</span>
          <h1 className="display lh-title" style={{fontSize:'clamp(2rem,4vw,3rem)'}}>Favoriler</h1>
        </div>
      </div>

      <div className="wrap" style={{paddingTop:'2.4rem',paddingBottom:'6rem'}}>
        {favs.length === 0 ? (
          <div className="listing-empty" style={{paddingTop:'5rem'}}>
            <span className="eyebrow">Henüz favori yok</span>
            <p style={{marginTop:'.5rem'}}>Beğendiğiniz ürünleri ♥ ile favorilere ekleyin.</p>
            <Link href="/urunler" className="link-arrow" style={{display:'inline-flex',marginTop:'1.2rem',borderBottom:'1px solid var(--ink)',paddingBottom:'.15rem'}}>
              Koleksiyona Göz At →
            </Link>
          </div>
        ) : (
          <>
            <p className="mono" style={{fontSize:'.76rem',color:'var(--stone)',marginBottom:'2rem'}}>{favs.length} ürün</p>
            <div className="listing-grid">
              {favs.map(p => (
                <article key={p.slug} className="product">
                  <div className="p-frame">
                    <button
                      className="p-fav"
                      style={{background:'rgba(237,232,221,.95)'}}
                      aria-label="Favorilerden çıkar"
                      onClick={() => toggleFav(p)}
                    >
                      <svg viewBox="0 0 24 24" style={{fill:'var(--brass)',stroke:'var(--brass)',width:15,height:15,strokeWidth:1.5}}>
                        <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7Z"/>
                      </svg>
                    </button>
                    <Link href={`/urunler/${p.slug}`}>
                      <img src={p.img} alt={p.name} loading="lazy"/>
                    </Link>
                  </div>
                  <div className="p-body">
                    <div>
                      <h3 className="p-name">{p.name}</h3>
                      <span className="p-kind">{p.kind}</span>
                    </div>
                    <span className="p-price mono">{TL(p.price)}</span>
                  </div>
                  <button className="p-add" onClick={() => addItem(p)}>Sepete ekle +</button>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
