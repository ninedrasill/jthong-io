import type { Metadata } from "next";
import { Poiret_One } from "next/font/google";
import "./globals.css";

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poiret",
});

export const metadata: Metadata = {
  title: "JTHONG.IO — NINEDRASILL",
  description: "홍진택의 개인 OS. 돈·시간·사람·몸·정신.",
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
          className="fixed left-0 top-0 w-screen -z-10 bg-black/75"
          style={{ height: "100lvh" }}
        />
        {children}
      </body>
    </html>
  );
}
