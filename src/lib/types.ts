// Content schemas — what the LLM fills in,
// what components render, what templates assemble

export interface HookImage {
	url: string;
	alt: string;
}

export interface HookHeroContent {
	headline: string; // max 12 words
	body: string; // max 80 words
	anchor: string; // the felt need this creates
	image?: HookImage;
}

export interface ExplanationCallout {
	type: 'remember' | 'insight' | 'sidenote';
	text: string; // max 60 words
}

export interface ExplanationContent {
	body: string; // max 350 words
	emphasis: string[]; // max 3 key phrases to bold inline
	callouts?: ExplanationCallout[]; // max 3
}

export interface DefinitionContent {
	term: string;
	formal: string; // max 80 words
	plain: string; // max 60 words
	etymology?: string;
	examples?: string[]; // max 3, each max 30 words — usage examples
	related_terms?: string[]; // max 4 term names
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
	answer?: string; // max 30 words — the final result
	alternatives?: string[]; // max 3, each max 40 words — other approaches
}

export interface PracticeProblem {
	difficulty: 'warm' | 'medium' | 'cold';
	question: string; // max 100 words
	hint: string; // max 60 words — primary hint (backward compat)
	hints?: string[]; // max 3 tiered hints, each max 60 words — overrides hint when present
	answer?: string; // max 40 words
	solution?: string; // max 120 words — optional worked solution
	writein_lines?: number; // 0–8 for print
}

export interface PracticeContent {
	problems: PracticeProblem[]; // 1–6 problems
}

export interface GlossaryTerm {
	term: string;
	definition: string; // max 30 words
	used_in?: string;
	related?: string[]; // max 3 term names for cross-reference
}

export interface GlossaryContent {
	terms: GlossaryTerm[]; // max 8
}

export interface PitfallContent {
	misconception: string; // max 20 words
	correction: string; // max 80 words
	example?: string; // max 40 words — kept for backward compat
	examples?: string[]; // max 3, each max 40 words — overrides example when present
	why?: string; // max 60 words — why students hold this misconception
}

export interface WhatNextContent {
	body: string; // max 50 words
	next: string; // max 15 words
	prerequisites?: string[]; // max 4, each max 10 words
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
