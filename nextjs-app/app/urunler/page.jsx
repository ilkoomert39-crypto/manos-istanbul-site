import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';

export const metadata = {
  title: 'Ürünler — Manos İstanbul',
};

export default function UrunlerPage({ searchParams }) {
  const kategori = searchParams?.kategori || '';
  const isOzel = kategori === 'ozel-koleksiyon';
  const activeCat = CATEGORIES.find((c) => c.slug === kategori);

  const list = isOzel
    ? PRODUCTS.filter((p) => p.tag === 'Manos Gold')
    : activeCat
    ? PRODUCTS.filter((p) => p.kategori === kategori)
    : PRODUCTS;

  const heading = isOzel ? 'Özel Koleksiyon' : activeCat ? activeCat.name : 'Tüm Ürünler';
  const lead = isOzel
    ? 'Manos Gold — sınırlı sayıda üretilen imza parçalar.'
    : activeCat
    ? activeCat.desc
    : 'Kapalıçarşı atölyemizde el işçiliğiyle üretilen tüm koleksiyon, tek sayfada.';

  return (
    <main>
      <div className="wrap listing-head">
        <span className="eyebrow">Katalog</span>
        <h1 className="display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: '.6rem' }}>
          {heading}
        </h1>
        <p style={{ color: 'var(--stone)', maxWidth: '46ch', marginTop: '.8rem' }}>{lead}</p>

        <nav className="filter-bar" aria-label="Kategori filtresi">
          <Link href="/urunler" className={!kategori ? 'active' : ''}>
            Tümü
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              href={`/urunler?kategori=${c.slug}`}
              className={kategori === c.slug ? 'active' : ''}
              key={c.slug}
            >
              {c.name}
            </Link>
          ))}
          <Link href="/urunler?kategori=ozel-koleksiyon" className={isOzel ? 'active' : ''}>
            Özel Koleksiyon
          </Link>
        </nav>
      </div>

      <div className="wrap" style={{ paddingBottom: '6rem' }}>
        {list.length ? (
          <div className="listing-grid">
            {list.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        ) : (
          <p className="listing-empty">Bu kategoride henüz ürün bulunmuyor.</p>
        )}
      </div>
    </main>
  );
}
