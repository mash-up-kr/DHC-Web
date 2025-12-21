interface DHCJavascriptInterface {
  showToast: (message: string) => void;
}

declare global {
  interface Window {
    DHCJavascriptInterface?: DHCJavascriptInterface;
  }
}

export const showToast = (message: string): void => {
  if (typeof window !== 'undefined' && window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.showToast(message);
  }
};
