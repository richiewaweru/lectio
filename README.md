# Lectio

Lectio is a Svelte 5 library for structured educational content and the canonical contract layer between AI generation systems, lesson editors, and rendered learning materials.

It provides:

- Typed lesson content contracts (`SectionContent` and nested types)
- Reusable teaching components (registry-driven block library)
- Registry-driven lesson templates (13 templates)
- Exported JSON contracts for AI pipelines
- Generated Python/Pydantic adapter for backend consumers
- Published npm package: `lectio`

## Who This Is For

| You are building | What you need from Lectio |
|---|---|
| A SvelteKit app that renders lesson content | Components, template surfaces, `SectionContent` types, `theme.css` |
| An AI pipeline that generates lesson sections | `contracts/` JSON artifacts, `component-registry.json`, generation hints |
| A lesson editor or builder | Document utilities: `fromSectionContents`, `getEmptyContent`, `getEditSchema` |
| A Python backend consuming lesson schema | `generated/python/section_content.py` Pydantic adapter |

## Core Model

Everything in Lectio flows from one root type: `SectionContent`.

A `SectionContent` object holds data for a complete lesson section, and its fields map directly to components through the registry.

```text
section.hook        -> HookHero
section.explanation -> ExplanationBlock
section.diagram     -> DiagramBlock
section.callout     -> CalloutBlock
section.summary     -> SummaryBlock
section.practice    -> PracticeStack
```

The full field-to-component mapping is exported as `contracts/component-field-map.json`.

## Installation

### For SvelteKit Apps

```bash
npm install lectio
```

### Peer Dependencies

```bash
npm install katex lucide-svelte bits-ui clsx tailwind-merge
npm install -D @tailwindcss/vite tailwindcss @types/katex
```

### Theme

Import once in your app CSS entrypoint:

```css
@import 'tailwindcss';
@import 'lectio/theme.css';
```

This loads design tokens, preset surfaces, KaTeX styles, and layout utilities.

## Verify Setup

If components render with typography, spacing, and color tokens applied, setup is complete.

### Minimal Component Render

```svelte
<script lang="ts">
  import { HookHero } from 'lectio';
  import type { HookHeroContent } from 'lectio';

  const content: HookHeroContent = {
    headline: 'Setup verified',
    body: 'If this renders styled, Lectio is wired correctly.',
    type: 'prose',
    anchor: 'test'
  };
</script>

<HookHero {content} />
```

### Render a Section Through a Template

```svelte
<script lang="ts">
  import { TemplateRuntimeSurface } from 'lectio';
  import type { SectionContent } from 'lectio';

  export let section: SectionContent;
</script>

<TemplateRuntimeSurface
  templateId="guided-concept-path"
  presetId="blue-classroom"
  {section}
/>
```

## API Quick Reference

### Component Imports

```ts
// Teaching
import {
  HookHero,
  ExplanationBlock,
  DefinitionCard,
  DefinitionFamily,
  CalloutBlock,
  SummaryBlock,
  InsightStrip,
  KeyFact,
  PitfallAlert
} from 'lectio';

// Practice
import {
  PracticeStack,
  WorkedExampleCard,
  QuizCheck,
  ReflectionPrompt,
  StudentTextbox,
  ShortAnswerQuestion,
  FillInTheBlank
} from 'lectio';

// Visual
import {
  DiagramBlock,
  DiagramCompare,
  DiagramSeries,
  VideoEmbed,
  ImageBlock
} from 'lectio';

// Structure
import {
  ProcessSteps,
  ComparisonGrid,
  TimelineBlock,
  SectionHeader,
  SectionDivider
} from 'lectio';

// Navigation + framing
import {
  PrerequisiteStrip,
  WhatNextBridge,
  GlossaryRail,
  GlossaryInline,
  InterviewAnchor,
  SimulationBlock
} from 'lectio';
```

### Template Surfaces

```ts
import {
  TemplateRuntimeSurface,
  TemplatePreviewSurface,
  LectioThemeSurface,
  ResolvedTemplatePreviewSurface
} from 'lectio';
```

### Core Types

```ts
import type {
  SectionContent,
  HookHeroContent,
  ExplanationContent,
  DefinitionContent,
  CalloutBlockContent,
  SummaryBlockContent,
  DiagramContent,
  PracticeContent,
  WorkedExampleContent,
  ComparisonGridContent,
  TimelineContent,
  QuizContent,
  ReflectionContent,
  KeyFactContent,
  PitfallContent,
  VideoEmbedContent,
  ImageBlockContent,
  StudentTextboxContent,
  ShortAnswerContent,
  FillInBlankContent,
  SimulationContent,
  WhatNextContent,
  InterviewContent,
  LessonDocument,
  BlockInstance,
  DocumentSection
} from 'lectio';
```

