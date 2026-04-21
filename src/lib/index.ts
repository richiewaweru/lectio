// ── Components ──────────────────────────────────────
export {
	SectionHeader,
	HookHero,
	ExplanationBlock,
	PrerequisiteStrip,
	WhatNextBridge,
	InterviewAnchor,
	CalloutBlock,
	SummaryBlock,
	SectionDivider,
	DefinitionCard,
	DefinitionFamily,
	GlossaryRail,
	GlossaryInline,
	InsightStrip,
	KeyFact,
	ComparisonGrid,
	WorkedExampleCard,
	ProcessSteps,
	PracticeStack,
	QuizCheck,
	ReflectionPrompt,
	StudentTextbox,
	ShortAnswerQuestion,
	FillInTheBlank,
	PitfallAlert,
	DiagramBlock,
	DiagramCompare,
	DiagramSeries,
	VideoEmbed,
	ImageBlock,
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
	InteractionContext,
	InteractionDimensions,
	DiagramSeriesStep,
	WhatNextContent,
	LevelPill,
	HookImage,
	HookType,
	ReflectionType,
	SimulationType,
	BehaviourMode,
	Difficulty,
	GradeBand,
	HintLevel,
	CalloutVariant,
	CalloutBlockContent,
	SummaryItem,
	SummaryBlockContent,
	SectionDividerContent,
	KeyFactContent,
	StudentTextboxContent,
	ShortAnswerContent,
	FillInBlankSegment,
	FillInBlankContent,
	VideoEmbedContent,
	ImageBlockContent
} from './schema/types';

// ── Registry ────────────────────────────────────────
export {
	componentRegistry,
	getStableComponents,
	getComponentsByGroup,
	getComponentsForSubject,
	getComponentById,
	getComponentFieldMap
} from './schema/registry';
export type { ComponentMeta } from './schema/registry';

// ── Validation ──────────────────────────────────────
export { validateSection, warnIfInvalid } from './schema/validate';

// ── Lesson document interchange + builder utilities ──
export type {
	LessonDocument,
	LessonDocumentVersion,
	BlockInstance,
	DocumentSection,
	MediaReference,
	DocumentValidationResult,
	FromSectionContentsMetadata
} from './teacher/document';
export { fromSectionContents, toSectionContents, validateDocument, getFieldComponentMap } from './teacher/document';

export { getEmptyContent, getPreviewContent, assertFactoriesCoverRegistry } from './teacher/content-factories';

export { getEditSchema } from './teacher/edit-schemas';
export type { EditSchema, FieldSchema, FieldInputType } from './teacher/edit-schemas';

// ── Template system ─────────────────────────────────
export {
	templateRegistry,
	templateRegistryMap,
	getTemplateById,
	filterTemplates,
	getTemplateFamilies,
	validateAllTemplates
} from './templates/registry';
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
	SectionRole,
	TemplateFilters,
	TemplateValidationResult
} from './templates/types';
export {
	validateTemplateDefinition,
	validateTemplateContract,
	validateTemplatePreview
} from './templates/validation';

// ── Presets ─────────────────────────────────────────
export { basePresets, basePresetMap } from './presets/base-presets';

// ── Utility ─────────────────────────────────────────
export { cn } from './utils';

// ── Markdown utilities ───────────────────────────────
export { renderInlineMarkdown, renderBlockMarkdown, looksLikeLatex } from './utils/markdown';

// ── Print utilities ──────────────────────────────────
export { default as RuledLines } from './print/RuledLines.svelte';
export { default as Checkboxes } from './print/Checkboxes.svelte';
export { default as ExpandedSteps } from './print/ExpandedSteps.svelte';
export { default as SideBySide } from './print/SideBySide.svelte';
export { default as VerticalList } from './print/VerticalList.svelte';
export { default as AnswerMarker } from './print/AnswerMarker.svelte';
export { providePrintMode, usePrintMode } from './utils/printContext';
