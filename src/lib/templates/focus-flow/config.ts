import type { TemplateContract } from '$lib/template-types';

import { focusFlowPresetIds } from './presets';

export const focusFlowContract: TemplateContract = {
	id: 'focus-flow',
	name: 'Focus Flow',
	family: 'focus-accommodation',
	intent: 'reduce-overload',
	tagline: 'Reduce simultaneous load and present one meaningful chunk at a time.',
	readingStyle: 'chunked-focus',
	tags: ['ADHD-friendly', 'Reduced clutter', 'Single-column', 'Supportive pacing'],
	bestFor: [
		'learners who benefit from fewer competing elements',
		'ADHD-friendly and dyslexia-sensitive support',
		'scaffolded classroom or intervention settings'
	],
	notIdealFor: ['dense comparison lessons', 'topics that require multiple simultaneous visuals'],
	learnerFit: ['adhd-friendly', 'dyslexia-sensitive', 'scaffolded'],
	subjects: ['mathematics', 'science', 'english'],
	interactionLevel: 'light',
	lessonFlow: ['Hook', 'Short explain', 'Support cue', 'Practice', 'Reflect', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['definition-card', 'glossary-inline', 'pitfall-alert', 'reflection-prompt'],
	defaultBehaviours: {
		'practice-stack': 'flat-list',
		'glossary-inline': 'hint-toggle',
		'definition-card': 'plain-formal-toggle'
	},
	layoutNotes: [
		'Keep the page in a strict single-column flow.',
		'Use stronger spacing and fewer simultaneous elements.',
		'Vocabulary support should appear in place, not as a competing sidebar.'
	],
	responsiveRules: [
		'Maintain the same single-column rhythm on all breakpoints.',
		'Avoid introducing sidebars or split columns at larger sizes.'
	],
	printRules: [
		'Keep the same chunked order in print.',
		'Render practice in flat list order with space preserved.'
	],
	allowedPresets: [...focusFlowPresetIds],
	whyThisTemplateExists:
		'Accommodation is not only a color choice. This template structurally lowers cognitive load by removing simultaneous competition on the page.',
	generationGuidance: {
		tone: 'calm and supportive',
		pacing: 'slow enough to breathe between ideas',
		chunking: 'short',
		emphasis: 'one idea at a time',
		avoid: ['visual crowding', 'long explanatory walls', 'competing side content']
	},
	preview: {
		subjectExample: 'Mathematics',
		sectionTitle: 'Fractions as equal parts',
		previewContentId: 'math-focus-01'
	}
};
