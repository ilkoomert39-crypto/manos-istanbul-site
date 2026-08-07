'use client';
import { useEffect, useState } from 'react';

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('manos_popup');
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 3500);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    sessionStorage.setItem('manos_popup', '1');
    setOpen(false);
  }

  function submit(e) {
    e.preventDefault();
    setDone(true);
    setTimeout(close, 2200);
  }

  if (!open) return null;

  return (
    <>
      <div className="popup-overlay" onClick={close} />
      <div className="popup" role="dialog" aria-modal="true" aria-label="Hoş geldiniz">
        <button className="popup-close" onClick={close} aria-label="Kapat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="popup-img">
          <img
            src="https://images.pexels.com/photos/8706570/pexels-photo-8706570.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Manos İstanbul"
          />
          <div className="popup-img-overlay"/>
          <div className="popup-img-text">
            <div className="hallmark" style={{'--sz':'70px',fontSize:'.5rem'}}>
              <b style={{fontSize:'.58rem'}}>585</b>
              <span style={{fontSize:'.3rem'}}>14K</span>
            </div>
          </div>
        </div>

        <div className="popup-body">
          {done ? (
            <div className="popup-thanks">
              <span className="eyebrow">Teşekkürler</span>
              <p className="display" style={{fontSize:'1.4rem',marginTop:'.5rem'}}>Kod e-postanızda!</p>
              <p style={{color:'var(--stone)',fontSize:'.86rem',marginTop:'.5rem'}}>İlk siparişinizde <b>MANOS10</b> kodunu kullanın.</p>
            </div>
          ) : (
            <>
              <span className="eyebrow">Hoş Geldiniz</span>
              <h2 className="display popup-title">İlk siparişinize<br /><em>%10 indirim.</em></h2>
              <p className="popup-lead">
                Bültenimize abone olun, koleksiyondan ilk haberdar olan siz olun ve ilk alışverişinizde %10 indirim kazanın.
              </p>
              <form className="popup-form" onSubmit={submit}>
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="popup-input"
                />
                <button type="submit" className="btn-block popup-btn">
                  İndirimi Al →
                </button>
              </form>
              <button className="popup-skip" onClick={close}>Teşekkürler, gerek yok</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
