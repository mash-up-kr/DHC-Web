"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { ScoreText } from "@/design-system/components/ScoreText/ScoreText";
import { Title } from "@/design-system/components/Title";
import { FortuneLifeGraph } from "@/design-system/components/FortuneLifeGraph";
import { MessageCard } from "@/design-system/components/MessageCard/MessageCard";
import { RankingPodium } from "@/design-system/components/RankingPodium/RankingPodium";
import { colors, gradients } from "@/design-system/foundations/colors";
import { openStore } from "@/utils/storeUrl";
import { shareRootUrl } from "@/utils/share";
import { typography } from "@/design-system/foundations/typography";

/** 점수/타입 결과 섹션 */
function ScoreSection() {
  return (
    <>
      <div style={{ paddingTop: "26px" }}>
        <ScoreText
          type="result"
          badgeText="내 금전운 타입"
          title="대기만성 거북이형"
          description={"처음엔 느리지만 꾸준함이 힘이에요!\n무리하지 말고 차근차근 나아가는 힘이 있어요"}
        />
      </div>

      <div className="max-w-md w-full" style={{ marginTop: "24px" }}>
        <img
          src="https://picsum.photos/400/200"
          alt="result"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      </div>

      {/* FortuneCard Shadow */}
      <div
        style={{
          width: '200px',
          height: '32px',
          marginTop: '0px',
          background: gradients.cardBottomGradient01,
          borderRadius: '50%',
          opacity: '0.05',
        }}
      />
    </>
  );
}

/** 금전운 상세보기 섹션 */
function FortuneDetailSection() {
  return (
    <div
      className="max-w-md w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
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
        금전운 상세보기
      </h2>
      <MessageCard
        title="금전운"
        message={"초년 고생, 말년 풍요: 젊을 때는 금전적 어려움이나 정체기가 있을 수 있으나, 꾸준한 노력으로 내공을 쌓아 크게 성공합니다.\n\n투자 및 인내: 당장의 작은 이익에 연연하지 않고 장기적인 관점에서 노력과 투자를 지속할 때 큰 결실을 봅니다.\n\n노력의 산물: 요행을 바라기보다는 묵묵히 자신의 분야에서 역량을 기르면, 그 대가가 뒤늦게 재물로 돌아오는 구조입니다."}
      />
    </div>
  );
}

/** 금전운 인생 그래프 섹션 */
function LifeGraphSection() {
  return (
    <>
      <h2
        className="max-w-md w-full"
        style={{
          ...typography.title['h5-1'],
          color: colors.text.main,
          width: '100%',
          textAlign: 'left',
        }}
      >
        금전운 인생 그래프
      </h2>

      <FortuneLifeGraph
        className="max-w-md w-full"
        style={{ marginTop: '16px' }}
        headerLabel="내 금전운 전성기"
        dataPoints={[
          { x: 20, value: 500 },
          { x: 23, value: 800 },
          { x: 35, value: 1500 },
          { x: 47, value: 4500 },
          { x: 60, value: 4528 },
          { x: 75, value: 4300 },
          { x: 80, value: 4100 },
        ]}
        peak={{
          defaultX: 47,
          ageLabel: "47살",
          amountLabel: "4500만원",
        }}
        events={[
          { x: 23, iconSrc: "/icons/icon-luckybag.svg" },
          { x: 60, iconSrc: "/icons/icon-flying-money.svg" },
        ]}
        xAxisLabels={[20, 40, 60, 80]}
        xAxisLabelFormat={(x) => `${x}대`}
        peakTooltipFormat={(v) => `${v.toLocaleString()}만원`}
      />

      <div
        className="max-w-md w-full"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          padding: '20px 24px',
          backgroundColor: colors.neutral[700],
          borderRadius: '12px',
          margin: '16px 20px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#2E3341',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Image src="/icons/icon-luckybag.svg" alt="" width={24} height={24} />
        </div>
        <span
          style={{
            fontFamily: 'Wanted Sans',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 600,
            color: colors.neutral[100],
            whiteSpace: 'pre-line',
          }}
        >
          23살에 로또에 2등에 당첨되서{'\n'}5,300만원을 받아요
        </span>
      </div>
    </>
  );
}

