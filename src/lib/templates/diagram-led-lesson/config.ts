import type { TemplateContract } from '$lib/template-types';

import { diagramLedLessonPresetIds } from './presets';

export const diagramLedLessonContract: TemplateContract = {
	id: 'diagram-led-lesson',
	name: 'Diagram-Led Lesson',
	family: 'visual-exploration',
	intent: 'explain-visually',
	tagline: 'Use a sequence of diagrams to teach change over stages before prose fills the gaps.',
	readingStyle: 'visual-first',
	tags: ['Diagram series', 'Stage-by-stage', 'Science-ready', 'Medium interaction'],
	bestFor: [
		'processes that unfold in visible stages',
		'science lessons where each stage changes the structure',
		'classes that benefit from stepwise visual progression'
	],
	notIdealFor: ['single static visuals', 'topics with no meaningful stage progression'],
	learnerFit: ['visual', 'general'],
	subjects: ['biology', 'chemistry', 'earth-science'],
	interactionLevel: 'medium',
	lessonFlow: ['Hook', 'Diagram series', 'Explain', 'Process', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'diagram-series',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['process-steps', 'glossary-rail', 'pitfall-alert'],
	defaultBehaviours: {
		'diagram-series': 'static',
		'process-steps': 'step-reveal',
		'glossary-rail': 'inline-strip'
	},
	layoutNotes: [
		'A staged visual progression is the main structure.',
		'Prose should clarify the progression instead of replacing it.'
	],
	responsiveRules: [
		'Keep the full stage sequence above the explanatory prose.',
		'Inline glossary support remains beneath the diagrams on smaller screens.'
	],
	printRules: [
		'Print all diagrams in sequence with their stage captions.',
		'Expand the process steps below the sequence.'
	],
	allowedPresets: [...diagramLedLessonPresetIds],
	whyThisTemplateExists:
		'Some ideas are best learned as a visible sequence. This template turns that sequence into the lesson backbone.',
	generationGuidance: {
		tone: 'observational and explanatory',
		pacing: 'move stage by stage',
		chunking: 'medium',
		emphasis: 'show how each stage changes the system',
		avoid: ['burying the stage sequence under prose', 'using only one diagram when change is the point']
	},
	preview: {
		subjectExample: 'Biology',
		sectionTitle: 'Stages of mitosis',
		previewContentId: 'bio-diagram-led-01'
	}
};
