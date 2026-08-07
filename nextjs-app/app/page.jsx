import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { PRODUCTS, CATEGORIES } from '@/lib/products';

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <main>
      <HeroSlider />

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Koleksiyonlar</span>
              <h2>Dört kategori.</h2>
            </div>
            <p>Her kategori, atölyemizde el işçiliğiyle üretilen kendi karakterini taşır.</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c, idx) => (
              <Link className="cat-card" href={`/urunler?kategori=${c.slug}`} key={c.slug}>
                <img src={c.img} alt={c.name} loading="lazy" />
                <span className="cat-no">{String(idx + 1).padStart(2, '0')} / 04</span>
                <span className="cat-body">
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-sub">{c.desc}</span>
                  <span className="cat-link">Keşfedin →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <span className="eyebrow">Yeni Gelenler</span>
              <h2>Atölyeden yeni çıkanlar.</h2>
            </div>
            <p>Her etikette 585 damgası ve gramaj yer alır — el işçiliğinin kâğıda değil, metale yazıldığı yer.</p>
          </div>
          <div className="bento">
            {featured.map((p) => (
              <ProductCard product={p} variant={p.big ? 'big' : 'reg'} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="quote-sec">
        <div className="quote-grid">
          <div className="quote-img">
            <img
              src="https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Manos İstanbul atölye"
            />
          </div>
          <div className="quote-body">
            <span className="quote-mark">&ldquo;</span>
            <p className="q">
              Bir parça bitmeden önce üç kez tartılır: dökümden sonra, taş oturmadan önce, ciladan sonra.
            </p>
            <span className="quote-cite">— Atölye, Kapalıçarşı</span>
          </div>
        </div>
      </section>

      <section className="usp-strip">
        <div className="wrap usp-list">
          <div className="usp-item">
            <span className="n">01</span>
            <h3>Ücretsiz Kargo</h3>
            <p>Yurtiçi tüm siparişlerde; yurtdışına UPS ile 2–4 iş günü.</p>
          </div>
          <div className="usp-item">
            <span className="n">02</span>
            <h3>Görüntülü Danışmanlık</h3>
            <p>Ölçü ve taş seçimini canlı görüşmeyle birlikte kararlaştırın.</p>
          </div>
          <div className="usp-item">
            <span className="n">03</span>
            <h3>Kişiye Özel Tasarım</h3>
            <p>Aklınızdaki parçayı atölyemizde birlikte çizelim.</p>
          </div>
        </div>
      </section>

      <section className="news">
        <div className="wrap news-in">
          <h3 className="display-i">Yeni koleksiyonlardan ilk siz haberdar olun.</h3>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
