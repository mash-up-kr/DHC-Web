/**
 * Typography System
 * 폰트 및 타이포그래피 정의
 */

/**
 * Typography Styles
 * 각 스타일은 fontFamily, fontSize, lineHeight, fontWeight, letterSpacing으로 구성
 */
export const typography = {
  // Title Styles
  title: {
    h0: {
      fontFamily: 'Wanted Sans',
      fontSize: '32px',
      lineHeight: '44px',
      fontWeight: 700,
      letterSpacing: '-0.4px',
    },
    h1: {
      fontFamily: 'Wanted Sans',
      fontSize: '28px',
      lineHeight: '38px',
      fontWeight: 700,
      letterSpacing: '-0.4px',
    },
    h2: {
      fontFamily: 'Wanted Sans',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 700,
      letterSpacing: '-0.2px',
    },
    'h2-1': {
      fontFamily: 'Wanted Sans',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
      letterSpacing: '-0.2px',
    },
    h3: {
      fontFamily: 'Wanted Sans',
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
      letterSpacing: '-0.2px',
    },
    h4: {
      fontFamily: 'Wanted Sans',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 700,
      letterSpacing: '-0.1px',
    },
    'h4-1': {
      fontFamily: 'Wanted Sans',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600,
      letterSpacing: '-0.1px',
    },
    h5: {
      fontFamily: 'Wanted Sans',
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 700,
      letterSpacing: '-0.1px',
    },
    'h5-1': {
      fontFamily: 'Wanted Sans',
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
      letterSpacing: '-0.1px',
    },
    h6: {
      fontFamily: 'Wanted Sans',
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 700,
      letterSpacing: '0px',
    },
    h7: {
      fontFamily: 'Wanted Sans',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 700,
      letterSpacing: '0px',
    },
    h8: {
      fontFamily: 'Wanted Sans',
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: 600,
      letterSpacing: '0px',
    },
  },

  // Body Styles
  body: {
    body0: {
      fontFamily: 'Wanted Sans',
      fontSize: '28px',
      lineHeight: '40px',
      fontWeight: 500,
      letterSpacing: '-0.2px',
    },
    body1: {
      fontFamily: 'Wanted Sans',
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
      letterSpacing: '-0.2px',
    },
    body2: {
      fontFamily: 'Wanted Sans',
      fontSize: '18px',
      lineHeight: '26px',
      fontWeight: 500,
      letterSpacing: '-0.2px',
    },
    body3: {
      fontFamily: 'Wanted Sans',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: '-0.1px',
    },
    body4: {
      fontFamily: 'Wanted Sans',
      fontSize: '15px',
      lineHeight: '22px',
      fontWeight: 500,
      letterSpacing: '0px',
    },
    body5: {
      fontFamily: 'Wanted Sans',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0px',
    },
    body6: {
      fontFamily: 'Wanted Sans',
      fontSize: '13px',
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    body7: {
      fontFamily: 'Wanted Sans',
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
  },
} as const;

export type Typography = typeof typography;
export type TitleStyle = keyof typeof typography.title;
export type BodyStyle = keyof typeof typography.body;
