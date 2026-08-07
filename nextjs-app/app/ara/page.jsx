'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, TL } from '@/lib/products';
import { Suspense } from 'react';

function AraIcerigi() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const query = q.trim().toLocaleLowerCase('tr');

  const results = useMemo(() => {
    if (!query) return [];
    return PRODUCTS.filter(p =>
      p.name.toLocaleLowerCase('tr').includes(query) ||
      p.kind.toLocaleLowerCase('tr').includes(query) ||
      p.desc.toLocaleLowerCase('tr').includes(query)
    );
  }, [query]);

  return (
    <main>
      <div className="listing-hero" style={{height:200}}>
        <div className="lh-overlay"/>
        <div className="lh-content wrap">
          <span className="eyebrow">Arama</span>
          <h1 className="display lh-title" style={{fontSize:'clamp(1.6rem,3.5vw,2.6rem)'}}>
            {q ? `"${q}" için sonuçlar` : 'Arama'}
          </h1>
        </div>
      </div>
      <div className="wrap" style={{paddingTop:'2.4rem',paddingBottom:'6rem'}}>
        {!query ? (
          <p style={{color:'var(--stone)'}}>Aramak istediğiniz ürünü URL'e <code>?q=kolye</code> olarak ekleyin.</p>
        ) : results.length === 0 ? (
          <div className="listing-empty">
            <span className="eyebrow">Sonuç bulunamadı</span>
            <p style={{marginTop:'.5rem'}}>"{q}" ile eşleşen ürün yok.</p>
            <div style={{display:'flex',gap:'1rem',marginTop:'1.5rem',flexWrap:'wrap',justifyContent:'center'}}>
              <Link href="/urunler" className="btn-block" style={{justifyContent:'center',minWidth:160,fontSize:'.82rem'}}>Tüm Ürünler</Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mono" style={{fontSize:'.76rem',color:'var(--stone)',marginBottom:'2rem'}}>{results.length} ürün bulundu</p>
            <div className="listing-grid">
              {results.map(p => <ProductCard product={p} key={p.id}/>)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function AraPage() {
  return <Suspense fallback={<div style={{padding:'4rem',textAlign:'center'}}>Aranıyor…</div>}><AraIcerigi/></Suspense>;
}
