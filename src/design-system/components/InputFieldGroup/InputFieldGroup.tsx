/**
 * InputFieldGroup Component
 * 입력 필드 그룹 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-12748
 *
 * Variants:
 * - Type=Single: 단일 입력 필드 (시간 등)
 * - Type=Multi: 다중 입력 필드 (날짜 등)
 * - Size=Md: 중간 크기
 * - Size=Lg: 큰 크기
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';
import { InputField } from '../InputField';

export type InputFieldGroupType = 'single' | 'multi';
export type InputFieldGroupSize = 'md' | 'lg';

export interface InputFieldItem {
  /**
   * 입력 필드 키 (고유 식별자)
   */
  key: string;
  /**
   * 입력 값
   */
  value: string;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 접미사 (예: "년", "월", "일")
   */
  suffix?: string;
  /**
   * 입력 타입
   */
  type?: 'text' | 'number' | 'tel';
  /**
   * 최대 글자 수
   */
  maxLength?: number;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

export interface InputFieldGroupProps {
  /**
   * 그룹 타입
   * - single: 단일 입력 필드
   * - multi: 다중 입력 필드
   */
  type: InputFieldGroupType;
  /**
   * 그룹 크기
   */
  size: InputFieldGroupSize;
  /**
   * 레이블 텍스트
   */
  label: string;
  /**
   * 입력 필드 아이템 목록
   */
  items: InputFieldItem[];
  /**
   * 값 변경 핸들러
   */
  onChange: (key: string, value: string) => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const InputFieldGroup: React.FC<InputFieldGroupProps> = ({
  type,
  size,
  label,
  items,
  onChange,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const labelContainerStyle: React.CSSProperties = {
    padding: size === 'md' ? '20px 20px 10px' : '20px 20px 16px',
  };

  const labelStyle: React.CSSProperties = {
    ...(size === 'md' ? typography.body.body5 : typography.title['h5-1']),
    color: colors.neutral[100],
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0px 20px 20px',
  };

  const inputRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
  };

  const renderInputWithSuffix = (item: InputFieldItem, isFlexible: boolean) => {
    const inputWrapperStyle: React.CSSProperties = isFlexible
      ? { flex: 1 }
      : { width: '172px' };

    return (
      <div key={item.key} style={{ ...inputWrapperStyle, position: 'relative' }}>
        <InputField
          type={item.type || 'text'}
          value={item.value}
          onChange={(value) => onChange(item.key, value)}
          placeholder={item.placeholder}
          disabled={item.disabled}
          maxLength={item.maxLength}
        />
        {item.suffix && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              ...typography.body.body4,
              color: item.value ? colors.violet[200] : colors.neutral[300],
              pointerEvents: 'none',
            }}
          >
            {item.suffix}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={labelContainerStyle}>
        <span style={labelStyle}>{label}</span>
      </div>
      <div style={inputContainerStyle}>
        <div style={inputRowStyle}>
          {items.map((item, index) =>
            renderInputWithSuffix(item, type === 'multi' && index > 0)
          )}
        </div>
      </div>
    </div>
  );
};
