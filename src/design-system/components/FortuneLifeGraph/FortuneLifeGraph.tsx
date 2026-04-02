'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { colors, gradients } from '../../foundations/colors';
import { typography } from '../../foundations/typography';

// ─── Types ───────────────────────────────────────────────

/** 그래프 데이터 포인트 */
export interface FortuneDataPoint {
  /** X축 숫자값 (e.g. 20, 23, 47, 60, 80) */
  x: number;
  /** Y축 값 (e.g. 4528) */
  value: number;
}

/** 데이터 포인트 위의 이벤트 마커 */
export interface FortuneEvent {
  /** 이벤트의 x축 위치 */
  x: number;
  /** 아이콘 경로 (e.g. "/icons/icon-luckybag.svg") */
  iconSrc: string;
}

/** 전성기(peak) 마커 설정 */
export interface FortunePeakInfo {
  /** peak 마커 초기 위치 x값 */
  defaultX: number;
  /** 헤더 고정 텍스트 (e.g. "47살") */
  ageLabel: string;
  /** 헤더 고정 텍스트 (e.g. "4500만원") */
  amountLabel: string;
}

export interface FortuneLifeGraphProps {
  /** 헤더 제목 (e.g. "내 금전운 전성기") */
  headerLabel: string;
  /** 그래프 데이터 포인트 목록 */
  dataPoints: FortuneDataPoint[];
  /** 전성기 마커 설정 (드래그 가능, 헤더는 고정값) */
  peak: FortunePeakInfo;
  /** 이벤트 마커 목록 */
  events?: FortuneEvent[];
  /** X축에 표시할 대표 숫자 목록 (e.g. [20, 40, 60, 80]) */
  xAxisLabels: number[];
  /** X축 숫자를 표시용 문자열로 변환 (e.g. (x) => `${x}대`) */
  xAxisLabelFormat: (x: number) => string;
  /** peak 드래그 시 말풍선에 표시할 Y값 포맷 */
  peakTooltipFormat: (value: number) => string;
  /** peak 위치 변경 콜백 */
  onPeakChange?: (x: number, value: number) => void;
  /** 높이 @default 330 */
  height?: number;
  /** 커스텀 클래스명 */
  className?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
}

// ─── Layout Constants ────────────────────────────────────
// 수직 레이아웃: 헤더(57) + 여백(24) + 이벤트 말풍선(49) + 그래프(160) + X축 레이블(24) + 하단 패딩(16)
const LAYOUT = {
  headerHeight: 57,
  headerGap: 24,
  eventBubbleHeight: 49,
  chartHeight: 160,
  xAxisHeight: 24,
  bottomPadding: 16,
  sidePadding: 24,
  /** 그래프 영역 내 상단 여백 (peak 말풍선 + dot 공간) */
  chartInnerTop: 45,
  /** 그래프 영역 내 하단 여백 (dot이 바닥선에 걸리지 않게) */
  chartInnerBottom: 6,
};

// 그래프 영역의 Y 시작점
const CHART_TOP = LAYOUT.headerHeight + LAYOUT.headerGap + LAYOUT.eventBubbleHeight;
// 이벤트 말풍선 영역의 Y 시작점
const EVENT_TOP = LAYOUT.headerHeight + LAYOUT.headerGap;

// ─── Utilities ───────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

/** Monotone-X Catmull-Rom: x는 선형, y만 곡선으로 Cubic Bezier SVG path 생성 */
function catmullRomToBezier(points: Point[]): string {
  if (points.length < 2) return '';

  const tension = 0.15;
  let d = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // x는 균등 분할 (선형), y만 Catmull-Rom 보간
    const cp1x = p1.x + (p2.x - p1.x) / 3;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p2.x - p1.x) / 3;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return d;
}

/** 데이터 x값 → 픽셀 x좌표 */
function xToPixel(x: number, minX: number, maxX: number, chartWidth: number): number {
  return LAYOUT.sidePadding + ((x - minX) / (maxX - minX)) * chartWidth;
}

