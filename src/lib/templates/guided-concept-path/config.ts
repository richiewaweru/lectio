import type { TemplateContract } from '$lib/template-types';

import { guidedConceptPathPresetIds } from './presets';

export const guidedConceptPathContract: TemplateContract = {
	id: 'guided-concept-path',
	name: 'Guided Concept Path',
	family: 'guided-concept',
	intent: 'introduce-concept',
	tagline: 'Lead with felt need, then move steadily toward formal understanding and practice.',
	readingStyle: 'linear-guided',
	tags: ['Universal', 'Sidebar glossary', 'Step reveal', 'Screen-first'],
	bestFor: [
		'first exposure to a concept',
		'math, science, economics, and grammar lessons',
		'teacher-led or student-led structured reading'
	],
	notIdealFor: [
		'highly visual topics that need the figure to lead',
		'comparison-heavy lessons with multiple equal concepts'
	],
	learnerFit: ['general', 'scaffolded'],
	subjects: ['mathematics', 'science', 'economics', 'english'],
	interactionLevel: 'medium',
	lessonFlow: ['Hook', 'Explain', 'Define', 'Example', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: [
		'definition-card',
		'worked-example-card',
		'pitfall-alert',
		'glossary-rail',
		'diagram-block'
	],
	defaultBehaviours: {
		'worked-example-card': 'step-reveal',
		'practice-stack': 'accordion',
		'glossary-rail': 'sticky',
		'diagram-block': 'zoom'
	},
	layoutNotes: [
		'Main reading column leads the page.',
		'Glossary can live in a sticky right rail on desktop.',
		'Examples and practice arrive after the core explanation.'
	],
	responsiveRules: [
		'Collapse to a single reading column below desktop.',
		'Move glossary support into inline vocabulary support on smaller screens.'
	],
	printRules: [
		'Expand step-based content for print.',
		'Flatten the glossary rail into inline vocabulary notes at the end of the section.'
	],
	allowedPresets: [...guidedConceptPathPresetIds],
	whyThisTemplateExists:
		'This is the stable baseline Lectio lesson: predictable enough for first exposure, flexible enough to fit most classroom subjects.',
	generationGuidance: {
		tone: 'clear and teacherly',
		pacing: 'steady',
		chunking: 'medium',
		emphasis: 'explanation before formality',
		avoid: ['long uninterrupted prose', 'overloaded side content']
	},
	preview: {
		subjectExample: 'Mathematics',
		sectionTitle: 'Why does calculus exist?',
		previewContentId: 'calc-01'
	}
};
