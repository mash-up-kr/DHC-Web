import type { Metadata } from "next";
import { OG_TITLE } from "@/constants/meta";

const SITE_URL = "https://dhc-web.vercel.app";

export const metadata: Metadata = {
  title: `${OG_TITLE} | 연애 궁합 테스트`,
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
    canonical: "/love-test",
  },
  openGraph: {
    title: OG_TITLE,
    description: "현재 389명이 참여했어요!",
    url: `${SITE_URL}/love-test`,
    type: "website",
    siteName: "연애 궁합 테스트",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${OG_TITLE} | 연애 궁합 테스트`,
    description:
      "짝사랑 상대와의 연애 궁합을 확인해보세요! 생년월일 기반 무료 궁합 테스트",
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
  url: `${SITE_URL}/love-test`,
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

export default function LoveTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
