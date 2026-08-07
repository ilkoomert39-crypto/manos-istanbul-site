# Manos İstanbul — Next.js Tasarım Gösterimi

Sadece **tasarımı görmek** için hazırlanmış, sayfaları birbirine bağlı bir Next.js uygulaması.
Gerçek ödeme/backend bağlantısı yoktur; sepet, favori, arama ve filtreler tarayıcı belleğinde
(React state) çalışır, sayfa yenilendiğinde sıfırlanır.

## Sayfalar
- `/` — Ana sayfa (hero slider, kategori vitrini, ürün grid'i)
- `/urunler` — Ürün listeleme (kategori filtreli: `?kategori=yuzukler` vb.)
- `/urunler/[slug]` — Ürün detay (galeri, renk/ölçü, sepete ekle) — örn. `/urunler/luna-eye-yuzuk`
- `/sepet` — Sepet sayfası

## Kurulum

```bash
npm install
npm run dev      # geliştirme — http://localhost:3000
```

Canlı sunucuda çalıştırmak için:

```bash
npm run build
npm run start     # varsayılan port 3000, PORT=xxxx ile değiştirilebilir
```

PM2 ile arka planda çalıştırmak isterseniz:

```bash
npm run build
pm2 start npm --name "manos-site" -- start
```

## Notlar
- Tüm ürün görselleri **örnek/stok fotoğraf** (Pexels, ücretsiz lisans). Canlıya geçerken
  `lib/products.js` içindeki `images` alanlarını markanın kendi çekimleriyle değiştirin.
- Ürün/kategori verisi tek dosyada: `lib/products.js`. Yeni ürün eklemek için bu dosyaya
  bir obje eklemeniz yeterli — otomatik olarak listeleme, arama ve mega menüde görünür.
- Bu sürüm kapsamı bilinçli olarak sadeleştirildi: statik HTML mockup'larındaki büyüteç/lightbox,
  kazıma seçeneği, paketleme seçimi, sertifika ve yorum bölümleri buraya taşınmadı — öncelik
  sayfaların birbirine gerçek Next.js route'larıyla bağlanmasıydı. İstenirse bir sonraki adımda
  eklenebilir.
