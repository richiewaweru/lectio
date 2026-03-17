import type { TemplateContract } from '$lib/template-types';

import { distinctionGridPresetIds } from './presets';

export const distinctionGridContract: TemplateContract = {
	id: 'distinction-grid',
	name: 'Distinction Grid',
	family: 'compare-distinguish',
	intent: 'compare-ideas',
	tagline:
		'Classify three or more related ideas by keeping every distinguishing criterion visible.',
	readingStyle: 'side-by-side',
	tags: ['Classification', 'Three-way contrast', 'Analytical', 'Grid-based'],
	bestFor: [
		'three-way or four-way concept distinctions',
		'classification tasks in civics, biology, or social science',
		'lessons where learners confuse adjacent categories'
	],
	notIdealFor: ['binary contrasts that only need two concepts', 'narrative or process-driven lessons'],
	learnerFit: ['analytical', 'advanced'],
	subjects: ['civics', 'biology', 'history'],
	interactionLevel: 'light',
	lessonFlow: ['Hook', 'Frame', 'Classify', 'Apply', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'comparison-grid',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['definition-family', 'insight-strip', 'pitfall-alert'],
	defaultBehaviours: {
		'practice-stack': 'flat-list'
	},
	layoutNotes: [
		'The grid holds three or more categories in view simultaneously.',
		'Short framing text should clarify the classification criteria before practice.'
	],
	responsiveRules: [
		'Allow the grid to scroll horizontally on smaller screens.',
		'Keep the apply practice in a single block beneath the grid.'
	],
	printRules: [
		'Print as a wide classification table.',
		'Use flat practice so the learner can write directly below the contrast.'
	],
	allowedPresets: [...distinctionGridPresetIds],
	whyThisTemplateExists:
		'Two-way contrasts are not always enough. This template helps learners classify among several neighboring categories without losing the criteria.',
	generationGuidance: {
		tone: 'precise and classificatory',
		pacing: 'frame the criteria before applying them',
		chunking: 'tight',
		emphasis: 'help the learner sort categories confidently',
		avoid: ['unlabeled criteria', 'classification practice without a visible grid']
	},
	preview: {
		subjectExample: 'Civics',
		sectionTitle: 'Unitary, federal, and confederal systems',
		previewContentId: 'civics-distinction-01'
	}
};
