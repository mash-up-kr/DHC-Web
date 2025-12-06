/**
 * CTAButtonGroup Component
 * CTA 버튼 그룹 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-35610
 *
 * Variants:
 * - Type=one button: 버튼 1개 (Primary)
 * - Type=two button: 버튼 2개 (Primary + Secondary/Tertiary)
 */

'use client';

import React from 'react';
import { CTAButton } from '../Button/CTAButton';

export type CTAButtonGroupType = 'oneButton' | 'twoButton';
export type SecondButtonType = 'secondary' | 'tertiary';

export interface CTAButtonGroupProps {
  /**
   * 그룹 타입
   */
  type: CTAButtonGroupType;
  /**
   * Primary 버튼 텍스트
   */
  primaryButtonText?: string;
  /**
   * Primary 버튼 클릭 핸들러
   */
  onPrimaryClick?: () => void;
  /**
   * Primary 버튼 비활성화 여부
   */
  primaryDisabled?: boolean;
  /**
   * 두 번째 버튼 타입 (twoButton 타입에서 사용)
   * @default 'tertiary'
   */
  secondButtonType?: SecondButtonType;
  /**
   * 두 번째 버튼 텍스트 (twoButton 타입에서 사용)
   */
  secondButtonText?: string;
  /**
   * 두 번째 버튼 클릭 핸들러
   */
  onSecondButtonClick?: () => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  type,
  primaryButtonText = '확인',
  onPrimaryClick,
  primaryDisabled = false,
  secondButtonType = 'tertiary',
  secondButtonText = '취소',
  onSecondButtonClick,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: type === 'oneButton' ? '10px' : '8px',
    padding: '20px',
    width: '100%',
  };

  if (type === 'oneButton') {
    return (
      <div className={className} style={containerStyle}>
        <CTAButton
          buttonType="primary"
          size="xl"
          fullWidth
          status={primaryDisabled ? 'disabled' : 'active'}
          onClick={onPrimaryClick}
        >
          {primaryButtonText}
        </CTAButton>
      </div>
    );
  }

  // type === 'twoButton'
  return (
    <div className={className} style={containerStyle}>
      <CTAButton
        buttonType="primary"
        size="xl"
        fullWidth
        status={primaryDisabled ? 'disabled' : 'active'}
        onClick={onPrimaryClick}
      >
        {primaryButtonText}
      </CTAButton>
      <CTAButton
        buttonType={secondButtonType}
        size="xl"
        fullWidth
        onClick={onSecondButtonClick}
      >
        {secondButtonText}
      </CTAButton>
    </div>
  );
};
