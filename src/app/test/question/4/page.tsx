"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { InputField } from "@/design-system/components/InputField";
import { LabelButton } from "@/design-system/components/LabelButton";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { colors } from "@/design-system/foundations/colors";

export default function Question4() {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [birthTime, setBirthTime] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [skinColor, setSkinColor] = useState("");

  const isFormValid = year && month && day && (unknownTime || birthTime) && hairColor && eyeColor && skinColor;

  const handleNext = () => {
    if (isFormValid) {
      router.push("/test/question/5");
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
          currentPage={4}
          totalPage={5}
          progress={80}
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
          title={`Q4.그녀의 생년월일과\n태어난 시간을 입력해주세요`}
          description={`생년월일이 정확할수록\n더 적합한 정보를 제공해 드릴 수 있어요`}
        />

        {/* 생년월일 입력 */}
        <InputFieldGroup
          type="multi"
          size="md"
          label="생년월일"
          items={[
            { key: 'year', value: year, placeholder: '2000', suffix: '년', type: 'number', maxLength: 4 },
            { key: 'month', value: month, placeholder: '1', suffix: '월', type: 'number', maxLength: 2 },
            { key: 'day', value: day, placeholder: '1', suffix: '일', type: 'number', maxLength: 2 },
          ]}
          onChange={(key, value) => {
            if (key === 'year') setYear(value);
            else if (key === 'month') setMonth(value);
            else if (key === 'day') setDay(value);
          }}
        />

        {/* 태어난 시간 체크 */}
        <LabelButton
          type="check"
          size="sm"
          label="태어난 시간"
          checkLabel="잘 모르겠어요"
          checked={unknownTime}
          onCheck={setUnknownTime}
        />

        {/* 시간 입력 */}
        <div style={{ padding: '0 20px 20px' }}>
          <InputField
            type="text"
            value={birthTime}
            onChange={setBirthTime}
            placeholder="00 : 00"
            disabled={unknownTime}
          />
        </div>

        {/* 하단 24px 여백 */}
        <div style={{ height: '24px' }} />

        {/* 안내 메시지 */}
        <Title
          type="page"
          size="sm"
          title={`생일을 몰라도 괜찮아요\n아래의 정보로 운을 점쳐드릴게요!`}
        />

        {/* 머리색상 선택 */}
        <LabelButton
          type="select"
          size="md"
          label="그녀의 머리색상"
          options={[
            { label: '밝은 편이다', value: 'light' },
            { label: '어두운 편이다', value: 'dark' },
          ]}
          selectedValue={hairColor}
          onSelect={setHairColor}
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
          selectedValue={eyeColor}
          onSelect={setEyeColor}
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
          selectedValue={skinColor}
          onSelect={setSkinColor}
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
