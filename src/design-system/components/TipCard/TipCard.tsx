/**
 * TipCard Component
 * 팁 카드 컴포넌트 (추천 메뉴, 행운의 색상 등)
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-13376
 *
 * Variants:
 * - color가 없는 경우: 메뉴 추천/피해야 할 메뉴 스타일
 * - color가 있는 경우: 행운의 색상/피해야 할 색상 스타일
 */

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export interface TipCardProps {
  /**
   * 카드 아이콘 (ReactNode)
   */
  icon: React.ReactNode;
  /**
   * 카드 타이틀 (예: "오늘의 추천메뉴", "행운의 색상")
   */
  title: string;
  /**
   * 메인 값 (예: "카레", "연두색")
   */
  value: string;
  /**
   * 색상 값 (hex color, 예: "#23B169")
   * 제공되면 색상 원과 함께 해당 색상으로 value 텍스트가 표시됨
   */
  color?: string;
  /**
   * 카드 너비
   * @default '160px'
   */
  width?: string;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const TipCard: React.FC<TipCardProps> = ({
  icon,
  title,
  value,
  color,
  width = '160px',
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: colors.neutral[700],
    borderRadius: '12px',
    width,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle: React.CSSProperties = {
    ...typography.body.body5,
    color: colors.neutral[400],
  };

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
  };

  const colorDotStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '999999px',
    backgroundColor: color,
    flexShrink: 0,
  };

  const valueStyle: React.CSSProperties = {
    ...typography.title.h3,
    color: color || colors.neutral[100],
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={iconStyle}>{icon}</div>
          <span style={titleStyle}>{title}</span>
        </div>
        <div style={mainContainerStyle}>
          {color && <div style={colorDotStyle} />}
          <span style={valueStyle}>{value}</span>
        </div>
      </div>
    </div>
  );
};
