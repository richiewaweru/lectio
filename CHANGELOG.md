# Changelog

All notable changes to Lectio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-07-30

### Added

- Optional `diagnoses` misconception metadata on quiz options.
- Optional `card_id` and `varies_on` provenance metadata on section content.
- Diagnostic `answer-key` component with public types, runtime and builder registration, accessible
  evidence wording, and print-aware page-break behavior.

### Changed

- Regenerated the JSON Schema, unified content contract, and Python adapter for the 0.6.0 surface.
- Unified contract exports now carry the package release version (`0.6.0`) instead of an
  independent hard-coded version.

## [0.5.2] - 2026-05-20

### Fixed
- `diagram-block` always uses figure-pair layout when `description` is set (including with callouts).
- `pitfall-alert` renders `content.label` with default "Common Misconception" (verified; no renderer regression).

## [0.5.1] - 2026-05-20

### Changed
- Republish of the print-quality component rework (npm package aligned with git tag).

## [0.5.0] - 2026-05-20

### Added
- Optional `formula` on `key-fact`, `description` and `figure_ref` on `diagram-block`, and `label` on `pitfall-alert`.
- Shared print utilities (`print-utilities.css`) for figure pairs, write-in rules, and accent cards.
- `aside` as a valid `PrintPreferredWidth` for callout print layout.

### Changed
- Print-quality rendering pass across 13+ components (equation key facts, horizontal definition families, diagram figure pairs, print pitfall boxes, hook hero with media, and more).
- `hook-hero` registry metadata now sets `acceptsMedia: true`.
- Updated print fallbacks, generation hints, compliance tests, gallery fixtures, and exported contracts.

## [0.4.9] - 2026-05-15

### Changed
- Snapshot release from master.

## [0.4.8] - 2026-05-15

### Added
- Added media-upload support fields for diagram-block, diagram-compare, and diagram-series.
- Added media-aware rendering for uploaded raster images in diagram components.

### Changed
- Diagram render priority is now media_id → image_url → svg_content.
- Teacher edit schemas now expose media fields for diagram variants.
- Diagram-series empty content now includes one starter frame with stable media fields.

### Compatibility
- Existing SVG-based diagram content remains supported.
- Existing image_url-based diagram content remains supported.

## [0.4.7] - 2026-05-14

### Added
- Builder edit schemas for comparison grids, definition families, and fill-in-the-blank word banks.
- Media picker fields for diagram block, diagram compare, and diagram series content.

### Changed
- Comparison grid rendering accepts both legacy string cells and builder-edited object cells.
- Diagram components resolve uploaded media references before falling back to image URLs or SVG content.
- Validation accepts media-backed diagrams while preserving existing URL/SVG compatibility.

## [0.4.6] - 2026-05-13

### Added
- **`print-theme.css`:** dedicated `@media print` layer (tokens, legibility reset, `data-print-*` fragmentation, migrated block rules) imported from `theme.css`.
- **`print_surface`:** exported on `lectio-content-contract.json` root for pipeline sizing (A4 assumptions).
- **Contract `print` field:** each component card now includes `print` (mirrored as `print_behavior` for compatibility).

### Changed
- **`LectioPrintSpec`:** expanded with `PrintBreakBehavior` (`atomic` | `itemized` | `table` | `prose`), `hasMedia`, `requiresColorReset`, optional `itemSelector` / `mediaConstraint`.
- **Print markup:** components emit `data-print-container`, `data-print-item`, `data-print-has-media`, and `data-print-color-reset` where applicable; DiagramSeries grid for 5 frames; WorkedExampleCard print shows alternatives; SimulationBlock uses explanation when no fallback diagram; VideoEmbed print text fallback; ComparisonGrid semantic `<table>` in print.

## [0.4.4] - 2026-05-12

### Added
- **Print markdown coverage contract:** shared requirements map plus a test that fails if a known print utility skips required markdown rendering.

### Changed
- **`ExpandedSteps`:** print-mode worked-example steps now render block and inline markdown correctly and use the shared rich-text class for spacing.
- **Markdown utilities:** `renderInlineMarkdown` and `renderBlockMarkdown` short-circuit when the input already contains HTML, preventing accidental double-processing across print surfaces.

## [0.4.3] - 2026-05-10

### Added
- **`RichText` component** for inline markdown rendering in block copy.
- **Print-mode diagram callouts:** static numbered list with explanations when printing (interactive popovers hidden).

### Changed
- **`DefinitionFamily`:** in print mode, renders all definitions expanded instead of accordion-only content.
- **`DiagramBlock`:** captions and callout explanations use inline markdown; diagram images use `loading="eager"` when `printMode` is active.
- **`KeyFact`:** fact and context render through `RichText`.
- **`CalloutBlock`:** heading and body support inline markdown.
- **`PitfallAlert`:** title supports inline markdown; examples are always visible in print (no collapsible); title uses an em dash before the misconception text.
- **`PracticeStack` / `WorkedExampleCard`:** inline diagram images use eager loading in print mode.

