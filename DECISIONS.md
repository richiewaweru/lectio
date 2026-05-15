# Decision Log

## Phase 0a - LectioBlockRuntimeSurface

### Decision: Build render map from registry keys, not a hardcoded component-id map
- **Context:** `C:\Projects\lectio-lesson builder\src\lib\components\canvas\BlockPreview.svelte` uses a large manual component map keyed by `component_id`, which can drift when new components are added.
- **Guide says:** Add a registry-driven runtime block renderer and eliminate manual component maps.
- **Chose:** Added `src/lib/lectio/registry/render-map.ts` that derives `componentRenderMap` from `componentRegistry` keys (`registryKey -> metadata.id`) plus public `components/lectio` exports. Missing mappings throw early.
- **Risk:** This depends on `componentRegistry` keys matching `components/lectio` export names. Mitigation: startup throw on mismatch and test coverage in `src/test/block-runtime-surface.test.ts`.
