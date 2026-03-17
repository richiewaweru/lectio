import type { TemplateContract } from '$lib/template-types';

import { formalTrackPresetIds } from './presets';

export const formalTrackContract: TemplateContract = {
	id: 'formal-track',
	name: 'Formal Track',
	family: 'guided-concept',
	intent: 'build-rigor',
	tagline: 'Move quickly into formal definitions and rigorous reasoning with minimal hand-holding.',
	readingStyle: 'formal-rigorous',
	tags: ['Print-first', 'Formal', 'Advanced', 'Low ornament'],
	bestFor: [
		'advanced learners',
		'proof-adjacent or definition-heavy lessons',
		'print-first or exam-prep contexts'
	],
	notIdealFor: [
		'first exposure with fragile conceptual footing',
		'learners who need heavy visual or vocabulary scaffolding'
	],
	learnerFit: ['advanced', 'analytical'],
	subjects: ['mathematics', 'physics', 'economics'],
	interactionLevel: 'none',
	lessonFlow: ['Hook', 'Formal explanation', 'Definition', 'Worked case', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'explanation-block',
		'definition-card',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['worked-example-card', 'pitfall-alert'],
	defaultBehaviours: {},
	layoutNotes: [
		'Keep the lesson in a print-first single column.',
		'Prefer formal explanation and static worked examples over progressive disclosure.'
	],
	responsiveRules: [
		'No sidebar or split layouts.',
		'Preserve the same ordering and density across breakpoints.'
	],
	printRules: [
		'Render as a clean static worksheet-like page.',
		'Avoid introducing any interaction-dependent supports.'
	],
	allowedPresets: [...formalTrackPresetIds],
	whyThisTemplateExists:
		'Some classes want the rigorous version immediately. Formal Track provides a direct path without decorative scaffolding.',
	generationGuidance: {
		tone: 'formal and precise',
		pacing: 'brisk',
		chunking: 'tight',
		emphasis: 'definitions, notation, and justification',
		avoid: ['chatty analogies', 'excess side support', 'visual ornament']
	},
	preview: {
		subjectExample: 'Mathematics',
		sectionTitle: 'The formal derivative definition',
		previewContentId: 'math-formal-01'
	}
};
