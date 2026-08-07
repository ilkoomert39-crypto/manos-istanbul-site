import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <div className="notfound-wrap">
        <div className="hallmark notfound-stamp" style={{'--sz':'100px',fontSize:'.6rem'}}>
          <b style={{fontSize:'.7rem'}}>404</b>
          <span style={{fontSize:'.32rem'}}>SAYFA YOK</span>
        </div>
        <span className="eyebrow" style={{marginTop:'2rem'}}>Kaybolmuş gibi görünüyorsunuz</span>
        <h1 className="display notfound-title">Bu sayfa bulunamadı.</h1>
        <p className="notfound-sub">Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.</p>
        <div className="notfound-actions">
          <Link href="/" className="btn-block" style={{justifyContent:'center',minWidth:180}}>Ana Sayfaya Dön</Link>
          <Link href="/urunler" className="link-arrow" style={{borderBottom:'1px solid var(--ink)',paddingBottom:'.15rem'}}>Koleksiyona Git →</Link>
        </div>
        <div className="notfound-cats">
          {[
            {href:'/urunler?kategori=yuzukler',label:'Yüzükler'},
            {href:'/urunler?kategori=kolyeler',label:'Kolyeler'},
            {href:'/urunler?kategori=kupeler',label:'Küpeler'},
            {href:'/urunler?kategori=bileklikler',label:'Bileklikler'},
          ].map(c => (
            <Link key={c.href} href={c.href} className="notfound-cat">{c.label}</Link>
          ))}
        </div>
      </div>
    </main>
  );
}
