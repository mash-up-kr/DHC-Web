"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { LabelButton } from "@/design-system/components/LabelButton";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { QuestionBanner } from "../_components/QuestionBanner";
import { useScreenImpression, ScreenName } from "@/analytics";

export default function Question3() {
  const router = useRouter();
  const { partnerInfo, setPartnerInfo } = useTestStore();

  useScreenImpression(ScreenName.QUESTION_3);

  const isFormValid = partnerInfo.gender && partnerInfo.name;

  const handleNext = () => {
    if (isFormValid) {
      router.push("/test/question/4");
    }
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh' }} className="flex flex-col items-center">
      {/* SEO를 위한 숨겨진 H1 */}
      <h1 className="sr-only">연애 궁합 테스트 - Q3. 상대방에 대해서 알려주세요</h1>

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
            type="progressBar"
            currentPage={3}
            totalPage={5}
            progress={60}
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
          src="/images/question-banner-3.png"
          alt="질문 3 그래픽"
        />

        {/* 그래픽 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* Title */}
        <Title
          type="page"
          size="sm"
          title="Q3.그녀에 대해서 알려주세요"
          description="성별과 이름을 알려주세요"
        />

        {/* 성별 선택 */}
        <LabelButton
          type="select"
          size="md"
          label="성별"
          options={[
            { label: '남성', value: 'male' },
            { label: '여성', value: 'female' },
          ]}
          selectedValue={partnerInfo.gender}
          onSelect={(value) => setPartnerInfo({ gender: value })}
        />

        {/* 이름 입력 */}
        <InputFieldGroup
          type="single"
          size="md"
          label="그녀의 이름"
          align="start"
          items={[
            { key: 'name', value: partnerInfo.name, placeholder: '홍길동' },
          ]}
          onChange={(_, value) => setPartnerInfo({ name: value })}
        />
      </div>

      {/* CTA 버튼 */}
      <div
        className="fixed bottom-0 left-0 right-0"
        style={{ backgroundColor: colors.background.main }}
      >
        <div className="max-w-md w-full mx-auto">
          <CTAButtonGroup
            type="oneButton"
            primaryButtonText="다음"
            primaryDisabled={!isFormValid}
            onPrimaryClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
