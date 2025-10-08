# 스터디케어 V3 - Sophisticated Serenity 🎨

**고급스럽고 차분한 프리미엄 스터디케어 관리 시스템 랜딩페이지**

---

## 📋 목차

1. [개요](#개요)
2. [디자인 컨셉](#디자인-컨셉)
3. [색상 시스템](#색상-시스템)
4. [파일 구조](#파일-구조)
5. [주요 기능](#주요-기능)
6. [섹션 구성](#섹션-구성)
7. [사용 방법](#사용-방법)
8. [커스터마이징](#커스터마이징)
9. [브라우저 호환성](#브라우저-호환성)
10. [성능 최적화](#성능-최적화)

---

## 🎯 개요

**Version 3 "Sophisticated Serenity"**는 고급스럽고 차분한 느낌의 프리미엄 디자인으로,
기존의 밝은 블루 계열 디자인과는 완전히 다른 새로운 방향성을 제시합니다.

### 주요 특징
- ✅ **고급스러운 색상**: Deep Navy + Gold + Sage Green
- ✅ **세리프 타이포그래피**: 우아한 Noto Serif KR
- ✅ **넓은 여백**: 6rem (96px) 섹션 패딩
- ✅ **프리미엄 그림자**: 부드러운 0.10-0.20 opacity
- ✅ **골드 그라데이션**: 럭셔리한 CTA 버튼
- ✅ **완벽한 반응형**: Mobile-first 디자인

---

## 🎨 디자인 컨셉

### "Sophisticated Serenity" - 세련된 고요함

**목표**: 전문성과 신뢰감을 동시에 전달하는 프리미엄 교육 플랫폼

**느낌**:
- 🏛️ **고급스러움** - 골드 액센트와 세리프 폰트
- 🌿 **차분함** - 세이지 그린과 매트한 배경
- 💼 **전문성** - 딥 네이비와 체계적인 레이아웃
- ✨ **우아함** - 부드러운 그림자와 넓은 여백

---

## 🎨 색상 시스템

### 삼원색 조합 (3-Color Palette)

#### 1️⃣ Primary: Deep Navy/Slate
```css
--primary-800: #1e293b  /* 메인 텍스트 */
--primary-900: #0f172a  /* 헤더, 강조 */
--primary-700: #334155  /* 보조 텍스트 */
```
**용도**: 신뢰감, 전문성, 깊이감

#### 2️⃣ Accent: Gold/Amber
```css
--accent-600: #ca8a04   /* CTA 버튼 */
--accent-700: #a16207   /* 호버 상태 */
--accent-500: #eab308   /* 밝은 강조 */
```
**용도**: 프리미엄, 럭셔리, 우수성

#### 3️⃣ Success: Sage Green
```css
--success-600: #3d8860  /* 성공, 성장 */
--success-500: #52a378  /* 차분한 강조 */
--success-400: #6dbe90  /* 부드러운 액센트 */
```
**용도**: 성장, 안정, 자연

### 중립 팔레트
```css
--gray-50: #fafaf9   /* 배경 */
--gray-800: #292524  /* 본문 텍스트 */
--gray-600: #57534e  /* 보조 텍스트 */
```

---

## 📁 파일 구조

```
design/other/
├── index-v3-full.html       # 완전판 HTML
├── styles-v3-full.css        # 완전판 CSS
├── script.js                 # JavaScript (공통)
├── README-v3.md              # 이 문서
│
├── index-v3.html             # 간소화 버전 (테스트용)
└── styles-v3.css             # 간소화 CSS (테스트용)
```

### 권장 사용 파일
- **프로덕션**: `index-v3-full.html` + `styles-v3-full.css`
- **테스트/개발**: `index-v3.html` + `styles-v3.css`

---

## ✨ 주요 기능

### 1. 타이포그래피 시스템

#### 제목 (Headings)
- **폰트**: Noto Serif KR (세리프)
- **크기**: Hero 4.25rem → Section 3.25rem
- **무게**: 700 (Bold)
- **Letter spacing**: -0.03em

#### 본문 (Body)
- **폰트**: Pretendard (산세리프)
- **크기**: 1rem (16px)
- **무게**: 400 (Regular)
- **Line height**: 1.75 (넉넉한 가독성)

### 2. 그림자 시스템

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06)
--shadow-md: 0 4px 6px rgba(0,0,0,0.08)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.10)
--shadow-premium: 골드 테두리 + 네이비 그림자
--shadow-gold: 골드 특화 그림자
```

### 3. 버튼 시스템

#### Primary (골드 그라데이션)
```css
background: linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #854d0e 100%);
box-shadow: 골드 특화 그림자;
```

#### Secondary (네이비 아웃라인)
```css
background: white;
color: #1e293b;
border: 2px solid #475569;
```

### 4. 애니메이션

- **Fade In Up**: 섹션 등장 (0.8s ease)
- **Scale In**: 카드 호버 (0.4s cubic-bezier)
- **Slide In**: 타임라인 진입
- **Counter**: 통계 숫자 카운트업

---

## 📐 섹션 구성

### 1. Hero Section
- **배경**: 골드/그린 그라데이션 (매우 연함)
- **구성**:
  - 배지 (Premium Education Management)
  - 제목 (세리프, 4.25rem)
  - 설명 (1.1875rem)
  - CTA 버튼 2개
  - 통계 3개 (150+ 학원, 98% 만족도, 2시간 절감)

### 2. Why Choose Us
- **레이아웃**: 3x2 그리드 (6개 카드)
- **아이콘**: 프리미엄 SVG (골드/네이비/그린)
- **효과**: 호버 시 상승 + 테두리 강조

### 3. How It Works
- **스타일**: 타임라인 (4단계)
- **레이아웃**: 번갈아 나타나는 좌우 배치
- **숫자**: 골드 그라데이션 원형

### 4. Features
- **그리드**: 4x3 (12개 기능)
- **아이콘**: 이모지 (간결함)
- **효과**: 카드 호버 애니메이션

### 5. Pricing
- **플랜**: 3개 (스타터/프로페셔널/엔터프라이즈)
- **Featured**: 프로페셔널 플랜 강조
- **CTA**: 골드 버튼 (Featured), 아웃라인 (기타)

### 6. Reviews
- **개수**: 3개 후기
- **레이아웃**: 1x3 그리드
- **구성**: 별점 + 내용 + 작성자 정보

### 7. FAQ
- **형태**: 아코디언 (5개 질문)
- **인터랙션**: 클릭 시 확장/축소
- **아이콘**: 회전 화살표

### 8. Contact
- **레이아웃**: 2열 (정보 + 폼)
- **폼 필드**: 6개 (학원명, 담당자, 연락처, 이메일, 학생수, 내용)
- **검증**: 실시간 유효성 검사

### 9. Footer
- **구조**: 4열 (브랜드 + 제품 + 지원 + 회사)
- **스타일**: 다크 네이비 배경
- **저작권**: 하단 센터 정렬

---

## 🚀 사용 방법

### 1. 로컬에서 실행

```bash
# 폴더 이동
cd "C:/Users/kangd/OneDrive - 부산광역시교육청/바탕 화면/cursor/design/other"

# 브라우저로 열기
start index-v3-full.html

# 또는 로컬 서버 실행 (Python)
python -m http.server 8000
# 브라우저에서 http://localhost:8000/index-v3-full.html 접속
```

### 2. 배포

1. **파일 업로드**
   - `index-v3-full.html`
   - `styles-v3-full.css`
   - `script.js`

2. **경로 확인**
   ```html
   <link rel="stylesheet" href="styles-v3-full.css">
   <script src="script.js"></script>
   ```

3. **이미지/폰트 최적화**
   - Google Fonts CDN 사용 (자동 로드)
   - SVG 아이콘은 인라인으로 포함됨

---

## 🎨 커스터마이징

### 1. 색상 변경

`styles-v3-full.css` 파일의 `:root` 섹션 수정:

```css
:root {
    /* Primary 색상 변경 */
    --primary-800: #YOUR_COLOR;

    /* Accent 색상 변경 */
    --accent-600: #YOUR_COLOR;

    /* Success 색상 변경 */
    --success-600: #YOUR_COLOR;
}
```

### 2. 폰트 변경

```css
/* 제목 폰트 */
.hero-title, .section-title {
    font-family: 'YOUR_FONT', serif;
}

/* 본문 폰트 */
body {
    font-family: 'YOUR_FONT', sans-serif;
}
```

### 3. 여백 조정

```css
/* 섹션 패딩 */
section {
    padding: 4rem 0;  /* 기본 6rem에서 4rem으로 축소 */
}

/* 컨테이너 너비 */
.container {
    max-width: 1200px;  /* 기본 1280px에서 1200px로 축소 */
}
```

### 4. 버튼 스타일

```css
.btn-primary {
    background: linear-gradient(135deg, #YOUR_START 0%, #YOUR_END 100%);
}
```

---

## 🌐 브라우저 호환성

### 완벽 지원
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### 부분 지원
- ⚠️ IE 11 (CSS Grid/Flexbox 기본 지원, 그라데이션 제한)

### 주요 기술
- CSS Grid
- CSS Flexbox
- CSS Variables
- CSS Gradients
- SVG
- Google Fonts

---

## ⚡ 성능 최적화

### 1. 로딩 속도
- **폰트**: Google Fonts CDN (preconnect 최적화)
- **아이콘**: 인라인 SVG (HTTP 요청 최소화)
- **CSS**: 단일 파일 (병합됨)
- **이미지**: Lazy loading 적용 가능

### 2. 렌더링 성능
- **애니메이션**: GPU 가속 (transform, opacity)
- **그림자**: 최적화된 blur radius
- **폰트**: 시스템 폰트 폴백

### 3. SEO
```html
<meta name="description" content="...">
<title>스터디케어 - 프리미엄 스터디케어 관리 시스템</title>
```

### 4. 접근성
- **시맨틱 HTML**: `<header>`, `<section>`, `<footer>`
- **ARIA 레이블**: 인터랙티브 요소
- **키보드 네비게이션**: Tab/Enter 지원
- **고대비 모드**: 자동 감지

---

## 📊 디자인 메트릭

### 색상 대비
- **텍스트/배경**: WCAG AA 이상
- **버튼/배경**: WCAG AAA

### 타이포그래피
- **최소 크기**: 16px (1rem)
- **라인 높이**: 1.75 (넉넉한 가독성)
- **최대 줄 길이**: 720px

### 여백 시스템
- **섹션 패딩**: 6rem (96px)
- **카드 간격**: 2.5rem (40px)
- **컨테이너 패딩**: 3rem (48px)

---

## 🎯 디자인 원칙

### 1. 고급스러움 (Luxury)
- 골드 액센트
- 세리프 타이포그래피
- 프리미엄 그림자

### 2. 차분함 (Calm)
- 매트한 배경
- 세이지 그린
- 넓은 여백

### 3. 전문성 (Professionalism)
- 딥 네이비
- 체계적인 레이아웃
- 명확한 계층 구조

### 4. 우아함 (Elegance)
- 부드러운 애니메이션
- 세련된 그라데이션
- 균형잡힌 비율

---

## 📝 체크리스트

배포 전 확인사항:

- [ ] 모든 링크 작동 확인
- [ ] 폼 제출 테스트
- [ ] 모바일 반응형 확인
- [ ] 브라우저 크로스체킹
- [ ] 성능 측정 (Lighthouse)
- [ ] SEO 메타태그 확인
- [ ] 연락처 정보 업데이트
- [ ] 가격 정보 검토
- [ ] 이미지 최적화
- [ ] 접근성 테스트

---

## 🤝 기여

개선 사항이나 버그 발견 시 이슈 등록 또는 PR 제출 환영합니다!

---

## 📄 라이선스

© 2025 스터디케어. All rights reserved.

---

## 📞 문의

- **Email**: contact@example.com
- **전화**: 010-XXXX-XXXX
- **카카오톡**: @학원관리시스템

---

**Made with ❤️ for Premium Education**

*Version 3.0.0 "Sophisticated Serenity"*
