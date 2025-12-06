"use client";

import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { ResultBase } from "./ResultBase";

export function ResultPreview() {
  const router = useRouter();

  const handleRestart = () => {
    router.push("/");
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ paddingBottom: '140px' }}>
        <ResultBase
          ctaSection={null}
        />
      </div>

      {/* CTA 버튼 영역 - 하단 고정 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#0F1114',
        }}
      >
        <div style={{ maxWidth: '448px', margin: '0 auto' }}>
          <CTAButtonGroup
            type="twoButton"
            primaryButtonText="앱 설치하기"
            secondButtonType="secondary"
            secondButtonText="테스트 다시하기"
            onSecondButtonClick={handleRestart}
          />
        </div>
      </div>
    </div>
  );
}
