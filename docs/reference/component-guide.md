# Lectio Library Guide

This guide documents the current public library surface after the packaging, runtime-surface, and template-expansion work shipped on March 19, 2026.

## What Ships Now

- Framework: SvelteKit + Svelte 5 runes + TypeScript + Tailwind CSS v4
- Public package entrypoint: `src/lib/index.ts`
- Public stylesheet entrypoint: `src/lib/theme.css` via `import 'lectio/theme.css'`
- Public teaching component count: 23
- Public template count: 12 registry-backed templates in `src/lib/template-registry.ts`
- Public runtime surfaces:
  - `TemplatePreviewSurface`
  - `TemplateRuntimeSurface`
  - `LectioThemeSurface`
  - `ResolvedTemplatePreviewSurface`
- Showcase routes:
  - `/components`
  - `/templates`
  - `/templates/[templateId]`

## Public Components

### Foundation

- `SectionHeader`
- `HookHero`
- `ExplanationBlock`
- `PrerequisiteStrip`
- `WhatNextBridge`
- `InterviewAnchor`

### Definition and Knowledge

- `DefinitionCard`
- `DefinitionFamily`
- `GlossaryRail`
- `GlossaryInline`
- `InsightStrip`
- `ComparisonGrid`

### Examples and Process

- `WorkedExampleCard`
- `ProcessSteps`

### Assessment and Practice

- `PracticeStack`
- `QuizCheck`
- `ReflectionPrompt`

### Alerts

- `PitfallAlert`

### Visual and Sequence

- `DiagramBlock`
- `DiagramCompare`
- `DiagramSeries`
- `TimelineBlock`

### Interactive

- `SimulationBlock`

## Public Template System

The public template system is registry-driven.

- Registry: `src/lib/template-registry.ts`
- Shared contracts and selectors: `src/lib/template-types.ts`
- Validation: `src/lib/template-validation.ts`
- Runtime helpers: `src/lib/templates/runtime-resolver.ts`
- Consumer surfaces: `src/lib/templates/TemplatePreviewSurface.svelte` and `src/lib/templates/TemplateRuntimeSurface.svelte`
- Gallery shell: `src/lib/templates/TemplatesGallery.svelte`
- Detail shell: `src/lib/templates/TemplateDetailView.svelte`

The 12 shipped templates are:

- Guided Concept Path
- Figure First
- Compare and Apply
- Focus Flow
- Guided Concept Compact
- Formal Track
- Diagram-Led Lesson
- Distinction Grid
- Timeline Narrative
- Process Trainer
- Interactive Lab
- Guided Discovery

## Rendering From A Consumer App

Build the library and import the shared theme once:

```bash
npm run package
```

```css
@import 'tailwindcss';
@import 'lectio/theme.css';
```

Render a seeded preview or a real section through the public runtime wrappers:

```svelte
<script lang="ts">
  import { TemplatePreviewSurface, TemplateRuntimeSurface } from 'lectio';
  import type { SectionContent } from 'lectio';

  let { section }: { section: SectionContent } = $props();
</script>

<TemplatePreviewSurface templateId="interactive-lab" presetId="blue-classroom" />
<TemplateRuntimeSurface
  templateId="interactive-lab"
  presetId="blue-classroom"
  {section}
/>
```

Use the higher-level surfaces unless you are composing your own preview chrome. `LectioThemeSurface` and `ResolvedTemplatePreviewSurface` are exported for advanced consumers only.

## Contract Snapshots

External pipelines should read JSON from `agents/contracts/`, not import Typescript from `src/`.

```bash
npm run export-contracts
npm run export-contracts -- --out ../some-other-project/contracts
```

The export now writes:

- 12 `{template-id}.json` files
- `component-field-map.json`
- `component-registry.json`
- `preset-registry.json`

Whenever template contracts, presets, or registry metadata change, rerun both `npm run package` and `npm run export-contracts` before publishing.

## Copy Or Fork Checklist

If you want to reuse a component or template outside this repo, copy these pieces together:

1. The component or template from `src/lib/components/lectio/` or `src/lib/templates/`.
2. Supporting UI primitives from `src/lib/components/ui/`.
3. `src/lib/types.ts` for the content contracts.
4. `src/lib/registry.ts` and `src/lib/template-registry.ts` if you want showcase and template metadata.
5. `src/lib/validate.ts` and `src/lib/template-validation.ts` if you want the same validation behavior.
6. `src/lib/theme.css` for shared tokens, utilities, animations, and preset styling.
7. `src/lib/utils.ts` for class merging helpers.

## Important Current Notes

- `SimulationBlock` is part of the public library and now supports iframe-backed `html_content`, fallback diagrams, and an expanded modal view.
- `TemplateDetailView` now renders previews through `TemplatePreviewSurface`, so the showcase uses the same public preview path as consumers.
- Legacy internal templates such as `GuidedConceptPath.svelte` and `EnrichedLearningPath.svelte` still exist for showcase and regression coverage, but the registry plus public surfaces are the source of truth for consumers.
