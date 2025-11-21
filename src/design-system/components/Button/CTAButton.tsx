/**
 * CTA Button Component
 * Call-to-Action 버튼
 */

'use client';

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type CTAButtonType = 'primary' | 'secondary' | 'tertiary';
export type CTAButtonStatus = 'active' | 'disabled';
export type CTAButtonSize = 'xl' | 'lg';

export interface CTAButtonProps {
  /**
   * 버튼 텍스트
   */
  children: React.ReactNode;

  /**
   * 버튼 타입
   */
  buttonType?: CTAButtonType;

  /**
   * 버튼 상태
   */
  status?: CTAButtonStatus;

  /**
   * 버튼 크기
   */
  size?: CTAButtonSize;

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * HTML 버튼 타입
   */
  type?: 'button' | 'submit' | 'reset';
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  buttonType = 'primary',
  status = 'active',
  size = 'lg',
  fullWidth = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const isDisabled = status === 'disabled';

  // 디자인 시스템 토큰 기반 스타일
  const getButtonStyles = () => {
    // Size별 패딩과 타이포그래피
    const sizeConfig = {
      xl: {
        padding: '15px 24px',
        typography: typography.title['h5-1'],
      },
      lg: {
        padding: '14px 24px',
        typography: typography.title.h6,
      },
    };

    // Type과 Status별 색상
    const colorConfig = {
      primary: {
        active: {
          backgroundColor: colors.text.highlightsPrimary,
          color: colors.text.main,
        },
        disabled: {
          backgroundColor: colors.neutral[600],
          color: colors.neutral[400],
        },
      },
      secondary: {
        active: {
          backgroundColor: colors.background.glassEffect,
          color: colors.text.main,
        },
        disabled: {
          backgroundColor: colors.neutral[500],
          color: colors.neutral[300],
        },
      },
      tertiary: {
        active: {
          backgroundColor: 'transparent',
          color: colors.neutral[300],
        },
        disabled: {
          backgroundColor: 'transparent',
          color: colors.neutral[500],
        },
      },
    };

    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[buttonType][status];

    return {
      padding: sizeStyle.padding,
      borderRadius: '8px',
      backgroundColor: colorStyle.backgroundColor,
      color: colorStyle.color,
      fontFamily: sizeStyle.typography.fontFamily,
      fontSize: sizeStyle.typography.fontSize,
      lineHeight: sizeStyle.typography.lineHeight,
      fontWeight: sizeStyle.typography.fontWeight,
      letterSpacing: sizeStyle.typography.letterSpacing,
      width: fullWidth ? '100%' : 'auto',
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <button
      type={type}
      style={{ ...buttonStyles }}
      className={className}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
