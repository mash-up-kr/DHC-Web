/**
 * 날짜 입력값 유효성 검사 및 포맷팅 유틸리티
 */

/**
 * 년도 유효성 검사 (1900~2025)
 */
export const validateYear = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
  if (numericValue.length === 4) {
    const yearNum = parseInt(numericValue, 10);
    if (yearNum < 1900) return '1900';
    if (yearNum > 2025) return '2025';
  }
  return numericValue;
};

/**
 * 월 유효성 검사 (1~12)
 */
export const validateMonth = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '').slice(0, 2);
  const monthNum = parseInt(numericValue, 10);
  if (monthNum > 12) return '12';
  return numericValue;
};

/**
 * 일 유효성 검사 (1~31)
 */
export const validateDay = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '').slice(0, 2);
  const dayNum = parseInt(numericValue, 10);
  if (dayNum > 31) return '31';
  return numericValue;
};

/**
 * 날짜 필드 onChange 핸들러에서 사용할 수 있는 유틸리티
 */
export const validateDateField = (
  key: string,
  value: string,
): { key: string; value: string } => {
  switch (key) {
    case 'year':
      return { key, value: validateYear(value) };
    case 'month':
      return { key, value: validateMonth(value) };
    case 'day':
      return { key, value: validateDay(value) };
    default:
      return { key, value };
  }
};

/**
 * 시간 입력값 포맷팅 및 유효성 검사
 * - 자동 콜론 삽입 (예: "1234" -> "12:34")
 * - 시: 0~23, 분: 0~59 범위 제한
 */
export const formatBirthTime = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);

  if (numericValue.length <= 2) {
    // 시간 부분만 입력된 경우
    const hour = parseInt(numericValue, 10);
    if (numericValue.length === 2 && hour > 23) {
      return '23';
    }
    return numericValue;
  }

  // 시간과 분 모두 입력된 경우
  let hours = numericValue.slice(0, 2);
  let minutes = numericValue.slice(2);

  const hourNum = parseInt(hours, 10);
  if (hourNum > 23) hours = '23';

  const minuteNum = parseInt(minutes, 10);
  if (minutes.length === 2 && minuteNum > 59) minutes = '59';

  return `${hours}:${minutes}`;
};
