/**
 * Tooltip Component
 * 행동에서 설명이 필요한 경우에 사용합니다.
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=2709-23592
 *
 * Features:
 * - Arrow position variants (top, bottom, left, right + center/start/end)
 * - Optional close button
 * - Glass morphism effect with backdrop blur
 */

import React from 'react';
import { colors, gradients } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type TooltipArrowPosition =
  | 'top-center'
  | 'top-start'
  | 'top-end'
  | 'bottom-center'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-center'
  | 'right-center';

export interface TooltipProps {
  /**
   * 툴팁에 표시할 텍스트
   */
  label: string;
  /**
   * 화살표 위치
   * @default 'bottom-center'
   */
  arrowPosition?: TooltipArrowPosition;
  /**
   * 화살표 표시 여부
   * @default true
   */
  showArrow?: boolean;
  /**
   * 닫기 버튼 표시 여부
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * 닫기 버튼 클릭 핸들러
   */
  onClose?: () => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
  /**
   * 커스텀 스타일
   */
  style?: React.CSSProperties;
}

// Arrow SVG Component
const Arrow: React.FC<{ position: TooltipArrowPosition }> = ({ position }) => {
  const isTop = position.startsWith('top');
  const isLeft = position.startsWith('left');

  const rotation = isTop ? 180 : isLeft ? 90 : position.startsWith('right') ? -90 : 0;

  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotation}deg)`,
        display: 'block',
      }}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="43%" stopColor="#F4F4F5" />
          <stop offset="100%" stopColor="#B5BAEB" />
        </linearGradient>
      </defs>
      <path
        d="M6 7L0.803848 0.25L11.1962 0.249999L6 7Z"
        fill="url(#arrowGradient)"
        fillOpacity="0.88"
      />
    </svg>
  );
};

// Close Button Component
const CloseButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      marginLeft: '4px',
    }}
    aria-label="Close tooltip"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3L3 9M3 3L9 9"
        stroke={colors.violet[400]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  arrowPosition = 'bottom-center',
  showArrow = true,
  showCloseButton = false,
  onClose,
  className = '',
  style,
}) => {
  const isVertical = arrowPosition.startsWith('top') || arrowPosition.startsWith('bottom');
  const isTop = arrowPosition.startsWith('top');
  const isLeft = arrowPosition.startsWith('left');
  const isRight = arrowPosition.startsWith('right');

  // Arrow alignment
  const getArrowAlignment = (): React.CSSProperties => {
    if (isVertical) {
      const alignment = arrowPosition.split('-')[1];
      return {
        justifyContent:
          alignment === 'start' ? 'flex-start' : alignment === 'end' ? 'flex-end' : 'center',
        paddingLeft: alignment === 'start' ? '12px' : 0,
        paddingRight: alignment === 'end' ? '12px' : 0,
      };
    }
    return {
      alignItems: 'center',
    };
  };

  // Container styles
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isLeft || isRight ? 'center' : undefined,
    ...style,
  };

  // Content wrapper styles
  const contentWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: 'center',
    order: isTop || isLeft ? 1 : 0,
  };

  // Arrow wrapper styles
  const arrowWrapperStyle: React.CSSProperties = {
    display: 'flex',
    ...getArrowAlignment(),
    order: isTop || isLeft ? 0 : 1,
  };

  // Content box styles (glass morphism)
  const contentBoxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 12px',
    borderRadius: '8px',
    background: gradients.tooltipGradient01,
    backdropFilter: 'blur(64px)',
    WebkitBackdropFilter: 'blur(64px)',
    opacity: 0.88,
  };

  // Text styles
  const textStyle: React.CSSProperties = {
    ...typography.title.h7,
    color: colors.violet[400],
    textAlign: 'center',
    margin: 0,
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={contentWrapperStyle}>
        <div style={contentBoxStyle}>
          <span style={textStyle}>{label}</span>
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      </div>
      {showArrow && (
        <div style={arrowWrapperStyle}>
          <Arrow position={arrowPosition} />
        </div>
      )}
    </div>
  );
};
