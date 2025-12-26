"use client";

import { useEffect, useState } from "react";
import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";
import { ScratchOrb } from "./ScratchOrb";
import { isNativeApp } from "@/utils/device";

interface ResultReadyProps {
  onConfirm: () => void;
}

export function ResultReady({ onConfirm }: ResultReadyProps) {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

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
