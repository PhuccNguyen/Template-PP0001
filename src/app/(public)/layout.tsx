import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import ChatWidget from '@/components/shared/chat-widget';

export const metadata: Metadata = {
  title: {
    template: '%s | Thomas Hoàng - Blockchain Expert',
    default: 'Thomas Hoàng - Blockchain Expert & Founder JO-i',
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}