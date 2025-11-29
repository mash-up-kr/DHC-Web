/**
 * MoreBtn Component
 * 더보기 버튼 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=541-33848
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export interface MoreBtnProps {
  /**
   * 버튼 텍스트
   * @default '더보기'
   */
  children?: React.ReactNode;
  /**
   * chevron-right 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

const ChevronRightIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke={colors.neutral[300]}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MoreBtn: React.FC<MoreBtnProps> = ({
  children = '더보기',
  showIcon = true,
  onClick,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    padding: showIcon ? '4px 8px 4px 12px' : '4px 12px',
    backgroundColor: colors.neutral[700],
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
  };

  const textStyle: React.CSSProperties = {
    ...typography.body.body6,
    color: colors.neutral[300],
  };

  return (
    <button
      type="button"
      className={className}
      style={containerStyle}
      onClick={onClick}
    >
      <span style={textStyle}>{children}</span>
      {showIcon && <ChevronRightIcon />}
    </button>
  );
};
