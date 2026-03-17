import type { TemplateContract } from '$lib/template-types';

import { timelineNarrativePresetIds } from './presets';

export const timelineNarrativeContract: TemplateContract = {
	id: 'timeline-narrative',
	name: 'Timeline Narrative',
	family: 'narrative-timeline',
	intent: 'teach-sequence',
	tagline:
		'Teach through chronology so the learner experiences the concept as forward motion through time.',
	readingStyle: 'chronological',
	tags: ['Timeline', 'Narrative', 'History-ready', 'Cause and consequence'],
	bestFor: [
		'history lessons and discovery stories',
		'topics where sequence and cause matter more than static definition',
		'learners who retain ideas best as a story'
	],
	notIdealFor: [
		'pure classification lessons',
		'procedures where the learner must execute each step directly'
	],
	learnerFit: ['narrative', 'general'],
	subjects: ['history', 'science', 'english'],
	interactionLevel: 'medium',
	lessonFlow: ['Hook', 'Timeline', 'Explain', 'Reflect', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'timeline-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['explanation-block', 'reflection-prompt', 'pitfall-alert'],
	defaultBehaviours: {
		'timeline-block': 'timeline-scrubber',
		'practice-stack': 'accordion'
	},
	layoutNotes: [
		'The timeline is the spine of the page.',
		'Short explanation and reflection blocks help the learner make sense of the chronology.'
	],
	responsiveRules: [
		'Keep the timeline above the explanatory prose on all breakpoints.',
		'The scrubber should degrade gracefully to a readable event stack.'
	],
	printRules: [
		'Flatten the timeline into a vertical event list in print.',
		'Keep reflection and practice below the full chronology.'
	],
	allowedPresets: [...timelineNarrativePresetIds],
	whyThisTemplateExists:
		'Some knowledge is understood as a story with causes and consequences. This template lets time itself become the reading order.',
	generationGuidance: {
		tone: 'story-forward and explanatory',
		pacing: 'chronological',
		chunking: 'event by event',
		emphasis: 'show how one moment leads to the next',
		avoid: ['dropping the chronology', 'isolated facts with no sequence']
	},
	preview: {
		subjectExample: 'History',
		sectionTitle: 'How germ theory took hold',
		previewContentId: 'hist-timeline-01'
	}
};
