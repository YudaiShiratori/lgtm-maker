import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Toaster } from '~/components/ui/sonner';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: 'LGTM Maker',
  description: '画像をアップロードしてLGTM画像を生成するツール',
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
};

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${notoSansJP.variable}`} lang="ja">
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
