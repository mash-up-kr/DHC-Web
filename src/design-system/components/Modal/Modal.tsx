/**
 * Modal Component
 * 팝업 모달 컴포넌트
 *
 * Figma: https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-11416
 */

import React, { useState, useEffect } from 'react';
import { colors } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

const ANIMATION_DURATION = 300;

export interface ModalProps {
  /**
   * 모달 제목 (문자열)
   */
  title?: string;
  /**
   * 모달 제목 커스텀 노드 (그라디언트 등 복잡한 제목에 사용)
   */
  titleNode?: React.ReactNode;
  /**
   * 모달 설명
   */
  description?: string;
  /**
   * Badge 텍스트
   */
  badgeText?: string;
  /**
   * CTA 버튼 텍스트
   */
  buttonText: string;
  /**
   * CTA 버튼 클릭 핸들러
   */
  onButtonClick?: () => void;
  /**
   * 두 번째 버튼 텍스트 (tertiary 스타일)
   */
  secondButtonText?: string;
  /**
   * 두 번째 버튼 클릭 핸들러
   */
  onSecondButtonClick?: () => void;
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
   * 배경 오버레이 표시 여부
   * @default false
   */
  showOverlay?: boolean;
  /**
   * 배경 오버레이 클릭 핸들러
   */
  onOverlayClick?: () => void;
  /**
   * 그래픽 영역 커스텀 렌더링
   */
  graphicNode?: React.ReactNode;
  /**
   * 그래픽 영역 높이
   * @default 128
   */
  graphicHeight?: number;
  /**
   * border 표시 여부
   * @default false
   */
  showBorder?: boolean;
  /**
   * 커스텀 클래스명
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  titleNode,
  description,
  badgeText,
  buttonText,
  onButtonClick,
  secondButtonText,
  onSecondButtonClick,
  onClose,
  showCloseButton = true,
  showOverlay = false,
  onOverlayClick,
  graphicNode,
  graphicHeight = 128,
  showBorder = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // 마운트 시 fade in 시작
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, ANIMATION_DURATION);
  };

  const handleOverlayClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onOverlayClick?.();
    }, ANIMATION_DURATION);
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 17, 20, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '0 20px',
    opacity: isVisible && !isClosing ? 1 : 0,
    transition: `opacity ${ANIMATION_DURATION}ms ease-in-out`,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 0',
    backgroundColor: colors.neutral[700],
    borderRadius: '12px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '300px',
    ...(showBorder && { border: `1px solid ${colors.neutral[600]}` }),
    opacity: isVisible && !isClosing ? 1 : 0,
    transform: isVisible && !isClosing ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${ANIMATION_DURATION}ms ease-in-out, transform ${ANIMATION_DURATION}ms ease-in-out`,
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

  const badgeStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    padding: '4px 12px',
    backgroundColor: 'rgba(123, 134, 150, 0.15)',
    borderRadius: '999999px',
  };

  const badgeTextStyle: React.CSSProperties = {
    ...typography.body.body6,
    color: colors.neutral[100],
  };

  const graphicContainerStyle: React.CSSProperties = {
    width: '100%',
    height: `${graphicHeight}px`,
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
    gap: '2px',
    padding: '0 20px',
  };

  const titleStyle: React.CSSProperties = {
    ...typography.title.h4,
    color: colors.neutral[30],
    textAlign: 'center',
    margin: 0,
    whiteSpace: 'pre-line',
  };

  const descriptionStyle: React.CSSProperties = {
    ...typography.body.body5,
    color: colors.neutral[300],
    textAlign: 'center',
    margin: 0,
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

  const secondButtonStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    padding: '14px 24px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  };

  const secondButtonTextStyle: React.CSSProperties = {
    ...typography.title.h6,
    color: colors.neutral[300],
    textAlign: 'center',
  };

  const modalContent = (
    <div
      className={className}
      style={containerStyle}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 닫기 버튼 */}
      {showCloseButton && (
        <div style={closeButtonContainerStyle}>
          <button style={closeButtonStyle} onClick={handleClose} aria-label="닫기">
            <img
              src="/icons/icon-close.svg"
              alt="닫기"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div style={contentContainerStyle}>
        {/* Badge */}
        {badgeText && (
          <div style={badgeStyle}>
            <span style={badgeTextStyle}>{badgeText}</span>
          </div>
        )}

        {/* 제목 영역 */}
        {(titleNode || title) && (
          <div style={textContainerStyle}>
            {titleNode ? titleNode : <h2 style={titleStyle}>{title}</h2>}
            {description && <p style={descriptionStyle}>{description}</p>}
          </div>
        )}

        {/* 그래픽 영역 */}
        {graphicNode ? (
          graphicNode
        ) : (
          <div style={graphicContainerStyle}>
            <span style={graphicPlaceholderStyle}>그래픽 (변경예정)</span>
          </div>
        )}
      </div>

      {/* CTA 버튼 */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={onButtonClick}>
          <span style={buttonTextStyle}>{buttonText}</span>
        </button>
        {secondButtonText && (
          <button style={secondButtonStyle} onClick={onSecondButtonClick}>
            <span style={secondButtonTextStyle}>{secondButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );

  if (showOverlay) {
    return (
      <div style={overlayStyle} onClick={handleOverlayClick}>
        {modalContent}
      </div>
    );
  }

  return modalContent;
};
