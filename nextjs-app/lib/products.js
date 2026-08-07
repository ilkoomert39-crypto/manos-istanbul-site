// Örnek/gösterim amaçlı ürün kataloğu.
// Görseller Pexels (ücretsiz lisans) stok fotoğraflardır — canlıya geçerken
// markanın kendi çekimleriyle değiştirilmelidir.

const PX = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const CATEGORIES = [
  { slug: 'yuzukler', name: 'Yüzükler', desc: 'Soliter, alyans, taşlı ve sade modeller', img: PX(10799225, 700) },
  { slug: 'kolyeler', name: 'Kolyeler', desc: 'İnce zincir, imza kolye ve pandantifler', img: PX(8706570, 700) },
  { slug: 'bileklikler', name: 'Bileklikler', desc: 'Zincir, kelepçe ve taşlı bileklikler', img: PX(8184263, 700) },
  { slug: 'kupeler', name: 'Küpeler', desc: 'Halka, tektaş ve sallantılı modeller', img: PX(12144990, 700) },
];

export const PRODUCTS = [
  {
    id: 1,
    slug: 'thalassa-link-bileklik',
    name: 'Thalassa Link Bileklik',
    kategori: 'bileklikler',
    kind: 'Bileklik · 14K',
    price: 59264,
    weight: '6,20gr',
    tag: 'Yeni',
    big: true,
    desc: 'Deniz dalgasından ilhamla tasarlanan zincir bileklik; 14 ayar altından, tek tek elde işlenen halkalarla örülür.',
    images: [PX(32382386, 1000), PX(8184263, 900), PX(1616096, 900)],
  },
  {
    id: 2,
    slug: 'dorica-icons-bangle',
    name: 'Dorica Icons Bangle',
    kategori: 'bileklikler',
    kind: 'Kelepçe · 14K',
    price: 32669,
    weight: '4,10gr',
    desc: 'Sade ve iddialı; günlük kombinlerde tek başına, özel günlerde katmanlı takılabilen imza kelepçe.',
    images: [PX(8184263, 1000), PX(32382386, 900)],
  },
  {
    id: 3,
    slug: 'fluid-tail-kolye',
    name: 'Fluid Tail Kolye',
    kategori: 'kolyeler',
    kind: 'Kolye · 14K',
    price: 20610,
    weight: '2,15gr',
    tag: 'Yeşil Altın',
    desc: 'Akışkan bir çizgiyle biten ince zincir; boyunda hafif ve zarif bir hareket bırakır.',
    images: [PX(15272716, 1000), PX(8706570, 900)],
  },
  {
    id: 4,
    slug: 'luna-eye-yuzuk',
    name: 'Luna Eye Yüzük',
    kategori: 'yuzukler',
    kind: 'Yüzük · 14K',
    price: 12150,
    weight: '1,33gr',
    desc: "Ay'ın sükûnetini taşıyan Luna Eye; 14 ayar altın gövdesi ve göz formundaki yarı değerli taşıyla, tek başına ya da katmanlanarak taşınmak üzere tasarlandı.",
    images: [PX(14058109, 1000), PX(10799225, 900), PX(6165, 900)],
  },
  {
    id: 5,
    slug: 'confetti-yuzuk',
    name: 'Confetti Yüzük',
    kategori: 'yuzukler',
    kind: 'Yüzük · 14K',
    price: 16785,
    weight: '1,69gr',
    desc: 'Küçük taşların rastgele dağılımıyla neşeli bir doku; sade kombinlere hafif bir vurgu katar.',
    images: [PX(10799225, 1000), PX(14058109, 900)],
  },
  {
    id: 6,
    slug: 'the-sun-ii-kolye',
    name: 'The Sun II Kolye',
    kategori: 'kolyeler',
    kind: 'Kolye · 14K',
    price: 36584,
    weight: '3,73gr',
    tag: 'Manos Gold',
    desc: 'Manos Gold koleksiyonunun imza parçası; güneş motifi, günün her saatinde fark edilen bir ışıltı bırakır.',
    images: [PX(8706570, 1000), PX(15272716, 900)],
  },
  {
    id: 7,
    slug: 'halka-kupe',
    name: 'Halka Küpe',
    kategori: 'kupeler',
    kind: 'Küpe · 14K',
    price: 9450,
    weight: '1,10gr',
    desc: 'Klasik halka küpenin zamansız hali; her gün takılabilecek kadar hafif, fark edilecek kadar parlak.',
    images: [PX(12144990, 1000), PX(20858959, 900)],
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(slug, count = 4) {
  const current = getProductBySlug(slug);
  const pool = PRODUCTS.filter((p) => p.slug !== slug);
  const sameCat = pool.filter((p) => p.kategori === current?.kategori);
  const rest = pool.filter((p) => p.kategori !== current?.kategori);
  return [...sameCat, ...rest].slice(0, count);
}

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const TL = (n) => n.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺';
