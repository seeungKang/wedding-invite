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

## Quality Gates

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
