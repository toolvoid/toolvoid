import './globals.css';
import AppHomeButton from '../components/AppHomeButton';
import AppThemeShell from '../components/AppThemeShell';
import AuthSessionProvider from '../components/AuthSessionProvider';
import Script from 'next/script';

export const metadata = {
  title: 'ResumeForge - Free Resume Builder',
  description: 'Build stunning professional resumes for free.',
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
      </body>
    </html>
  );
}