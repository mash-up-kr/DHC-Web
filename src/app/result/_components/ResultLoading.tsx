"use client";

import { colors } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";

export function ResultLoading() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundColor: colors.background.main }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* 로딩 애니메이션 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '4px solid',
            borderColor: `${colors.violet[500]} transparent ${colors.violet[500]} transparent`,
            animation: 'spin 1.2s linear infinite',
          }}
        />
        <p
          style={{
            ...typography.title['h4-1'],
            color: colors.text.main,
            textAlign: 'center',
          }}
        >
          궁합을 분석하고 있어요...
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
