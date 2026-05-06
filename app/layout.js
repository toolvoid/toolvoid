import './globals.css';
import AppHomeButton from '../components/AppHomeButton';
import AppThemeShell from '../components/AppThemeShell';
import AuthSessionProvider from '../components/AuthSessionProvider';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'ToolVoid - Free Online Tools',
  description: 'Free online toolkit with PDF tools, image toolkit, CV builder, AI story generator and more.',
  verification: {
    google: "rbqEJHRr7nYPOzcpX-joYrhKKHOXN43MzVU-L-LjaL8",
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="app-body min-h-full flex flex-col">
        <AuthSessionProvider>
          <AppHomeButton />
          <AppThemeShell />
          {children}
        </AuthSessionProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <SpeedInsights />
      </body>
    </html>
  );
}