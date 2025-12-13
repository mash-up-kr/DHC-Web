export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dhc.dhcandroid';
export const APP_STORE_URL = 'https://apps.apple.com/kr/app/flifn-%ED%94%8C%EB%A6%AC%ED%95%80/id6744862480';

export const getStoreUrl = (): string => {
  if (typeof window === 'undefined') return PLAY_STORE_URL;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  return isIOS ? APP_STORE_URL : PLAY_STORE_URL;
};

export const openStore = (): void => {
  window.open(getStoreUrl(), '_blank');
};