/** 금전운 랭킹 섹션 */
function RankingSection({ onGroupCreate }: { onGroupCreate: () => void }) {
  return (
    <>
      <h2
        className="max-w-md w-full"
        style={{
          ...typography.title['h5-1'],
          color: colors.text.main,
          width: '100%',
          textAlign: 'left',
          marginTop: '20px',
        }}
      >
        금전운 랭킹
      </h2>

      <RankingPodium
        className="max-w-md w-full"
        style={{ marginTop: '24px' }}
        title={"랭킹 그룹 만들고 친구들과\n금전운 랭킹을 확인해보세요!"}
        entries={[
          { rank: 1, name: '홍길동', score: '5,500만원', barHeight: 120, scoreIconSrc: '/icons/icon-flying-money.svg' },
          { rank: 2, name: '홍길동', score: '5,500만원', barHeight: 90, scoreIconSrc: '/icons/icon-flying-money.svg' },
          { rank: 3, name: '홍길동', score: '5,500만원', barHeight: 60, scoreIconSrc: '/icons/icon-flying-money.svg' },
        ]}
        displayOrder={[2, 1, 3]}
        buttonText="랭킹 그룹 만들기"
        onButtonClick={onGroupCreate}
      />
    </>
  );
}

/** 꿀팁 섹션 */
function TipSection({ onShare }: { onShare: () => void }) {
  return (
    <div
      className="max-w-md w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
        width: '100%',
        margin: '24px 0',
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
        금전운에 도움되는 꿀팁
      </h2>
      <div
        style={{
          width: '100%',
          height: '212px',
          borderRadius: '12px',
          backgroundImage: 'url(/images/love-test/tip-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          padding: '62px 76px',
        }}
      >
        <p
          style={{
            ...typography.title['h5-1'],
            background: gradients.textGradient01,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          자세한 꿀팁{'\n'}무료로 확인해보세요!
        </p>
        <button
          onClick={onShare}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px 8px 16px',
            backgroundColor: 'rgba(123, 134, 150, 0.15)',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'Wanted Sans',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#D7E1EE',
            }}
          >
            공유하고 내용 확인하기
          </span>
          <Image
            src="/icons/share-icon.svg"
            alt="공유"
            width={16}
            height={16}
            style={{ display: 'block' }}
          />
        </button>
      </div>
    </div>
  );
}

/** 프로모션 섹션 */
function PromotionSection() {
  return (
    <>
      <div className="max-w-md w-full" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Title
          type="intro"
          size="sm"
          titleNode={
            <p
              style={{
                ...typography.title['h4-1'],
                color: colors.text.main,
                textAlign: 'center',
                margin: 0,
              }}
            >
              <span
                style={{
                  background: gradients.textGradient01,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                내 금전운이 상위 몇프로 인지
              </span>
              <br />
              확인해보고 싶으세요?
            </p>
          }
          description={"플리핀을 설치하고 금전운을 높이고\n금전관리 까지 해보세요!"}
        />
      </div>

      <div
        className="max-w-md w-full"
        style={{
          width: '100%',
          marginBottom: '40px',
        }}
      >
        <img
          src="/images/love-test/app-preview-7e1ca8.png"
          alt="앱 미리보기"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
          }}
        />
      </div>
    </>
  );
}

/** CTA 버튼 섹션 */
function CTASection({ onRestart }: { onRestart: () => void }) {
  return (
    <>
      <div style={{ height: "15px" }} />
      <div className="max-w-md w-full">
        <CTAButtonGroup
          type="twoButton"
          primaryButtonText="앱 설치하고 맞춤 미션 확인하기"
          secondButtonText="테스트 다시하기"
          secondButtonType="secondary"
          onPrimaryClick={openStore}
          onSecondButtonClick={onRestart}
        />
      </div>
    </>
  );
}

export default function WorthTestResult() {
  const router = useRouter();

  const handleShareConfirm = async () => {
    const result = await shareRootUrl();
    if (result.success && result.method === 'clipboard') {
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div
      style={{ backgroundColor: colors.background.main, minHeight: "100vh" }}
      className="flex flex-col items-center"
    >
      <ScoreSection />
      <div style={{ height: "24px" }} />
      <FortuneDetailSection />
      <LifeGraphSection />
      <RankingSection onGroupCreate={() => router.push("/worth-test/group/create")} />
      <TipSection onShare={handleShareConfirm} />
      <PromotionSection />
      <CTASection onRestart={() => router.push("/worth-test")} />
    </div>
  );
}
