import { isNativeApp } from './device';

export const getRootUrl = (): string => {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
};

export const shareUrl = async (url?: string): Promise<{ success: boolean; method: 'share' | 'clipboard' }> => {
  const shareUrlValue = url || getRootUrl();

  // Native App에서만 Web Share API 사용
  if (isNativeApp() && navigator.share) {
    try {
      await navigator.share({
        title: '플리핀 - 그사람과의 궁합 테스트',
        text: '나와 그사람의 궁합을 확인해보세요!',
        url: shareUrlValue,
      });
      return { success: true, method: 'share' };
    } catch (error) {
      // 사용자가 공유를 취소한 경우
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'share' };
      }
      // 다른 오류 발생 시 클립보드로 폴백
    }
  }

  // Web Share API 미지원 시 클립보드에 복사
  try {
    await navigator.clipboard.writeText(shareUrlValue);
    return { success: true, method: 'clipboard' };
  } catch {
    // 클립보드 API도 실패한 경우 (구형 브라우저)
    const textArea = document.createElement('textarea');
    textArea.value = shareUrlValue;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return { success: true, method: 'clipboard' };
  }
};
