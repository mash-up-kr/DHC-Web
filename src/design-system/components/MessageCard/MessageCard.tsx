/**
 * MessageCard Component
 * 메시지 카드 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-13383
 */

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export interface MessageCardProps {
  /**
   * 카드 타이틀 (예: "금전운", "애정운")
   */
  title: string;
  /**
   * 카드 본문 내용
   */
  message: string;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  title,
  message,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px 16px 16px 16px',
    backgroundColor: colors.neutral[700],
    borderRadius: '12px',
    width: '100%',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    paddingBottom: '12px',
  };

  const titleStyle: React.CSSProperties = {
    ...typography.body.body5,
    color: colors.neutral[400],
  };

  const messageStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: colors.neutral[100],
    whiteSpace: 'pre-line',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={contentStyle}>
        <span style={titleStyle}>{title}</span>
        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
};
