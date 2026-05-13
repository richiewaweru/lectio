# Lesson Builder Merge Progress

## Goal

Merge the Lesson Builder into the Textbook Agent as a polished, teacher-owned editing workspace by completing Phases 0-8 from the unified implementation guide.

## Current Phase

- Phase 0a - LectioBlockRuntimeSurface
- Repo: `C:\Projects\lectio`
- Status: complete

## Phase 0a Checklist

- [x] Read Phase 0a requirements from the unified implementation guide
- [x] Confirm current Lectio exports/registry state
- [x] Add `src/lib/runtime/LectioBlockRuntimeSurface.svelte`
- [x] Add `src/lib/runtime/index.ts`
- [x] Add `src/lib/lectio/registry/render-map.ts`
- [x] Export runtime surface from `src/lib/index.ts`
- [x] Add/adjust tests for known-component rendering and unknown-component fallback
- [x] Run validation: `npm run check && npm run build && npm test`
- [x] Self-review diff for scope and compatibility
- [ ] Commit with convention-compliant message

## Validation Plan

- `npm run check`
- `npm run build`
- `npm test`

## Dependencies

- Guide Part A decisions (single source of truth + Lectio remains package boundary)
- Existing component registry and component exports

## Validation Evidence

- `npm run check` passed (`svelte-check found 0 errors and 0 warnings`)
- `npm run build` passed (vite build completed)
- `npm test` passed on rerun (`15 passed`, `88 passed`)
- Added focused phase test: `src/test/block-runtime-surface.test.ts`

## What Was Done

- Added a registry-driven render map keyed by component IDs:
  - `src/lib/lectio/registry/render-map.ts`
- Added the runtime block surface:
  - `src/lib/runtime/LectioBlockRuntimeSurface.svelte`
  - `src/lib/runtime/index.ts`
- Exported runtime surface from root package:
  - `src/lib/index.ts`
- Added tests for:
  - Coverage of every registry component ID in the render map
  - Known component render path
  - Unknown component fallback behavior

## Next Phase Needs

- Phase 0b: add `teachingIntent` metadata and `PALETTE_GROUPS` exports.
