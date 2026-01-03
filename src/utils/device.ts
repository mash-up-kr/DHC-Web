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
