'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { TL } from '@/lib/products';

export default function QuickView({ product, onClose }) {
  const { addItem } = useCart();
  if (!product) return null;
  return (
    <>
      <div className="qv-overlay" onClick={onClose} />
      <div className="qv-modal" role="dialog" aria-modal="true">
        <button className="qv-close" onClick={onClose} aria-label="Kapat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="qv-img">
          <img src={product.images[0]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}} />
          {product.tag && <span className="p-tag">{product.tag}</span>}
        </div>
        <div className="qv-body">
          <span className="p-kind">{product.kind}</span>
          <h2 className="display qv-title">{product.name}</h2>
          <div className="price-row" style={{margin:'.6rem 0'}}>
            <span className="price" style={{fontSize:'1.3rem'}}>{TL(product.price)}</span>
          </div>
          <p style={{color:'var(--stone)',fontSize:'.88rem',lineHeight:1.7,marginBottom:'1.2rem'}}>{product.desc}</p>
          <div className="qv-specs">
            <span className="mono">585 · 14K</span><span>·</span><span>~{product.weight}</span><span>·</span><span>5–7 iş günü</span>
          </div>
          <div style={{display:'flex',gap:'.8rem',marginTop:'1.4rem',flexWrap:'wrap'}}>
            <button className="btn-block" style={{flex:1,justifyContent:'center',minWidth:140}} onClick={() => { addItem(product); onClose(); }}>
              Sepete Ekle +
            </button>
            <Link href={`/urunler/${product.slug}`} className="btn-block" style={{flex:1,justifyContent:'center',minWidth:140,background:'transparent',color:'var(--ink)',border:'1px solid var(--ink)'}} onClick={onClose}>
              Detaya Git →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
