import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Thomas Hoàng - Blockchain Expert & Founder JO-i',
  description: 'Chuyên gia Blockchain và Tư vấn Chuyển đổi Số với 6+ năm kinh nghiệm. Founder JO-i, Giảng viên Fintech Innovation.',
  keywords: ['blockchain', 'fintech', 'AI', 'tư vấn chuyển đổi số', 'Thomas Hoàng', 'JO-i'],
  authors: [{ name: 'Thomas Hoàng', url: 'https://thomas.com' }],
  openGraph: {
    title: 'Thomas Hoàng - Blockchain Expert',
    description: 'Chuyên gia Blockchain và Tư vấn Chuyển đổi Số',
    url: 'https://thomas.com',
    siteName: 'Thomas Hoàng',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Hoàng - Blockchain Expert',
    description: 'Chuyên gia Blockchain và Tư vấn Chuyển đổi Số',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}