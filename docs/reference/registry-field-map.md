# Registry-Driven Field Map

The component registry is the single source of truth for the mapping between Lectio components and their `SectionContent` fields. This document explains how the system works, how to extend it, and how pipeline consumers should interact with it.

## The Problem This Solves

Previously, the mapping from component IDs (e.g. `"practice-stack"`) to `SectionContent` fields (e.g. `"practice"`) was hardcoded in `template-validation.ts` as a 22-entry lookup table. This created three problems:

1. **Duplication** -- the registry already knew which components existed, but a separate map had to be maintained in sync.
2. **Fragility** -- adding a new component required updating both the registry and the map. Nothing enforced that they stayed in sync.
3. **Pipeline leakage** -- the Python pipeline would need its own copy of the same map, creating a third source of truth.

## How It Works Now

### `sectionField` on `ComponentMeta`

Every component in the registry declares a `sectionField` property:

```typescript
// src/lib/registry.ts

export interface ComponentMeta {
  // ... other fields ...
  sectionField: keyof SectionContent | null;
}
```

- Most components set this to the `SectionContent` key they read from (e.g. `'practice'`, `'diagram'`, `'hook'`).
- Components that are used inline and don't have a dedicated block field set this to `null`. Currently only `GlossaryInline` does this.

### `getComponentFieldMap()`

A helper function derives the component-to-field map from the registry at runtime:

```typescript
import { getComponentFieldMap } from '$lib/registry';

const map = getComponentFieldMap();
// => { "section-header": "header", "hook-hero": "hook", ... }
```

- Components with `sectionField: null` are excluded.
- This function is used by `template-validation.ts` and `scripts/export-contracts.ts`. Neither file hardcodes the map.

## How to Add a New Component

Four steps. Nothing else needs to change.

1. **Create the `.svelte` file** in `src/lib/components/lectio/`.

2. **Register the component** in `src/lib/registry.ts` with `sectionField` declared:
   ```typescript
   MyNewComponent: {
     id: 'my-new-component',
     sectionField: 'my_field', // or null if inline
     name: 'MyNewComponent',
     group: 3,
     // ... rest of ComponentMeta
   }
   ```

3. **Add the corresponding field** to `SectionContent` in `src/lib/types.ts`:
   ```typescript
   export interface SectionContent {
     // ...
     my_field?: MyNewComponentContent;
   }
   ```

4. **Run the contract export**:
   ```bash
   npm run export-contracts
   ```

That's it. The field map, template validation, and pipeline contracts all update automatically.

## For Pipeline Consumers

The pipeline should never import from `src/`. Instead, it reads exported JSON contracts from `agents/contracts/`.

### Generating Contracts

```bash
npm run export-contracts
```

This produces three types of files in `agents/contracts/`:

| File | Contents |
|---|---|
| `{template-id}.json` | Template contract (required/optional components, generation guidance, behaviours) |
| `component-field-map.json` | Component ID to `SectionContent` field mapping |
| `component-registry.json` | Full component metadata (capacity limits, behaviour modes, status) |

### Using the Field Map

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

Use this to validate that generated sections include the correct fields for the template's required components without knowing Lectio's internal structure.

### Using the Component Registry

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

## Architecture Diagram

```
src/lib/registry.ts          (single source of truth)
  ComponentMeta.sectionField
  getComponentFieldMap()
        │
        ├──► src/lib/template-validation.ts   (derives map at import time)
        │
        └──► scripts/export-contracts.ts      (exports to JSON)
                  │
                  └──► agents/contracts/       (pipeline reads these)
                         ├── component-field-map.json
                         ├── component-registry.json
                         └── {template-id}.json
```

## Key Files

| File | Role |
|---|---|
| `src/lib/registry.ts` | Component registry with `sectionField` and `getComponentFieldMap()` |
| `src/lib/template-validation.ts` | Template validation -- derives map from registry |
| `scripts/export-contracts.ts` | Exports contracts to `agents/contracts/` |
| `src/lib/types.ts` | `SectionContent` interface |
| `src/test/lectio.test.ts` | Tests for field map correctness |
