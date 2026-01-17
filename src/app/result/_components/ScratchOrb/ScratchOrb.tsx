"use client";

import { useRef } from 'react';
import { useScratchCanvas } from './useScratchCanvas';
import { typography } from '@/design-system/foundations/typography';

export interface ScratchOrbProps {
  /**
   * Orb 크기 (정사각형)
   * @default 210
   */
  size?: number;
  /**
   * 마스크(덮개) 색상 (maskImageUrl이 없을 때 사용)
   * @default '#CDE3FF'
   */
  maskColor?: string;
  /**
   * 마스크(덮개) 이미지 URL (maskColor보다 우선)
   */
  maskImageUrl?: string;
  /**
   * 숨겨진 이미지 URL
   * @default '/images/scratch-reveal-orb.png'
   */
  revealImageUrl?: string;
  /**
   * 숨겨진 텍스트
   * @default '여기를 긁어보세요'
   */
  revealText?: string;
  /**
   * 자동 완료 임계값 (0-1)
   * @default 0.5
   */
  completionThreshold?: number;
  /**
   * 브러시 크기
   * @default 30
   */
  brushSize?: number;
  /**
   * 완료 시 콜백
   */
  onComplete: () => void;
  /**
   * 스크래치 시작 시 콜백 (선택)
   */
  onScratchStart?: () => void;
  /**
   * 진행률 변경 콜백 (선택)
   */
  onProgressChange?: (progress: number) => void;
}

export function ScratchOrb({
  size = 210,
  maskColor = '#CDE3FF',
  maskImageUrl,
  revealImageUrl = '/images/scratch-reveal-orb.png',
  revealText = '여기를 긁어보세요',
  completionThreshold = 0.5,
  brushSize = 30,
  onComplete,
  onScratchStart,
  onProgressChange,
}: ScratchOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useScratchCanvas({
    canvasRef,
    size,
    maskColor,
    maskImageUrl,
    brushSize,
    completionThreshold,
    onComplete,
    onScratchStart,
    onProgressChange,
  });

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      {/* 숨겨진 이미지 (아래 레이어) */}
      <img
        src={revealImageUrl}
        alt="Revealed content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* 중앙 텍스트 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            ...typography.title.h5,
            color: '#000000',
            textAlign: 'center',
          }}
        >
          {revealText}
        </span>
      </div>

      {/* Canvas 마스크 (위 레이어) */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'pointer',
          borderRadius: '50%',
          touchAction: 'none', // 모바일 스크롤 방지
        }}
      />
    </div>
  );
}
