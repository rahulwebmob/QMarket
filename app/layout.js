import './globals.css';

export const metadata = {
  title: 'Quasar Markets | Institutional-Grade Market Intelligence',
  description: 'The institutional-grade intelligence layer for next-generation markets. Aligning verified, multi-source market data into a single, coherent surface for responsible decision-making.',
  keywords: 'market intelligence, institutional trading, risk management, market data, financial infrastructure',
  authors: [{ name: 'Quasar Markets' }],
  openGraph: {
    title: 'Quasar Markets | Institutional-Grade Market Intelligence',
    description: 'The institutional-grade intelligence layer for next-generation markets.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
