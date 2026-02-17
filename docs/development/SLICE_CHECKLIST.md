# Slice Checklist (Planner Sign-off)

This checklist is used for each feature slice cycle:
Planner validation -> Developer implementation -> Planner re-validation.

## Common Gate
- [ ] PRD section references are attached in the task.
- [ ] Scope is limited to one slice only.
- [ ] `lint`, `typecheck`, `check:lang`, `build` passed.

## Slice A: Calendar
- [ ] Month view is December 2026.
- [ ] Only day 19 is highlighted as wedding date.
- [ ] Caption text matches PRD wording policy.
- [ ] Mobile readability is verified.

## Slice B: Location
- [ ] Venue name, address, and phone are visible.
- [ ] Naver map and Kakao navi CTA buttons are visible and clickable.
- [ ] Fallback is shown when external link open fails.
- [ ] Subway and bus guide lines are rendered.

## Slice C: Gallery
- [ ] Masonry grid is rendered on mobile.
- [ ] Full view entry action is available.
- [ ] Viewer opens with the clicked index.
- [ ] Image load failure fallback is rendered.
- [ ] Viewer has close and previous/next actions.

## Slice D: Accounts
- [ ] Total six accounts are rendered.
- [ ] Groom/Bride groups are separated.
- [ ] Accordion toggle works per account row.
- [ ] Copy action provides success/failure feedback.
- [ ] Copy value follows policy (`bank + account`).

## Planner Final Sign-off
- [ ] Visual hierarchy follows PRD tone and spacing rules.
- [ ] Mobile-first interaction quality is acceptable.
- [ ] No out-of-scope feature was added.
