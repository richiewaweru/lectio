import type { TemplateContract } from '$lib/template-types';

import { compareAndApplyPresetIds } from './presets';

export const compareAndApplyContract: TemplateContract = {
	id: 'compare-and-apply',
	name: 'Compare and Apply',
	family: 'compare-distinguish',
	intent: 'compare-ideas',
	tagline:
		'Teach the distinction by holding two ideas in view at the same time and then applying it.',
	readingStyle: 'side-by-side',
	tags: ['Comparison', 'Analytical', 'Two-column thinking', 'Apply after contrast'],
	bestFor: [
		'chemistry contrasts, biology comparisons, and civics distinctions',
		'analytical learners who benefit from explicit criteria',
		'lessons where choosing correctly depends on noticing a difference'
	],
	notIdealFor: [
		'chronological stories',
		'single-concept introductions with no meaningful rival idea'
	],
	learnerFit: ['analytical', 'general'],
	subjects: ['chemistry', 'biology', 'civics', 'literature'],
	interactionLevel: 'light',
	lessonFlow: ['Hook', 'Frame', 'Compare', 'Apply', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'comparison-grid',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: ['definition-card', 'definition-family', 'insight-strip', 'pitfall-alert'],
	defaultBehaviours: {
		'practice-stack': 'accordion',
		'definition-card': 'plain-formal-toggle'
	},
	layoutNotes: [
		'The comparison grid is the center of gravity.',
		'Short framing content should clarify the contrast before practice asks the learner to choose.'
	],
	responsiveRules: [
		'The grid can scroll horizontally on smaller screens but should stay readable.',
		'Practice stays beneath the comparison rather than splitting into a sidebar.'
	],
	printRules: [
		'Render the comparison as a static table in print.',
		'Keep the apply practice directly after the contrast.'
	],
	allowedPresets: [...compareAndApplyPresetIds],
	whyThisTemplateExists:
		'Some concepts only become clear when the learner can compare them criterion by criterion. This template makes that contrast structural.',
	generationGuidance: {
		tone: 'precise and analytical',
		pacing: 'compare early, apply immediately after',
		chunking: 'tight',
		emphasis: 'surface the decision points between the ideas',
		avoid: ['burying the contrast in prose', 'practice that does not depend on the distinction']
	},
	preview: {
		subjectExample: 'Chemistry',
		sectionTitle: 'Alkanes vs alkenes',
		previewContentId: 'chem-compare-01'
	}
};
