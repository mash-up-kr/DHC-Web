"use client";

export function DangerZoneGraphic() {
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
      {/* 중앙 남자 짝사랑 아이콘 */}
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
          padding: '20px',
          border: '1px solid #FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <img
          src="/icons/icon-male-crush.png"
          alt="남자 짝사랑"
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
          남자 짝사랑
        </span>
      </div>

      {/* 라이벌 아이콘 - 이** */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          border: '1px solid #FFFFFF',
        }}
      >
        <img
          src="/icons/icon-rival-1.png"
          alt="이**"
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
          이**
        </span>
      </div>

      {/* 라이벌 아이콘 - 김** */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          border: '1px solid #FFFFFF',
        }}
      >
        <img
          src="/icons/icon-rival-2.png"
          alt="김**"
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
          김**
        </span>
      </div>

      {/* 라이벌 아이콘 - 최** */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          border: '1px solid #FFFFFF',
        }}
      >
        <img
          src="/icons/icon-rival-3.png"
          alt="최**"
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
          최**
        </span>
      </div>

      {/* 라이벌 아이콘 - 김** (2) */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
          border: '1px solid #FFFFFF',
        }}
      >
        <img
          src="/icons/icon-rival-4.png"
          alt="김**"
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
          김**
        </span>
      </div>
    </div>
  );
}
