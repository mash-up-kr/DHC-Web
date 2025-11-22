/**
 * Header Component
 * 페이지 상단 헤더 컴포넌트
 *
 * @TODO 임시 코드 - 수정 예정
 */

import React from 'react';
import Image from 'next/image';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { typography } from '../../foundations/typography';
import { colors } from '../../foundations/colors';

export type HeaderType = 'title' | 'progressbar';

export interface HeaderProps {
  /**
   * 헤더 타입
   */
  type: HeaderType;
  /**
   * 뒤로가기 버튼 클릭 핸들러
   */
  onBackClick?: () => void;
  /**
   * 현재 페이지 번호
   */
  currentPage: number;
  /**
   * 전체 페이지 수
   */
  totalPage: number;
  /**
   * 헤더 제목 (type이 'title'일 때만 사용)
   */
  title?: string;
  /**
   * 진행도 (type이 'progressbar'일 때만 사용, 0-100)
   */
  progress?: number;
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
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '16px 20px',
    gap: '12px',
    backgroundColor: 'transparent',
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  };

  const backButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...typography.body.body2,
    color: colors.text.main,
    margin: '9px 9px',
  };

  const currentPageStyle: React.CSSProperties = {
    ...typography.title.h5,
    color: colors.text.main,
  };

  const separatorAndTotalPageStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: 'rgba(244, 244, 245, 0.2)', // colors.text.main with 20% alpha
  };

  return (
    <header className={className} style={containerStyle}>
      {/* Top Row: 뒤로가기 버튼 + 제목(title 타입) or 페이지 정보 */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={topRowStyle}>
          {/* 뒤로가기 버튼 */}
          <button
            onClick={onBackClick}
            type="button"
            style={backButtonStyle}
            aria-label="뒤로가기"
          >
            <Image
              src="/assets/design-system/left_btn.png"
              alt="뒤로가기"
              width={44}
              height={44}
            />
          </button>

          {/* title 타입: 제목을 중앙에 표시 */}
          {type === 'title' && title && (
            <h1 style={titleStyle}>{title}</h1>
          )}

          {/* progressbar 타입: ProgressBar 표시 */}
          {type === 'progressbar' && (
            <div style={{ flex: 1, margin: '19px 16px' }}>
              <ProgressBar value={progress} max={100} />
            </div>
          )}
          
          {/* 페이지 정보 (오른쪽) */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', margin: '11px 9.5px' }}>
            <span style={currentPageStyle}>{currentPage}</span>
            <span style={separatorAndTotalPageStyle}>/</span>
            <span style={separatorAndTotalPageStyle}>{totalPage}</span>
          </div>
        </div>
      </div>

    </header>
  );
};
