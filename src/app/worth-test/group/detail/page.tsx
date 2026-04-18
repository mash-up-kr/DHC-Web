"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/design-system/components/Header/Header";
import { RankingPodium, RankingEntry } from "@/design-system/components/RankingPodium/RankingPodium";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { shareRootUrl } from "@/utils/share";
import { colors } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";
import { useTestStore } from "@/store/useTestStore";
import {
  getWorthGroupRanking,
  WealthAgeGroup,
  WealthGroupRankingEntry,
  WealthGroupRankingResponse,
} from "@/api/worthTest";

/** 섹션 타이틀 */
function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      className="max-w-md w-full"
      style={{
        ...typography.title['h5-1'],
        color: colors.text.main,
        width: '100%',
        textAlign: 'left',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** 랭킹 TOP 3 섹션 */
function RankingTop3Section({
  sectionTitle,
  podiumTitle,
  entries,
  displayOrder,
}: {
  sectionTitle: string;
  podiumTitle: string;
  entries: RankingEntry[];
  displayOrder: number[];
}) {
  return (
    <>
      <SectionTitle style={{ marginTop: '24px' }}>{sectionTitle}</SectionTitle>
      <RankingPodium
        className="max-w-md w-full"
        style={{ marginTop: '16px' }}
        title={podiumTitle}
        entries={entries}
        displayOrder={displayOrder}
      />
    </>
  );
}

/** 상세 랭킹 행 */
interface DetailRankingRow {
  rank: number;
  name: string;
  score: string;
  imageUrl?: string;
  scoreIconSrc?: string;
  /** 이 행 아래에 표시할 금전운 타입 카드 */
  fortuneType?: {
    title: string;
    description: string;
  };
}

/** 랭킹 행 */
function RankingRow({ row, showDivider, expanded, onToggle }: {
  row: DetailRankingRow;
  showDivider: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '12px',
        borderBottom: showDivider ? `1px solid ${colors.neutral[600]}` : 'none',
        cursor: 'pointer',
      }}
    >
      {/* 등수 */}
      <span
        style={{
          ...typography.title.h6,
          color: colors.text.bodyPrimary,
          minWidth: '20px',
          textAlign: 'center',
        }}
      >
        {row.rank}
      </span>

      {/* 아바타 */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: '#2E3341',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {row.imageUrl ? (
          <img
            src={row.imageUrl}
            alt={row.name}
            style={{ width: '16px', height: '16px', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'Wanted Sans',
              fontSize: '13px',
              fontWeight: 700,
              color: '#A0ABCC',
            }}
          >
            ?
          </span>
        )}
      </div>

      {/* 이름 */}
      <span
        style={{
          ...typography.body.body4,
          color: colors.text.bodyPrimary,
          flex: 1,
        }}
      >
        {row.name}
      </span>

      {/* 점수 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {row.scoreIconSrc && (
          <Image
            src={row.scoreIconSrc}
            alt=""
            width={14}
            height={14}
            style={{ display: 'block' }}
          />
        )}
        <span
          style={{
            ...typography.title.h6,
            color: colors.text.bodyPrimary,
            whiteSpace: 'nowrap',
          }}
        >
          {row.score}
        </span>
      </div>

      {/* Chevron */}
      <Image
        src="/icons/icon-chevron-right.svg"
        alt=""
        width={16}
        height={16}
        style={{
          display: 'block',
          filter: 'brightness(0) invert(1)',
          transform: expanded ? 'rotate(270deg)' : 'rotate(90deg)',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/** 금전운 상세랭킹 섹션 */
function FortuneDetailRankingSection({
  sectionTitle,
  rows,
  buttonText,
  onButtonClick,
}: {
  sectionTitle: string;
  rows: DetailRankingRow[];
  buttonText?: string;
  onButtonClick?: () => void;
}) {
  const [expandedRanks, setExpandedRanks] = useState<Set<number>>(new Set());

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
      <SectionTitle>{sectionTitle}</SectionTitle>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {rows.map((row) => {
          const isExpanded = expandedRanks.has(row.rank);
          return (
          <div
            key={row.rank}
            style={{
              backgroundColor: '#1F2127',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <RankingRow
              row={row}
              showDivider={false}
              expanded={isExpanded}
              onToggle={() => {
                setExpandedRanks(prev => {
                  const next = new Set(prev);
                  if (next.has(row.rank)) next.delete(row.rank);
                  else next.add(row.rank);
                  return next;
                });
              }}
            />

            {/* 금전운 타입 카드 */}
            {isExpanded && row.fortuneType && (
              <div style={{ padding: '16px 16px 16px' }}>
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#2E3341',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      ...typography.title.h6,
                      background: `linear-gradient(180deg, rgba(230, 223, 255, 1) 0%, ${colors.text.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {row.fortuneType.title}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'Wanted Sans',
                    fontSize: '13px',
                    lineHeight: '20px',
                    fontWeight: 500,
                    letterSpacing: '0px',
                    color: colors.text.bodyPrimary,
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {row.fortuneType.description}
                </p>
              </div>
            )}
          </div>
        );
        })}

      </div>

      {/* 하단 버튼 */}
      {buttonText && (
        <button
          onClick={onButtonClick}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: colors.background.main,
            borderRadius: '12px',
            border: `1px solid ${colors.neutral[600]}`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
          }}
        >
          <Image
            src="/icons/icon-add.svg"
            alt=""
            width={20}
            height={20}
            style={{ display: 'block' }}
          />
          <span
            style={{
              ...typography.body.body4,
              color: colors.text.bodyPrimary,
            }}
          >
            {buttonText}
          </span>
        </button>
      )}
    </div>
  );
}

const MEMBER_LABELS: { label: string; ageGroup: WealthAgeGroup }[] = [
  { label: '전체', ageGroup: 'all' },
  { label: '20대', ageGroup: '20' },
  { label: '30대', ageGroup: '30' },
  { label: '40대', ageGroup: '40' },
  { label: '50대', ageGroup: '50' },
  { label: '60대', ageGroup: '60' },
  { label: '70대', ageGroup: '70' },
  { label: '80대', ageGroup: '80' },
];

const BAR_HEIGHT_BY_RANK: Record<number, number> = {
  1: 120,
  2: 90,
  3: 60,
};

interface Top3Colors {
  barGradientStartColor: string;
  barGradientEndColor: string;
  barTextColor: string;
}

const TOP3_COLORS_BY_RANK: Record<number, Top3Colors> = {
  1: {
    barGradientStartColor: '#B5FFCA',
    barGradientEndColor: 'rgba(109, 153, 143, 0)',
    barTextColor: '#DBFFCE',
  },
  2: {
    barGradientStartColor: '#C6B5FF',
    barGradientEndColor: 'rgba(198, 181, 255, 0)',
    barTextColor: '#C3D1F1',
  },
  3: {
    barGradientStartColor: '#72A5CA',
    barGradientEndColor: 'rgba(114, 165, 202, 0)',
    barTextColor: '#70B7E6',
  },
};

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

function toTop3Entries(
  rankings: WealthGroupRankingEntry[],
): RankingEntry[] {
  return [1, 2, 3].map((rank) => {
    const entry = rankings.find((e) => e.rank === rank);
    const barHeight = BAR_HEIGHT_BY_RANK[rank] ?? 60;
    if (!entry) {
      return {
        rank,
        barHeight,
        scoreIconSrc: '/icons/icon-flying-money.svg',
      };
    }
    return {
      rank,
      name: entry.name,
      score: formatAmount(entry.amount),
      imageUrl: entry.result.fortuneTypeImageUrl,
      scoreIconSrc: '/icons/icon-flying-money.svg',
      barHeight,
      ...TOP3_COLORS_BY_RANK[rank],
    };
  });
}

function toDetailRows(rankings: WealthGroupRankingEntry[]): DetailRankingRow[] {
  return rankings.map((entry) => ({
    rank: entry.rank,
    name: entry.name,
    score: `총 ${formatAmount(entry.amount)}`,
    imageUrl: entry.result.fortuneTypeImageUrl,
    scoreIconSrc: '/icons/icon-flying-money.svg',
    fortuneType: {
      title: entry.result.fortuneType,
      description: entry.result.fortuneDetail,
    },
  }));
}

function WorthTestGroupDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { worthGroup, setWorthGroup } = useTestStore();
  const queryGroupId = searchParams.get('groupId');
  const groupId = queryGroupId ?? worthGroup?.groupId ?? null;

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<WealthAgeGroup>('all');
  const [ranking, setRanking] = useState<WealthGroupRankingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) {
      setError('그룹 정보를 찾을 수 없어요.');
      return;
    }
    let cancelled = false;
    getWorthGroupRanking(groupId, selectedAgeGroup)
      .then((response) => {
        if (cancelled) return;
        setRanking(response);
        setWorthGroup({
          groupId,
          groupName: response.groupName,
          inviteCode: response.inviteCode,
        });
      })
      .catch(() => {
        if (!cancelled) setError('랭킹을 불러오지 못했어요.');
      });
    return () => {
      cancelled = true;
    };
  }, [groupId, selectedAgeGroup, setWorthGroup]);

  // 드래그 스크롤
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const top3Entries = useMemo(
    () => (ranking ? toTop3Entries(ranking.rankings) : []),
    [ranking],
  );
  const detailRows = useMemo(
    () => (ranking ? toDetailRows(ranking.rankings) : []),
    [ranking],
  );

  const headerTitle = ranking
    ? `${ranking.groupName} 부자랭킹`
    : '부자랭킹';

  return (
    <div
      style={{ backgroundColor: colors.background.main, minHeight: "100vh" }}
      className="flex flex-col items-center"
    >
      {/* SEO를 위한 숨겨진 H1 */}
      <h1 className="sr-only">부자 테스트 - 그룹 랭킹</h1>

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
            type="screenInfo"
            title={headerTitle}
            showBackButton={true}
            showIndicator={false}
            onBackClick={() => router.back()}
          />
        </div>
      </div>

      {/* Label 가로 스크롤 */}
      <div
        ref={scrollRef}
        className="max-w-md w-full"
        style={{
          marginTop: '68px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            padding: '12px 20px',
            width: 'max-content',
          }}
        >
          {MEMBER_LABELS.map(({ label, ageGroup }) => {
            const isSelected = ageGroup === selectedAgeGroup;
            return (
              <button
                key={ageGroup}
                onClick={() => {
                  if (!hasDragged.current) setSelectedAgeGroup(ageGroup);
                }}
                style={{
                  padding: '8px 17px',
                  backgroundColor: isSelected ? '#D9CEFF' : '#1F2127',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Wanted Sans',
                  fontSize: '14px',
                  fontWeight: isSelected ? 700 : 600,
                  color: isSelected ? '#0F1114' : '#64748B',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div
        className="max-w-md w-full"
        style={{
          padding: '0 20px 160px',
        }}
      >
        {error && (
          <div
            style={{
              marginTop: '24px',
              color: colors.text.bodyPrimary,
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        {!error && (
          <>
            {/* 랭킹 TOP 3 */}
            <RankingTop3Section
              sectionTitle="전체 금전운 TOP 3"
              podiumTitle={"금전운이 가장 좋은 3명이애요\n친구들을 더 초대하고 랭킹을 확인해보세요"}
              entries={top3Entries}
              displayOrder={[2, 1, 3]}
            />

            {/* 금전운 상세랭킹 */}
            <FortuneDetailRankingSection
              sectionTitle="금전운 상세랭킹"
              rows={detailRows}
              buttonText="멤버 추가하기"
              onButtonClick={() => {
                const target = groupId
                  ? `/worth-test/question/1?type=member&groupId=${groupId}`
                  : '/worth-test/question/1?type=member';
                router.push(target);
              }}
            />
            <div style={{ height: '100px' }} />
          </>
        )}
      </div>

      {/* 하단 고정 CTA 버튼 */}
      <div
        className="fixed left-0 right-0 bottom-0"
        style={{ backgroundColor: colors.background.main }}
      >
        <div className="max-w-md w-full mx-auto">
          <CTAButtonGroup
            type="twoButton"
            subButtonText="+ 새 모임 만들기"
            onSubButtonClick={() => router.push('/worth-test/group/create')}
            primaryButtonText="공유하기"
            secondButtonText="메인으로 돌아가기"
            secondButtonType="secondary"
            onPrimaryClick={async () => {
              const result = await shareRootUrl();
              if (result.success && result.method === 'clipboard') {
                alert('링크가 클립보드에 복사되었습니다!');
              }
            }}
            onSecondButtonClick={() => router.push('/worth-test')}
          />
        </div>
      </div>
    </div>
  );
}

export default function WorthTestGroupDetail() {
  return (
    <Suspense>
      <WorthTestGroupDetailContent />
    </Suspense>
  );
}
