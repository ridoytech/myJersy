import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MY JERSY | Custom Performance Teamwear & Jerseys',
  description:
    'Premium sublimated custom jerseys, match kits, and teamwear. Wear your heritage with bespoke design, names, and numbers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8F7F4] text-[#141416] antialiased selection:bg-[#141416] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
