# Changelog

All notable changes to Lectio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
