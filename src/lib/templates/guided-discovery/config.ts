import type { TemplateContract } from '$lib/template-types';

import { guidedDiscoveryPresetIds } from './presets';

export const guidedDiscoveryContract: TemplateContract = {
	id: 'guided-discovery',
	name: 'Guided Discovery',
	family: 'guided-concept',
	intent: 'introduce-concept',
	tagline: 'Read the concept, then test it hands-on before practising.',
	readingStyle: 'linear-guided',
	tags: ['Scaffolded', 'Simulation-supported', 'Glossary sidebar', 'Screen-first'],
	bestFor: [
		'concepts that need context before interaction makes sense',
		'lessons where learners benefit from explanation then verification',
		'STEM and life-science topics with quantitative relationships'
	],
	notIdealFor: [
		'topics best learned through pure exploration without guidance',
		'highly visual subjects where the figure should lead entirely'
	],
	learnerFit: ['general', 'scaffolded', 'analytical'],
	subjects: ['mathematics', 'physics', 'biology', 'chemistry'],
	interactionLevel: 'high',
	lessonFlow: ['Hook', 'Explain', 'Define', 'Simulate', 'Example', 'Practice', 'Reflect', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'explanation-block',
		'simulation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: [
		'definition-card',
		'worked-example-card',
		'pitfall-alert',
		'glossary-rail',
		'diagram-block',
		'reflection-prompt'
	],
	defaultBehaviours: {
		'practice-stack': 'progressive-hints',
		'glossary-rail': 'sticky',
		'worked-example-card': 'step-reveal',
		'diagram-block': 'zoom'
	},
	layoutNotes: [
		'Two-column layout: main content with glossary sidebar on desktop.',
		'Simulation appears after explanation — learners verify what they just read.',
		'Reflection prompt closes the loop before the what-next bridge.'
	],
	responsiveRules: [
		'Collapse glossary sidebar into inline vocabulary below tablet.',
		'Simulation stays full width of the main column at all breakpoints.'
	],
	printRules: [
		'Replace simulation with its fallback diagram.',
		'Flatten glossary rail into inline notes at section end.',
		'Expand step-reveal worked examples for print.'
	],
	allowedPresets: [...guidedDiscoveryPresetIds],
	whyThisTemplateExists:
		'Not every concept is best learned by jumping in blind. This template gives learners enough context to interact meaningfully, then uses the simulation to confirm and deepen understanding.',
	generationGuidance: {
		tone: 'clear and teacherly — build understanding before interaction',
		pacing: 'steady, explanation-first',
		chunking: 'medium',
		emphasis: 'explanation leads, simulation confirms',
		avoid: ['skipping explanation before simulation', 'overwhelming the interactive with too much context']
	},
	preview: {
		subjectExample: 'Mathematics',
		sectionTitle: 'Probability of Compound Events',
		previewContentId: 'disc-math-01'
	}
};
