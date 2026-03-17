import type { TemplateContract } from '$lib/template-types';

import { figureFirstPresetIds } from './presets';

export const figureFirstContract: TemplateContract = {
	id: 'figure-first',
	name: 'Figure First',
	family: 'visual-exploration',
	intent: 'explain-visually',
	tagline: 'Let a single dominant figure do the teaching before prose names what it shows.',
	readingStyle: 'visual-first',
	tags: ['Visual-first', 'Diagram zoom', 'Science-ready', 'Screen-first'],
	bestFor: [
		'biology, chemistry, geography, and anatomy lessons',
		'topics where the learner needs a spatial anchor before vocabulary lands',
		'visual or mixed-modality classrooms'
	],
	notIdealFor: ['topics with little visual structure', 'proof-style or text-dense formal lessons'],
	learnerFit: ['visual', 'general'],
	subjects: ['biology', 'chemistry', 'geography', 'science'],
	interactionLevel: 'medium',
	lessonFlow: ['Hook', 'Diagram', 'Explain', 'Process', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'diagram-block',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['glossary-rail', 'process-steps', 'pitfall-alert'],
	defaultBehaviours: {
		'diagram-block': 'zoom',
		'practice-stack': 'accordion',
		'glossary-rail': 'inline-strip',
		'process-steps': 'step-reveal'
	},
	layoutNotes: [
		'The figure is the main teaching surface high on the page.',
		'Supporting prose and process notes clarify the figure instead of replacing it.',
		'Vocabulary support stays in-line rather than in a sidebar.'
	],
	responsiveRules: [
		'Keep the figure near the top on all breakpoints.',
		'Stack explanation and process support beneath the figure on smaller screens.'
	],
	printRules: [
		'Render the diagram as a full-width static figure in print.',
		'Expand process steps in print so no interaction is required.'
	],
	allowedPresets: [...figureFirstPresetIds],
	whyThisTemplateExists:
		'Some ideas become understandable the moment the learner can point at the structure. This template lets the figure do that work first.',
	generationGuidance: {
		tone: 'observational and clear',
		pacing: 'front-load the visual anchor',
		chunking: 'medium',
		emphasis: 'name what the learner can already see',
		avoid: [
			'burying the figure below the fold',
			'text that repeats the caption without adding meaning'
		]
	},
	preview: {
		subjectExample: 'Biology',
		sectionTitle: 'How photosynthesis moves energy',
		previewContentId: 'bio-figure-first-01'
	}
};
