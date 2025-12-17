"use client";

import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";
import { Tooltip } from "@/design-system/components/Tooltip";

interface ResultReadyIntroProps {
  onNext: () => void;
}

export function ResultReadyIntro({ onNext }: ResultReadyIntroProps) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <main
        className="flex min-h-screen flex-col items-center"
        style={{
          backgroundColor: colors.background.main,
          paddingBottom: '140px',
        }}
      >
        {/* ScoreText - 상단 26px 여백 */}
        <div style={{ paddingTop: '26px', width: '100%' }}>
          <ScoreText
            type="loading"
            badgeText="분석완료"
            loadingText={`유리구슬을\n문질러 보세요!`}
          />
        </div>

        {/* 원형 오브 - 화면 중앙 */}
        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Swipe 툴팁 */}
          <div className="tooltip-bounce">
            <Tooltip label="문질러 보세요!" arrowPosition="bottom-center" />
          </div>
          <style jsx>{`
            .tooltip-bounce {
              animation: tooltipBounce 1s ease-in-out infinite;
            }
            @keyframes tooltipBounce {
              0% {
                transform: translateY(0);
              }
              25% {
                transform: translateY(-10px);
              }
              75% {
                transform: translateY(10px);
              }
              100% {
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Intro Orb 이미지 */}
          <img
            src="/images/scratch-intro-orb.png"
            alt="Intro Orb"
            onClick={onNext}
            style={{
              width: 210,
              height: 210,
              cursor: 'pointer',
            }}
          />
        </div>
      </main>
    </div>
  );
}
