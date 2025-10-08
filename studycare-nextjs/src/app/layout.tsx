import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스터디케어 관리 시스템 - 스마트한 학습 관리 솔루션",
  description: "150개 이상의 스터디케어가 선택한 검증된 시스템으로 차별화된 스터디케어 관리 경험을 제공합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="loaded">
        {children}
      </body>
    </html>
  );
}
