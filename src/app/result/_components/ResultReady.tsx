"use client";

import { useEffect, useState } from "react";
import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";
import { Tooltip } from "@/design-system/components/Tooltip";
import { ScratchOrb } from "./ScratchOrb";
import { isNativeApp } from "@/utils/device";
import { useScreenImpression, ScreenName } from "@/analytics";

// 점수에 따른 결과 이미지 경로 반환 (0~10: 1번, 11~20: 2번, ..., 91~100: 10번)
function getResultImage(score: number): string {
  const imageNumber = score <= 10 ? 1 : score >= 100 ? 10 : Math.floor(score / 10);

  const images: Record<number, string> = {
    1: 'result-image-1-knife',
    2: 'result-image-2-deadkinght',
    3: 'result-image-3-execution',
    4: 'result-image-4-assassin',
    5: 'result-image-5-priest2',
    6: 'result-image-6-queen',
    7: 'result-image-7-king',
    8: 'result-image-8-priest',
    9: 'result-image-9-angel',
    10: 'result-image-10-wizard',
  };

  return `/images/${images[imageNumber]}.png`;
}

interface ResultReadyProps {
  onConfirm: () => void;
}

export function ResultReady({ onConfirm }: ResultReadyProps) {
  const [isApp, setIsApp] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useScreenImpression(ScreenName.RESULT_READY);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  const handleScratchStart = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative', height: '100dvh' }}>
      <main
        className="flex flex-col items-center"
        style={{
          backgroundColor: colors.background.main,
          paddingBottom: '140px',
          height: '100%',
        }}
      >
        {/* ScoreText - 상단 여백 (모바일: 64px, 웹: 26px) */}
        <div style={{ paddingTop: isApp ? '64px' : '26px', width: '100%' }}>
          <ScoreText
            type="loading"
            badgeText="분석완료"
            loadingText={`유리구슬을\n문질러 보세요!`}
          />
        </div>

        {/* 원형 오브 - ScoreText 하단 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginTop: '24px',
          }}
        >
          {/* Swipe 툴팁 */}
          <div
            className="tooltip-bounce"
            style={{
              visibility: showTooltip ? 'visible' : 'hidden',
            }}
          >
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

          {/* Scratch Orb */}
          <ScratchOrb
            size={210}
            maskImageUrl="/images/scratch-intro-orb.png"
            revealImageUrl={getResultImage(85)}
            revealText=""
            completionThreshold={0.65}
            brushSize={30}
            onScratchStart={handleScratchStart}
            onComplete={onConfirm}
          />
        </div>
      </main>
    </div>
  );
}
