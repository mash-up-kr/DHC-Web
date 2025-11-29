"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/design-system/components/Header/Header";
import { Title } from "@/design-system/components/Title";
import { colors } from "@/design-system/foundations/colors";

export default function Question1() {
  const router = useRouter();
  const [birthdate, setBirthdate] = useState("");

  const handleNext = () => {
    if (birthdate) {
      router.push("/test/question/2");
    }
  };

  return (
    <div style={{ backgroundColor: colors.background.main, minHeight: '100vh' }}>
      <Header
        type="progressBar"
        currentPage={1}
        totalPage={3}
        progress={33.33}
        onBackClick={() => router.back()}
      />

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

      <main className="pb-8 px-6 flex flex-col">
        <div className="flex-1">
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
            생년월일
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none text-lg"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button
          onClick={handleNext}
          disabled={!birthdate}
          className={`w-full font-semibold py-4 px-8 rounded-lg transition-colors duration-200 mt-6 ${
            birthdate
              ? "bg-pink-600 hover:bg-pink-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </main>
    </div>
  );
}
