# Lectio Svelte Component Guide

This guide documents the current public Svelte library surface after the registry-driven template rollout.

## What Ships Now

- Framework: SvelteKit + Svelte 5 runes + TypeScript + Tailwind CSS v4
- Public component entrypoint: `src/lib/components/lectio/index.ts`
- Public teaching component count: 22
- Public template count: 10 starter templates in `src/lib/template-registry.ts`
- Public routes:
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

## Current Template System

The public template system is registry-driven.

- Registry: `src/lib/template-registry.ts`
- Shared contracts and selectors: `src/lib/template-types.ts`
- Validation: `src/lib/template-validation.ts`
- Gallery shell: `src/lib/templates/TemplatesGallery.svelte`
- Detail shell: `src/lib/templates/TemplateDetailView.svelte`

The 10 shipped starter templates are:

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

## Published Component Additions

These components were added during the cross-repo template rollout and are now part of the public library:

- `ComparisonGrid`
- `TimelineBlock`

These existing components were extended to support the template system:

- `PracticeStack`: `accordion | flat-list`
- `GlossaryRail`: `sticky | drawer | inline-strip`
- `ProcessSteps`: `static | step-reveal`

## Template Detail Drawer

The template detail route now uses a persistent left-side contract drawer on `md+`.

- Desktop: in-layout persistent drawer that resizes the preview area
- Mobile: temporary left-side sheet
- Desktop state key: `template-contract-drawer-open`

## Copy or Fork Checklist

If you want to reuse a component or template outside this repo, copy these pieces together:

1. The component or template from `src/lib/components/lectio/` or `src/lib/templates/`.
2. Supporting UI primitives from `src/lib/components/ui/`.
3. `src/lib/types.ts` for the content contracts.
4. `src/lib/registry.ts` and `src/lib/template-registry.ts` if you want showcase and template metadata.
5. `src/lib/validate.ts` and `src/lib/template-validation.ts` if you want the same validation behavior.
6. `src/lib/utils.ts` and shared styling from `src/app.css`.

## Important Current Notes

- `SimulationContent` still exists in `src/lib/types.ts`, but this Svelte workspace does not export a public `SimulationBlock`.
- Legacy template files such as `GuidedConceptPath.svelte` and `EnrichedLearningPath.svelte` are not the public template browsing experience anymore.
- Treat the current implementation in `src/lib/` and the template registry as source of truth over older planning briefs.
