// Content schemas — what the LLM fills in,
// what components render, what templates assemble

export interface HookHeroContent {
	headline: string; // max 12 words
	body: string; // max 80 words
	anchor: string; // the felt need this creates
}

export interface ExplanationContent {
	body: string; // max 350 words
	emphasis: string[]; // max 3 key phrases to bold inline
}

export interface DefinitionContent {
	term: string;
	formal: string; // max 80 words
	plain: string; // max 60 words
	etymology?: string;
}

export interface WorkedStep {
	label: string; // max 12 words — why this step
	content: string; // max 80 words — what was done
}

export interface WorkedExampleContent {
	title: string;
	setup: string; // max 60 words
	steps: WorkedStep[]; // max 6
	conclusion: string; // max 40 words
}

export interface PracticeProblem {
	difficulty: 'warm' | 'medium' | 'cold';
	question: string; // max 100 words
	hint: string; // max 60 words
	writein_lines?: number; // 0–8 for print
}

export interface PracticeContent {
	// Tuple enforces exactly 3 problems
	problems: [PracticeProblem, PracticeProblem, PracticeProblem];
}

export interface GlossaryTerm {
	term: string;
	definition: string; // max 30 words
	used_in?: string;
}

export interface GlossaryContent {
	terms: GlossaryTerm[]; // max 8
}

export interface PitfallContent {
	misconception: string; // max 20 words
	correction: string; // max 80 words
	example?: string; // max 40 words
}

export interface WhatNextContent {
	body: string; // max 50 words
	next: string; // max 15 words
}

// The full section — what drives a complete template render
export interface SectionContent {
	section_id: string;
	title: string;
	subtitle?: string;
	subject: string;
	grade_band: string;
	template_id: string;

	hook: HookHeroContent;
	explanation: ExplanationContent;
	definition?: DefinitionContent;
	worked_example?: WorkedExampleContent;
	pitfall?: PitfallContent;
	practice: PracticeContent;
	glossary?: GlossaryContent;
	what_next: WhatNextContent;
}
