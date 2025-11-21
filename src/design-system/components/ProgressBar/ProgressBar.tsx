/**
 * ProgressBar Component
 * 진행 상태를 시각적으로 표시하는 컴포넌트
 */

import React from 'react';
import { colors } from '../../foundations/colors';

export interface ProgressBarProps {
  /**
   * 진행률 (0-100)
   */
  value: number;
  /**
   * 최대값 (기본값: 100)
   */
  max?: number;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: '99px',
    overflow: 'hidden',
  };

  const barStyle: React.CSSProperties = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: colors.violet[400],
    borderRadius: '99px',
    transition: 'width 0.3s ease',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={barStyle} />
    </div>
  );
};
