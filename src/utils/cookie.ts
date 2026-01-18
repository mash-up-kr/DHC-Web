export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue || null;
    }
  }

  return null;
};

export const getShareToken = (): string | null => {
  return getCookie('shareToken');
};
