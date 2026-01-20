import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 짝사랑은 나한테 관심이 있을까?",
  description: "현재 389명이 참여했어요!",
  openGraph: {
    title: "내 짝사랑은 나한테 관심이 있을까?",
    description: "현재 389명이 참여했어요!",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "궁합 테스트",
      },
    ],
    type: "website",
    siteName: "궁합 테스트",
  },
  other: {
    "naver-site-verification": "71b43508cf6362f637bc9aa18206de06e9994ac9",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
