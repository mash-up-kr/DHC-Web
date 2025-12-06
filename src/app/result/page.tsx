"use client";

import { useRouter } from "next/navigation";
import { ScoreText } from "@/design-system/components/ScoreText";
import { colors } from "@/design-system/foundations/colors";

export default function Result() {
  const router = useRouter();

  // 임시 궁합 점수 (나중에 실제 계산 로직으로 대체)
  const compatibilityScore = 85;

  const handleRestart = () => {
    router.push("/");
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "천생연분이에요!\n지금 바로 고백하세요!";
    if (score >= 80) return "결혼까지 꿈꿔볼 수 있을것같아요\n놓치기전에 먼저 고백해보세요!";
    if (score >= 70) return "좋은 궁합이에요!\n서로를 더 알아가 보세요";
    if (score >= 60) return "노력하면 잘 될 수 있어요!\n서로 이해하는 시간이 필요해요";
    return "서로를 이해하는 시간이 필요해요\n천천히 알아가 보세요";
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-6"
      style={{ backgroundColor: colors.background.main }}
    >
      <div className="text-center max-w-md w-full">
        {/* ScoreText - 최상단 26px 여백, 하단 24px 여백 */}
        <div style={{ paddingTop: '26px', paddingBottom: '24px' }}>
          <ScoreText
            type="result"
            badgeText="궁합점수"
            score={compatibilityScore}
            description={getScoreMessage(compatibilityScore)}
          />
        </div>

        {/* Orb Graphic */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: '#2E3341',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'white',
                opacity: 0.4,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              그래픽 (변경예정)
            </span>
          </div>
        </div>

        <div className="mt-8 bg-pink-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">궁합 분석 포인트</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li>✨ 생년월일로 본 운명적인 연결</li>
            <li>💫 두 사람의 에너지 조화도</li>
            <li>💖 사랑의 시작점이 주는 의미</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRestart}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            다시 하기
          </button>
          <button
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-lg border-2 border-gray-200 transition-colors duration-200"
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </main>
  );
}
