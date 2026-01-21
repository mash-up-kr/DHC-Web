import type { Metadata } from "next";
import "./globals.css";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const SITE_URL = "https://dhc-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "내 짝사랑은 나한테 관심이 있을까? | 연애 궁합 테스트",
  description:
    "짝사랑 상대와의 연애 궁합을 확인해보세요! 생년월일 기반 무료 궁합 테스트로 그 사람과의 궁합 점수를 알아보세요. 현재 389명이 참여했어요!",
  keywords: [
    "궁합 테스트",
    "연애 궁합",
    "짝사랑 테스트",
    "생년월일 궁합",
    "무료 궁합",
    "사랑 테스트",
    "연애 운세",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "내 짝사랑은 나한테 관심이 있을까?",
    description: "현재 389명이 참여했어요!",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "연애 궁합 테스트 - 짝사랑 상대와의 궁합을 확인해보세요",
      },
    ],
    type: "website",
    siteName: "연애 궁합 테스트",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "내 짝사랑은 나한테 관심이 있을까? | 연애 궁합 테스트",
    description:
      "짝사랑 상대와의 연애 궁합을 확인해보세요! 생년월일 기반 무료 궁합 테스트",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "연애 궁합 테스트",
  description:
    "짝사랑 상대와의 연애 궁합을 확인해보세요! 생년월일 기반 무료 궁합 테스트로 그 사람과의 궁합 점수를 알아보세요.",
  url: SITE_URL,
  applicationCategory: "Entertainment",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  inLanguage: "ko",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
