"use client";

import { useRouter } from "next/navigation";
import { colors, gradients } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";
import { Header } from "@/design-system/components/Header/Header";
import { CTAButton } from "@/design-system/components/Button/CTAButton";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/test/question/1");
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        type="title"
        title="그녀와 나의 궁합은?!"
        onBackClick={() => router.back()}
      />
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <span className="text-6xl mb-4 inline-block">💕</span>
          </div>
          <h1 style={{
            ...typography.title.h1,
            background: gradients.textGradient02,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}>
            그녀와 나의 궁합은?!
          </h1>
          <p style={{
            ...typography.body.body3,
            color: colors.neutral[300],
            marginBottom: '32px',
          }}>
            그녀의 생일을 입력하고<br />
            나와의 궁합을 쉽게 확인해보세요!
          </p>
        </div>
      </main>

      {/* 하단 고정 버튼 영역 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        backgroundColor: colors.background.main,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <CTAButton
          buttonType="primary"
          status="active"
          size="xl"
          fullWidth
          onClick={handleStart}
        >
          테스트 시작하기
        </CTAButton>
        <CTAButton
          buttonType="tertiary"
          status="active"
          size="xl"
          fullWidth
          onClick={() => console.log('공유하기 clicked')}
        >
          공유하기
        </CTAButton>
      </div>
    </div>
  );
}
