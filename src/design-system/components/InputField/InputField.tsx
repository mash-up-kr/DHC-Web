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
export type InputFieldStatus = 'default' | 'focused' | 'error' | 'disabled';

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
   * 에러 메시지
   */
  errorMessage?: string;

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
  value,
  onChange,
  errorMessage,
  disabled = false,
  fullWidth = true,
  className = '',
  maxLength,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getStatus = (): InputFieldStatus => {
    if (disabled) return 'disabled';
    if (errorMessage) return 'error';
    if (isFocused) return 'focused';
    return 'default';
  };

  const status = getStatus();

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
    const baseStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid',
      ...typography.body.body3,
      transition: 'all 0.2s ease',
      outline: 'none',
    };

    const statusStyles: Record<InputFieldStatus, Partial<React.CSSProperties>> = {
      default: {
        backgroundColor: colors.background.main,
        borderColor: colors.neutral[500],
        color: colors.text.main,
      },
      focused: {
        backgroundColor: colors.background.main,
        borderColor: colors.violet[400],
        color: colors.text.main,
      },
      error: {
        backgroundColor: colors.background.main,
        borderColor: '#FF6B6B',
        color: colors.text.main,
      },
      disabled: {
        backgroundColor: colors.neutral[700],
        borderColor: colors.neutral[600],
        color: colors.neutral[400],
        cursor: 'not-allowed',
      },
    };

    return {
      ...baseStyle,
      ...statusStyles[status],
    };
  };

  // 에러 메시지 스타일
  const errorStyle: React.CSSProperties = {
    marginTop: '8px',
    ...typography.body.body6,
    color: '#FF6B6B',
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
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
    </div>
  );
};
