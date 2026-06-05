import type { Metadata } from 'next';
import { Geist, Geist_Mono, Fraunces } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { GluestackUIProvider } from '@infuseth-ink/shared-ui';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// CHANGED: opt into Fraunces' optical-size axis so the same family
// renders tuned-for-display at headline sizes and tuned-for-text at
// body sizes. This is the single biggest typographic win available
// and was unused before. Also drops weight 900 — see HeroSection.tsx.
//
// CSS var renamed from --font-playfair to --font-fraunces (it loads
// Fraunces; the old name was a holdover that confused readers).
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz'],
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} block-full antialiased`}
      // GluestackUIProvider's inline <script> sets color-scheme on <html> before
      // React hydrates, causing an intentional attribute mismatch. Standard fix:
      // https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
      suppressHydrationWarning
    >
      <body className="min-block-full flex flex-col">
        <GluestackUIProvider mode="light">
          <Navbar />
          {children}
          <Footer />
        </GluestackUIProvider>
      </body>
    </html>
  );
}
