# Registry-Driven Field Map

The component registry is the single source of truth for the mapping between Lectio components and their `SectionContent` fields. This document explains how the system works, how to extend it, and how pipeline consumers should interact with it after the March 19, 2026 packaging and contract-export updates.

## The Problem This Solves

Previously, the mapping from component IDs (for example `"practice-stack"`) to `SectionContent` fields (for example `"practice"`) was hardcoded in `template-validation.ts` as a lookup table. That created three problems:

1. Duplication: the registry already knew which components existed, but a separate map had to be maintained in sync.
2. Fragility: adding a new component required updating both the registry and the map.
3. Pipeline leakage: downstream tools would need their own copy of the same map, creating another source of truth.

## How It Works Now

### `sectionField` on `ComponentMeta`

Every component in the registry declares a `sectionField` property:

```typescript
// src/lib/registry.ts

export interface ComponentMeta {
  sectionField: keyof SectionContent | null;
}
```

- Most components set this to the `SectionContent` key they read from.
- Components used inline without a dedicated block field set this to `null`. Right now that is `GlossaryInline`.

### `getComponentFieldMap()`

A helper derives the component-to-field map from the registry at runtime:

```typescript
import { getComponentFieldMap } from '$lib/registry';

const map = getComponentFieldMap();
// => { "section-header": "header", "hook-hero": "hook", ... }
```

- Components with `sectionField: null` are excluded.
- This helper is used by both `template-validation.ts` and `scripts/export-contracts.ts`.

## How To Add A New Component

Four steps. Nothing else should need hand-maintained synchronization.

1. Create the `.svelte` file in `src/lib/components/lectio/`.
2. Register the component in `src/lib/registry.ts` with `sectionField` declared.
3. Add the corresponding field to `SectionContent` in `src/lib/types.ts`.
4. Rerun the contract export:

```bash
npm run export-contracts
```

That updates the field map, template validation inputs, and exported JSON snapshots together.

## For Pipeline Consumers

The pipeline should never import from `src/`. Instead, it should read exported JSON contracts from `agents/contracts/`.

### Generating Contracts

```bash
npm run export-contracts
npm run export-contracts -- --out ../some-other-project/contracts
LECTIO_CONTRACTS_DIR=../some-other-project/contracts npm run export-contracts
```

This produces four types of files:

| File | Contents |
|---|---|
| `{template-id}.json` | Template contract (required/optional components, generation guidance, behaviours, `allowed_presets`) |
| `component-field-map.json` | Component ID to `SectionContent` field mapping |
| `component-registry.json` | Full component metadata (capacity limits, behaviour modes, status) |
| `preset-registry.json` | Preset palette, typography, density, and surface-style metadata |

### Using The Field Map

The `component-field-map.json` file maps component IDs to their `SectionContent` fields:

```json
{
  "section-header": "header",
  "hook-hero": "hook",
  "explanation-block": "explanation",
  "practice-stack": "practice",
  "simulation-block": "simulation"
}
```

Use this to validate that generated sections include the correct fields for the template's required components without importing Lectio internals.

### Using The Component Registry

The `component-registry.json` file provides capacity limits and metadata for each component:

```json
{
  "practice-stack": {
    "id": "practice-stack",
    "name": "PracticeStack",
    "section_field": "practice",
    "capacity": {
      "problemsMin": 2,
      "problemsMax": 5,
      "hintsPerProblemMax": 3
    },
    "behaviour_modes": ["hint-toggle", "accordion", "progressive-hints", "flat-list"],
    "status": "stable"
  }
}
```

### Using The Preset Registry

The `preset-registry.json` file exposes the visual preset metadata that downstream generators may need when choosing or validating a theme:

```json
{
  "blue-classroom": {
    "id": "blue-classroom",
    "name": "Blue Classroom",
    "palette": "cool blue",
    "typography": "scholarly",
    "density": "comfortable",
    "surface_style": "glass"
  }
}
```

Template contract exports also include `allowed_presets`, so a consumer can reject unsupported template and preset combinations before rendering.

## Architecture Diagram

```text
src/lib/registry.ts          (single source of truth)
  ComponentMeta.sectionField
  getComponentFieldMap()
        |
        |--> src/lib/template-validation.ts   (derives map at import time)
        |
        '--> scripts/export-contracts.ts      (exports to JSON, supports --out)
                  |
                  '--> agents/contracts/       (pipeline reads these)
                         |-- component-field-map.json
                         |-- component-registry.json
                         |-- preset-registry.json
                         '-- {template-id}.json
```

## Key Files

| File | Role |
|---|---|
| `src/lib/registry.ts` | Component registry with `sectionField` and `getComponentFieldMap()` |
| `src/lib/template-validation.ts` | Template validation that derives the field map from the registry |
| `scripts/export-contracts.ts` | Exports contracts to `agents/contracts/` |
| `src/lib/presets/base-presets.ts` | Source of truth for preset metadata exported to JSON |
| `src/lib/types.ts` | `SectionContent` interface |
| `src/test/lectio.test.ts` | Tests for field map correctness |
| `src/test/runtime-surface.test.ts` | Tests for public preview and runtime surfaces |
