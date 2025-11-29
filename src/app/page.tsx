"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { colors } from "@/design-system/foundations/colors";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/test/question/1");
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-6"
      style={{ backgroundColor: colors.background.main }}
    >
      <Header
        type="screenInfo"
        title="그녀와 나의 궁합은?!"
        currentPage={1}
        totalPage={4}
        showBackButton={false}
        showIndicator={false}
        className="fixed top-0 left-0 right-0 z-50"
      />

      {/* Header 높이(52px) + 40px 공백 */}
      <div style={{ height: '92px' }} />

      {/* 임시 그래픽 영역 */}
      <div
        className="w-full flex items-center justify-center -mx-6"
        style={{
          height: '188px',
          backgroundColor: colors.violet[50],
          width: 'calc(100% + 48px)',
        }}
      >
        <span style={{ color: colors.neutral[500] }}>그래픽 (변경예정)</span>
      </div>

      <div className="text-center max-w-md mt-8">
        <div className="mb-6">
          <span className="text-6xl mb-4 inline-block">💕</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          내 썸녀와 잘될 수 있을까?
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          두 사람의 운명적인 궁합을 확인해보세요
        </p>
        <button
          onClick={handleStart}
          className="w-full max-w-xs bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}
