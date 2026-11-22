import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.certification} IT Training & Professional Education`,
  description: siteConfig.description,
  keywords: [
    'YSM Infotech',
    'ISO 9001:2015 Certified',
    'Data Analytics with Gen AI',
    'AI & ML',
    'Data Science',
    'Python for AI',
    'AI Engineer',
    'Azure DevOps',
    'Business Analyst AI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Instant client-side redirect for legacy #about links */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(window.location.hash==='#about'){window.location.replace('/about');}window.addEventListener('hashchange',function(){if(window.location.hash==='#about'){window.location.replace('/about');}});}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#111817] antialiased selection:bg-[#16B6B8]/20 selection:text-[#176B68]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
