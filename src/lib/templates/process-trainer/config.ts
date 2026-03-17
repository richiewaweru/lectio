import type { TemplateContract } from '$lib/template-types';

import { processTrainerPresetIds } from './presets';

export const processTrainerContract: TemplateContract = {
	id: 'process-trainer',
	name: 'Process Trainer',
	family: 'process-procedure',
	intent: 'teach-procedure',
	tagline: 'Turn a repeatable procedure into a clear sequence the learner can follow and rehearse.',
	readingStyle: 'process-led',
	tags: ['Procedure', 'Stepwise', 'Worked case', 'Print-friendly'],
	bestFor: [
		'repeatable methods in math and science',
		'algorithmic or checklist-driven tasks',
		'lessons where order is non-negotiable'
	],
	notIdealFor: [
		'open-ended narrative topics',
		'classification lessons with no clear execution order'
	],
	learnerFit: ['general', 'scaffolded'],
	subjects: ['mathematics', 'chemistry', 'physics'],
	interactionLevel: 'light',
	lessonFlow: ['Hook', 'Procedure', 'Worked case', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'process-steps',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['worked-example-card', 'pitfall-alert', 'explanation-block'],
	defaultBehaviours: {
		'process-steps': 'step-reveal',
		'practice-stack': 'flat-list'
	},
	layoutNotes: [
		'The process steps are the backbone of the page.',
		'A worked case appears after the steps to show the procedure in action.'
	],
	responsiveRules: [
		'Keep the procedure visible above the worked case on all breakpoints.',
		'Use a single-column flow so the learner can follow with one finger.'
	],
	printRules: [
		'Expand the full process sequence in print.',
		'Keep practice directly below the method.'
	],
	allowedPresets: [...processTrainerPresetIds],
	whyThisTemplateExists:
		'Some lessons are primarily about doing the method correctly. This template makes the procedure unmistakable and rehearsable.',
	generationGuidance: {
		tone: 'clear and procedural',
		pacing: 'ordered and steady',
		chunking: 'step by step',
		emphasis: 'show why each step enables the next',
		avoid: ['jumping ahead', 'burying the method under too much exposition']
	},
	preview: {
		subjectExample: 'Chemistry',
		sectionTitle: 'Balancing chemical equations',
		previewContentId: 'chem-process-01'
	}
};
