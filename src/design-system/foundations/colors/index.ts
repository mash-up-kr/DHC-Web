/**
 * Color System
 * 디자인 시스템의 색상 정의
 */

export const colors = {
  // Neutral Colors
  neutral: {
    30: '#F4F4F5',
    50: '#E6EDF8',
    100: '#D7E1EE',
    200: '#A5B2C5',
    300: '#7B8696',
    400: '#5D6470',
    500: '#3D424B',
    600: '#2A2F38',
    700: '#1F2127',
    800: '#17191F',
    900: '#0F1114',
  },

  // Violet Colors
  violet: {
    50: '#E6E8FF',
    100: '#CDD1F2',
    200: '#B5BAEB',
    300: '#939BE2',
    400: '#5E69D4',
    500: '#5660C1',
    600: '#414BAE',
    700: '#343FA6',
  },

  // Background Colors
  background: {
    glassEffect: 'rgba(123, 134, 150, 0.15)', // neutral-300 with 15% opacity
    badgePrimary: 'rgba(94, 105, 212, 0.2)', // violet-400 with 20% opacity
    main: '#0F1114', // neutral-900
  },

  // Semantic Colors - Text
  text: {
    main: '#F4F4F5', // neutral-30
    bodyPrimary: '#D7E1EE', // neutral-100
    highlightsPrimary: '#5E69D4', // violet-400
    highlightsSecondary: '#B5BAEB', // violet-200
  },
} as const;

/**
 * Gradient Colors
 * 그라데이션 색상 정의
 */
export const gradients = {
  /**
   * Text Gradient 01
   * - Type: Linear
   * - Angle: 90deg
   * - Colors: #B5BAEB → #F4F4F5
   * - Stops: 16%, 83%
   */
  textGradient01: 'linear-gradient(90deg, #B5BAEB 16%, #F4F4F5 83%)',

  /**
   * Text Gradient 02
   * - Type: Linear
   * - Angle: 90deg
   * - Colors: #B5BAEB → #F4F4F5
   * - Stops: 16%, 100%
   */
  textGradient02: 'linear-gradient(90deg, #B5BAEB 16%, #F4F4F5 100%)',

  /**
   * Background Gradient 01
   * - Type: Radial
   * - Center: 50%, 59%
   * - Color: #5E69D4 (violet-400)
   * - Opacity: 100% → 30% → 10% → 5% → 0%
   * - Stops: 23%, 51%, 75%, 88%, 100%
   */
  backgroundGradient01: 'radial-gradient(circle at 50% 59%, rgba(94, 105, 212, 1) 23%, rgba(94, 105, 212, 0.3) 51%, rgba(94, 105, 212, 0.1) 75%, rgba(94, 105, 212, 0.05) 88%, rgba(94, 105, 212, 0) 100%)',

  /**
   * Background Gradient 02
   * - Type: Radial
   * - Center: 72%, 0%
   * - Color: #5E69D4 (violet-400)
   * - Opacity: 50% → 34% → 8% → 0%
   * - Stops: 0%, 15%, 40%, 67%
   */
  backgroundGradient02: 'radial-gradient(circle at 72% 0%, rgba(94, 105, 212, 0.5) 0%, rgba(94, 105, 212, 0.34) 15%, rgba(94, 105, 212, 0.08) 40%, rgba(94, 105, 212, 0) 67%)',

  /**
   * Tooltip Gradient 01
   * - Type: Linear
   * - Angle: 180deg
   * - Colors: #F4F4F5 → #B5BAEB
   * - Stops: 43%, 100%
   */
  tooltipGradient01: 'linear-gradient(180deg, #F4F4F5 43%, #B5BAEB 100%)',

  /**
   * Fortune Gradient Low
   * - Type: Linear
   * - Angle: 180deg
   * - Colors: #EEEBD8 → #6F6F6F
   * - Stops: 36%, 83%
   */
  fortuneGradientLow: 'linear-gradient(180deg, #EEEBD8 36%, #6F6F6F 83%)',

  /**
   * Fortune Gradient Mid
   * - Type: Linear
   * - Angle: 180deg
   * - Colors: #F4F4F5 (neutral-30) → #5660C1 (violet-500)
   * - Stops: 36%, 84%
   */
  fortuneGradientMid: 'linear-gradient(180deg, #F4F4F5 36%, #5660C1 84%)',

  /**
   * Fortune Gradient Top
   * - Type: Linear
   * - Angle: 180deg
   * - Colors: #E9FBFF → #5194FF
   * - Stops: 40%, 82%
   */
  fortuneGradientTop: 'linear-gradient(180deg, #E9FBFF 40%, #5194FF 82%)',

  /**
   * Card Border Gradient 01
   * - Type: Linear
   * - Angle: 121deg
   * - Colors: #D7E1EE (neutral-100) → #414BAE (violet-600) → #3D424B (neutral-500)
   * - Opacity: 30% → 30% → 100%
   * - Stops: 0%, 89%, 100%
   */
  cardBorderGradient01: 'linear-gradient(121deg, rgba(215, 225, 238, 0.3) 0%, rgba(65, 75, 174, 0.3) 89%, #3D424B 100%)',

  /**
   * Card Bottom Gradient 01
   * - Type: Radial
   * - Center: 50%, 50%
   * - Color: #343B8C
   * - Opacity: 100% → 50% → 0%
   * - Stops: 0%, 50%, 100%
   */
  cardBottomGradient01: 'radial-gradient(circle at 50% 50%, rgba(52, 59, 140, 1) 0%, rgba(52, 59, 140, 0.5) 50%, rgba(52, 59, 140, 0) 100%)',

  /**
   * Button Border Gradient 01
   * - Type: Linear
   * - Angle: 96deg
   * - Colors: #5E69D4 (violet-400) → #5E69D4 (violet-400) → #939BE2 (violet-300)
   * - Stops: 0%, 83%, 100%
   */
  buttonBorderGradient01: 'linear-gradient(96deg, #5E69D4 0%, #5E69D4 83%, #939BE2 100%)',

  /**
   * Button Surface Gradient 01
   * - Type: Radial
   * - Center: 50%, 95%
   * - Color: #939BE2 (violet-300)
   * - Opacity: 100% → 0%
   * - Stops: 30%, 100%
   */
  buttonSurfaceGradient01: 'radial-gradient(circle at 50% 95%, rgba(147, 155, 226, 1) 30%, rgba(147, 155, 226, 0) 100%)',
} as const;

export type Colors = typeof colors;
export type Gradients = typeof gradients;
