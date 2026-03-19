// Content schemas — what the LLM fills in,
// what components render, what templates assemble

// ─────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────

export type Difficulty = 'warm' | 'medium' | 'cold' | 'extension';
export type GradeBand = 'primary' | 'secondary' | 'advanced';
export type HintLevel = 1 | 2 | 3;
export type BehaviourMode =
	| 'static'
	| 'step-reveal'
	| 'accordion'
	| 'hint-toggle'
	| 'plain-formal-toggle'
	| 'zoom'
	| 'sticky'
	| 'drawer'
	| 'inline-strip'
	| 'progressive-hints'
	| 'compare'
	| 'flat-list'
	| 'timeline-scrubber';

// ─────────────────────────────────────────────
// GROUP 1 — FOUNDATION COMPONENTS
// ─────────────────────────────────────────────

export interface LevelPill {
	label: string;
	variant: 'all' | 'warm' | 'medium' | 'cold';
}

export interface SectionHeaderContent {
	title: string; // max 12 words
	subtitle?: string; // max 20 words
	subject: string;
	section_number?: string; // e.g. "Section 01"
	grade_band: GradeBand;
	objective?: string; // max 30 words — learning goal
	level_pills?: LevelPill[];
}

// ──

export type HookType = 'prose' | 'quote' | 'question' | 'data-point';

export interface HookImage {
	url: string;
	alt: string;
}

export interface HookHeroContent {
	headline: string; // max 12 words
	body: string; // max 80 words
	anchor: string; // the felt need this creates
	type?: HookType; // default: 'prose'
	image?: HookImage;
	svg_content?: string; // inline SVG markup, rendered with {@html} when present
	// if type === 'quote'
	quote_attribution?: string;
	// if type === 'question'
	question_options?: string[]; // 2–3 options, no right answer revealed
	// if type === 'data-point'
	data_point?: {
		value: string; // the striking number or fact
		label: string; // what it means
		source?: string;
	};
}

// ──

export interface ExplanationCallout {
	type: 'remember' | 'insight' | 'sidenote';
	text: string; // max 60 words
}

export interface ExplanationContent {
	body: string; // max 350 words
	emphasis: string[]; // max 3 key phrases — highlighted inline
	callouts?: ExplanationCallout[]; // max 3
}

// ──

export interface PrerequisiteItem {
	concept: string; // max 8 words
	refresher?: string; // max 60 words — shown on tap/hover
}

export interface PrerequisiteContent {
	label?: string; // default: "Before we begin"
	items: PrerequisiteItem[]; // max 4
}

// ──

export interface WhatNextContent {
	body: string; // max 50 words
	next: string; // max 15 words — concept name
	preview?: string; // max 30 words — optional teaser
	prerequisites?: string[]; // max 4 — backward compat
}

// ──

export interface InterviewContent {
	prompt: string; // max 35 words — conversational question
	audience: string; // max 10 words — who they are explaining to
	follow_up?: string; // max 25 words — a harder follow-on question
}

// ─────────────────────────────────────────────
// GROUP 2 — DEFINITION AND KNOWLEDGE
// ─────────────────────────────────────────────

export interface DefinitionContent {
	term: string;
	formal: string; // max 80 words
	plain: string; // max 60 words
	etymology?: string;
	notation?: string; // KaTeX formula — "we write this as f'(x)"
	related_terms?: string[]; // max 3 — links to glossary
	symbol?: string; // e.g. "∫" — displayed large
	examples?: string[]; // max 3, each max 30 words — usage examples (backward compat)
}

// ──

export interface DefinitionFamilyContent {
	family_title: string; // max 10 words
	family_intro?: string; // max 40 words — why these belong together
	definitions: DefinitionContent[]; // max 4
}

// ──

export interface GlossaryTerm {
	term: string;
	definition: string; // max 30 words
	used_in?: string; // sentence where term first appears
	pronunciation?: string; // e.g. "kæl-kyə-ləs"
	related?: string[]; // other terms in this glossary
}

export interface GlossaryContent {
	terms: GlossaryTerm[]; // max 8, warning at 6
}