/** 픽셀 x좌표 → 데이터 x값 */
function pixelToX(px: number, minX: number, maxX: number, chartWidth: number): number {
  return minX + ((px - LAYOUT.sidePadding) / chartWidth) * (maxX - minX);
}

/** value → 그래프 영역 내 픽셀 y좌표 (내부 패딩 반영) */
function valueToPixel(value: number, minVal: number, maxVal: number): number {
  const range = maxVal - minVal || 1;
  const drawableHeight = LAYOUT.chartHeight - LAYOUT.chartInnerTop - LAYOUT.chartInnerBottom;
  return CHART_TOP + LAYOUT.chartInnerTop + drawableHeight - ((value - minVal) / range) * drawableHeight;
}

/** Catmull-Rom 보간으로 임의 x에서의 y값 계산 */
function interpolateValue(dataPoints: FortuneDataPoint[], targetX: number): number {
  if (dataPoints.length === 0) return 0;
  if (targetX <= dataPoints[0].x) return dataPoints[0].value;
  if (targetX >= dataPoints[dataPoints.length - 1].x) return dataPoints[dataPoints.length - 1].value;

  let idx = 0;
  for (let i = 0; i < dataPoints.length - 1; i++) {
    if (targetX >= dataPoints[i].x && targetX <= dataPoints[i + 1].x) {
      idx = i;
      break;
    }
  }

  const p0 = dataPoints[Math.max(0, idx - 1)];
  const p1 = dataPoints[idx];
  const p2 = dataPoints[idx + 1];
  const p3 = dataPoints[Math.min(dataPoints.length - 1, idx + 2)];

  const t = (targetX - p1.x) / (p2.x - p1.x);
  const tension = 0.15;
  const t2 = t * t;
  const t3 = t2 * t;

  const m1 = (p2.value - p0.value) * tension;
  const m2 = (p3.value - p1.value) * tension;

  return (
    (2 * t3 - 3 * t2 + 1) * p1.value +
    (t3 - 2 * t2 + t) * m1 +
    (-2 * t3 + 3 * t2) * p2.value +
    (t3 - t2) * m2
  );
}

/** 가장 가까운 xAxisLabel 값 찾기 */
function findNearestLabel(x: number, labels: number[]): number {
  let nearest = labels[0];
  let minDist = Math.abs(x - labels[0]);
  for (let i = 1; i < labels.length; i++) {
    const dist = Math.abs(x - labels[i]);
    if (dist < minDist) {
      minDist = dist;
      nearest = labels[i];
    }
  }
  return nearest;
}

// ─── Sub-Components ──────────────────────────────────────

/** 말풍선 화살표 */
const BubbleArrow: React.FC<{ id: string }> = ({ id }) => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <defs>
      <linearGradient id={`bubbleArrowGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="43%" stopColor={colors.neutral[30]} />
        <stop offset="100%" stopColor={colors.text.highlightsSecondary} />
      </linearGradient>
    </defs>
    <path
      d="M6 7L0.803848 0.25L11.1962 0.249999L6 7Z"
      fill={`url(#bubbleArrowGrad-${id})`}
      fillOpacity="0.88"
    />
  </svg>
);

/** 말풍선 컴포넌트 */
const SpeechBubble: React.FC<{
  id: string;
  text: string;
  style?: React.CSSProperties;
}> = ({ id, text, style }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      ...style,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 10px',
        borderRadius: '8px',
        background: gradients.tooltipGradient01,
        backdropFilter: 'blur(64px)',
        WebkitBackdropFilter: 'blur(64px)',
        opacity: 0.88,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          ...typography.title.h7,
          color: colors.background.main,
          textAlign: 'center',
          margin: 0,
        }}
      >
        {text}
      </span>
    </div>
    <BubbleArrow id={id} />
  </div>
);

// ─── Main Component ──────────────────────────────────────

