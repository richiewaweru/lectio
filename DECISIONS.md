# Decision Log

## Phase 0a - LectioBlockRuntimeSurface

### Decision: Build render map from registry keys, not a hardcoded component-id map
- **Context:** `C:\Projects\lectio-lesson builder\src\lib\components\canvas\BlockPreview.svelte` uses a large manual component map keyed by `component_id`, which can drift when new components are added.
- **Guide says:** Add a registry-driven runtime block renderer and eliminate manual component maps.
- **Chose:** Added `src/lib/lectio/registry/render-map.ts` that derives `componentRenderMap` from `componentRegistry` keys (`registryKey -> metadata.id`) plus public `components/lectio` exports. Missing mappings throw early.
- **Risk:** This depends on `componentRegistry` keys matching `components/lectio` export names. Mitigation: startup throw on mismatch and test coverage in `src/test/block-runtime-surface.test.ts`.

## Phase 0b - Teaching intent + palette groups

### Decision: Treat `glossary-inline` as `define` intent but keep it out of palette groups
- **Context:** The guide's mapping table covers section-backed block components and does not explicitly include `glossary-inline` (inline-only component with `sectionField: null`).
- **Guide says:** Add `teachingIntent` to every component metadata file and expose grouped palette exports.
- **Chose:** Assigned `glossary-inline` intent as `define` for metadata completeness, and built `PALETTE_GROUPS` from section-backed components only (`sectionField !== null`) so inline components are not offered as addable blocks.
- **Risk:** If a future builder wants inline-component insertion directly, palette filtering rules must be revisited. Current behavior matches the block-based workspace model.
