# Language Policy

## Purpose
Keep team communication clear in Korean while keeping source code portable and consistent in English.

## Rules
1. Communication in issues, pull requests, and agent Q&A must be Korean.
2. Code identifiers, file names, and runtime strings must be English.
3. Korean is allowed only in source code comments when absolutely needed.
4. Violations are blocked by CI (`npm run check:lang`).

## Scope
- Included: `src/**/*.{ts,tsx,js,jsx,css}`
- Excluded: `docs/**`, `README.md`, generated files

## Operational Notes
1. Run `npm run check:lang` before opening a pull request.
2. If an exception is required, document the reason in the pull request.
