'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { isDarkMode } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}