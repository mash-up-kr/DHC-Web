/**
 * Modal Component
 * 팝업 모달 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-11416
 */

import React from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

export interface ModalProps {
  /**
   * 모달 제목
   */
  title: string;
  /**
   * 모달 설명
   */
  description: string;
  /**
   * CTA 버튼 텍스트
   */
  buttonText: string;
  /**
   * CTA 버튼 클릭 핸들러
   */
  onButtonClick?: () => void;
  /**
   * 닫기 버튼 클릭 핸들러
   */
  onClose?: () => void;
  /**
   * 닫기 버튼 표시 여부
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * 그래픽 영역 커스텀 렌더링
   */
  graphicNode?: React.ReactNode;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  onClose,
  showCloseButton = true,
  graphicNode,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 0 20px 0',
    backgroundColor: colors.neutral[700],
    borderRadius: '12px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    width: '100%',
  };

  const closeButtonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: '0 12px',
  };

  const closeButtonStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '16px',
  };

  const graphicContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '128px',
    backgroundColor: colors.neutral[600],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const graphicPlaceholderStyle: React.CSSProperties = {
    ...typography.body.body3,
    color: colors.text.main,
    opacity: 0.4,
    textAlign: 'center',
  };

  const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '4px',
  };

  const titleStyle: React.CSSProperties = {
    ...typography.title['h4-1'],
    color: colors.neutral[100],
    textAlign: 'center',
  };

  const descriptionStyle: React.CSSProperties = {
    ...typography.body.body5,
    color: colors.neutral[300],
    textAlign: 'center',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    gap: '4px',
    padding: '0 20px',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    padding: '14px 24px',
    backgroundColor: colors.violet[400],
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  };

  const buttonTextStyle: React.CSSProperties = {
    ...typography.title.h6,
    color: colors.neutral[30],
    textAlign: 'center',
  };

  return (
    <div className={className} style={containerStyle}>
      {/* 닫기 버튼 */}
      {showCloseButton && (
        <div style={closeButtonContainerStyle}>
          <button style={closeButtonStyle} onClick={onClose} aria-label="닫기">
            <img
              src="/images/icon-close.svg"
              alt="닫기"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div style={contentContainerStyle}>
        {/* 그래픽 영역 */}
        {graphicNode ? (
          graphicNode
        ) : (
          <div style={graphicContainerStyle}>
            <span style={graphicPlaceholderStyle}>그래픽 (변경예정)</span>
          </div>
        )}

        {/* 텍스트 영역 */}
        <div style={textContainerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <p style={descriptionStyle}>{description}</p>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={onButtonClick}>
          <span style={buttonTextStyle}>{buttonText}</span>
        </button>
      </div>
    </div>
  );
};
