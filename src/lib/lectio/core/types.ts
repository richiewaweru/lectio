import type { ZodTypeAny } from 'zod';

import type { BehaviourMode } from '$lib/schema/types';

export type LectioPhase = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ComponentStatus = 'stable' | 'beta' | 'planned';

export type BreakBehavior = 'allow' | 'avoid' | 'force-new-page';
export type PreferredWidth = 'full' | 'half' | 'inline';

export interface LectioCapabilities {
	acceptsMedia: boolean;
	acceptsQuestions: boolean;
	producesAnswerKey: boolean;
	interactive: boolean;
	isMedia: boolean;
}

export interface LectioPrintSpec {
	breakBehavior: BreakBehavior;
	preferredWidth: PreferredWidth;
	/** Mirrors legacy registry `printFallback` / pipeline `print_fallback` */
	fallback: string;
	notes?: string;
}

/** V3-facing metadata carried alongside legacy `ComponentMeta` fields during migration */
export interface LectioComponentPublicMetadata {
	id: string;
	name: string;
	phase: LectioPhase;

	/** Agent-readable structural role (lesson-plan rules live elsewhere) */
	role: string;

	cognitiveJob: string;
	subjects: readonly string[];
	behaviourModes: readonly BehaviourMode[];

	capabilities: LectioCapabilities;
	capacity: Record<string, number | string>;

	status: ComponentStatus;

	/**
	 * Field on SectionContent that this component renders.
	 * `null` for inline-only components (omit from component-field-map).
	 */
	sectionField: string | null;

	generationHint?: string;
	shadcnPrimitive: string;

	/** Registry object key (`SectionHeader`, `WorkedExampleCard`, …) — stable importer surface */
	registryKey: string;
}

/** Contract + metadata bundle safe to import from Node exporters (no `.svelte`) */
export interface LectioContentModule {
	schema: ZodTypeAny;
	metadata: LectioComponentPublicMetadata;
	print: LectioPrintSpec;
	examples: unknown[];
}

/** Optional renderer — only bundled in UI builds */
export interface LectioComponentModule extends LectioContentModule {
	component?: unknown;
}
