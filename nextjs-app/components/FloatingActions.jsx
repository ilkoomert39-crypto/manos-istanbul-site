'use client';
import { useEffect, useState } from 'react';

export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="float-actions">
      {/* WhatsApp */}
      <a
        href="https://wa.me/905455229262?text=Merhaba, Manos İstanbul hakkında bilgi almak istiyorum."
        target="_blank"
        rel="noopener"
        className="float-wa"
        aria-label="WhatsApp ile iletişim"
      >
        <svg viewBox="0 0 24 24" fill="white" style={{width:24,height:24}}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.541 4.063 1.487 5.776L0 24l6.39-1.676A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.72.975.992-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/>
        </svg>
      </a>

      {/* Scroll to top */}
      <button
        className={`float-top ${show ? 'on' : ''}`}
        aria-label="Yukarı çık"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}>
          <path d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </div>
  );
}
