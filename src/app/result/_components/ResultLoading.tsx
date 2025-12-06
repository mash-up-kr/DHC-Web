"use client";

import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";

export function ResultLoading() {
  return (
    <main
      className="flex min-h-screen flex-col items-center"
      style={{ backgroundColor: colors.background.main }}
    >
      {/* ScoreText - 상단 26px 여백 */}
      <div style={{ paddingTop: '26px', width: '100%' }}>
        <ScoreText
          type="loading"
          badgeText="me 🩷 her"
          loadingText={`당신과 그녀의\n궁합을 살펴보는 중이에요...`}
        />
      </div>

      {/* Orb 이미지 섹션 - 상단 64px 여백 */}
      <div
        style={{
          marginTop: '64px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          background: 'radial-gradient(circle 300px 150px at 50% 66%, rgba(94, 105, 212, 0.4) 23%, rgba(94, 105, 212, 0.12) 51%, rgba(94, 105, 212, 0.04) 75%, rgba(94, 105, 212, 0.02) 88%, rgba(94, 105, 212, 0) 100%)',
        }}
      >
        <img
          src="/images/loading-orb.png"
          alt="Loading Orb"
          style={{
            width: '100%',
            maxWidth: '375px',
            height: 'auto',
          }}
        />
      </div>
    </main>
  );
}
