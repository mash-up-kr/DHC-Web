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
import { validateDateField, formatBirthTime } from "@/utils/dateValidation";
import { QuestionBanner } from "../_components/QuestionBanner";

export default function Question4() {
  const router = useRouter();
  const { partnerBirth, setPartnerBirth } = useTestStore();

  const isBirthValid = partnerBirth.unknownBirth || (partnerBirth.year && partnerBirth.month && partnerBirth.day);
  const isTimeValid = partnerBirth.unknownTime || partnerBirth.birthTime;
  const isFormValid = isBirthValid && isTimeValid && partnerBirth.hairColor && partnerBirth.eyeColor && partnerBirth.skinColor;

  const handleNext = () => {
    if (isFormValid) {
      router.push("/test/question/5");
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
            currentPage={4}
            totalPage={5}
            progress={80}
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
          src="/images/question-banner-4.png"
          alt="질문 4 그래픽"
        />

        {/* 그래픽 하단 24px 공백 */}
        <div style={{ height: '24px' }} />

        {/* Title */}
        <Title
          type="page"
          size="sm"
          title={`Q4.그 사람의 생년월일과\n태어난 시간을 입력해주세요`}
          description={`생년월일이 정확할수록\n더 적합한 정보를 제공해 드릴 수 있어요`}
        />

        {/* 생년월일 체크 */}
        <LabelButton
          type="check"
          size="sm"
          label="생년월일"
          checkLabel="잘 모르겠어요"
          checked={partnerBirth.unknownBirth}
          onCheck={(checked) => setPartnerBirth({ unknownBirth: checked })}
        />

        {/* 생년월일 입력 */}
        <InputFieldGroup
          type="multi"
          size="md"
          label="생년월일"
          align="start"
          showLabel={false}
          items={[
            { key: 'year', value: partnerBirth.year, placeholder: '2000', suffix: '년', type: 'number', maxLength: 4, disabled: partnerBirth.unknownBirth },
            { key: 'month', value: partnerBirth.month, placeholder: '1', suffix: '월', type: 'number', maxLength: 2, disabled: partnerBirth.unknownBirth },
            { key: 'day', value: partnerBirth.day, placeholder: '1', suffix: '일', type: 'number', maxLength: 2, disabled: partnerBirth.unknownBirth },
          ]}
          onChange={(key, value) => {
            const { value: validatedValue } = validateDateField(key, value);
            if (key === 'year') setPartnerBirth({ year: validatedValue });
            else if (key === 'month') setPartnerBirth({ month: validatedValue });
            else if (key === 'day') setPartnerBirth({ day: validatedValue });
          }}
        />

        {/* 태어난 시간 체크 */}
        <LabelButton
          type="check"
          size="sm"
          label="태어난 시간"
          checkLabel="잘 모르겠어요"
          checked={partnerBirth.unknownTime}
          onCheck={(checked) => setPartnerBirth({ unknownTime: checked })}
        />

        {/* 시간 입력 */}
        <div style={{ padding: '0 20px 20px' }}>
          <InputField
            type="text"
            value={partnerBirth.birthTime}
            onChange={(value) => setPartnerBirth({ birthTime: formatBirthTime(value) })}
            placeholder="00:00"
            disabled={partnerBirth.unknownTime}
          />
        </div>

        {/* 하단 24px 여백 */}
        <div style={{ height: '24px' }} />

        {/* 안내 메시지 */}
        <Title
          type="page"
          size="sm"
          title={`생일을 몰라도 괜찮아요. 그 사람의\n다른 정보를 토대로 운을 점쳐드릴게요!`}
        />

        {/* 머리색상 선택 */}
        <LabelButton
          type="select"
          size="md"
          label="그 사람의 머리색상"
          options={[
            { label: '밝은 편이다', value: 'light' },
            { label: '어두운 편이다', value: 'dark' },
          ]}
          selectedValue={partnerBirth.hairColor}
          onSelect={(value) => setPartnerBirth({ hairColor: value })}
        />

        {/* 눈동자 색상 선택 */}
        <LabelButton
          type="select"
          size="md"
          label="눈동자 색상"
          options={[
            { label: '노란편이다', value: 'yellow' },
            { label: '푸른편이다', value: 'blue' },
          ]}
          selectedValue={partnerBirth.eyeColor}
          onSelect={(value) => setPartnerBirth({ eyeColor: value })}
        />

        {/* 피부색 선택 */}
        <LabelButton
          type="select"
          size="md"
          label="피부색"
          options={[
            { label: '하얀 편이다', value: 'white' },
            { label: '어두운 편이다', value: 'dark' },
          ]}
          selectedValue={partnerBirth.skinColor}
          onSelect={(value) => setPartnerBirth({ skinColor: value })}
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
