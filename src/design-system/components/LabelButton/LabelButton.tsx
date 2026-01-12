/**
 * LabelButton Component
 * 레이블 버튼 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-11974
 *
 * Variants:
 * - Type=Select: 선택 버튼 (2개 옵션)
 * - Type=Check: 체크 버튼 (단일 옵션)
 * - Size=md: 중간 크기
 * - Size=sm: 작은 크기
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type LabelButtonType = 'select' | 'check';
export type LabelButtonSize = 'md' | 'sm';

export interface SelectOption {
  label: string;
  value: string;
}

export interface LabelButtonProps {
  /**
   * 버튼 타입
   * - select: 2개 옵션 중 선택
   * - check: 단일 체크 버튼
   */
  type: LabelButtonType;
  /**
   * 버튼 크기
   */
  size: LabelButtonSize;
  /**
   * 레이블 텍스트
   */
  label: string;
  /**
   * 선택 옵션 (type이 'select'일 때 사용)
   */
  options?: SelectOption[];
  /**
   * 선택된 값 (type이 'select'일 때 사용)
   */
  selectedValue?: string;
  /**
   * 옵션 선택 핸들러 (type이 'select'일 때 사용)
   */
  onSelect?: (value: string) => void;
  /**
   * 체크 텍스트 (type이 'check'일 때 사용)
   */
  checkLabel?: string;
  /**
   * 체크 상태 (type이 'check'일 때 사용)
   */
  checked?: boolean;
  /**
   * 체크 상태 변경 핸들러 (type이 'check'일 때 사용)
   */
  onCheck?: (checked: boolean) => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

const CheckIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="9"
      cy="9"
      r="6.5"
      fill={active ? colors.violet[400] : colors.neutral[400]}
    />
    <path
      d="M5.5 9L7.5 11L12.5 6"
      stroke={active ? colors.background.main : colors.text.main}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LabelButton: React.FC<LabelButtonProps> = ({
  type,
  size,
  label,
  options = [],
  selectedValue,
  onSelect,
  checkLabel = '',
  checked = false,
  onCheck,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    ...typography.body.body5,
    color: colors.neutral[100],
  };

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  };

  const getButtonStyle = (isActive: boolean): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: type === 'check' ? '10px' : '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    };

    if (size === 'md') {
      return {
        ...baseStyle,
        ...typography.title.h6,
        padding: '14px 24px',
        borderRadius: '8px',
        flex: type === 'select' ? 1 : undefined,
        backgroundColor: isActive ? colors.violet[400] : colors.background.glassEffect,
        color: isActive ? colors.background.main : colors.neutral[100],
      };
    }

    // size === 'sm'
    if (type === 'check') {
      return {
        ...baseStyle,
        ...typography.title.h7,
        padding: '8px 16px 8px 12px',
        borderRadius: '4px',
        backgroundColor: isActive ? colors.background.badgePrimary : colors.background.glassEffect,
        color: colors.neutral[100],
      };
    }

    return {
      ...baseStyle,
      ...typography.title.h7,
      padding: '8px 12px',
      borderRadius: '4px',
      flex: 1,
      backgroundColor: isActive ? colors.violet[400] : colors.background.glassEffect,
      color: isActive ? colors.text.main : colors.neutral[100],
    };
  };

  if (type === 'select') {
    return (
      <div className={className} style={containerStyle}>
        <span style={labelStyle}>{label}</span>
        <div style={buttonsContainerStyle}>
          {options.map((option) => {
            const isActive = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                style={getButtonStyle(isActive)}
                onClick={() => onSelect?.(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // type === 'check'
  return (
    <div className={className} style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <div style={buttonsContainerStyle}>
        <button
          type="button"
          style={getButtonStyle(checked)}
          onClick={() => onCheck?.(!checked)}
        >
          <CheckIcon active={checked} />
          {checkLabel}
        </button>
      </div>
    </div>
  );
};
