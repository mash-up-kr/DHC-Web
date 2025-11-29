# Header Component

페이지 상단에 표시되는 헤더 컴포넌트입니다. 두 가지 타입(title, progressbar)을 지원합니다.

## 사용 방법

```tsx
import { Header } from '@/design-system';

// Title 타입 - 제목이 중앙에 표시됨
<Header
  type="title"
  title="테스트 제목"
  currentPage={1}
  totalPage={5}
  onBackClick={() => router.back()}
/>

// ProgressBar 타입 - 진행도 바가 표시됨
<Header
  type="progressbar"
  progress={60}
  currentPage={3}
  totalPage={5}
  onBackClick={() => router.back()}
/>

// 커스텀 클래스 추가
<Header
  type="title"
  title="설정"
  currentPage={1}
  totalPage={1}
  className="custom-header"
/>

// 뒤로가기 핸들러 커스터마이징
<Header
  type="progressbar"
  progress={80}
  currentPage={4}
  totalPage={5}
  onBackClick={() => {
    console.log('Going back...');
    router.push('/home');
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'title' \| 'progressbar' | - | 헤더 타입 (필수) |
| currentPage | number | - | 현재 페이지 번호 (필수) |
| totalPage | number | - | 전체 페이지 수 (필수) |
| title | string | - | 헤더 제목 (type이 'title'일 때 사용) |
| progress | number | 0 | 진행도 0-100 (type이 'progressbar'일 때 사용) |
| onBackClick | () => void | - | 뒤로가기 버튼 클릭 핸들러 |
| className | string | '' | 추가 CSS 클래스 |

## 헤더 타입

### Title 타입
```
┌─────────────────────────────────────┐
│ [←]        제목         1/5         │
└─────────────────────────────────────┘
```
- 뒤로가기 버튼 (왼쪽)
- 제목 (중앙 정렬)
- 페이지 정보 (오른쪽)

**구성:**
- 뒤로가기 버튼: `assets/design-system/icon-back.svg`
- 제목: typography.body.body2, colors.text.main
- 페이지 정보:
  - 현재 페이지: typography.title.h5, colors.text.main
  - '/' 구분자: typography.body.body3, colors.text.main (20% alpha)
  - 전체 페이지: typography.body.body3, colors.text.main (20% alpha)

### ProgressBar 타입
```
┌─────────────────────────────────────┐
│ [←]                        3/5      │
│ ████████████░░░░░░░░░░░░░░         │
└─────────────────────────────────────┘
```
- **첫 번째 줄**: 뒤로가기 버튼 (왼쪽) + 페이지 정보 (오른쪽)
- **두 번째 줄**: 진행도 바 (전체 너비)

**구성:**
- 뒤로가기 버튼: `assets/design-system/icon-back.svg` (왼쪽)
- 페이지 정보 (오른쪽):
  - 현재 페이지: typography.title.h5, colors.text.main
  - '/' 구분자: typography.body.body3, colors.text.main (20% alpha)
  - 전체 페이지: typography.body.body3, colors.text.main (20% alpha)
- 진행도 바: ProgressBar 컴포넌트 사용 (진행도 0-100%)

## 레이아웃

- **전체 너비**: 100%
- **패딩**: 16px 20px
- **요소 간격**: 12px
- **뒤로가기 이미지 크기**: 24x24px

## 디자인 시스템 토큰

### Typography
- 헤더 제목 (title 타입): `typography.body.body2`
- 현재 페이지 번호: `typography.title.h5`
- 페이지 구분자('/') 및 전체 페이지: `typography.body.body3`

### Colors
- 헤더 제목: `colors.text.main`
- 현재 페이지 번호: `colors.text.main`
- 페이지 구분자('/') 및 전체 페이지: `colors.text.main` (20% alpha)

### Components
- 진행도 바: `ProgressBar` 컴포넌트

## Assets

### 필수 이미지
- **경로**: `/public/assets/design-system/icon-back.svg`
- **용도**: 뒤로가기 버튼
- **크기**: 24x24px (SVG)

## 사용 사례

### 1. 설문조사/테스트
```tsx
// 제목이 있는 질문 페이지
<Header
  type="title"
  title="질문 1"
  currentPage={1}
  totalPage={10}
/>
```

### 2. 단계별 진행
```tsx
// 진행도를 시각적으로 표시
<Header
  type="progressbar"
  progress={30}
  currentPage={3}
  totalPage={10}
/>
```

### 3. 단일 페이지
```tsx
// 전체 페이지가 1개인 경우
<Header
  type="title"
  title="설정"
  currentPage={1}
  totalPage={1}
/>
```

## TODO

- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 애니메이션 효과 (페이지 전환 시)
