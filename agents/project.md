# Project Config

Lectio — an educational UI component library that renders AI-generated textbook sections.
Frontend-only SvelteKit project. Each component represents a cognitive interaction in a learning arc.

## Architecture

Layer structure under `src/lib/`:

| Layer | Path | Purpose |
| --- | --- | --- |
| Types | `types.ts` | Content schema interfaces — all components depend on these |
| Registry | `registry.ts` | Component metadata — single source of truth for showcase + nav |
| Validate | `validate.ts` | Capacity warning system — warns in dev console, never blocks |
| Content | `dummy-content.ts` | Test content (calculus section) |
| UI Primitives | `components/ui/` | shadcn-svelte wrappers around bits-ui |
| Components | `components/lectio/` | 8 educational components (HookHero, ExplanationBlock, etc.) |
| Templates | `templates/` | Assembly strategies (GuidedConceptPath) |
| Routes | `src/routes/` | Showcase pages (landing, components, templates) |

Data flows downward: Types → Components → Templates → Routes.

Critical invariants:
- Components are content-driven: they receive typed content props, never fetch data
- Capacity limits are warnings, not hard errors — console.warn in dev only
- Components use shadcn-svelte/bits-ui primitives, never raw HTML form elements
- Svelte 5 runes syntax ($props, $state, $bindable) — no `export let`

## Validation Commands

```bash
npm run check    # svelte-kit sync + svelte-check (TypeScript + Svelte)
npm run build    # Production build
npm run dev      # Dev server at localhost:5173
```

## Conventions

- **Commits**: `type(scope): summary` — types: feat, fix, refactor, docs, test, chore, ci, build
- **Branches**: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`
- **Protected branches**: `main`
- **Package manager**: `npm`
- **Svelte version**: Svelte 5 with runes syntax
- **CSS**: Tailwind CSS v4 with @tailwindcss/vite plugin

## Key Entities

- `SectionContent` — aggregate interface driving a full template render (hook, explanation, definition, worked_example, pitfall, practice, glossary, what_next)
- `ComponentMeta` — metadata for each component (id, name, purpose, cognitiveJob, capacity limits)
- `componentRegistry` — record mapping component names to their ComponentMeta
- `GuidedConceptPath` — template that assembles all components in instructional arc order
