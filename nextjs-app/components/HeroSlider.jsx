'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDES = [
  {
    img: 'https://images.pexels.com/photos/14058109/pexels-photo-14058109.jpeg?auto=compress&cs=tinysrgb&w=1400',
    eyebrow: '585 Ayar Damgası — El İşçiliği — Nuruosmaniye',
    title: <>Altına dökülen<br /><em>her ayrıntı.</em></>,
    desc: "14 ayarı yarı değerli taşlarla buluşturuyoruz; her parça Kapalıçarşı'daki atölyemizde tek tek, elde üretiliyor.",
    primary: { href: '/urunler', label: 'Koleksiyona bakın →' },
    secondary: { href: 'https://manosistanbul.com/goruntulu-urun-danismanligi', label: 'Görüntülü danışmanlık' },
  },
  {
    img: 'https://images.pexels.com/photos/15272716/pexels-photo-15272716.jpeg?auto=compress&cs=tinysrgb&w=1400',
    eyebrow: 'Yeni Sezon — Sınırlı Sayıda',
    title: <>Manos Gold<br /><em>koleksiyonu.</em></>,
    desc: 'İtalyan zincirlerden imza kolyelere; günlük ışıltıyı zamansız bir tasarım diliyle buluşturan özel seri.',
    primary: { href: '/urunler?kategori=ozel-koleksiyon', label: 'Koleksiyonu keşfedin →' },
    secondary: { href: 'https://manosistanbul.com/hakkimizda', label: 'Atölyeyi tanıyın' },
  },
  {
    img: 'https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&w=1400',
    eyebrow: 'Kişiye Özel Tasarım',
    title: <>Aklınızdaki parçayı<br /><em>birlikte çizelim.</em></>,
    desc: "Görüntülü danışmanlık eşliğinde taş, ayar ve ölçünüzü belirleyin; Kapalıçarşı'daki atölyemizde sizin için üretelim.",
    primary: { href: 'https://manosistanbul.com/goruntulu-urun-danismanligi', label: 'Randevu alın →' },
    secondary: { href: 'https://wa.me/905455229262', label: "WhatsApp'tan yazın" },
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  const go = useCallback((n) => setI((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(timer.current);
  }, []);

  function stop() {
    clearInterval(timer.current);
  }
  function resume() {
    clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
  }

  return (
    <section className="hero-slider" onMouseEnter={stop} onMouseLeave={resume}>
      {SLIDES.map((s, idx) => (
        <div className={`hs-slide ${idx === i ? 'active' : ''}`} key={idx}>
          <img src={s.img} alt="" />
          <div className="hs-content">
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="display">{s.title}</h2>
            <p>{s.desc}</p>
            <div className="links">
              <a className="link-arrow" href={s.primary.href}>
                {s.primary.label}
              </a>
              <a className="link-arrow quiet" href={s.secondary.href}>
                {s.secondary.label}
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="hallmark hs-hallmark">
        <b>585</b>
        <span>14K El İşçiliği</span>
      </div>

      <button className="hs-arrow hs-prev" aria-label="Önceki" onClick={() => { go(i - 1); resume(); }}>
        <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button className="hs-arrow hs-next" aria-label="Sonraki" onClick={() => { go(i + 1); resume(); }}>
        <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div className="hs-dots">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={idx === i ? 'on' : ''}
            aria-label={`${idx + 1}. slayt`}
            onClick={() => { go(idx); resume(); }}
          />
        ))}
      </div>
      <div className="hs-count">
        <b>{String(i + 1).padStart(2, '0')}</b> — 03
      </div>
    </section>
  );
}
