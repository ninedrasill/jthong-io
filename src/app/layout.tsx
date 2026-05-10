import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />
        <div className="fixed inset-0 -z-10 bg-black/75" />
        {children}
      </body>
    </html>
  );
}
