# wedding-invite

Wedding invitation site built with Vite, React, and TypeScript.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## NAVER Maps

1. Create a Maps application in NAVER Cloud Console and enable Dynamic Map.
2. Register `https://wedding-invite-bay-tau.vercel.app`, `http://127.0.0.1:4173`, `http://localhost:5173`, and `http://127.0.0.1:5173` as Web service URLs.
3. Copy `.env.example` to `.env.local` and set `VITE_NAVER_MAP_KEY_ID` to the application's Client ID (ncpKeyId). Client Secret is not used in browser code.
4. Restart the development server. Add the same environment variable to Vercel project settings and redeploy for production: Vite reads it at build time.

The SDK loads near the viewport. Missing credentials, authentication failures and network errors retain the static map. The initial pin is the center of NAVER 1784 (37.35888, 127.10519); confirm the venue entrance before publishing.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run check:lang
```

## Image Pipeline

1. Put original images into `assets/original`.
2. Run optimization:

```bash
npm run optimize:images
```

3. Use generated files in `public/images`.

## Build and Size Check

```bash
npm run build
npm run check:size
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

The site base path is configured as `/wedding-invite/`.

## Collaboration Conventions

- Language policy: `docs/conventions/language-policy.md`
- Planner template: `docs/planning/PRD_TEMPLATE.md`
- Developer template: `docs/development/IMPLEMENTATION_TEMPLATE.md`
- Role boundary: `docs/process/role-boundary.md`