// GlossaryInline — used inline in prose, not as a block
export interface GlossaryInlineProps {
	term: string;
	definition: string; // max 30 words
}

// ──

export interface InsightCell {
	label: string; // max 6 words
	value: string; // max 2 lines — the key data or insight
	note?: string; // max 20 words — supporting context
	highlight?: boolean; // visually emphasise this cell
}

export interface InsightStripContent {
	cells: InsightCell[]; // max 3, min 2
}

export interface ComparisonColumn {
	id: string;
	title: string;
	summary: string;
	badge?: string;
	detail?: string;
	highlight?: boolean;
}

export interface ComparisonRow {
	criterion: string;
	values: string[];
	takeaway?: string;
}

export interface ComparisonGridContent {
	title: string;
	intro?: string;
	columns: ComparisonColumn[];
	rows: ComparisonRow[];
	apply_prompt?: string;
}

// ─────────────────────────────────────────────
// GROUP 3 — EXAMPLES AND PROCESS
// ─────────────────────────────────────────────

export interface WorkedStep {
	label: string; // max 12 words — why this step
	content: string; // max 80 words — what was done
	note?: string; // max 30 words — aside or warning
	formula?: string; // KaTeX for this step
	diagram_ref?: string; // id of a diagram in the section
}

export interface WorkedExampleContent {
	title: string;
	setup: string; // max 60 words
	steps: WorkedStep[]; // max 6, warning at 4
	conclusion: string; // max 40 words
	method_label?: string; // e.g. "Method A: Substitution"
	alternative?: WorkedExampleContent; // optional second method to toggle
	answer?: string; // backward compat — the final result
	alternatives?: string[]; // backward compat — other approaches
}

// ──

export interface ProcessStepItem {
	number: number;
	action: string; // max 15 words — imperative instruction
	detail: string; // max 60 words — why, what to watch for
	input?: string; // max 10 words — what comes in
	output?: string; // max 10 words — what comes out
	warning?: string; // max 20 words — common mistake here
}

export interface ProcessContent {
	title: string;
	intro?: string; // max 40 words — when to use this process
	steps: ProcessStepItem[]; // max 8
	checklist_mode?: boolean; // renders as a checklist for print
}

// ─────────────────────────────────────────────
// GROUP 4 — ASSESSMENT AND PRACTICE
// ─────────────────────────────────────────────

export interface PracticeHint {
	level: HintLevel; // 1 = gentle, 2 = direct, 3 = near-answer
	text: string; // max 60 words
}

export interface PracticeSolution {
	approach: string; // max 100 words — the method
	answer: string; // max 60 words — the result
	worked?: string; // max 200 words — full worked version
}

export interface PracticeProblem {
	difficulty: Difficulty;
	question: string; // max 100 words
	hints: PracticeHint[]; // 1–3 hints, progressive
	solution?: PracticeSolution;
	writein_lines?: number; // 0–8 for print
	self_assess?: boolean; // learner marks own answer correct/incorrect
	context?: string; // max 40 words — scenario framing
}

export interface PracticeContent {
	problems: PracticeProblem[]; // min 2, max 5
	hints_visible_default?: boolean; // default false
	solutions_available?: boolean; // default false
	label?: string; // default "Practice Problems"
}

// ──

export interface QuizOption {
	text: string; // max 20 words
	correct: boolean;
	explanation: string; // max 40 words — why right or wrong
}

export interface QuizContent {
	question: string; // max 60 words
	options: QuizOption[]; // 3–4 options
	feedback_correct: string; // max 30 words
	feedback_incorrect: string; // max 30 words
	show_explanations?: boolean; // default true
}

// ──

export type ReflectionType =
	| 'open'
	| 'pair-share'
	| 'sentence-stem'
	| 'timed'
	| 'connect'
	| 'predict'
	| 'transfer';

export interface ReflectionContent {
	prompt: string; // max 40 words
	type: ReflectionType;
	space?: number; // write-in lines, 0–6
	sentence_stem?: string; // if type === 'sentence-stem'
	time_minutes?: number; // if type === 'timed'
	pair_instruction?: string; // if type === 'pair-share'
}

// ─────────────────────────────────────────────
// GROUP 5 — ALERTS AND SIGNALS
// ─────────────────────────────────────────────

