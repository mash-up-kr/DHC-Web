/**
 * Icon Wrapper Component
 * 모든 아이콘의 공통 래퍼
 *
 * @TODO 임시 코드 - 수정 예정
 */

import React from 'react';
import { IconProps } from '../types';

interface IconWrapperProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  onClick,
  children,
  viewBox = '0 0 24 24',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ color }}
    >
      {children}
    </svg>
  );
};
