"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { LabelButton } from "@/design-system/components/LabelButton";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { QuestionBanner } from "../../question/_components/QuestionBanner";
import { useScreenImpression, ScreenName } from "@/analytics";

export default function Question1() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useTestStore();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useScreenImpression(ScreenName.QUESTION_1);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const handleResize = () => {
      setKeyboardHeight(window.innerHeight - vv.height);
    };

    vv.addEventListener("resize", handleResize);
    return () => vv.removeEventListener("resize", handleResize);
  }, []);

  const isFormValid = !!userInfo.name;

  const handleNext = () => {
    if (isFormValid) {
      router.push('/worth-test/group/detail');
    }
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh' }} className="flex flex-col items-center">
      {/* SEO를 위한 숨겨진 H1 */}
      <h1 className="sr-only">부자 테스트 - 그룹 생성하기</h1>

      {/* 상단 고정 Header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: colors.background.main,
        }}
      >
        <div className="max-w-md w-full mx-auto">
          <Header
            type="screenInfo"
            showBackButton={true}
            showIndicator={false}
            onBackClick={() => router.back()}
          />
        </div>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div
        className="max-w-md w-full"
        style={{
          paddingTop: '52px',
          paddingBottom: '100px',
          overflowY: 'auto',
          minHeight: '100vh',
        }}
      >
        {/* Header 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* 그래픽 영역 */}
        <QuestionBanner
          src="/group-create-banner.png"
          alt="그룹 생성 배너"
        />

        {/* 그래픽 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* Title */}
        <Title
          type="page"
          size="sm"
          title="생성할 그룹의 이름을 입력해주세요"
          description="성별과 이름을 알려주세요"
        />

        {/* 이름 입력 */}
        <InputFieldGroup
          type="single"
          size="md"
          label="그룹이름"
          align="start"
          items={[
            { key: 'name', value: userInfo.name, placeholder: '부자 모임', inputRef: nameInputRef as React.Ref<HTMLInputElement> },
          ]}
          onChange={(_, value) => setUserInfo({ name: value })}
        />
      </div>

      {/* CTA 버튼 */}
      <div
        className="fixed left-0 right-0"
        style={{
          bottom: `${keyboardHeight}px`,
          backgroundColor: colors.background.main,
          transition: 'bottom 0.1s ease-out',
        }}
      >
        <div className="max-w-md w-full mx-auto">
          <CTAButtonGroup
          type="oneButton"
          primaryButtonText="그룹 생성하기"
          primaryDisabled={!isFormValid}
            onPrimaryClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
