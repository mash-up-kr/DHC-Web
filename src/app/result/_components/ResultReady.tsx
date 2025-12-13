"use client";

import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";
import { Tooltip } from "@/design-system/components/Tooltip";

interface ResultReadyProps {
  onConfirm: () => void;
}

export function ResultReady({ onConfirm }: ResultReadyProps) {
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
          <Tooltip label="Swipe" arrowPosition="bottom-center" />

          {/* Orb */}
          <div
            onClick={onConfirm}
            style={{
              width: '210px',
              height: '210px',
              borderRadius: '50%',
              backgroundColor: '#CDE3FF',
              cursor: 'pointer',
            }}
          />
        </div>
      </main>
    </div>
  );
}
