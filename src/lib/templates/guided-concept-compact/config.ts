import type { TemplateContract } from '$lib/template-types';

import { guidedConceptCompactPresetIds } from './presets';

export const guidedConceptCompactContract: TemplateContract = {
	id: 'guided-concept-compact',
	name: 'Guided Concept Compact',
	family: 'guided-concept',
	intent: 'introduce-concept',
	tagline:
		'Keep the same guided arc, but compress it for confident learners and tighter lessons.',
	readingStyle: 'linear-guided',
	tags: ['Compact', 'Single-column', 'Fast pace', 'Light interaction'],
	bestFor: [
		'confident learners who still benefit from a clear arc',
		'shorter classroom segments',
		'revision lessons that still need a quick concept scaffold'
	],
	notIdealFor: [
		'learners who need heavy vocabulary or side support',
		'topics that require a dominant figure or comparison spine'
	],
	learnerFit: ['general', 'advanced'],
	subjects: ['mathematics', 'science', 'economics', 'english'],
	interactionLevel: 'light',
	lessonFlow: ['Hook', 'Explain', 'Define', 'Example', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['definition-card', 'worked-example-card', 'pitfall-alert'],
	defaultBehaviours: {
		'worked-example-card': 'accordion',
		'practice-stack': 'accordion'
	},
	layoutNotes: [
		'Stay in a single column with no sidebar.',
		'Use a shorter concept arc than Guided Concept Path.'
	],
	responsiveRules: ['Keep the same single-column pacing at all sizes.'],
	printRules: ['Expand accordion content in print.', 'Keep the order compact and uninterrupted.'],
	allowedPresets: [...guidedConceptCompactPresetIds],
	whyThisTemplateExists:
		'Not every guided lesson needs the full side support. This version keeps the pedagogy but trims the surface area.',
	generationGuidance: {
		tone: 'direct and efficient',
		pacing: 'faster than the full guided path',
		chunking: 'tight',
		emphasis: 'clarity without extra support furniture',
		avoid: ['too many optional blocks', 'slow detours']
	},
	preview: {
		subjectExample: 'Mathematics',
		sectionTitle: 'Solving two-step equations',
		previewContentId: 'math-compact-01'
	}
};
