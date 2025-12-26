interface DHCJavascriptInterface {
  close: () => void;
  showToast: (message: string) => void;
  goToMain: () => void;
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

export const showToast = (message: string): void => {
  if (typeof window !== 'undefined' && window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.showToast(message);
  }
};

export const goToMain = (): void => {
  if (typeof window !== 'undefined' && window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.goToMain();
  }
};
