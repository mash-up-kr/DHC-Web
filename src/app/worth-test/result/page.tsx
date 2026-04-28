"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useTestStore } from "@/store/useTestStore";
import {
  getWorthTestResult,
  WealthFortuneEvent,
  WealthFortuneResultResponse,
  WealthTestResultResponse,
} from "@/api/worthTest";

function formatAmount(amount: number): string {
  if (amount >= 100000000) {
    const uk = Math.round(amount / 100000000);
    return `${uk.toLocaleString()}억원`;
  }
  if (amount >= 10000) {
    const man = Math.round(amount / 10000);
    return `${man.toLocaleString()}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

/** 점수/타입 결과 섹션 */
function ScoreSection({ result }: { result: WealthFortuneResultResponse }) {
  return (
    <>
      <div style={{ paddingTop: "26px" }}>
        <ScoreText
          type="result"
          badgeText="내 금전운 타입"
          title={result.fortuneType}
          description={result.fortuneTypeDescription}
        />
      </div>

      <div
        className="max-w-md w-full"
        style={{
          paddingTop: "25px",
          paddingBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "50%",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={result.fortuneTypeImageUrl}
            alt={result.fortuneType}
            style={{ width: "64px", height: "64px", objectFit: "contain" }}
          />
        </div>
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
function FortuneDetailSection({ fortuneDetail }: { fortuneDetail: string }) {
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
      <MessageCard title="금전운" message={fortuneDetail} />
    </div>
  );
}

/** 금전운 인생 그래프 섹션 */
function LifeGraphSection({
  result,
}: {
  result: WealthFortuneResultResponse;
}) {
  const dataPoints = useMemo(
    () => result.graphData.map((p) => ({ x: p.age, value: p.amount })),
    [result.graphData],
  );

  const events = useMemo(
    () =>
      result.events.map((e) => ({
        x: e.age,
        iconSrc: e.iconUrl,
      })),
    [result.events],
  );

  const peakPoint = useMemo(() => {
    if (dataPoints.length === 0) {
      return { x: 0, value: 0 };
    }
    return dataPoints.reduce(
      (max, curr) => (curr.value > max.value ? curr : max),
      dataPoints[0],
    );
  }, [dataPoints]);

  const firstEvent: WealthFortuneEvent | undefined = result.events[0];

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
        dataPoints={dataPoints}
        peak={{
          defaultX: peakPoint.x,
          ageLabel: `${peakPoint.x}살`,
          amountLabel: formatAmount(peakPoint.value),
        }}
        events={events}
        xAxisLabels={[20, 40, 60, 80]}
        xAxisLabelFormat={(x) => `${x}대`}
        peakTooltipFormat={(v) => formatAmount(v)}
      />

      {firstEvent && (
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
            <img
              src={firstEvent.iconUrl}
              alt=""
              width={24}
              height={24}
              style={{ display: 'block' }}
            />
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
            {`${firstEvent.age}살에 ${firstEvent.description}\n${formatAmount(
              Math.abs(firstEvent.amount),
            )}${firstEvent.amount >= 0 ? '을 받아요' : '을 잃어요'}`}
          </span>
        </div>
      )}
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
          primaryButtonText="앱 설치하고 금전운 높이기"
          secondButtonText="메인으로 돌아가기"
          secondButtonType="secondary"
          onPrimaryClick={openStore}
          onSecondButtonClick={onRestart}
        />
      </div>
    </>
  );
}

function WorthTestResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { worthResultId } = useTestStore();
  const resolvedResultId = searchParams.get('resultId') ?? worthResultId;

  const [data, setData] = useState<WealthTestResultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedResultId) {
      setError('결과 ID가 없어요. 테스트를 먼저 진행해주세요.');
      return;
    }
    let cancelled = false;
    getWorthTestResult(resolvedResultId)
      .then((response) => {
        if (!cancelled) setData(response);
      })
      .catch(() => {
        if (!cancelled) setError('결과를 불러오지 못했어요.');
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedResultId]);

  const handleShareConfirm = async () => {
    const result = await shareRootUrl();
    if (result.success && result.method === 'clipboard') {
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  if (error) {
    return (
      <div
        style={{ backgroundColor: colors.background.main, minHeight: '100vh', color: colors.text.main }}
        className="flex items-center justify-center px-6 text-center"
      >
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{ backgroundColor: colors.background.main, minHeight: '100vh', color: colors.text.main }}
        className="flex items-center justify-center"
      >
        결과 불러오는 중...
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: colors.background.main, minHeight: "100vh" }}
      className="flex flex-col items-center"
    >
      <ScoreSection result={data.result} />
      <div style={{ height: "24px" }} />
      <FortuneDetailSection fortuneDetail={data.result.fortuneDetail} />
      <LifeGraphSection result={data.result} />
      <RankingSection onGroupCreate={() => router.push("/worth-test/group/create")} />
      <TipSection onShare={handleShareConfirm} />
      <PromotionSection />
      <CTASection onRestart={() => router.push("/worth-test")} />
    </div>
  );
}

export default function WorthTestResult() {
  return (
    <Suspense>
      <WorthTestResultContent />
    </Suspense>
  );
}
