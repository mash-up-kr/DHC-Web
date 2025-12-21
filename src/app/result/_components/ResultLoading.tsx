"use client";

import { colors } from "@/design-system/foundations/colors";
import { ScoreText } from "@/design-system/components/ScoreText";

export function ResultLoading() {
  return (
    <main
      className="flex flex-col items-center"
      style={{
        backgroundColor: colors.background.main,
        backgroundImage: 'url(/images/loading-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100dvh',
        height: '100%',
      }}
    >
      {/* ScoreText - 상단 26px 여백 */}
      <div style={{ paddingTop: '26px', width: '100%' }}>
        <ScoreText
          type="loading"
          badgeText="me 🩷 her"
          loadingText={`당신과 그녀의\n궁합을 살펴보는 중이에요...`}
        />
      </div>

      {/* Orb 이미지 섹션 - 화면 중앙 */}
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          marginTop: '-140px',
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
