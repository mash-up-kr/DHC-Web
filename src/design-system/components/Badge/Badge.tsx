/**
 * Badge Component
 * 상태, 카테고리, 레벨 등을 표시하는 배지 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=541-33903
 *
 * Variants:
 * - spendType: 카테고리 표시 (식음료, 쇼핑 등)
 * - date: 날짜 표시
 * - levelEasy: Easy 레벨
 * - levelMedium: Medium 레벨
 * - levelHard: Hard 레벨
 * - dDay: D-day 표시
 * - complete: 완료 상태 (2/3 등)
 */

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export type BadgeType =
  | 'spendType'
  | 'date'
  | 'levelEasy'
  | 'levelMedium'
  | 'levelHard'
  | 'dDay'
  | 'complete';

export type BadgeStatus = 'active' | 'disabled';

export interface BadgeProps {
  /**
   * 배지 타입
   */
  type: BadgeType;
  /**
   * 배지 상태
   * @default 'active'
   */
  status?: BadgeStatus;
  /**
   * 배지에 표시할 텍스트
   */
  children: React.ReactNode;
  /**
   * complete 타입에서 전체 값 (예: 2/3에서 3)
   */
  total?: number;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

// 배지 타입별 색상 설정
const badgeStyles: Record<
  BadgeType,
  {
    active: { backgroundColor: string; color: string; borderRadius: string };
    disabled: { backgroundColor: string; color: string; borderRadius: string };
  }
> = {
  spendType: {
    active: {
      backgroundColor: colors.background.glassEffect,
      color: colors.violet[200],
      borderRadius: '999px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '999px',
    },
  },
  date: {
    active: {
      backgroundColor: colors.background.glassEffect,
      color: colors.neutral[100],
      borderRadius: '999px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '999px',
    },
  },
  levelEasy: {
    active: {
      backgroundColor: colors.background.badgePrimary,
      color: '#70A2FF',
      borderRadius: '12px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '12px',
    },
  },
  levelMedium: {
    active: {
      backgroundColor: colors.background.badgePrimary,
      color: colors.violet[200],
      borderRadius: '12px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '12px',
    },
  },
  levelHard: {
    active: {
      backgroundColor: colors.background.badgePrimary,
      color: '#E293A4',
      borderRadius: '12px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '12px',
    },
  },
  dDay: {
    active: {
      backgroundColor: colors.background.badgePrimary,
      color: colors.violet[200],
      borderRadius: '12px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '12px',
    },
  },
  complete: {
    active: {
      backgroundColor: colors.background.glassEffect,
      color: colors.neutral[30],
      borderRadius: '999px',
    },
    disabled: {
      backgroundColor: colors.neutral[500],
      color: colors.neutral[300],
      borderRadius: '999px',
    },
  },
};

// 타입별 타이포그래피 설정
const getTypography = (type: BadgeType) => {
  switch (type) {
    case 'spendType':
      return typography.title.h8; // Head/H8: 13px, 600
    case 'complete':
      return typography.title.h8;
    default:
      return typography.body.body6; // Body/B6: 13px, 400
  }
};

export const Badge: React.FC<BadgeProps> = ({
  type,
  status = 'active',
  children,
  total,
  className = '',
}) => {
  const style = badgeStyles[type][status];
  const typo = getTypography(type);

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 12px',
    height: type === 'spendType' ? '27px' : '24px',
    backgroundColor: style.backgroundColor,
    borderRadius: style.borderRadius,
  };

  const textStyle: React.CSSProperties = {
    ...typo,
    color: style.color,
  };

  // complete 타입일 때 특수 렌더링
  if (type === 'complete' && total !== undefined) {
    return (
      <span className={className} style={containerStyle}>
        <span style={textStyle}>{children}</span>
        <span
          style={{
            ...typography.body.body6,
            color: colors.neutral[50],
            opacity: 0.2,
          }}
        >
          /{total}
        </span>
      </span>
    );
  }

  return (
    <span className={className} style={containerStyle}>
      <span style={textStyle}>{children}</span>
    </span>
  );
};
