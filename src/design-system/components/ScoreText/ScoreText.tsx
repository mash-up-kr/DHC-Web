/**
 * ScoreText Component
 * 점수 및 결과를 표시하는 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5098-17185
 *
 * Variants:
 * - Type=Result: 점수 결과 표시
 * - Type=Loading: 로딩 상태 표시
 */

import React from 'react';
import { Badge } from '../Badge';
import { colors, gradients } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type ScoreTextType = 'result' | 'loading';

export interface ScoreTextProps {
  /**
   * 컴포넌트 타입
   */
  type: ScoreTextType;
  /**
   * 배지에 표시할 텍스트 (날짜 등)
   */
  badgeText: string;
  /**
   * 점수 (result 타입에서 사용, title과 함께 사용 불가)
   */
  score?: number;
  /**
   * 점수 단위
   * @default '점'
   */
  scoreUnit?: string;
  /**
   * 메인 텍스트 (result 타입에서 score 대신 사용)
   */
  title?: string;
  /**
   * 설명 텍스트 (result 타입에서 사용)
   */
  description?: string;
  /**
   * 로딩 텍스트 (loading 타입에서 사용)
   */
  loadingText?: string;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const ScoreText: React.FC<ScoreTextProps> = ({
  type,
  badgeText,
  score,
  scoreUnit = '점',
  title,
  description,
  loadingText,
  className = '',
}) => {
  // 컨테이너 스타일
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: type === 'result' ? '12px' : '8px',
    padding: type === 'loading' ? '0px 20px' : undefined,
    width: type === 'loading' ? '100%' : undefined,
  };

  // 점수 텍스트 스타일 (그라데이션)
  const scoreStyle: React.CSSProperties = {
    ...typography.title.h0,
    background: gradients.textGradient02,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
  };

  // 설명 텍스트 스타일
  const descriptionStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: colors.neutral[300],
    textAlign: 'center',
    whiteSpace: 'pre-line',
  };

  // 로딩 텍스트 스타일
  const loadingTextStyle: React.CSSProperties = {
    ...typography.title.h4,
    color: colors.neutral[100],
    textAlign: 'center',
    width: '100%',
  };

  if (type === 'loading') {
    return (
      <div className={className} style={containerStyle}>
        <Badge type="date">{badgeText}</Badge>
        <div style={{ width: '100%' }}>
          <div style={loadingTextStyle}>{loadingText}</div>
        </div>
      </div>
    );
  }

  // type === 'result'
  return (
    <div className={className} style={containerStyle}>
      <Badge type="date">{badgeText}</Badge>
      <div style={scoreStyle}>
        {title ? title : `${score}${scoreUnit}`}
      </div>
      {description && <div style={descriptionStyle}>{description}</div>}
    </div>
  );
};
