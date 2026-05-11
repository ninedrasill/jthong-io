import type { Metadata } from "next";
import { Poiret_One } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, SITE_AUTHOR } from "@/lib/seo";

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poiret",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  keywords: [
    'JT Hong', '홍진택', 'NINEDRASILL', '나인드라실', 'jthong.io',
    '화물인', '화물인이사', '개인 OS', 'EXIT 전략', '디지털 트윈',
    '사업가', '창업', '싱가포르 패밀리오피스',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: '@jthong',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  verification: {
    other: {
      'naver-site-verification': '28a6358ac867b90c33a057b5834dec59ed24569b',
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${poiret.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <div
          className="fixed left-0 top-0 w-screen -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg.png')",
            height: "100lvh",
          }}
        />
        <div
          className="fixed left-0 top-0 w-screen -z-10 bg-black/80"
          style={{ height: "100lvh" }}
        />
        {children}
      </body>
    </html>
  );
}
