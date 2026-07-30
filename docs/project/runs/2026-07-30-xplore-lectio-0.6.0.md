# Feature: xplore Lectio 0.6.0 contract surface

**Classification**: major
**Subsystems**: types, component registry, runtime rendering, generated contracts, release metadata
**Branch**: `xplore`

## Source precedence

- `files (6).zip` supplies the corrected `MISSION.md` and `PROMPTS.md`.
- `files (5).zip` supplies `WORKED_EXAMPLE.md`, `LECTIO_XPLORE_HANDOFF.md`,
  `LECTIO_COMPONENT_SPEC.md`, `TBG_XPLORE_HANDOFF.md`, and `UI_SPEC.md`.
- The current component-owned architecture takes precedence over obsolete flat paths in the handoff.
- Lectio scope is phases L1–L4 only. Pack orchestration, generator prompts, and generator UI stay in
  the downstream text-book-generator repository.

## Progress

- [x] Understood requirements and identified scope
- [x] Read relevant source code and project rules
- [x] L1: add optional diagnostic metadata to quiz options
- [x] L2: add optional concept-card provenance to sections
- [x] L3: add and register the answer-key component
- [ ] L4: export contracts and bump the package to 0.6.0
- [ ] Run all tests, checks, and production build
- [ ] Run a browser smoke check on port 5173
- [ ] Self-review against `agents/standards/review.md`
- [ ] Record final validation evidence and risks

## Validation evidence

- L1: diagnoses schema test — 1 passed.
- L1: `pnpm run build` — passed; existing CalloutBlock unused-selector and bundle-size warnings remain.
- L1: no learner-facing Svelte component references `diagnoses`.
- L2: `card_id` and `varies_on` are optional section-level metadata; production build passed and
  no renderer references either field.
- L3: answer-key/component integration suite — 28 passed.
- L3: `pnpm run check` — 0 errors; 2 pre-existing CalloutBlock unused-selector warnings.
- L3: `pnpm run build` and `pnpm run export-contracts` — passed.
- L3: no audience policy or literal color values were added; diagnostic wording and print break
  behavior match the component specification.

## Risks and follow-up

- Publishing to npm is a human-only step and is intentionally excluded.
- The downstream text-book-generator work starts only after Lectio 0.6.0 is published or linked
  locally by its owner.
