"use client";

import { useRouter } from "next/navigation";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MessageCard } from "@/design-system/components/MessageCard";
import { TipCard } from "@/design-system/components/TipCard";
import { colors, gradients } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";

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
            flexDirection: 'column',
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

          {/* FortuneCard Shadow */}
          <div
            style={{
              width: '132px',
              height: '32px',
              marginTop: '12px',
              background: gradients.cardBottomGradient01,
              borderRadius: '50%',
            }}
          />
        </div>

        {/* 궁합 상세보기 섹션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            padding: '24px 0',
            width: '100%',
          }}
        >
          <h2
            style={{
              ...typography.title['h5-1'],
              color: colors.text.main,
              width: '100%',
              textAlign: 'left',
            }}
          >
            궁합 상세보기
          </h2>
          <MessageCard
            title="궁합운"
            message="궁합운 관련 설명"
          />
        </div>

        {/* 그녀와 사귀기 위한 꿀팁! 섹션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h2
            style={{
              ...typography.title['h5-1'],
              color: colors.text.main,
              width: '100%',
              textAlign: 'left',
            }}
          >
            그녀와 사귀기 위한 꿀팁!
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>🍴</span>}
              title="행운의 메뉴"
              value="카레"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>🍀</span>}
              title="행운의 색상"
              value="연두색"
              color="#23B169"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>😰</span>}
              title="이건 조심해야해!"
              value="치킨, 닭"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>😣</span>}
              title="이 색상도 조심해!"
              value="흰색"
              color={colors.text.main}
            />
          </div>
        </div>

        {/* 언제 고백할까? 섹션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            padding: '24px 0',
            width: '100%',
          }}
        >
          <h2
            style={{
              ...typography.title['h5-1'],
              color: colors.text.main,
              width: '100%',
              textAlign: 'left',
            }}
          >
            언제 고백할까?
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              width: '100%',
            }}
          >
            <div
              style={{
                flex: 1,
                padding: '12px 16px',
                backgroundColor: colors.neutral[700],
                borderRadius: '8px',
                textAlign: 'center',
                ...typography.body.body3,
                color: colors.text.bodyPrimary,
              }}
            >
              2000 년
            </div>
            <div
              style={{
                flex: 0.5,
                padding: '12px 16px',
                backgroundColor: colors.neutral[700],
                borderRadius: '8px',
                textAlign: 'center',
                ...typography.body.body3,
                color: colors.text.bodyPrimary,
              }}
            >
              1월
            </div>
            <div
              style={{
                flex: 0.5,
                padding: '12px 16px',
                backgroundColor: colors.neutral[700],
                borderRadius: '8px',
                textAlign: 'center',
                ...typography.body.body3,
                color: colors.text.bodyPrimary,
              }}
            >
              1일
            </div>
          </div>
        </div>

        {/* 프로모션 텍스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            paddingTop: '40px',
            paddingBottom: '24px',
            width: '100%',
          }}
        >
          <p
            style={{
              ...typography.title['h4-1'],
              color: colors.text.main,
              textAlign: 'center',
            }}
          >
            김김김 님의 마음을 사로잡기 위해선
            <br />
            지금이 타이밍이에요!
          </p>
          <p
            style={{
              ...typography.body.body5,
              color: colors.neutral[300],
              textAlign: 'center',
            }}
          >
            연애 성공률을 높이는 홍길동님 만의
            <br />
            맞춤형 미션을 확인해보세요!
          </p>
        </div>

        <div className="space-y-3 w-full">
          <button
            onClick={handleRestart}
            style={{
              width: '100%',
              padding: '16px 32px',
              backgroundColor: colors.violet[400],
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            다시 하기
          </button>
          <button
            style={{
              width: '100%',
              padding: '16px 32px',
              backgroundColor: colors.neutral[700],
              color: colors.text.bodyPrimary,
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </main>
  );
}
