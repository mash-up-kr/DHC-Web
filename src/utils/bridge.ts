interface DHCJavascriptInterface {
  close: () => void;
  showToast: (message: string) => void;
  goToMain: () => void;
}

interface WebkitMessageHandler {
  postMessage: (message: unknown) => void;
}

interface Webkit {
  messageHandlers: {
    close?: WebkitMessageHandler;
    showToast?: WebkitMessageHandler;
    goToMain?: WebkitMessageHandler;
  };
}

declare global {
  interface Window {
    DHCJavascriptInterface?: DHCJavascriptInterface;
    webkit?: Webkit;
  }
}

export const close = (): void => {
  if (typeof window === 'undefined') return;

  if (window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.close();
  } else if (window.webkit?.messageHandlers?.close) {
    window.webkit.messageHandlers.close.postMessage(null);
  }
};

export const showToast = (message: string): void => {
  if (typeof window === 'undefined') return;

  if (window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.showToast(message);
  } else if (window.webkit?.messageHandlers?.showToast) {
    window.webkit.messageHandlers.showToast.postMessage(message);
  }
};

export const goToMain = (): void => {
  if (typeof window === 'undefined') return;

  if (window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.goToMain();
  } else if (window.webkit?.messageHandlers?.goToMain) {
    window.webkit.messageHandlers.goToMain.postMessage(null);
  }
};
