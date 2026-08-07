# Manos İstanbul — Site Tasarım Mockup'ları & Next.js Uygulaması

14K altın mücevher markası Manos İstanbul için geliştirilen premium e-ticaret tasarım
çalışmaları.

## `nextjs-app/` — Çalışan Next.js uygulaması (güncel)
Sayfaları gerçek route'larla birbirine bağlı, derlenip çalıştırılabilir uygulama:
- `/` — Ana sayfa (hero slider, kategori vitrini, ürün grid'i)
- `/urunler` — Ürün listeleme (kategori filtreli)
- `/urunler/[slug]` — Ürün detay
- `/sepet` — Sepet

Kurulum ve detaylar için `nextjs-app/README.md`.

```bash
cd nextjs-app
npm install
npm run build && npm run start
```

## Statik HTML mockup'ları (arşiv — tasarım süreci)
Tamamı tek dosyalık HTML/CSS/JS, bağımlılık yok, doğrudan tarayıcıda açılır.

- `manos-istanbul-anasayfa-v5.html`, `manos-urun-detay-v5.html` — Next.js uygulamasının
  temel aldığı, en gelişmiş statik tasarım sürümü (kemik/mürekkep/pirinç-altın palet,
  Fraunces + IBM Plex Mono, 585 ayar damgası imza öğe)
- `manos-istanbul-anasayfa.html` … `v4.html`, `manos-urun-detay.html`, `manos-sepet.html`,
  `kuyumcu-anasayfa.html` — tasarım sürecindeki ara adımlar

## Diğer
- `manos-ozel-yazilim-teklifi.pptx` — OpenCart → özel yazılım geçiş teklif sunumu

Tüm görseller örnek/stok fotoğraflardır (Pexels, ücretsiz lisans); canlıya geçerken
markanın kendi çekimleriyle değiştirilmesi gerekir.
