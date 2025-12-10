"use client";

import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { ResultBase } from "./ResultBase";

export function ResultContent() {
  const router = useRouter();

  const handleRestart = () => {
    router.push("/");
  };

  return (
    <ResultBase
      ctaSection={
        <CTAButtonGroup
          type="twoButton"
          primaryButtonText="앱 설치하고 맞춤 미션 확인하기"
          secondButtonText="테스트 다시하기"
          secondButtonType="secondary"
          onSecondButtonClick={handleRestart}
        />
      }
    />
  );
}
