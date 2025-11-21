/**
 * Design System Utilities
 * 디자인 시스템 관련 유틸리티 함수들
 *
 * @TODO 임시 코드 - 수정 예정
 */

/**
 * 클래스명을 조건부로 결합하는 유틸리티
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * CSS 변수 생성 헬퍼
 */
export function cssVar(name: string): string {
  return `var(--${name})`;
}
