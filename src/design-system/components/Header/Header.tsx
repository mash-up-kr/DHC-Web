/**
 * Header Component
 * 페이지 상단 헤더 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=595-27790
 *
 * Variants:
 * - Type=Screen info: 화면명 타이틀 표시
 * - Type=Progress bar: 프로그레스 바 표시
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { typography } from '../../foundations/typography';
import { colors } from '../../foundations/colors';

export type HeaderType = 'screenInfo' | 'progressBar';

export interface HeaderProps {
  /**
   * 헤더 타입
   * - screenInfo: 화면명 타이틀 표시
   * - progressBar: 프로그레스 바 표시
   */
  type: HeaderType;
  /**
   * 뒤로가기 버튼 클릭 핸들러
   */
  onBackClick?: () => void;
  /**
   * 현재 페이지 번호 (페이지 정보를 표시할 때 사용)
   */
  currentPage?: number;
  /**
   * 전체 페이지 수 (페이지 정보를 표시할 때 사용)
   */
  totalPage?: number;
  /**
   * 헤더 제목 (type이 'screenInfo'일 때 사용)
   */
  title?: string;
  /**
   * 진행도 (type이 'progressBar'일 때 사용, 0-100)
   */
  progress?: number;
  /**
   * 뒤로가기 버튼 표시 여부
   * @default true
   */
  showBackButton?: boolean;
  /**
   * 페이지 인디케이터 표시 여부
   * @default true
   */
  showIndicator?: boolean;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  type,
  onBackClick,
  currentPage,
  totalPage,
  title,
  progress = 0,
  showBackButton = true,
  showIndicator = true,
  className = '',
}) => {
  // Container style - Figma: layout_YCXQXP (Screen info) / layout_913PIN (Progress bar)
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: type === 'screenInfo' ? 'flex-end' : 'center',
    justifyContent: type === 'progressBar' ? 'space-between' : undefined,
    gap: type === 'progressBar' ? '113px' : undefined,
    width: '100%',
    padding: '8px 12px 0px',
    background:
      type === 'screenInfo'
        ? 'linear-gradient(180deg, rgba(15, 17, 20, 1) 50%, rgba(15, 17, 20, 0) 100%)'
        : 'linear-gradient(180deg, rgba(15, 17, 20, 1) 57%, rgba(15, 17, 20, 0) 100%)',
  };

  // Left section style - Figma: layout_TFNJIX (44px width)
  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    width: '44px',
    height: '44px',
    flexShrink: 0,
  };

  // Back button style
  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  // Center section style for Screen info - Figma: layout_CTWSSJ
  const centerSectionScreenInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    height: '44px',
  };

  // Center section style for Progress bar - Figma: layout_CK7620
  const centerSectionProgressBarStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '0px 16px',
    flex: 1,
    height: '44px',
  };

  // Title text style - Figma: Body/B2
  const titleStyle: React.CSSProperties = {
    ...typography.body.body2,
    color: colors.text.main,
    textAlign: 'center',
  };

  // Right section style - Figma: layout_L0PB59
  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px',
    padding: '0px 9px',
    width: '44px',
    height: '44px',
    flexShrink: 0,
  };

  // Current page style - Figma: Head/H5
  const currentPageStyle: React.CSSProperties = {
    ...typography.title.h5,
    color: colors.text.main,
    textAlign: 'right',
  };

  // Total page style - Figma: Body/B3 with 20% opacity
  const totalPageStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: colors.text.main,
    opacity: 0.2,
    textAlign: 'right',
  };

  return (
    <header className={className} style={containerStyle}>
      {/* Left Section - Back Button */}
      <div style={leftSectionStyle}>
        {showBackButton && (
          <button
            onClick={onBackClick}
            type="button"
            style={backButtonStyle}
            aria-label="뒤로가기"
          >
            <Image
              src="/assets/design-system/icon-back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {/* Center Section */}
      {type === 'screenInfo' ? (
        <div style={centerSectionScreenInfoStyle}>
          {title && <span style={titleStyle}>{title}</span>}
        </div>
      ) : (
        <div style={centerSectionProgressBarStyle}>
          <ProgressBar value={progress} max={100} />
        </div>
      )}

      {/* Right Section - Page Indicator */}
      {showIndicator ? (
        <div style={rightSectionStyle}>
          <span style={currentPageStyle}>{currentPage}</span>
          <span style={totalPageStyle}>/{totalPage}</span>
        </div>
      ) : (
        <div style={{ width: '44px', height: '44px', flexShrink: 0 }} />
      )}
    </header>
  );
};
