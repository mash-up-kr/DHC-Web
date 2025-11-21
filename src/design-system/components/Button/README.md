# CTA Button Component

Call-to-Action 버튼 컴포넌트입니다.

## 사용 방법

```tsx
import { CTAButton } from '@/design-system';

// 기본 사용 (Primary, Active, LG)
<CTAButton onClick={() => console.log('clicked')}>
  클릭하세요
</CTAButton>

// 버튼 타입
<CTAButton buttonType="primary">Primary</CTAButton>
<CTAButton buttonType="secondary">Secondary</CTAButton>
<CTAButton buttonType="tertiary">Tertiary</CTAButton>

// 버튼 크기
<CTAButton size="xl">Extra Large</CTAButton>
<CTAButton size="lg">Large</CTAButton>

// 버튼 상태
<CTAButton status="active">Active</CTAButton>
<CTAButton status="disabled">Disabled</CTAButton>

// 조합 예시
<CTAButton buttonType="primary" size="xl" status="active">
  시작하기
</CTAButton>

<CTAButton buttonType="secondary" size="lg" status="disabled">
  비활성화됨
</CTAButton>

// 전체 너비
<CTAButton fullWidth>전체 너비 버튼</CTAButton>

// 폼 제출
<CTAButton type="submit">제출</CTAButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | 버튼 텍스트 또는 컨텐츠 |
| buttonType | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | 버튼 타입 |
| status | 'active' \| 'disabled' | 'active' | 버튼 상태 |
| size | 'xl' \| 'lg' | 'lg' | 버튼 크기 |
| fullWidth | boolean | false | 전체 너비 사용 여부 |
| onClick | () => void | - | 클릭 이벤트 핸들러 |
| className | string | '' | 추가 CSS 클래스 |
| type | 'button' \| 'submit' \| 'reset' | 'button' | HTML 버튼 타입 |

## 버튼 타입별 스타일

### Primary
- **Active**: Violet 배경, 흰색 텍스트
- **Disabled**: Gray 배경, 회색 텍스트

### Secondary
- **Active**: 투명 배경, Violet 테두리, Violet 텍스트
- **Disabled**: 투명 배경, Gray 테두리, 회색 텍스트

### Tertiary
- **Active**: Gray 배경, 어두운 텍스트
- **Disabled**: Gray 배경, 회색 텍스트

## TODO

- [ ] 디자인 시스템 색상 토큰 적용
- [ ] 디자인 시스템 타이포그래피 적용
- [ ] 디자인 시스템 그라데이션 적용 (Primary 버튼)
- [ ] 호버/액티브 상태 애니메이션
- [ ] 로딩 상태 추가
- [ ] 아이콘 지원
