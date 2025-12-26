"use client";

interface RivalIconProps {
  iconImage: string;
  name: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

function RivalIcon({ iconImage, name, top, bottom, left, right }: RivalIconProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px',
        border: '1px solid #FFFFFF',
      }}
    >
      <img
        src={iconImage}
        alt={name}
        style={{
          width: '32px',
          height: '32px',
        }}
      />
      <span
        style={{
          fontFamily: 'Wanted Sans',
          fontWeight: 700,
          fontSize: '13px',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {name}
      </span>
    </div>
  );
}

interface CenterIconProps {
  iconImage: string;
  name: string;
  padding: string;
}

export interface DangerZoneGraphicProps {
  centerIcon: CenterIconProps;
  rivals: RivalIconProps[];
}

export function DangerZoneGraphic({
  centerIcon,
  rivals,
}: DangerZoneGraphicProps) {

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <img
        src="/icons/danger-zone-graphic.png"
        alt="위험요소 그래픽"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '20px',
        }}
      />
      {/* 중앙 아이콘 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          padding: centerIcon.padding,
          border: '1px solid #FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <img
          src={centerIcon.iconImage}
          alt={centerIcon.name}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '26px',
          }}
        />
        <span
          style={{
            fontFamily: 'Wanted Sans',
            fontWeight: 700,
            fontSize: '13px',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          {centerIcon.name}
        </span>
      </div>

      {/* 라이벌 아이콘들 */}
      {rivals.map((rival, index) => (
        <RivalIcon key={index} {...rival} />
      ))}
    </div>
  );
}
