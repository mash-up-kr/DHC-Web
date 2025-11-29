/**
 * Title Component
 * 타이틀 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=632-5642
 *
 * Variants:
 * - Type=Intro, Size=md: 인트로 타입, 중간 크기
 * - Type=Intro, Size=sm: 인트로 타입, 작은 크기
 * - Type=Page, Size=md: 페이지 타입, 중간 크기
 * - Type=Page, Size=sm: 페이지 타입, 작은 크기
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type TitleType = 'intro' | 'page';
export type TitleSize = 'md' | 'sm';

export interface TitleProps {
  /**
   * 타이틀 타입
   * - intro: 인트로 화면용
   * - page: 페이지 내용용
   */
  type: TitleType;
  /**
   * 타이틀 크기
   * - md: 중간 크기 (H2)
   * - sm: 작은 크기 (H4-1)
   */
  size: TitleSize;
  /**
   * 타이틀 텍스트
   */
  title: string;
  /**
   * 설명 텍스트
   */
  description?: string;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  type,
  size,
  title,
  description,
  className = '',
}) => {
  // Gap: 16px for most, 8px for Page/sm
  const gap = type === 'page' && size === 'sm' ? '8px' : '16px';

  // Padding: 24px 20px for Page/sm, 24px 20px 0px for others
  const padding = type === 'page' && size === 'sm' ? '24px 20px' : '24px 20px 0px';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: type === 'intro' ? 'center' : undefined,
    gap,
    padding,
    width: '100%',
  };

  // Title typography based on size
  const titleStyle: React.CSSProperties = {
    ...(size === 'md' ? typography.title.h2 : typography.title['h4-1']),
    color: colors.text.main,
    textAlign: type === 'intro' ? 'center' : 'left',
    whiteSpace: 'pre-line',
  };

  // Description typography
  const descriptionStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: colors.neutral[300],
    textAlign: type === 'intro' ? 'center' : 'left',
    whiteSpace: 'pre-line',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={{ width: '100%' }}>
        <span style={titleStyle}>{title}</span>
      </div>
      {description && (
        <div style={{ width: '100%' }}>
          <span style={descriptionStyle}>{description}</span>
        </div>
      )}
    </div>
  );
};
