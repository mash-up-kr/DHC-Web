/**
 * Heart Icon
 * 하트 아이콘 예시 컴포넌트
 *
 * @TODO 임시 코드 - 수정 예정
 */

import React from 'react';
import { IconProps } from '../types';
import { IconWrapper } from './IconWrapper';

export const HeartIcon: React.FC<IconProps> = (props) => {
  return (
    <IconWrapper {...props}>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
};
