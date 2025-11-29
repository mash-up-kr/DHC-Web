/**
 * InputField Component
 * 텍스트 입력 필드 컴포넌트
 *
 * @TODO 임시 코드 - 수정 예정
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type InputFieldType = 'text' | 'number' | 'date' | 'email' | 'tel';

export interface InputFieldProps {
  /**
   * 입력 필드 타입
   */
  type?: InputFieldType;

  /**
   * 라벨 텍스트
   */
  label?: string;

  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;

  /**
   * 입력값
   */
  value?: string;

  /**
   * 입력값 변경 핸들러
   */
  onChange?: (value: string) => void;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 최대 입력 길이
   */
  maxLength?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  label,
  placeholder,
  value = '',
  onChange,
  disabled = false,
  fullWidth = true,
  className = '',
  maxLength,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Active: value가 있으면 True
  const isActive = value.length > 0;

  // 컨테이너 스타일
  const containerStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
  };

  // 라벨 스타일
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    ...typography.body.body3,
    color: colors.text.main,
  };

  // 입력 필드 스타일
  const getInputStyles = (): React.CSSProperties => {
    // 공통 스타일
    const baseStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: colors.neutral[700],
      ...typography.title.h6,
      transition: 'all 0.2s ease',
      outline: 'none',
    };

    // 텍스트 색상 결정
    let textColor: string;
    if (isActive && disabled) {
      // Active=True, Disable=True
      textColor = colors.neutral[300];
    } else if (isActive && !disabled) {
      // Active=True, Disable=False
      textColor = colors.text.highlightsSecondary;
    } else {
      // Active=False
      textColor = `rgba(181, 186, 235, 0.2)`; // highlightsSecondary with 20% alpha
    }

    // 보더 결정
    let borderStyle: string;
    if (isActive && !disabled && isFocused) {
      // Active=True, Disable=False, Focus=True
      borderStyle = `1px solid ${colors.neutral[500]}`;
    } else {
      // 그 외: 보더 없음
      borderStyle = 'none';
    }

    return {
      ...baseStyle,
      color: textColor,
      border: borderStyle,
      cursor: disabled ? 'not-allowed' : 'text',
    };
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        style={getInputStyles()}
      />
    </div>
  );
};
