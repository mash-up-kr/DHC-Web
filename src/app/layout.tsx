import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "내 썸녀와 잘될 수 있을까?",
  description: "두 사람의 운명적인 궁합을 확인해보세요",
  openGraph: {
    title: "내 썸녀와 잘될 수 있을까?",
    description: "두 사람의 운명적인 궁합을 확인해보세요",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "궁합 테스트",
      },
    ],
    type: "website",
    siteName: "궁합 테스트",
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
