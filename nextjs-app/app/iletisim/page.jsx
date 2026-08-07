'use client';
import { useState } from 'react';

export default function IletisimPage() {
  const [form, setForm] = useState({ ad: '', email: '', tel: '', konu: '', mesaj: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      {/* HERO */}
      <div className="contact-hero">
        <div className="wrap ch-content">
          <span className="eyebrow">İletişim</span>
          <h1 className="display ch-title">Atölyeyle<br /><em>konuşun.</em></h1>
          <p className="ch-sub">Özel sipariş, ölçü danışmanlığı veya ziyaret — her kanaldan ulaşabilirsiniz.</p>
        </div>
      </div>

      <div className="wrap contact-grid">
        {/* SOL — İletişim bilgileri */}
        <div className="ci-left">
          <div className="ci-block">
            <span className="eyebrow">Adres</span>
            <p className="ci-main">Nuruosmaniye Caddesi No:31<br />Fatih / İstanbul</p>
            <a
              href="https://maps.google.com/?q=Nuruosmaniye+Caddesi+31+Fatih+Istanbul"
              target="_blank" rel="noopener"
              className="ci-link"
            >
              Haritada Gör →
            </a>
          </div>

          <div className="ci-block">
            <span className="eyebrow">Telefon & WhatsApp</span>
            <a href="tel:+902125229262" className="ci-main ci-hover">+90 212 522 92 62</a>
            <a href="https://wa.me/905455229262?text=Merhaba, mücevher danışmanlığı hakkında bilgi almak istiyorum." target="_blank" rel="noopener" className="ci-link ci-wa">
              <svg viewBox="0 0 24 24" style={{width:15,height:15,fill:'#25D366'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.541 4.063 1.487 5.776L0 24l6.39-1.676A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.72.975.992-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
              WhatsApp ile Yaz
            </a>
          </div>

          <div className="ci-block">
            <span className="eyebrow">E-posta</span>
            <a href="mailto:info@manosistanbul.com" className="ci-main ci-hover">info@manosistanbul.com</a>
          </div>

          <div className="ci-block">
            <span className="eyebrow">Çalışma Saatleri</span>
            <div className="ci-hours">
              <div><span>Pazartesi — Cumartesi</span><span className="mono">09:00 — 19:00</span></div>
              <div><span>Pazar</span><span className="mono">Kapalı</span></div>
            </div>
          </div>

          <div className="ci-block">
            <span className="eyebrow">Sosyal Medya</span>
            <div className="ci-socials">
              {[
                { name: 'Instagram', href: 'https://instagram.com/manosistanbul', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name: 'Pinterest', href: 'https://pinterest.com/manosistanbul', icon: 'M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener" className="ci-social-link">
                  <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:'currentColor'}}><path d={s.icon}/></svg>
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SAĞ — Form */}
        <div className="ci-right">
          {sent ? (
            <div className="cf-thanks">
              <div className="hallmark" style={{'--sz':'80px',fontSize:'.54rem'}}>
                <b style={{fontSize:'.6rem'}}>✓</b>
              </div>
              <h3 className="display" style={{fontSize:'1.6rem',marginTop:'1.2rem'}}>Mesajınız alındı.</h3>
              <p style={{color:'var(--stone)',marginTop:'.7rem',maxWidth:'32ch',textAlign:'center'}}>
                En geç 1 iş günü içinde size dönüş yapacağız.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="display cf-title">Bize yazın</h2>
              <p className="cf-lead">Özel sipariş, danışmanlık veya genel sorular için formu doldurun.</p>

              <div className="cf-row">
                <div className="cf-field">
                  <label className="cf-label">Ad Soyad *</label>
                  <input
                    className="cf-input"
                    type="text"
                    required
                    placeholder="Ad Soyad"
                    value={form.ad}
                    onChange={e => setForm({...form, ad: e.target.value})}
                  />
                </div>
                <div className="cf-field">
                  <label className="cf-label">E-posta *</label>
                  <input
                    className="cf-input"
                    type="email"
                    required
                    placeholder="ornek@email.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <label className="cf-label">Telefon</label>
                  <input
                    className="cf-input"
                    type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={form.tel}
                    onChange={e => setForm({...form, tel: e.target.value})}
                  />
                </div>
                <div className="cf-field">
                  <label className="cf-label">Konu *</label>
                  <select
                    className="cf-input cf-select"
                    required
                    value={form.konu}
                    onChange={e => setForm({...form, konu: e.target.value})}
                  >
                    <option value="">Seçiniz</option>
                    <option>Özel Sipariş</option>
                    <option>Ürün Bilgisi</option>
                    <option>Görüntülü Danışmanlık</option>
                    <option>Teslimat & İade</option>
                    <option>Ziyaret Randevusu</option>
                    <option>Diğer</option>
                  </select>
                </div>
              </div>

              <div className="cf-field">
                <label className="cf-label">Mesajınız *</label>
                <textarea
                  className="cf-input cf-textarea"
                  required
                  rows={5}
                  placeholder="Mesajınızı buraya yazın…"
                  value={form.mesaj}
                  onChange={e => setForm({...form, mesaj: e.target.value})}
                />
              </div>

              <div className="cf-kvkk">
                <input type="checkbox" id="kvkk" required />
                <label htmlFor="kvkk">
                  <a href="/kvkk" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum, kişisel verilerimin işlenmesine onay veriyorum.
                </label>
              </div>

              <button type="submit" className="btn-block cf-submit">
                Mesajı Gönder →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* HARİTA placeholder */}
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.316!2d28.9700!3d41.0100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzM2LjAiTiAyOMKwNTgnMTIuMCJF!5e0!3m2!1str!2str!4v1234567890"
          width="100%"
          height="100%"
          style={{border:0,display:'block'}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Manos İstanbul Konum"
        />
      </div>
    </main>
  );
}
