/**
 * RankingPodium Component
 * 포디움 스타일 랭킹 UI
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';
import { CTAButton } from '../Button/CTAButton';

export interface RankingEntry {
  /** 등수 (1, 2, 3, ...) */
  rank: number;
  /** 이름 (미지정시 '홍길동' 플레이스홀더) */
  name?: string;
  /** 점수/금액 텍스트 (미지정시 '?원' 플레이스홀더) */
  score?: string;
  /** 프로필 이미지 URL (없으면 ? 플레이스홀더) */
  imageUrl?: string;
  /** 막대 높이 (px) */
  barHeight: number;
  /** 점수 옆 아이콘 경로 */
  scoreIconSrc?: string;
  /** 막대 배경 (커스텀 그라데이션 등, 미지정시 기본 스타일) */
  barBackground?: string;
  /** 막대 그라데이션 시작 색상 (상단) */
  barGradientStartColor?: string;
  /** 막대 그라데이션 끝 색상 (하단) */
  barGradientEndColor?: string;
  /** 막대 안 순위 텍스트 색상 */
  barTextColor?: string;
}

export interface RankingPodiumProps {
  /** 카드 상단 타이틀 */
  title: string;
  /** 랭킹 항목 배열 */
  entries: RankingEntry[];
  /** 화면 좌→우 표시 순서 (rank 번호 배열) */
  displayOrder: number[];
  /** 하단 버튼 텍스트 (없으면 버튼 미표시) */
  buttonText?: string;
  /** 버튼 클릭 핸들러 */
  onButtonClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 추가 인라인 스타일 */
  style?: React.CSSProperties;
}

export function RankingPodium({
  title,
  entries,
  displayOrder,
  buttonText,
  onButtonClick,
  className,
  style,
}: RankingPodiumProps) {
  const orderedEntries = displayOrder
    .map(rank => entries.find(e => e.rank === rank))
    .filter((e): e is RankingEntry => e !== undefined);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.neutral[700],
        borderRadius: '12px',
        padding: '24px 20px',
        width: '100%',
        ...style,
      }}
    >
      {/* 타이틀 */}
      <p
        style={{
          ...typography.title['h5-1'],
          color: colors.text.main,
          textAlign: 'left',
          whiteSpace: 'pre-line',
          width: '100%',
          margin: 0,
        }}
      >
        {title}
      </p>

      {/* 포디움 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          marginTop: '24px',
        }}
      >
        {orderedEntries.map((entry) => (
          <div
            key={entry.rank}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* 아바타 */}
            <div
              style={{
                padding: entry.imageUrl ? '8px' : '4px 11px',
                borderRadius: '8px',
                backgroundColor: '#2E3341',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                marginBottom: '12px',
              }}
            >
              {entry.imageUrl ? (
                <img
                  src={entry.imageUrl}
                  alt={entry.name}
                  style={{
                    width: '16px',
                    height: '16px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: 'Wanted Sans',
                    fontSize: '17px',
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
                fontFamily: 'Wanted Sans',
                fontSize: '13px',
                lineHeight: '18px',
                fontWeight: 700,
                letterSpacing: '0px',
                color: entry.name ? '#FFFFFF' : colors.neutral[400],
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                marginBottom: '4px',
              }}
            >
              {entry.name || '홍길동'}
            </span>

            {/* 점수 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 6px',
                backgroundColor: '#282A31',
                borderRadius: '6px',
              }}
            >
              {entry.scoreIconSrc && (
                <Image
                  src={entry.scoreIconSrc}
                  alt=""
                  width={14}
                  height={14}
                  style={{ display: 'block' }}
                />
              )}
              <span
                style={{
                  fontFamily: 'Wanted Sans',
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontWeight: 600,
                  letterSpacing: '0px',
                  color: entry.score ? colors.text.highlightsSecondary : colors.background.badgePrimary,
                  whiteSpace: 'nowrap',
                }}
              >
                {entry.score || '?원'}
              </span>
            </div>

            {/* 막대 */}
            <div
              style={{
                width: '100%',
                height: `${entry.barHeight}px`,
                background: entry.barGradientStartColor
                  ? `linear-gradient(to bottom, ${entry.barGradientStartColor}, ${entry.barGradientEndColor ?? 'transparent'})`
                  : entry.barBackground ?? 'rgba(248, 250, 252, 0.1)',
                border: entry.barGradientStartColor ? 'none' : entry.barBackground ? 'none' : '2px dashed #6B7285',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <span
                style={{
                  ...typography.title['h4-1'],
                  color: entry.barTextColor ?? '#CBD5E1',
                }}
              >
                {entry.rank}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA 버튼 */}
      {buttonText && (
        <div style={{ width: '100%', marginTop: '20px' }}>
          <CTAButton
            buttonType="primary"
            status="active"
            size="lg"
            fullWidth
            onClick={onButtonClick}
          >
            {buttonText}
          </CTAButton>
        </div>
      )}
    </div>
  );
}
