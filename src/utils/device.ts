export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|android/.test(userAgent);
};
