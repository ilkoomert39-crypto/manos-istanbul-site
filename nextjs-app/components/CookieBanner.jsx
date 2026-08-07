'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem('manos_cookie');
    if (!v) setShow(true);
  }, []);

  function accept() { localStorage.setItem('manos_cookie', 'all'); setShow(false); }
  function reject() { localStorage.setItem('manos_cookie', 'essential'); setShow(false); }

  if (!show) return null;

  return (
    <div className="cookie-banner" role="alertdialog" aria-label="Çerez bildirimi">
      <div className="cookie-inner">
        <div className="cookie-text">
          <p><b>Çerez Tercihleri</b></p>
          <p>Deneyiminizi iyileştirmek için zorunlu ve analitik çerezler kullanıyoruz. <Link href="/kvkk" className="cookie-link">KVKK metnini</Link> inceleyebilirsiniz.</p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-btn-secondary" onClick={reject}>Yalnızca Zorunlu</button>
          <button className="cookie-btn-primary" onClick={accept}>Tümünü Kabul Et</button>
        </div>
      </div>
    </div>
  );
}
