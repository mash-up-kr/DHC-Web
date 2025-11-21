/**
 * Color System
 * 디자인 시스템의 색상 정의
 *
 * @TODO 임시 코드 - 수정 예정
 */

export const colors = {
  // Primary Colors
  primary: {
    50: '#fef2f4',
    100: '#fde6e9',
    200: '#fccfd8',
    300: '#faa8b7',
    400: '#f6778f',
    500: '#ec4899', // main pink
    600: '#db2777',
    700: '#be185d',
    800: '#9f1853',
    900: '#881a4d',
  },

  // Grayscale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Background
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },

  // Text
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
  },
} as const;

export type Colors = typeof colors;
