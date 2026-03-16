// The component registry — single source of truth
// Drives the showcase page, template generation,
// and contribution review checklist

export interface ComponentMeta {
	id: string;
	name: string;
	purpose: string;
	cognitiveJob: string;
	subjects: string[];
	behaviourModes: string[];
	shadcnPrimitive: string;
	capacity: Record<string, number | string>;
	printFallback: string;
}

export const componentRegistry: Record<string, ComponentMeta> = {
	HookHero: {
		id: 'hook-hero',
		name: 'HookHero',
		purpose: 'Opens a section by creating felt need before explanation',
		cognitiveJob: 'Create felt need',
		subjects: ['universal'],
		behaviourModes: ['static', 'fade-in'],
		shadcnPrimitive: 'Card (none — pure layout)',
		capacity: {
			headlineMaxWords: 12,
			bodyMaxWords: 80,
		},
		printFallback: 'Pull quote block with left border',
	},

	ExplanationBlock: {
		id: 'explanation-block',
		name: 'ExplanationBlock',
		purpose: 'Sustained prose that builds a mental model of the concept, with optional callouts',
		cognitiveJob: 'Build understanding through prose',
		subjects: ['universal'],
		behaviourModes: ['static', 'progressive-reveal'],
		shadcnPrimitive: 'Typography',
		capacity: {
			bodyMaxWords: 350,
			emphasisMaxItems: 3,
			calloutsMax: 3,
			calloutMaxWords: 60,
		},
		printFallback: 'Static prose, emphasis preserved, callouts inline',
	},

	DefinitionCard: {
		id: 'definition-card',
		name: 'DefinitionCard',
		purpose: 'Anchors a formal term with both formal and plain versions, usage examples, and related terms',
		cognitiveJob: 'Anchor formal knowledge',
		subjects: ['universal'],
		behaviourModes: ['static', 'plain-formal-toggle'],
		shadcnPrimitive: 'Card + Collapsible',
		capacity: {
			formalMaxWords: 80,
			plainMaxWords: 60,
			examplesMax: 3,
			exampleMaxWords: 30,
			relatedTermsMax: 4,
		},
		printFallback: 'Both formal and plain shown, toggle removed',
	},

	WorkedExampleCard: {
		id: 'worked-example-card',
		name: 'WorkedExampleCard',
		purpose: 'Shows reasoning in action, step by step, each step justified',
		cognitiveJob: 'Watch reasoning in action',
		subjects: ['universal'],
		behaviourModes: ['static', 'step-reveal', 'accordion'],
		shadcnPrimitive: 'Card + Collapsible',
		capacity: {
			stepsMax: 6,
			stepsWarning: 4,
			stepLabelMaxWords: 12,
			stepContentMaxWords: 80,
			setupMaxWords: 60,
			conclusionMaxWords: 40,
			answerMaxWords: 30,
			alternativesMax: 3,
			alternativeMaxWords: 40,
		},
		printFallback: 'All steps expanded and visible',
	},

	PracticeStack: {
		id: 'practice-stack',
		name: 'PracticeStack',
		purpose: '1–6 problems at calibrated difficulty with tiered hints, answers, and optional solutions',
		cognitiveJob: 'Apply understanding under calibrated difficulty',
		subjects: ['universal'],
		behaviourModes: ['hint-toggle', 'accordion-cards', 'flat-list'],
		shadcnPrimitive: 'Accordion + Collapsible',
		capacity: {
			problemsMin: 1,
			problemsMax: 6,
			problemsWarning: 4,
			questionMaxWords: 100,
			hintMaxWords: 60,
			hintsMaxPerProblem: 3,
			answerMaxWords: 40,
			solutionMaxWords: 120,
			writeinLinesMax: 8,
		},
		printFallback: 'All problems visible, hints visible, write-in lines rendered',
	},

	PitfallAlert: {
		id: 'pitfall-alert',
		name: 'PitfallAlert',
		purpose: 'Names a specific misconception explicitly before the learner makes it',
		cognitiveJob: 'Inoculate against error',
		subjects: ['universal'],
		behaviourModes: ['static', 'expand-example'],
		shadcnPrimitive: 'Alert + Collapsible',
		capacity: {
			misconceptionMaxWords: 20,
			correctionMaxWords: 80,
			exampleMaxWords: 40,
			examplesMax: 3,
			whyMaxWords: 60,
		},
		printFallback: 'Full static, amber left border',
	},

	GlossaryRail: {
		id: 'glossary-rail',
		name: 'GlossaryRail',
		purpose: 'Vocabulary terms visible in peripheral field, updates by section',
		cognitiveJob: 'Retrieve meaning without losing place',
		subjects: ['universal'],
		behaviourModes: ['sticky-sidebar', 'drawer', 'inline-strip'],
		shadcnPrimitive: 'Card + ScrollArea',
		capacity: {
			termsMax: 8,
			termsWarning: 6,
			definitionMaxWords: 30,
			relatedMax: 3,
		},
		printFallback: 'Inline vocabulary strip at section end',
	},

	WhatNextBridge: {
		id: 'what-next-bridge',
		name: 'WhatNextBridge',
		purpose: 'Connects the section forward — what this concept enables',
		cognitiveJob: 'Connect forward',
		subjects: ['universal'],
		behaviourModes: ['static'],
		shadcnPrimitive: 'Card (pure layout)',
		capacity: {
			bodyMaxWords: 50,
			nextMaxWords: 15,
			prerequisitesMax: 4,
			prerequisiteMaxWords: 10,
		},
		printFallback: 'Static, amber left rule',
	},
};

// Helper — get all component ids for a given subject
export function getComponentsForSubject(subject: string): ComponentMeta[] {
	return Object.values(componentRegistry).filter(
		(c) => c.subjects.includes('universal') || c.subjects.includes(subject)
	);
}
