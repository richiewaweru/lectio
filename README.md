# Lectio Svelte

Lectio is the SvelteKit implementation of the Lectio educational component library. It renders structured lesson content into reusable teaching components and registry-driven lesson templates.

## Current Status

- 22 public teaching components are exported from `src/lib/components/lectio/index.ts`.
- 10 starter templates ship through the shared template registry in `src/lib/template-registry.ts`.
- Public routes are `/components`, `/templates`, and `/templates/[templateId]`.
- Legacy files such as `src/lib/templates/GuidedConceptPath.svelte` and `src/lib/templates/EnrichedLearningPath.svelte` remain as internal reference and QA surfaces, not the public template system.

## Stack

- SvelteKit
- Svelte 5 runes
- TypeScript
- Tailwind CSS v4
- shadcn-svelte style UI primitives backed by bits-ui
- Vitest + Testing Library

## Commands

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
```

## Key Docs

- `docs/reference/component-guide.md`
- `docs/project/handoffs/project-state-handoff-2026-03-17.md`
- `docs/project/runs/phase8-source-of-truth-sync.md`

## Notes

- The template detail page uses a left-side persistent contract drawer on `md+` and a temporary mobile sheet, with desktop preference stored in `localStorage`.
- The current code in `src/lib/` is the source of truth over older planning briefs.
