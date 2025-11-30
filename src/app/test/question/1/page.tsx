"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { LabelButton } from "@/design-system/components/LabelButton";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";

export default function Question1() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useTestStore();

  const isFormValid = userInfo.gender && userInfo.name;

  const handleNext = () => {
    if (isFormValid) {
      router.push("/test/question/2");
    }
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh' }}>
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
        <Header
          type="progressBar"
          currentPage={1}
          totalPage={5}
          progress={20}
          onBackClick={() => router.back()}
        />
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div
        style={{
          paddingTop: '52px',
          paddingBottom: '100px',
          overflowY: 'auto',
          minHeight: '100vh',
        }}
      >
        {/* Header 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* 임시 그래픽 영역 */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: '188px',
            backgroundColor: colors.violet[50],
          }}
        >
          <span style={{ color: colors.neutral[500] }}>그래픽 (변경예정)</span>
        </div>

        {/* 그래픽 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* Title */}
        <Title
          type="page"
          size="sm"
          title="Q1.당신에 대해서 알려주세요"
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
          selectedValue={userInfo.gender}
          onSelect={(value) => setUserInfo({ gender: value })}
        />

        {/* 이름 입력 */}
        <InputFieldGroup
          type="single"
          size="md"
          label="내 이름"
          items={[
            { key: 'name', value: userInfo.name, placeholder: '홍길동' },
          ]}
          onChange={(_, value) => setUserInfo({ name: value })}
        />
      </div>

      {/* CTA 버튼 */}
      <div
        className="fixed bottom-0 left-0 right-0"
        style={{ backgroundColor: colors.background.main }}
      >
        <CTAButtonGroup
          type="oneButton"
          primaryButtonText="다음"
          primaryDisabled={!isFormValid}
          onPrimaryClick={handleNext}
        />
      </div>
    </div>
  );
}