### Validation + Registry

```ts
import { validateSection, warnIfInvalid } from 'lectio';
import {
  componentRegistry,
  getComponentById,
  getComponentFieldMap,
  getStableComponents
} from 'lectio';
import type { ComponentMeta } from 'lectio';
```

## For AI Pipelines

Pipelines consume exported contract files. They should not import from Lectio source internals.

After `npm install lectio`, these files are available under `node_modules/lectio/`:

| File | What it contains |
|---|---|
| `contracts/section-content-schema.json` | Full JSON Schema for `SectionContent` and nested types |
| `contracts/component-registry.json` | Component metadata, field mapping, capacity, generation hints |
| `contracts/component-field-map.json` | Component IDs -> `SectionContent` field names |
| `contracts/preset-registry.json` | Preset palette and style metadata |
| `contracts/{template-id}.json` | Per-template requirements, budgets, signal affinity |
| `generated/python/section_content.py` | Auto-generated Pydantic v2 models |

### Generation Hints

`component-registry.json` includes `generation_hint` for every mapped component. Use those hints when constructing generation prompts instead of inventing separate field guidance.

## Python Adapter

Use `generated/python/section_content.py` in your backend.

Do not hand-edit it.

When upgrading Lectio, replace this file from the new package version and run pipeline validation tests.

```python
# AUTO-GENERATED - DO NOT EDIT
# Source: lectio src/lib/schema/types.ts
# Generated from: contracts/section-content-schema.json
# Run `npm run export-contracts` in the Lectio repo to regenerate.
```

## For Lesson Builders and Editors

Use editor utilities instead of maintaining parallel content schema definitions.

```ts
import {
  fromSectionContents,
  toSectionContents,
  validateDocument,
  getFieldComponentMap
} from 'lectio';

import { getEmptyContent, getPreviewContent } from 'lectio';
import { getEditSchema } from 'lectio';
import type { EditSchema, FieldSchema, LessonDocument } from 'lectio';
```

Recommended generation flow:

```text
Template contract      -> required/optional components for section
Component registry     -> mapped SectionContent field per component
SectionContent schema  -> exact field shape
Generation hint        -> quality target for that field
Pipeline output        -> validate against schema before assembly
```

## Versioning

Lectio follows semver:

- `patch`: bugfix, no API/schema change
- `minor`: new component/export, backward-compatible
- `major`: breaking schema change, renamed field, removed component

For contract-sensitive consumers (AI pipelines, backend validators), pin exact versions:

```json
{
  "dependencies": {
    "lectio": "0.2.6"
  }
}
```

## Upgrading to 0.2.6

`0.2.6` is a visual harmonisation release focused on spacing/radius rhythm consistency.
No TypeScript or schema contract changes are introduced.

### What to validate downstream

- Rebaseline UI screenshots/snapshots for component and template surfaces.
- Validate key pages at mobile/tablet/desktop breakpoints.
- Recheck print output for:
  - `PracticeStack`
  - `ShortAnswerQuestion`
  - `SimulationBlock`
  - `TimelineBlock`
  - `WorkedExampleCard`
  - `FillInTheBlank`
- Review local CSS overrides that assumed previous hardcoded paddings/radii.
- Ensure your app imports `lectio/theme.css`; without it, the new token classes/variables will not apply.

## Do / Don't

### Do

- Import components and types from `lectio`
- Use `contracts/` for backend and pipeline integration
- Use `generated/python/section_content.py` as Python type source
- Validate generated content against schema before rendering
- Pin exact versions when pipeline shape compatibility matters

### Don't

- Import from `lectio/src`
- Hand-write parallel `SectionContent` definitions in consumer apps
- Edit `generated/python/section_content.py` manually
- Treat template contracts as a substitute for full field schema

## Development

```bash
npm install
npm run dev               # docs + component gallery at localhost:5173
npm run check             # TypeScript + Svelte type check
npm run test              # Vitest unit tests
npm run package           # build dist/ for publishing
npm run export-contracts  # regenerate contracts/ and generated/python/
```

Always run `npm run export-contracts` before tagging a release so JSON contracts and Python adapters stay in sync with source contracts.

## Releasing

```bash
# version is derived from the git tag in CI (publish lane currently 0.2.x):
git tag vX.Y.Z
git push origin master
git push origin vX.Y.Z
# GitHub Actions publishes to npm automatically
```
