# Lectio

Educational component library built on SvelteKit + Svelte 5 + TypeScript + Tailwind CSS v4. Renders structured lesson content into reusable teaching components and registry-driven lesson templates.

## Related Docs

- `docs/reference/component-guide.md` - public library surface, runtime wrappers, and template inventory
- `docs/reference/registry-field-map.md` - contract export pipeline, JSON outputs, and extension workflow

## Using Lectio as a Local Library

Lectio is packaged with `@sveltejs/package`. Another SvelteKit project can consume it via a local file reference.

### 1. Build the library

```bash
cd lectio
npm install
npm run package
```

This compiles `src/lib/` into `dist/` with `.svelte` files and TypeScript declarations.

### 2. Add to your project

In your consuming project's `package.json`:

```json
{
  "dependencies": {
    "lectio": "file:../lectio"
  }
}
```

Then install:

```bash
npm install
```

### 3. Install runtime dependencies

Your project needs these alongside Lectio:

```bash
npm install katex lucide-svelte bits-ui clsx tailwind-merge
npm install -D @tailwindcss/vite tailwindcss @types/katex
```

### 4. Import and use

```svelte
<script lang="ts">
  import { HookHero, SectionHeader, ExplanationBlock } from 'lectio';
  import type { SectionContent } from 'lectio';
  import { validateSection, warnIfInvalid } from 'lectio';

  let { section }: { section: SectionContent } = $props();

  warnIfInvalid(section);
</script>

<SectionHeader content={section.header} />
<HookHero content={section.hook} />
<ExplanationBlock content={section.explanation} />
```

Import the shared Lectio theme once in your app stylesheet so template shells, tokens, KaTeX styles, and preset-scoped visuals are available:

```css
@import 'tailwindcss';
@import 'lectio/theme.css';
```

After changing Lectio source, rebuild with `npm run package` for changes to appear in the consuming project.

## Public API

Everything is exported from a single entry point: `import { ... } from 'lectio'`.

### Components (23)

| Group | Components |
|-------|-----------|
| Foundation | `SectionHeader`, `HookHero`, `ExplanationBlock`, `PrerequisiteStrip`, `WhatNextBridge`, `InterviewAnchor` |
| Definition & Knowledge | `DefinitionCard`, `DefinitionFamily`, `GlossaryRail`, `GlossaryInline`, `InsightStrip`, `ComparisonGrid` |
| Examples & Process | `WorkedExampleCard`, `ProcessSteps` |
| Assessment & Practice | `PracticeStack`, `QuizCheck`, `ReflectionPrompt` |
| Alerts | `PitfallAlert` |
| Diagrams | `DiagramBlock`, `DiagramCompare`, `DiagramSeries`, `TimelineBlock` |
| Simulation | `SimulationBlock` |

Each component accepts a typed `content` prop (e.g. `HookHeroContent`, `QuizContent`). All content types are nested inside the root `SectionContent` interface.

### Registry

```ts
import { componentRegistry, getStableComponents, getComponentById } from 'lectio';
import type { ComponentMeta } from 'lectio';

const allComponents = getStableComponents();
const hook = getComponentById('hook-hero');
```

### Templates (12)

```ts
import {
  TemplatePreviewSurface,
  TemplateRuntimeSurface
} from 'lectio';
import type { SectionContent } from 'lectio';

const section: SectionContent = /* your section */;
```

```svelte
<script lang="ts">
  import { TemplatePreviewSurface, TemplateRuntimeSurface } from 'lectio';
  import type { SectionContent } from 'lectio';

  let { section }: { section: SectionContent } = $props();
</script>

<TemplatePreviewSurface templateId="guided-concept-path" presetId="blue-classroom" />
<TemplateRuntimeSurface
  templateId="guided-concept-path"
  presetId="blue-classroom"
  {section}
/>
```

Available templates: `guided-concept-path`, `figure-first`, `compare-and-apply`, `focus-flow`, `guided-concept-compact`, `formal-track`, `diagram-led-lesson`, `distinction-grid`, `timeline-narrative`, `process-trainer`, `interactive-lab`, `guided-discovery`.

For advanced or internal consumers, Lectio also exports the low-level runtime pieces:

```ts
import {
  LectioThemeSurface,
  ResolvedTemplatePreviewSurface,
  templateRegistry,
  templateRegistryMap,
  getTemplateById,
  filterTemplates
} from 'lectio';
```

### Validation

```ts
import { validateSection, warnIfInvalid } from 'lectio';

const warnings = validateSection(section); // string[]
warnIfInvalid(section); // logs to console in browser
```

### Presets

```ts
import { basePresets, basePresetMap } from 'lectio';
```

Five built-in colour presets: Blue Classroom, Warm Paper, Calm Green, High Contrast Focus, Minimal Light.

### Utility

```ts
import { cn } from 'lectio'; // clsx + tailwind-merge
```

## Export Contracts (Pipeline Bridge)

The `export-contracts` script exports template, component, and preset metadata as JSON for external pipelines (e.g. Python AI agents) that need to know about Lectio's structure without importing TypeScript.

```bash
npm run export-contracts                           # Default: agents/contracts/
npm run export-contracts -- --out /path/to/output   # Custom output directory
LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts  # Via env var
```

Output files:
- `{template-id}.json` (x12) — template contract with lesson flow, required/optional components, generation guidance, and `allowed_presets`
- `component-field-map.json` — maps component IDs to their `SectionContent` field names
- `component-registry.json` — full component metadata (capacity, behaviour modes, cognitive job, etc.)
- `preset-registry.json` — visual preset palette, typography, density, and surface style

Run this whenever templates, components, or presets change. The pipeline reads these files — it never imports from `src/`.

## Development

```bash
npm run dev          # Start dev server (showcase at localhost:5173)
npm run check        # Svelte + TypeScript type checking
npm run test         # Run Vitest test suite
npm run build        # Production app build
npm run package      # Library build (src/lib/ -> dist/)
```

## Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript (strict)
- Tailwind CSS v4
- bits-ui (headless UI primitives)
- KaTeX (math rendering)
- Lucide (icons)
- Vitest + Testing Library

## Project Structure

```
src/lib/
├── index.ts                    # Library entry point (barrel export)
├── types.ts                    # All content type interfaces
├── registry.ts                 # Component metadata registry
├── validate.ts                 # Content capacity validation
├── template-registry.ts        # Template definitions + helpers
├── template-types.ts           # Template type interfaces
├── template-validation.ts      # Template contract validation
├── presets/base-presets.ts      # Colour preset definitions
├── components/lectio/          # 23 educational components
├── components/ui/              # shadcn-svelte primitives (internal)
└── templates/                  # Template layout files (internal)
```
