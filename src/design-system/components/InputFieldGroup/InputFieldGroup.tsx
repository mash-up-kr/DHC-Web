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
export type InputFieldGroupAlign = 'start' | 'center';

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
  /**
   * 입력 필드 flex 비율 (예: 175, 73.5)
   * 지정하지 않으면 기본 레이아웃 적용
   */
  flex?: number;
  /**
   * 입력 필드 ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
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
   * 텍스트 정렬
   * @default 'center'
   */
  align?: InputFieldGroupAlign;
  /**
   * 전체 너비 사용 여부 (좌우 패딩 제거)
   * @default false
   */
  fullWidth?: boolean;
  /**
   * 레이블 표시 여부
   * @default true
   */
  showLabel?: boolean;
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
  align = 'center',
  fullWidth = false,
  showLabel = true,
  className = '',
}) => {
  const textAlign = align === 'center' ? 'center' : 'left';
  const horizontalPadding = fullWidth ? '0px' : '20px';
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const labelContainerStyle: React.CSSProperties = {
    padding: size === 'md' ? `20px ${horizontalPadding} 10px` : `20px ${horizontalPadding} 16px`,
    textAlign,
  };

  const labelStyle: React.CSSProperties = {
    ...(size === 'md' ? typography.body.body5 : typography.title['h5-1']),
    color: colors.neutral[100],
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: `0px ${horizontalPadding} 20px`,
  };

  const inputRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
  };

  const renderInputWithSuffix = (item: InputFieldItem, index: number) => {
    // item.flex가 지정되면 해당 비율로 flex 사용, 아니면 기본 레이아웃 적용
    // single 타입이면 항상 전체 너비, multi 타입이면 첫 번째는 172px, 나머지는 flex
    const inputWrapperStyle: React.CSSProperties = item.flex !== undefined
      ? { flex: item.flex }
      : type === 'single'
        ? { flex: 1 }
        : index === 0
          ? { width: '172px' }
          : { flex: 1 };

    return (
      <div key={item.key} style={{ ...inputWrapperStyle, position: 'relative' }}>
        <InputField
          inputRef={item.inputRef}
          type={item.type || 'text'}
          value={item.value}
          onChange={(value: string) => onChange(item.key, value)}
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
              color: item.disabled ? colors.neutral[300] : (item.value ? colors.violet[200] : colors.neutral[300]),
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
      {showLabel && (
        <div style={labelContainerStyle}>
          <span style={labelStyle}>{label}</span>
        </div>
      )}
      <div style={inputContainerStyle}>
        <div style={inputRowStyle}>
          {items.map((item, index) =>
            renderInputWithSuffix(item, index)
          )}
        </div>
      </div>
    </div>
  );
};
