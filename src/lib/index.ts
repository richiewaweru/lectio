// ── Components ──────────────────────────────────────
export {
	SectionHeader,
	HookHero,
	ExplanationBlock,
	PrerequisiteStrip,
	WhatNextBridge,
	InterviewAnchor,
	DefinitionCard,
	DefinitionFamily,
	GlossaryRail,
	GlossaryInline,
	InsightStrip,
	ComparisonGrid,
	WorkedExampleCard,
	ProcessSteps,
	PracticeStack,
	QuizCheck,
	ReflectionPrompt,
	PitfallAlert,
	DiagramBlock,
	DiagramCompare,
	DiagramSeries,
	TimelineBlock,
	SimulationBlock
} from './components/lectio';

// ── Types ───────────────────────────────────────────
export type {
	SectionContent,
	SectionHeaderContent,
	HookHeroContent,
	ExplanationContent,
	ExplanationCallout,
	DefinitionContent,
	DefinitionFamilyContent,
	GlossaryContent,
	GlossaryTerm,
	GlossaryInlineProps,
	PracticeContent,
	PracticeProblem,
	PracticeHint,
	PracticeSolution,
	WorkedExampleContent,
	WorkedStep,
	PitfallContent,
	DiagramContent,
	DiagramCompareContent,
	DiagramSeriesContent,
	DiagramCallout,
	ComparisonGridContent,
	ComparisonColumn,
	ComparisonRow,
	TimelineContent,
	TimelineEvent,
	QuizContent,
	QuizOption,
	ReflectionContent,
	InsightStripContent,
	InsightCell,
	ProcessContent,
	ProcessStepItem,
	PrerequisiteContent,
	PrerequisiteItem,
	InterviewContent,
	SimulationContent,
	InteractionSpec,
	WhatNextContent,
	LevelPill,
	HookImage,
	HookType,
	ReflectionType,
	SimulationType,
	BehaviourMode,
	Difficulty,
	GradeBand,
	HintLevel
} from './types';

// ── Registry ────────────────────────────────────────
export {
	componentRegistry,
	getStableComponents,
	getComponentsByGroup,
	getComponentsForSubject,
	getComponentById,
	getComponentFieldMap
} from './registry';
export type { ComponentMeta } from './registry';

// ── Validation ──────────────────────────────────────
export { validateSection, warnIfInvalid } from './validate';

// ── Template system ─────────────────────────────────
export {
	templateRegistry,
	templateRegistryMap,
	getTemplateById,
	filterTemplates,
	getTemplateFamilies,
	validateAllTemplates
} from './template-registry';
export { default as LectioThemeSurface } from './templates/LectioThemeSurface.svelte';
export { default as ResolvedTemplatePreviewSurface } from './templates/ResolvedTemplatePreviewSurface.svelte';
export { default as TemplateRuntimeSurface } from './templates/TemplateRuntimeSurface.svelte';
export { default as TemplatePreviewSurface } from './templates/TemplatePreviewSurface.svelte';
export type {
	TemplateContract,
	TemplateDefinition,
	TemplatePresetDefinition,
	TemplatePreview,
	TemplatePresetGuardrails,
	TemplateGenerationGuidance,
	TemplateFamily,
	LessonIntent,
	LearnerFit,
	InteractionLevel,
	ReadingStyle,
	TemplateFilters,
	TemplateValidationResult
} from './template-types';
export {
	validateTemplateDefinition,
	validateTemplateContract,
	validateTemplatePreview
} from './template-validation';

// ── Presets ─────────────────────────────────────────
export { basePresets, basePresetMap } from './presets/base-presets';

// ── Utility ─────────────────────────────────────────
export { cn } from './utils';