## [0.4.1] - 2026-05-06

### Added
- **Warning-level** contract-quality diagnostics during `pnpm run export-contracts` for placeholder-style or shallow field contracts (does not fail export; errors remain for hard contract violations).

### Changed
- **Behavior-depth contracts:** replaced generic `structured_object` / single-key placeholder field contracts with explicit, schema-aligned field-level behavior for generation-facing stable components (including `diagram-block` coverage for `image_url`, captions, accessibility fields, and callouts).
- **Open canvas:** `open-canvas` template `always_present` set to `[]` so the layout is not pinned to default blocks.
- **DiagramBlock:** positioned callout overlays work for **raster** diagrams (`image_url`), not only SVG.
- **Docs:** README, component guide, registry field map, and `agents/project.md` now document the first-class component module files (`schema.ts`, `metadata.ts`, `print.ts`, `examples.ts`, `content-contract.ts`, `module.ts`) and the `export-contracts` workflow.

### Regenerated
- `contracts/section-content-schema.json`, `contracts/lectio-content-contract.json`, and `generated/python/section_content.py`.

## [0.3.3] - 2026-04-24

### Changed
- Relaxed `SimulationType` from a fixed string union to plain `string` in the source schema so downstream generators and adapters accept new simulation identifiers without a package code change.

### Regenerated
- Re-exported contract artifacts in `contracts/` and regenerated Python types in `generated/` via `npm run export-contracts`.


## [0.3.0] - 2026-04-23

### Changed
- Completed template layout completeness pass across 12 identified templates so declared contract components are mounted when section data is present.
- Standardized conditional rendering across updated layouts while preserving each template's intentional structural groupings and pedagogical ordering.

### Regenerated
- Re-exported contract artifacts in `contracts/` and regenerated Python types in `generated/` via `npm run export-contracts`.

### Notes
- No new public TypeScript API surface was introduced.
- Behavioral change is layout-level rendering completeness for contract-backed template fields.

## [0.2.7] - 2026-04-22

### Changed
- Hardened print output through stable `data-lectio-block` and `data-print-role` selector hooks across key components.
- Consolidated print transformations in `theme.css` to flatten decorative UI, enforce print-safe block rendering, and improve section/diagram readability.
- Updated `PracticeStack` print behavior so inline answers are hidden by default.

### Added
- Optional `PracticeStack` prop: `showInlineAnswersInPrint?: boolean` (default `false`) for explicit inline-answer print opt-in.
- `data-schema-warning="true"` markers on warning card surfaces so schema warnings are suppressed in print output.
- New print harness coverage in tests for `PracticeStack` print behavior and stable print hook presence.

### Notes
- No `SectionContent` schema or component-field mapping contract changes.
- Downstream consumers should import `lectio/theme.css` and opt in to inline print answers only when needed.

## [0.2.6] - 2026-04-22

### Added
- New spacing and rhythm token contract in `theme.css`, including `--space-*` and `--rh-*` variables.
- Semantic rhythm utility classes in `theme.css` (`rh-pad-*`, `rh-gap-*`, `rh-radius-*`) for consistent component and template layout.

### Changed
- Full sizing and spacing harmonisation sweep across Lectio components, templates, and routes.
- Replaced hardcoded layout paddings, section gaps, and large radius values with shared token-driven classes.
- Updated `.eyebrow` to consume tokenized typography values.
- Harmonised key print-mode spacing in practice, short-answer, simulation, timeline, worked-example, fill-in-blank, quiz, and diagram-series surfaces.

### Notes
- This is a presentation-level visual reset release; TypeScript/public schema interfaces are unchanged.

## [0.1.1] - 2026-04-02

### Security
- **HIGH** â€” Fixed XSS in `ExplanationBlock.svelte`: added `escapeHtml()` to sanitize AI-generated body text before `{@html}` rendering
- **MEDIUM** â€” Sanitized all SVG `{@html}` calls in `DiagramBlock`, `DiagramCompare`, `DiagramSeries`, `HookHero`, and `SimulationBlock` using DOMPurify (SVG profile)

### Changed
- Moved `lectio-harmonisation-spec.md` and `LECTIO_COMPLETE_BUILD.md` from root to `docs/project/`
- Removed duplicate `AGENTS.md` stub at root (identical to `CLAUDE.md`)
- Created `.env.example` placeholder

### Added
- `src/lib/utils/sanitize.ts` â€” shared `sanitizeSvg()` utility using DOMPurify

## [0.1.0] - 2026-04-02

### Added
- Initial package structure
- 23 components across 7 categories
- 12 named templates + open-canvas fallback
- Contract export system (types.json)
- Blue classroom preset

### Notes
- First published version to GitHub Packages
- Pre-1.0: contracts may change in minor versions
