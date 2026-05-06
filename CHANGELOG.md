# Changelog

All notable changes to Lectio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Introduced first-class component-owned content contracts and a unified export surface at `contracts/lectio-content-contract.json`.
- Updated `guided-concept-path` generation-facing contract to a flexible renderer model with no hard required blocks.
- Expanded publish lane guard from `0.3.x` to `0.x` and aligned release install instructions to `lectio@latest`.

### Removed
- Retired fragmented contract exports: per-template JSON files, `component-field-map.json`, `component-registry.json`, `component-schemas.json`, `component-examples.json`, `manifest.json`, `print-rules.json`, and `preset-registry.json`.

### Regenerated
- Re-exported `contracts/section-content-schema.json`, `contracts/lectio-content-contract.json`, and `generated/python/section_content.py`.

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
