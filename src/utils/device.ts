/**
 * Native App WebView에서 접속했는지 확인
 * Android/iOS Native App에서 WebView User Agent에 "DHCApp" 문자열을 추가해야 함
 *
 * Android: webView.settings.userAgentString += " DHCApp"
 * iOS: webView.customUserAgent = "\(originalUA) DHCApp"
 */
export const isNativeApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.includes('DHCApp');
};

/**
 * 모바일 기기에서 접속했는지 확인
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

/**
 * 플랫폼 타입 반환
 * - Native App이 아니면 "Web"
 * - Native App이면 Android/iOS 구분
 */
export type PlatformType = "Web" | "Android" | "iOS";

export const getPlatform = (): PlatformType => {
  if (typeof window === 'undefined') return "Web";

  if (!isNativeApp()) return "Web";

  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";

  return "Web";
};

/**
 * userAgent 문자열 반환
 */
export const getUserAgent = (): string => {
  if (typeof window === 'undefined') return "";
  return navigator.userAgent;
};
