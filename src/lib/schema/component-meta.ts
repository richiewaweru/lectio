import type { BehaviourMode, SectionContent } from './types';

/** Legacy Lectio palette + contract metadata consumed by builders and exporters */
export interface ComponentMeta {
	id: string;
	/** Short label for the builder palette */
	teacherLabel: string;
	/** One-sentence description for teachers */
	teacherDescription: string;
	name: string;
	purpose: string;
	cognitiveJob: string;
	subjects: string[];
	behaviourModes: BehaviourMode[];
	shadcnPrimitive: string;
	capacity: Record<string, number | string>;
	printFallback: string;
	/** Guidance for external generators producing this component's section field content */
	generationHint?: string;
	status: 'stable' | 'beta' | 'planned';
	group: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	/**
	 * Field in SectionContent this component renders.
	 *
	 * null means inline-only usage (no dedicated SectionContent column).
	 */
	sectionField: keyof SectionContent | null;
}