export const FortuneLifeGraph: React.FC<FortuneLifeGraphProps> = ({
  headerLabel,
  dataPoints,
  peak,
  events = [],
  xAxisLabels,
  xAxisLabelFormat,
  peakTooltipFormat,
  onPeakChange,
  height = 330,
  className = '',
  style: customStyle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [peakX, setPeakX] = useState(peak.defaultX);
  const [isDragging, setIsDragging] = useState(false);

  // 컨테이너 너비 측정
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setContainerWidth(el.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 데이터 범위 계산
  const sorted = useMemo(() => [...dataPoints].sort((a, b) => a.x - b.x), [dataPoints]);
  const minX = sorted.length > 0 ? sorted[0].x : 0;
  const maxX = sorted.length > 0 ? sorted[sorted.length - 1].x : 1;
  const minVal = useMemo(() => Math.min(...sorted.map((d) => d.value)), [sorted]);
  const maxVal = useMemo(() => Math.max(...sorted.map((d) => d.value)), [sorted]);

  const chartWidth = containerWidth - LAYOUT.sidePadding * 2;

  // SVG 포인트 계산 (그래프 영역 내에서만)
  const svgPoints = useMemo(
    () =>
      sorted.map((dp) => ({
        x: xToPixel(dp.x, minX, maxX, chartWidth),
        y: valueToPixel(dp.value, minVal, maxVal),
      })),
    [sorted, minX, maxX, minVal, maxVal, chartWidth],
  );

  const linePath = useMemo(() => catmullRomToBezier(svgPoints), [svgPoints]);

  // 가장 가까운 dataPoint로 스냅
  const snappedPeak = useMemo(() => {
    let nearest = sorted[0];
    let minDist = Math.abs(peakX - sorted[0].x);
    for (let i = 1; i < sorted.length; i++) {
      const dist = Math.abs(peakX - sorted[i].x);
      if (dist < minDist) {
        minDist = dist;
        nearest = sorted[i];
      }
    }
    return nearest;
  }, [sorted, peakX]);

  const peakPixelX = xToPixel(snappedPeak.x, minX, maxX, chartWidth);
  const peakPixelY = valueToPixel(snappedPeak.value, minVal, maxVal);

  // Peak 드래그 핸들러
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const rawX = Math.max(minX, Math.min(maxX, pixelToX(relX, minX, maxX, chartWidth)));
      setPeakX(rawX);
      // 스냅된 값으로 콜백
      let nearest = sorted[0];
      let minDist = Math.abs(rawX - sorted[0].x);
      for (let i = 1; i < sorted.length; i++) {
        const dist = Math.abs(rawX - sorted[i].x);
        if (dist < minDist) { minDist = dist; nearest = sorted[i]; }
      }
      onPeakChange?.(nearest.x, nearest.value);
    },
    [isDragging, minX, maxX, chartWidth, sorted, onPeakChange],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (!isDragging) return;

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Peak의 가장 가까운 대표 레이블
  const peakNearestLabel = useMemo(() => findNearestLabel(peakX, xAxisLabels), [peakX, xAxisLabels]);

  // X축 레이블 Y 위치
  const xAxisY = CHART_TOP + LAYOUT.chartHeight + 11 + 12;

  if (containerWidth === 0 || sorted.length < 2) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          height: `${height}px`,
          backgroundColor: colors.neutral[700],
          borderRadius: '12px',
          width: '100%',
          ...customStyle,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: `${height}px`,
        backgroundColor: colors.neutral[700],
        borderRadius: '12px',
        width: '100%',
        overflow: 'hidden',
        userSelect: 'none',
        ...customStyle,
      }}
    >
      {/* ── 1. Header (고정) ── */}
      <div
        style={{
          padding: '16px 20px 0',
        }}
      >
        <div
          style={{
            ...typography.body.body7,
            color: '#94A3B8',
            marginBottom: '4px',
          }}
        >
          {headerLabel}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ ...typography.title['h4-1'], color: colors.text.main }}>
            {peak.ageLabel}
          </span>
          <div
            style={{
              width: '1px',
              height: '18px',
              backgroundColor: 'rgba(217, 217, 217, 0.3)',
              margin: '0 6px',
            }}
          />
          <span style={{ ...typography.title['h4-1'], color: colors.text.main }}>
            {peak.amountLabel}
          </span>
        </div>
      </div>

      {/* ── 2. 이벤트 아이콘 영역 (49px, 헤더+24px gap 아래) ── */}
      {events.map((event, i) => {
        const evPx = xToPixel(event.x, minX, maxX, chartWidth);

        return (
          <div
            key={`event-${i}`}
            style={{
              position: 'absolute',
              left: `${evPx}px`,
              top: `${EVENT_TOP}px`,
              transform: 'translateX(-50%)',
              height: `${LAYOUT.eventBubbleHeight}px`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: '#2E3341',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={event.iconSrc}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <path
                  d="M4.58 4.83C5.18 5.58 6.82 5.58 7.42 4.83L12 0H0L4.58 4.83Z"
                  fill="#2E3341"
                />
              </svg>
            </div>
          </div>
        );
      })}

      {/* ── 3. SVG: 그래프 곡선 + dot + X축 레이블 ── */}
      <svg
        width={containerWidth}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* 그래프 영역 클리핑 */}
        <defs>
          <clipPath id="chart-clip">
            <rect
              x={0}
              y={CHART_TOP}
              width={containerWidth}
              height={LAYOUT.chartHeight}
            />
          </clipPath>
        </defs>

        {/* 곡선 + dot (차트 영역 내 클리핑) */}
        <g clipPath="url(#chart-clip)">
          <path
            d={linePath}
            stroke={colors.violet[400]}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {svgPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={2.5}
              fill={colors.violet[400]}
            />
          ))}
        </g>

        {/* X축 레이블 */}
        {xAxisLabels.map((label) => {
          const px = xToPixel(label, minX, maxX, chartWidth);
          const isNearestToPeak = label === peakNearestLabel;
          return (
            <text
              key={label}
              x={px}
              y={xAxisY}
              textAnchor="middle"
              fill={isNearestToPeak ? colors.violet[400] : '#94A3B8'}
              fontSize="12"
              fontWeight={500}
              fontFamily="Wanted Sans"
            >
              {xAxisLabelFormat(label)}
            </text>
          );
        })}
      </svg>

      {/* ── 4. Peak 수직선 (드래그 가능) ── */}
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          position: 'absolute',
          left: `${peakPixelX}px`,
          top: `${Math.max(CHART_TOP, Math.min(CHART_TOP + LAYOUT.chartHeight - 4, peakPixelY)) - 50 + 36}px`,
          transform: 'translateX(-50%)',
          width: '20px',
          height: `${CHART_TOP + LAYOUT.chartHeight - (Math.max(CHART_TOP, Math.min(CHART_TOP + LAYOUT.chartHeight - 4, peakPixelY)) - 50 + 36)}px`,
          cursor: 'grab',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            width: '0.5px',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        />
      </div>

      {/* Peak 말풍선 (드래그 가능) ── */}
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          position: 'absolute',
          left: `${peakPixelX}px`,
          top: `${Math.max(CHART_TOP, Math.min(CHART_TOP + LAYOUT.chartHeight - 4, peakPixelY)) - 50}px`,
          transform: 'translateX(-50%)',
          height: '36px',
          padding: '0 12px',
          borderRadius: '8px',
          backgroundColor: '#212B3C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          cursor: 'grab',
          touchAction: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            ...typography.title.h7,
            color: colors.violet[400],
          }}
        >
          {peakTooltipFormat(snappedPeak.value)}
        </span>
      </div>
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          position: 'absolute',
          left: `${peakPixelX}px`,
          top: `${Math.max(CHART_TOP + 4, Math.min(CHART_TOP + LAYOUT.chartHeight - 4, peakPixelY))}px`,
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          cursor: 'grab',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#0F1114',
            border: '2px solid #FFFFFF',
          }}
        />
      </div>
    </div>
  );
};
