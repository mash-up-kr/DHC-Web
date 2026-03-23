"use client";

import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";

export default function WorthTestQuestion1() {
  const router = useRouter();

  return (
    <div
      style={{ backgroundColor: colors.background.main, minHeight: "100vh" }}
      className="flex flex-col items-center"
    >
      <div className="max-w-md w-full flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Question 1</h1>
      </div>

      <div className="fixed bottom-0 left-0 right-0" style={{ backgroundColor: colors.background.main }}>
        <div className="max-w-md w-full mx-auto">
          <CTAButtonGroup
            type="oneButton"
            primaryButtonText="다음"
            onPrimaryClick={() => router.push("/worth-test/question/2")}
          />
        </div>
      </div>
    </div>
  );
}
