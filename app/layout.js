import './globals.css';
import AppHomeButton from '../components/AppHomeButton';
import AppThemeShell from '../components/AppThemeShell';
import AuthSessionProvider from '../components/AuthSessionProvider';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://toolvoid.com'),
  title: 'ToolVoid - Free Online Tools',
  description: 'Free online toolkit with PDF tools, image toolkit, CV builder, AI script generator and more.',
  verification: {
    google: "rbqEJHRr7nYPOzcpX-joYrhKKHOXN43MzVU-L-LjaL8",
  },
  alternates: {
    canonical: 'https://toolvoid.com/',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="app-body min-h-full flex flex-col">
        <AuthSessionProvider>
          <AppHomeButton />
          <AppThemeShell />
          {children}
        </AuthSessionProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9LZ4JMZ26L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LZ4JMZ26L');
          `}
        </Script>
        <SpeedInsights />
      </body>
    </html>
  );
}
