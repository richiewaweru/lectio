import type { LectioComponentPublicMetadata } from '$lib/lectio/core/types';
import type { BehaviourMode } from '$lib/schema/types';

export const metadata = {
	registryKey: 'HookHero',
	id: 'hook-hero',
	name: 'HookHero',
	phase: 1,

	role: "Creates felt need before explanation arrives",

	cognitiveJob: "Create felt need",
	subjects: ["universal"],
	behaviourModes: ['static'] as const satisfies readonly BehaviourMode[],

	capabilities: {"acceptsMedia":false,"acceptsQuestions":false,"producesAnswerKey":false,"interactive":false,"isMedia":false},
	capacity: {"headlineMaxWords":12,"bodyMaxWords":80},

	status: 'stable',
	sectionField: 'hook',
	shadcnPrimitive: "none - pure layout"
} satisfies LectioComponentPublicMetadata;
