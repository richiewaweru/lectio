// The component registry - single source of truth
// Drives the showcase page, template generation,
// and contribution review checklist

import type { BehaviourMode } from './types';

export interface ComponentMeta {
	id: string;
	name: string;
	purpose: string;
	cognitiveJob: string;
	subjects: string[];
	behaviourModes: BehaviourMode[];
	shadcnPrimitive: string;
	capacity: Record<string, number | string>;
	printFallback: string;
	status: 'stable' | 'beta' | 'planned';
	group: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const componentRegistry: Record<string, ComponentMeta> = {
	// GROUP 1 - FOUNDATION

	SectionHeader: {
		id: 'section-header',
		name: 'SectionHeader',
		group: 1,
		purpose: 'Opens a section with title, subject, objective, and level indicators',
		cognitiveJob: 'Orient the learner',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Badge (for level pills)',
		capacity: { titleMaxWords: 12, subtitleMaxWords: 20, objectiveMaxWords: 30 },
		printFallback: 'Full static header',
		status: 'stable'
	},

	HookHero: {
		id: 'hook-hero',
		name: 'HookHero',
		group: 1,
		purpose: 'Creates felt need before explanation arrives',
		cognitiveJob: 'Create felt need',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'none - pure layout',
		capacity: { headlineMaxWords: 12, bodyMaxWords: 80 },
		printFallback: 'Pull quote block with left border',
		status: 'stable'
	},

	ExplanationBlock: {
		id: 'explanation-block',
		name: 'ExplanationBlock',
		group: 1,
		purpose: 'Sustained prose that builds a mental model',
		cognitiveJob: 'Build understanding',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Typography',
		capacity: { bodyMaxWords: 350, emphasisMax: 3 },
		printFallback: 'Static prose',
		status: 'stable'
	},

	PrerequisiteStrip: {
		id: 'prerequisite-strip',
		name: 'PrerequisiteStrip',
		group: 1,
		purpose: 'Lists assumed knowledge with optional refresher pop-ups',
		cognitiveJob: 'Activate prior knowledge',
		subjects: ['universal'],
		behaviourModes: ['static', 'hint-toggle'],
		shadcnPrimitive: 'Popover',
		capacity: { itemsMax: 4 },
		printFallback: 'Inline list of prerequisites',
		status: 'stable'
	},

	WhatNextBridge: {
		id: 'what-next-bridge',
		name: 'WhatNextBridge',
		group: 1,
		purpose: 'Connects the section forward to what the concept enables',
		cognitiveJob: 'Connect forward',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Card',
		capacity: { bodyMaxWords: 50, nextMaxWords: 15, previewMaxWords: 30 },
		printFallback: 'Static, amber left rule',
		status: 'stable'
	},

	InterviewAnchor: {
		id: 'interview-anchor',
		name: 'InterviewAnchor',
		group: 1,
		purpose: 'Makes knowledge speakable - rehearse explaining the concept',
		cognitiveJob: 'Make knowledge speakable',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Card',
		capacity: { promptMaxWords: 35, audienceMaxWords: 10, followUpMaxWords: 25 },
		printFallback: 'Static with write-in lines',
		status: 'stable'
	},

	// GROUP 2 - DEFINITION AND KNOWLEDGE

	DefinitionCard: {
		id: 'definition-card',
		name: 'DefinitionCard',
		group: 2,
		purpose: 'Anchors a formal term with formal and plain versions',
		cognitiveJob: 'Anchor formal knowledge',
		subjects: ['universal'],
		behaviourModes: ['static', 'plain-formal-toggle'],
		shadcnPrimitive: 'Card + Collapsible',
		capacity: { formalMaxWords: 80, plainMaxWords: 60, relatedTermsMax: 3 },
		printFallback: 'Both versions shown',
		status: 'stable'
	},

	DefinitionFamily: {
		id: 'definition-family',
		name: 'DefinitionFamily',
		group: 2,
		purpose: 'Groups related terms that belong together conceptually',
		cognitiveJob: 'Distinguish related concepts',
		subjects: ['universal'],
		behaviourModes: ['static', 'accordion'],
		shadcnPrimitive: 'Card + Accordion',
		capacity: { definitionsMax: 4, introMaxWords: 40 },
		printFallback: 'All definitions expanded',
		status: 'stable'
	},

	GlossaryRail: {
		id: 'glossary-rail',
		name: 'GlossaryRail',
		group: 2,
		purpose: 'Vocabulary visible in peripheral field, updates by section',
		cognitiveJob: 'Retrieve meaning without losing place',
		subjects: ['universal'],
		behaviourModes: ['sticky', 'drawer', 'inline-strip'],
		shadcnPrimitive: 'Card + ScrollArea + Sheet',
		capacity: { termsMax: 8, termsWarning: 6, definitionMaxWords: 30 },
		printFallback: 'Inline vocabulary strip at section end',
		status: 'stable'
	},

	GlossaryInline: {
		id: 'glossary-inline',
		name: 'GlossaryInline',
		group: 2,
		purpose: 'In-text definition pop-up on a defined term',
		cognitiveJob: 'Retrieve meaning in context',
		subjects: ['universal'],
		behaviourModes: ['hint-toggle'],
		shadcnPrimitive: 'Popover',
		capacity: { definitionMaxWords: 30 },
		printFallback: 'Term underlined, definition in footnote',
		status: 'stable'
	},

	InsightStrip: {
		id: 'insight-strip',
		name: 'InsightStrip',
		group: 2,
		purpose: 'Side-by-side comparison of 2-3 related values or concepts',
		cognitiveJob: 'Compare values simultaneously',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'CSS Grid',
		capacity: { cellsMax: 3, cellsMin: 2, cellLinesMax: 2 },
		printFallback: 'Static table',
		status: 'stable'
	},

	// GROUP 3 - EXAMPLES AND PROCESS

	WorkedExampleCard: {
		id: 'worked-example-card',
		name: 'WorkedExampleCard',
		group: 3,
		purpose: 'Shows reasoning in action step by step, each step justified',
		cognitiveJob: 'Watch reasoning in action',
		subjects: ['universal'],
		behaviourModes: ['static', 'step-reveal', 'accordion', 'compare'],
		shadcnPrimitive: 'Card + Collapsible',
		capacity: { stepsMax: 6, stepsWarning: 4, stepLabelMaxWords: 12, stepContentMaxWords: 80 },
		printFallback: 'All steps expanded',
		status: 'stable'
	},

	ProcessSteps: {
		id: 'process-steps',
		name: 'ProcessSteps',
		group: 3,
		purpose: 'A repeatable procedure where order is non-negotiable',
		cognitiveJob: 'Follow a procedure',
		subjects: ['universal'],
		behaviourModes: ['static', 'step-reveal'],
		shadcnPrimitive: 'Card + Separator',
		capacity: { stepsMax: 8, actionMaxWords: 15, detailMaxWords: 60 },
		printFallback: 'All steps visible, checkbox squares for print',
		status: 'stable'
	},

	// GROUP 4 - ASSESSMENT AND PRACTICE

	PracticeStack: {
		id: 'practice-stack',
		name: 'PracticeStack',
		group: 4,
		purpose: 'Problems at calibrated difficulty with progressive hints and optional solutions',
		cognitiveJob: 'Apply understanding under calibrated difficulty',
		subjects: ['universal'],
		behaviourModes: ['hint-toggle', 'accordion', 'progressive-hints'],
		shadcnPrimitive: 'Accordion + Collapsible',
		capacity: {
			problemsMin: 2,
			problemsMax: 5,
			hintsPerProblemMax: 3,
			questionMaxWords: 100,
			hintMaxWords: 60
		},
		printFallback: 'All visible, write-in lines rendered',
		status: 'stable'
	},

	QuizCheck: {
		id: 'quiz-check',
		name: 'QuizCheck',
		group: 4,
		purpose: 'Quick concept check with immediate feedback mid-section',
		cognitiveJob: 'Verify understanding immediately',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Card + Button',
		capacity: { optionsMin: 3, optionsMax: 4, questionMaxWords: 60, optionMaxWords: 20 },
		printFallback: 'Question and options shown, correct answer marked',
		status: 'stable'
	},

	ReflectionPrompt: {
		id: 'reflection-prompt',
		name: 'ReflectionPrompt',
		group: 4,
		purpose: 'Pauses forward motion and turns attention inward',
		cognitiveJob: 'Pause and consolidate',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Card',
		capacity: { promptMaxWords: 40, spaceMax: 6 },
		printFallback: 'Prompt with write-in lines',
		status: 'stable'
	},

	// GROUP 5 - ALERTS

	PitfallAlert: {
		id: 'pitfall-alert',
		name: 'PitfallAlert',
		group: 5,
		purpose: 'Names a specific misconception before the learner makes it',
		cognitiveJob: 'Inoculate against error',
		subjects: ['universal'],
		behaviourModes: ['static', 'hint-toggle'],
		shadcnPrimitive: 'Alert + Collapsible',
		capacity: { misconceptionMaxWords: 20, correctionMaxWords: 80, exampleMaxWords: 40 },
		printFallback: 'Full static, amber left border',
		status: 'stable'
	},

	// GROUP 6 - DIAGRAMS

	DiagramBlock: {
		id: 'diagram-block',
		name: 'DiagramBlock',
		group: 6,
		purpose: 'Makes spatial or relational structure visible',
		cognitiveJob: 'See the structure',
		subjects: ['universal'],
		behaviourModes: ['static', 'zoom', 'hint-toggle'],
		shadcnPrimitive: 'Card + Dialog',
		capacity: { calloutsMax: 6, captionMaxWords: 60 },
		printFallback: 'Static SVG 80% width centred',
		status: 'stable'
	},

	DiagramCompare: {
		id: 'diagram-compare',
		name: 'DiagramCompare',
		group: 6,
		purpose: 'Before and after comparison with a drag slider',
		cognitiveJob: 'See transformation',
		subjects: ['history', 'science', 'mathematics', 'geography'],
		behaviourModes: ['compare'],
		shadcnPrimitive: 'Slider',
		capacity: { captionMaxWords: 60 },
		printFallback: 'Both diagrams shown side by side',
		status: 'stable'
	},

	DiagramSeries: {
		id: 'diagram-series',
		name: 'DiagramSeries',
		group: 6,
		purpose: 'A progression of diagrams that tells a sequence',
		cognitiveJob: 'Follow a visual progression',
		subjects: ['universal'],
		behaviourModes: ['step-reveal', 'static'],
		shadcnPrimitive: 'Tabs or step nav',
		capacity: { diagramsMax: 4 },
		printFallback: 'All diagrams in sequence with step labels',
		status: 'stable'
	},

	// GROUP 7 - SIMULATION

	SimulationBlock: {
		id: 'simulation-block',
		name: 'SimulationBlock',
		group: 7,
		purpose: 'Manipulate a variable and discover the concept through observation',
		cognitiveJob: 'Manipulate and discover',
		subjects: ['mathematics', 'physics', 'chemistry', 'statistics'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'iframe sandbox',
		capacity: { onePerSection: 'true' },
		printFallback: 'Static diagram at midstate',
		status: 'beta'
	}
};

// Helper - components ready to use (not planned)
export function getStableComponents(): ComponentMeta[] {
	return Object.values(componentRegistry).filter(
		(component) => component.status === 'stable' || component.status === 'beta'
	);
}

// Helper - components by group
export function getComponentsByGroup(group: number): ComponentMeta[] {
	return Object.values(componentRegistry).filter((component) => component.group === group);
}

// Helper - get all component ids for a given subject
export function getComponentsForSubject(subject: string): ComponentMeta[] {
	return Object.values(componentRegistry).filter(
		(component) => component.subjects.includes('universal') || component.subjects.includes(subject)
	);
}
