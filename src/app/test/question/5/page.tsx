"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { validateDateField } from "@/utils/dateValidation";

export default function Question5() {
  const router = useRouter();
  const { loveDate, setLoveDate } = useTestStore();

  const isFormValid = loveDate.year && loveDate.month && loveDate.day;

  const handleNext = () => {
    if (isFormValid) {
      router.push("/result");
    }
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh' }} className="flex flex-col items-center">
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
            currentPage={5}
            totalPage={5}
            progress={100}
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
          title={`Q5. 마지막 단계에요!\n처음 사랑에 빠진 날을 입력해주세요`}
          description="결과까지 얼마 남지 않았어요"
        />

        {/* 사랑에 빠진 날 입력 */}
        <InputFieldGroup
          type="multi"
          size="md"
          label="사랑에 빠진 날"
          align="start"
          items={[
            { key: 'year', value: loveDate.year, placeholder: '2000', suffix: '년', type: 'number', maxLength: 4 },
            { key: 'month', value: loveDate.month, placeholder: '1', suffix: '월', type: 'number', maxLength: 2 },
            { key: 'day', value: loveDate.day, placeholder: '1', suffix: '일', type: 'number', maxLength: 2 },
          ]}
          onChange={(key, value) => {
            const { value: validatedValue } = validateDateField(key, value);
            if (key === 'year') setLoveDate({ year: validatedValue });
            else if (key === 'month') setLoveDate({ month: validatedValue });
            else if (key === 'day') setLoveDate({ day: validatedValue });
          }}
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
            primaryButtonText="테스트 결과 확인"
            primaryDisabled={!isFormValid}
            onPrimaryClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
