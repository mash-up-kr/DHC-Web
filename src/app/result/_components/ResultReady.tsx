"use client";

import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";
import { ScratchOrb } from "./ScratchOrb";

interface ResultReadyProps {
  onConfirm: () => void;
}

export function ResultReady({ onConfirm }: ResultReadyProps) {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh', height: '100%' }}>
      <main
        className="flex flex-col items-center"
        style={{
          backgroundColor: colors.background.main,
          paddingBottom: '140px',
          minHeight: '100dvh',
          height: '100%',
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
          {/* Scratch Orb */}
          <ScratchOrb
            size={210}
            maskColor="#CDE3FF"
            revealImageUrl="/images/scratch-reveal-orb.png"
            completionThreshold={0.65}
            brushSize={30}
            onComplete={onConfirm}
          />
        </div>
      </main>
    </div>
  );
}
