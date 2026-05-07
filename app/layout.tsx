import type { Metadata } from 'next';
import { Geist, Geist_Mono, Fraunces } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Fraunces({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'infuseth.ink — Infuse thoughts, ink futures',
  description:
    'Learn anything in 3-minute microlessons that accumulate into real skills over time. Sip your first cup — or share your brew with the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased block-full`}
    >
      <body className="flex flex-col min-block-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
