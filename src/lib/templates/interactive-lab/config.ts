import type { TemplateContract } from '$lib/template-types';

import { interactiveLabPresetIds } from './presets';

export const interactiveLabContract: TemplateContract = {
	id: 'interactive-lab',
	name: 'Interactive Lab',
	family: 'visual-exploration',
	intent: 'explain-visually',
	tagline: 'Manipulate variables, observe the result, then read why it works.',
	readingStyle: 'visual-first',
	tags: ['STEM', 'Simulation-first', 'Discovery', 'Screen-first'],
	bestFor: [
		'STEM topics where hands-on exploration reveals the concept',
		'lessons where the formula is best understood through manipulation',
		'physics, chemistry, and statistics simulations'
	],
	notIdealFor: [
		'topics that require significant context before interaction makes sense',
		'narrative or history-driven subjects with no quantitative relationships'
	],
	learnerFit: ['visual', 'general', 'scaffolded'],
	subjects: ['mathematics', 'physics', 'chemistry', 'statistics'],
	interactionLevel: 'high',
	lessonFlow: ['Hook', 'Simulate', 'Explain', 'Define', 'Example', 'Practice', 'What next'],
	requiredComponents: [
		'section-header',
		'hook-hero',
		'simulation-block',
		'explanation-block',
		'practice-stack',
		'what-next-bridge'
	],
	optionalComponents: [
		'definition-card',
		'worked-example-card',
		'pitfall-alert',
		'glossary-inline',
		'diagram-block'
	],
	defaultBehaviours: {
		'practice-stack': 'hint-toggle',
		'diagram-block': 'zoom'
	},
	layoutNotes: [
		'Simulation is the hero element — it sits immediately after the hook, full width.',
		'Explanation follows the simulation, framed as confirmation of what the learner just explored.',
		'Single column layout keeps attention on the interactive.'
	],
	responsiveRules: [
		'Simulation stays full width at all breakpoints.',
		'Reduce simulation height on mobile if resizable is true.'
	],
	printRules: [
		'Replace simulation with its fallback diagram.',
		'Add a note indicating the interactive is available online.'
	],
	allowedPresets: [...interactiveLabPresetIds],
	whyThisTemplateExists:
		'Some concepts are best understood by doing first. This template puts the interactive front and centre so learners discover the pattern before reading the formal explanation.',
	generationGuidance: {
		tone: 'curious and encouraging — frame explanation as confirming what the learner just discovered',
		pacing: 'brisk setup, generous exploration, concise theory',
		chunking: 'short',
		emphasis: 'simulation context before formal definitions',
		avoid: ['leading with theory before the interactive', 'long prose before the simulation']
	},
	preview: {
		subjectExample: 'Physics',
		sectionTitle: "Newton's Second Law of Motion",
		previewContentId: 'lab-phys-01'
	}
};
