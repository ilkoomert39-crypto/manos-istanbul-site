import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import WelcomePopup from '@/components/WelcomePopup';

export const metadata = {
  title: 'Manos İstanbul — 14K Altın Mücevher, Kapalıçarşı',
  description: "Kapalıçarşı'da üç kuşaktır el işçiliğiyle üretilen 14 ayar altın mücevherler. Yüzük, kolye, küpe ve bileklik koleksiyonları.",
  keywords: '14k altın, mücevher, kapalıçarşı, yüzük, kolye, küpe, bileklik, istanbul',
  openGraph: {
    title: 'Manos İstanbul — 14K Altın Mücevher',
    description: "Kapalıçarşı'da üç kuşaktır el işçiliğiyle üretilen ince mücevherler.",
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,460;0,9..144,560;1,9..144,460;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=Public+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Toast />
          <WelcomePopup />
        </CartProvider>
      </body>
    </html>
  );
}
