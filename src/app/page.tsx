"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MoreBtn } from "@/design-system/components/MoreBtn";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { shareUrl } from "@/utils/share";
import { isMobileDevice } from "@/utils/device";
import { close } from "@/utils/bridge";

export default function Home() {
  const router = useRouter();
  const { resetAll } = useTestStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const handleShare = async () => {
    const result = await shareUrl();
    if (result.success && result.method === 'clipboard') {
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-6"
      style={{ backgroundColor: colors.background.main }}
    >
      <div className="max-w-md w-full flex flex-col items-center">
        <Header
          type="screenInfo"
          title="그 사람과 나의 궁합은?!"
          currentPage={1}
          totalPage={4}
          showBackButton={isMobile}
          showIndicator={false}
          className="fixed top-0 left-0 right-0 z-50"
          onBackClick={() => close()}
        />

        {/* Header 높이(52px) + 40px 공백 */}
        <div style={{ height: '92px' }} />

        {/* 임시 그래픽 영역 */}
        <div
          className="w-full flex items-center justify-center -mx-6"
          style={{
            height: '188px',
            backgroundColor: colors.violet[50],
            width: 'calc(100% + 48px)',
          }}
        >
          <span style={{ color: colors.neutral[500] }}>그래픽 (변경예정)</span>
        </div>

        {/* 20px 공백 */}
        <div style={{ height: '20px' }} />

        {/* ScoreText */}
        <ScoreText
          type="result"
          badgeText="짝사랑 하는 그 사람... 나와 잘될 수 있을까?"
          title="그 사람과 나의 연애궁합은?!"
          description={"짝사랑 상대의 생일을 입력하고\n나와의 궁합을 쉽게 확인해보세요!"}
        />
      </div>

      {/* 하단 고정 영역 */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* 참여 인원 표시 */}
          <div style={{ marginBottom: '12px', pointerEvents: 'none' }}>
            <MoreBtn showIcon={false}>
              지금까지 <span style={{ color: '#D8DCE2' }}>389</span>명이 참여했어요
            </MoreBtn>
          </div>

          {/* CTA 버튼 그룹 */}
          <CTAButtonGroup
            type="twoButton"
            primaryButtonText="테스트 시작하기"
            onPrimaryClick={() => {
              resetAll();
              router.push('/test/question/1');
            }}
            secondButtonType="tertiary"
            secondButtonText="공유하기"
            onSecondButtonClick={handleShare}
          />
        </div>
      </div>

    </main>
  );
}
