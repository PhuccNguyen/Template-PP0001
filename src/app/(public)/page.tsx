import React from 'react';
import { Metadata } from 'next';
import Blockchainhero from '@/components/public/blockchain-hero';
import ActivityShowcase from '@/components/public/activity-showcase';
import About from '@/components/public/about';
import ImageCarousel from '@/components/public/image-carousel';
import Contact from '@/components/public/Contact';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Thomas Hoàng - Chuyên gia Blockchain với 6+ năm kinh nghiệm, Founder JO-i. Tư vấn chuyển đổi số, xây dựng cộng đồng và diễn giả hội thảo AI/Blockchain.',
  openGraph: {
    title: 'Thomas Hoàng - Blockchain Expert & Founder JO-i',
    description: 'Chuyên gia Blockchain với 6+ năm kinh nghiệm. Tư vấn chuyển đổi số cho doanh nghiệp.',
  },
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Blockchainhero />
      <About />
      <ActivityShowcase />
      <ImageCarousel />
      <Contact />
    </div>
  );
}