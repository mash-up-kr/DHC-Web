"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/design-system/components/Header/Header";
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
        type="progressbar"
        currentPage={1}
        totalPage={3}
        progress={33.33}
        onBackClick={() => router.back()}
      />
      <main className="pt-28 pb-8 px-6 min-h-screen flex flex-col">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            당신의 생년월일을 입력해주세요
          </h2>
          <p className="text-gray-600 mb-8">
            정확한 궁합 분석을 위해 생년월일이 필요해요
          </p>

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
        </div>
      </main>
    </div>
  );
}
