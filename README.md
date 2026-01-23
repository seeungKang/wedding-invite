# wedding-invite

Vite + React + TypeScript

## 개발 시작하기

먼저 Node.js가 설치되어 있어야 합니다: [nodejs.org](https://nodejs.org)

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## GitHub Pages 설정

이 프로젝트는 GitHub Pages에 배포될 때 `https://YOUR_USERNAME.github.io/wedding-invite/` 경로에서 실행됩니다.

### 배포 전 필수 설정

1. GitHub 저장소의 Settings에서 Pages 탭 열기
2. Source를 "GitHub Actions"로 설정

### 자동 배포 (GitHub Actions)

`.github/workflows/` 폴더에 자동 배포 워크플로우를 추가할 수 있습니다.

## 프로젝트 구조

```
src/
├── App.tsx          # 메인 컴포넌트
├── App.css          # 컴포넌트 스타일
├── index.css        # 전역 스타일
└── main.tsx         # 진입점
```
청첩장
