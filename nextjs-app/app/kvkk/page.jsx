export const metadata = { title: 'KVKK Aydınlatma Metni — Manos İstanbul' };
export default function KvkkPage() {
  return (
    <main>
      <div className="policy-hero">
        <div className="wrap">
          <span className="eyebrow">Yasal</span>
          <h1 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',marginTop:'.6rem',color:'var(--paper)'}}>KVKK Aydınlatma Metni</h1>
        </div>
      </div>
      <div className="wrap policy-body">
        <div className="policy-section">
          <h2 className="policy-heading">Veri Sorumlusu</h2>
          <p>Manos İstanbul (Nuruosmaniye Caddesi No:31, Fatih/İstanbul) olarak kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlemekteyiz.</p>
        </div>
        <div className="policy-section">
          <h2 className="policy-heading">Toplanan Veriler</h2>
          <ul className="policy-list">
            <li>Ad, soyad, e-posta adresi, telefon numarası</li>
            <li>Teslimat adresi ve sipariş bilgileri</li>
            <li>Ödeme bilgileri (güvenli ödeme altyapısı üzerinden işlenir, tarafımızca saklanmaz)</li>
            <li>Site kullanım verileri (çerezler aracılığıyla)</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2 className="policy-heading">İşleme Amaçları</h2>
          <ul className="policy-list">
            <li>Sipariş işleme, teslimat ve müşteri hizmetleri</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Açık rızanız doğrultusunda pazarlama iletişimi</li>
          </ul>
        </div>
        <div className="policy-section">
          <h2 className="policy-heading">Haklarınız</h2>
          <p>Kişisel verilerinize erişim, düzeltme, silme veya işlemeye itiraz hakkı için <a href="mailto:kvkk@manosistanbul.com" style={{color:'var(--brass-deep)'}}>kvkk@manosistanbul.com</a> adresine yazabilirsiniz.</p>
        </div>
      </div>
    </main>
  );
}
