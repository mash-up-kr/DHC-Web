/**
 * Icon Types
 * 아이콘 관련 타입 정의
 *
 * @TODO 임시 코드 - 수정 예정
 */

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export type IconComponent = React.FC<IconProps>;
