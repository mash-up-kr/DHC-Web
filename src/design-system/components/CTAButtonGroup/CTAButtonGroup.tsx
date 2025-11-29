/**
 * CTAButtonGroup Component
 * CTA 버튼 그룹 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-35610
 *
 * Variants:
 * - Type=one button: 버튼 1개 (Secondary)
 * - Type=two button: 버튼 2개 (Primary + Tertiary)
 */

'use client';

import React from 'react';
import { CTAButton } from '../Button/CTAButton';

export type CTAButtonGroupType = 'oneButton' | 'twoButton';

export interface CTAButtonGroupProps {
  /**
   * 그룹 타입
   */
  type: CTAButtonGroupType;
  /**
   * Primary 버튼 텍스트 (twoButton 타입에서 사용)
   */
  primaryButtonText?: string;
  /**
   * Primary 버튼 클릭 핸들러
   */
  onPrimaryClick?: () => void;
  /**
   * Secondary 버튼 텍스트 (oneButton 타입에서 사용)
   */
  secondaryButtonText?: string;
  /**
   * Secondary 버튼 클릭 핸들러
   */
  onSecondaryClick?: () => void;
  /**
   * Tertiary 버튼 텍스트 (twoButton 타입에서 사용)
   */
  tertiaryButtonText?: string;
  /**
   * Tertiary 버튼 클릭 핸들러
   */
  onTertiaryClick?: () => void;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const CTAButtonGroup: React.FC<CTAButtonGroupProps> = ({
  type,
  primaryButtonText = '확인',
  onPrimaryClick,
  secondaryButtonText = '확인',
  onSecondaryClick,
  tertiaryButtonText = '취소',
  onTertiaryClick,
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
          buttonType="secondary"
          size="xl"
          fullWidth
          onClick={onSecondaryClick}
        >
          {secondaryButtonText}
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
        onClick={onPrimaryClick}
      >
        {primaryButtonText}
      </CTAButton>
      <CTAButton
        buttonType="tertiary"
        size="xl"
        fullWidth
        onClick={onTertiaryClick}
      >
        {tertiaryButtonText}
      </CTAButton>
    </div>
  );
};
