# Changelog

All notable changes to Lectio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- **HIGH** — Fixed XSS in `ExplanationBlock.svelte`: added `escapeHtml()` to sanitize AI-generated body text before `{@html}` rendering
- **MEDIUM** — Sanitized all SVG `{@html}` calls in `DiagramBlock`, `DiagramCompare`, `DiagramSeries`, `HookHero`, and `SimulationBlock` using DOMPurify (SVG profile)

### Changed
- Moved `lectio-harmonisation-spec.md` and `LECTIO_COMPLETE_BUILD.md` from root to `docs/project/`
- Removed duplicate `AGENTS.md` stub at root (identical to `CLAUDE.md`)
- Created `.env.example` placeholder

### Added
- `src/lib/utils/sanitize.ts` — shared `sanitizeSvg()` utility using DOMPurify

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
