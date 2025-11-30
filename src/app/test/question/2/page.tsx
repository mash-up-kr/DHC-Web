"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { InputField } from "@/design-system/components/InputField";
import { LabelButton } from "@/design-system/components/LabelButton";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";

export default function Question2() {
  const router = useRouter();
  const { userBirth, setUserBirth } = useTestStore();

  const isFormValid = userBirth.year && userBirth.month && userBirth.day && (userBirth.unknownTime || userBirth.birthTime);

  const handleNext = () => {
    if (isFormValid) {
      router.push("/test/question/3");
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
          currentPage={2}
          totalPage={5}
          progress={40}
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
          title={`Q2.당신의 생년월일과\n태어난 시간을 입력해주세요`}
          description={`생년월일이 정확할수록\n더 적합한 정보를 제공해 드릴 수 있어요`}
        />

        {/* 생년월일 입력 */}
        <InputFieldGroup
          type="multi"
          size="md"
          label="생년월일"
          items={[
            { key: 'year', value: userBirth.year, placeholder: '2000', suffix: '년', type: 'number', maxLength: 4 },
            { key: 'month', value: userBirth.month, placeholder: '1', suffix: '월', type: 'number', maxLength: 2 },
            { key: 'day', value: userBirth.day, placeholder: '1', suffix: '일', type: 'number', maxLength: 2 },
          ]}
          onChange={(key, value) => {
            if (key === 'year') setUserBirth({ year: value });
            else if (key === 'month') setUserBirth({ month: value });
            else if (key === 'day') setUserBirth({ day: value });
          }}
        />

        {/* 태어난 시간 체크 */}
        <LabelButton
          type="check"
          size="sm"
          label="태어난 시간"
          checkLabel="잘 모르겠어요"
          checked={userBirth.unknownTime}
          onCheck={(checked) => setUserBirth({ unknownTime: checked })}
        />

        {/* 시간 입력 */}
        <div style={{ padding: '0 20px 20px' }}>
          <InputField
            type="text"
            value={userBirth.birthTime}
            onChange={(value) => setUserBirth({ birthTime: value })}
            placeholder="00 : 00"
            disabled={userBirth.unknownTime}
          />
        </div>
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
