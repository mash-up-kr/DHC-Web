export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();

  // 기본 모바일 디바이스 패턴
  const mobilePattern = /iphone|ipad|ipod|android|blackberry|windows phone|opera mini|iemobile|mobile|webos/;

  // userAgent로 모바일 감지
  if (mobilePattern.test(userAgent)) {
    return true;
  }

  // iPadOS 13+ 감지 (macintosh로 표시되지만 터치 지원)
  const isIPadOS = userAgent.includes('macintosh') && navigator.maxTouchPoints > 1;
  if (isIPadOS) {
    return true;
  }

  // 터치 디바이스 + 작은 화면 크기로 모바일 감지
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  if (isTouchDevice && isSmallScreen) {
    return true;
  }

  return false;
};
