interface DHCJavascriptInterface {
  close: () => void;
}

declare global {
  interface Window {
    DHCJavascriptInterface?: DHCJavascriptInterface;
  }
}

export const close = (): void => {
  if (typeof window !== 'undefined' && window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.close();
  }
};
