import type { LectioComponentPublicMetadata } from '$lib/lectio/core/types';
import type { BehaviourMode } from '$lib/schema/types';

export const metadata = {
	registryKey: 'DiagramBlock',
	id: 'diagram-block',
	name: 'DiagramBlock',
	phase: 6,

	role: "Makes spatial or relational structure visible",

	cognitiveJob: "See the structure",
	subjects: ["universal"],
	behaviourModes: ['static', 'zoom', 'hint-toggle'] as const satisfies readonly BehaviourMode[],

	capabilities: {"acceptsMedia":false,"acceptsQuestions":false,"producesAnswerKey":false,"interactive":false,"isMedia":true},
	capacity: {"calloutsMax":6,"captionMaxWords":60},

	teachingIntent: 'visualize',
	status: 'stable',
	sectionField: 'diagram',
	shadcnPrimitive: "Card + Dialog",
	generationHint: "Write a caption that precisely describes the visual ΓÇö name every labeled element, the relationship or structure being shown, and what the student should notice first. Use present tense. Max 60 words. A good caption works as a standalone description of the image: someone reading it knows exactly what is drawn without having read the section. Do not describe the topic in general terms ΓÇö describe what is visible."
} satisfies LectioComponentPublicMetadata;

