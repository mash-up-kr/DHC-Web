import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseScratchCanvasOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  size: number;
  maskColor: string;
  /** 마스크 이미지 URL (maskColor보다 우선) */
  maskImageUrl?: string;
  brushSize: number;
  completionThreshold: number;
  onComplete: () => void;
  /** 스크래치 시작 시 콜백 */
  onScratchStart?: () => void;
  onProgressChange?: (progress: number) => void;
  /** 마운트 후 입력을 무시할 시간 (ms) */
  initialDelay?: number;
}

export function useScratchCanvas({
  canvasRef,
  size,
  maskColor,
  maskImageUrl,
  brushSize,
  completionThreshold,
  onComplete,
  onScratchStart,
  onProgressChange,
  initialDelay = 150,
}: UseScratchCanvasOptions) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const hasCompleted = useRef(false);
  const hasStarted = useRef(false);
  const rafId = useRef<number | undefined>(undefined);
  const currentProgress = useRef(0);

  // 마운트 후 초기 딜레이 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Canvas 초기화 (원형 마스크 그리기)
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina 디스플레이 대응
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // 마스크 이미지가 있으면 이미지로, 없으면 색상으로 마스크 그리기
    if (maskImageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, size, size);
      };
      img.src = maskImageUrl;
    } else {
      // 원형 마스크 그리기 (색상)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = maskColor;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 진행률 초기화
    setProgress(0);
    currentProgress.current = 0;
    onProgressChange?.(0);
  }, [canvasRef, size, maskColor, maskImageUrl, onProgressChange]);

  // 초기 Canvas 설정
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // 진행률 계산
  const calculateProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const imageData = ctx.getImageData(0, 0, size * dpr, size * dpr);
    const pixels = imageData.data;

    let erasedAmount = 0;
    let total = 0;
    const centerX = (size * dpr) / 2;
    const centerY = (size * dpr) / 2;
    const radius = (size * dpr) / 2;

    // 샘플링으로 성능 최적화 (4픽셀마다 체크)
    const step = 4;
    for (let y = 0; y < size * dpr; y += step) {
      for (let x = 0; x < size * dpr; x += step) {
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
        );

        if (distFromCenter <= radius) {
          total++;
          const index = (y * size * dpr + x) * 4;
          const alpha = pixels[index + 3];
          // 그라데이션 고려: alpha 값 비율로 지워진 정도 계산 (255: 안 지워짐, 0: 완전히 지워짐)
          erasedAmount += (255 - alpha) / 255;
        }
      }
    }

    const newProgress = total > 0 ? erasedAmount / total : 0;
    setProgress(newProgress);
    currentProgress.current = newProgress;
    onProgressChange?.(newProgress);
  }, [canvasRef, size, onProgressChange]);

  // 스크래치 함수
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // 원형 영역 내부인지 확인
      const centerX = size / 2;
      const centerY = size / 2;
      const distFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
      );

      if (distFromCenter > size / 2) return;

      // 스크래치 효과 (중심에서 가장자리로 갈수록 투명해지는 그라데이션)
      ctx.globalCompositeOperation = 'destination-out';

      // Radial gradient: 중심(완전히 지움) -> 가장자리(안 지움)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');   // 중심: 완전히 투명하게 지움
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // 가장자리: 안 지움

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // 진행률 계산 (throttle with RAF)
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          calculateProgress();
          rafId.current = undefined;
        });
      }
    },
    [canvasRef, size, brushSize, calculateProgress],
  );

  // 스크래치 종료 시 체크 및 완료 처리
  const handleScratchEnd = useCallback(() => {
    setIsDrawing(false);

    if (hasCompleted.current) return;

    // threshold 이상이면 완료 처리
    if (currentProgress.current >= completionThreshold) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [completionThreshold, onComplete]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isReady) return;
      if (!hasStarted.current) {
        hasStarted.current = true;
        onScratchStart?.();
      }
      setIsDrawing(true);
      scratch(e.clientX, e.clientY);
    },
    [scratch, isReady, onScratchStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      scratch(e.clientX, e.clientY);
    },
    [isDrawing, scratch],
  );

  const handleMouseUp = useCallback(() => {
    handleScratchEnd();
  }, [handleScratchEnd]);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isReady) return;
      if (!hasStarted.current) {
        hasStarted.current = true;
        onScratchStart?.();
      }
      setIsDrawing(true);
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    },
    [scratch, isReady, onScratchStart],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing) return;
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    },
    [isDrawing, scratch],
  );

  const handleTouchEnd = useCallback(() => {
    handleScratchEnd();
  }, [handleScratchEnd]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    isDrawing,
    progress,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