export interface PitfallContent {
	misconception: string; // max 20 words — the specific wrong belief
	correction: string; // max 80 words — why wrong and what is true
	example?: string; // max 40 words — misconception in action
	severity?: 'minor' | 'major'; // default 'major'
	examples?: string[]; // backward compat — multiple examples
	why?: string; // backward compat — why students think this
}

// ─────────────────────────────────────────────
// GROUP 6 — DIAGRAMS
// ─────────────────────────────────────────────

export interface DiagramCallout {
	id: string;
	x: number; // percentage position on diagram (0–100)
	y: number;
	label: string; // max 4 words
	explanation: string; // max 40 words — revealed on tap/hover
}

export interface DiagramContent {
	svg_content: string;
	caption: string; // max 60 words
	zoom_label?: string; // max 8 words
	alt_text: string; // accessibility — max 80 words
	callouts?: DiagramCallout[]; // max 6 numbered annotation points
	figure_number?: number; // sequential across section
}

// ──

export interface DiagramCompareContent {
	before_svg: string;
	after_svg: string;
	before_label: string; // max 6 words
	after_label: string; // max 6 words
	before_details?: string[]; // bullet points describing the before state
	after_details?: string[]; // bullet points describing the after state (revealed progressively)
	caption: string; // max 60 words
	alt_text: string;
}

// ──

export interface DiagramSeriesContent {
	title: string; // max 10 words
	diagrams: Array<{
		svg_content: string;
		step_label: string; // max 8 words
		caption: string; // max 40 words
	}>; // max 4 diagrams
}

export interface TimelineEvent {
	id: string;
	era?: string;
	year: string;
	title: string;
	summary: string;
	impact?: string;
	tags?: string[];
}

export interface TimelineContent {
	title: string;
	intro?: string;
	events: TimelineEvent[];
	closing_takeaway?: string;
}

// ─────────────────────────────────────────────
// GROUP 7 — SIMULATION
// ─────────────────────────────────────────────

export type SimulationType =
	| 'graph_slider'
	| 'probability_tree'
	| 'equation_reveal'
	| 'geometry_explorer'
	| 'molecule_viewer'
	| 'timeline_scrubber';

export interface InteractionSpec {
	type: SimulationType;
	goal: string; // max 40 words
	anchor_content: Record<string, unknown>;
	context: {
		learner_level: string;
		template_id: string;
		color_mode: 'light' | 'dark';
		accent_color: string;
		surface_color: string;
		font_mono: string;
	};
	dimensions: {
		width: string; // e.g. "100%"
		height: number; // px
		resizable: boolean;
	};
	print_translation: 'static_midstate' | 'static_diagram' | 'hide';
}

export interface SimulationContent {
	spec: InteractionSpec;
	html_content?: string; // self-contained HTML document from the LLM
	fallback_diagram?: DiagramContent;
	explanation?: string; // max 60 words
}

// ─────────────────────────────────────────────
// THE FULL SECTION OBJECT
// ─────────────────────────────────────────────

export interface SectionContent {
	section_id: string;
	template_id: string;

	// Required
	header: SectionHeaderContent;
	hook: HookHeroContent;
	explanation: ExplanationContent;
	practice: PracticeContent;
	what_next: WhatNextContent;

	// Optional — present based on content needs
	prerequisites?: PrerequisiteContent;
	definition?: DefinitionContent;
	definition_family?: DefinitionFamilyContent;
	worked_example?: WorkedExampleContent;
	worked_examples?: WorkedExampleContent[]; // when section has multiple
	process?: ProcessContent;
	diagram?: DiagramContent;
	diagram_compare?: DiagramCompareContent;
	diagram_series?: DiagramSeriesContent;
	comparison_grid?: ComparisonGridContent;
	timeline?: TimelineContent;
	insight_strip?: InsightStripContent;
	pitfall?: PitfallContent;
	pitfalls?: PitfallContent[]; // some sections have multiple
	quiz?: QuizContent;
	reflection?: ReflectionContent;
	glossary?: GlossaryContent;
	simulation?: SimulationContent;
	interview?: InterviewContent;
}
