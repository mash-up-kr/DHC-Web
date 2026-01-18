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
    DHCJavascriptInterface?: WebkitMessageHandler;
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
  } else if (window.webkit?.messageHandlers?.DHCJavascriptInterface) {
    window.webkit.messageHandlers.DHCJavascriptInterface.postMessage({ name: 'close' });
  }
};

export const showToast = (message: string): void => {
  if (typeof window === 'undefined') return;

  if (window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.showToast(message);
  } else if (window.webkit?.messageHandlers?.DHCJavascriptInterface) {
    window.webkit.messageHandlers.DHCJavascriptInterface.postMessage({ name: 'showToast', message });
  }
};

export const goToMain = (): void => {
  if (typeof window === 'undefined') return;

  if (window.DHCJavascriptInterface) {
    window.DHCJavascriptInterface.goToMain();
  } else if (window.webkit?.messageHandlers?.DHCJavascriptInterface) {
    window.webkit.messageHandlers.DHCJavascriptInterface.postMessage({ name: 'goToMain' });
  }
};

