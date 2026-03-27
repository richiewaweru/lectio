/**
 * scripts/export-contracts.ts
 *
 * Exports everything the Python pipeline needs to know about
 * Lectio's templates and components into agents/contracts/.
 *
 * Run this whenever templates, components, or presets change:
 *   npm run export-contracts
 *   npm run export-contracts -- --out /path/to/output
 *
 * Output files:
 *   {out}/{template-id}.json          - one per template
 *   {out}/component-field-map.json    - component -> SectionContent field
 *   {out}/component-registry.json     - full component metadata
 *   {out}/preset-registry.json        - preset palette and style metadata
 *
 * The pipeline reads these files. It never imports from src/.
 * Single source of truth stays here in TypeScript.
 *
 * The export intentionally keeps the legacy contract keys
 * (`required_components`, `optional_components`, `lesson_flow`, etc.)
 * while also emitting the richer planning-layer metadata
 * (`always_present`, `available_components`, `signal_affinity`, etc.).
 * That lets downstream consumers upgrade incrementally.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { componentRegistry, getComponentFieldMap } from '../src/lib/registry';
import { basePresets } from '../src/lib/presets/base-presets';
import type {
	LessonIntent,
	TemplateContract
} from '../src/lib/template-types';

// Import contracts directly from config files to avoid pulling in
// .svelte layout files through template-registry.ts.
import { compareAndApplyContract } from '../src/lib/templates/compare-and-apply/config';
import { diagramLedLessonContract } from '../src/lib/templates/diagram-led-lesson/config';
import { distinctionGridContract } from '../src/lib/templates/distinction-grid/config';
import { figureFirstContract } from '../src/lib/templates/figure-first/config';
import { focusFlowContract } from '../src/lib/templates/focus-flow/config';
import { formalTrackContract } from '../src/lib/templates/formal-track/config';
import { guidedConceptCompactContract } from '../src/lib/templates/guided-concept-compact/config';
import { guidedConceptPathContract } from '../src/lib/templates/guided-concept-path/config';
import { guidedDiscoveryContract } from '../src/lib/templates/guided-discovery/config';
import { interactiveLabContract } from '../src/lib/templates/interactive-lab/config';
import { processTrainerContract } from '../src/lib/templates/process-trainer/config';
import { timelineNarrativeContract } from '../src/lib/templates/timeline-narrative/config';

const outArgIndex = process.argv.indexOf('--out');
const outFromArg = outArgIndex !== -1 ? process.argv[outArgIndex + 1] : null;
const outFromEnv = process.env.LECTIO_CONTRACTS_DIR ?? null;
const OUT = resolve(outFromArg ?? outFromEnv ?? 'agents/contracts');
mkdirSync(OUT, { recursive: true });

type TopicType = 'concept' | 'process' | 'facts' | 'mixed';
type LearningOutcome =
	| 'understand-why'
	| 'be-able-to-do'
	| 'remember-terms'
	| 'apply-to-new';
type ClassStyle =
	| 'tries-before-told'
	| 'needs-explanation-first'
	| 'engages-with-visuals'
	| 'responds-to-worked-examples'
	| 'restless-without-activity';
type LessonFormat = 'printed-booklet' | 'screen-based' | 'both';
type SectionRole =
	| 'intro'
	| 'explain'
	| 'practice'
	| 'summary'
	| 'process'
	| 'compare'
	| 'timeline'
	| 'visual'
	| 'discover';

type SignalAffinity = {
	topic_type: Partial<Record<TopicType, number>>;
	learning_outcome: Partial<Record<LearningOutcome, number>>;
	class_style: Partial<Record<ClassStyle, number>>;
	format: Partial<Record<LessonFormat, number>>;
};

const contracts = [
	compareAndApplyContract,
	diagramLedLessonContract,
	distinctionGridContract,
	figureFirstContract,
	focusFlowContract,
	formalTrackContract,
	guidedConceptCompactContract,
	guidedConceptPathContract,
	guidedDiscoveryContract,
	interactiveLabContract,
	processTrainerContract,
	timelineNarrativeContract
];

const ROLE_COMPONENT_CANDIDATES: Record<SectionRole, string[]> = {
	intro: ['hook-hero', 'callout-block', 'key-fact'],
	explain: [
		'explanation-block',
		'definition-card',
		'definition-family',
		'glossary-rail',
		'glossary-inline',
		'worked-example-card'
	],
	practice: [
		'practice-stack',
		'student-textbox',
		'short-answer',
		'fill-in-blank',
		'quiz-check',
		'reflection-prompt'
	],
	summary: ['summary-block', 'what-next-bridge', 'reflection-prompt'],
	process: ['process-steps', 'worked-example-card', 'explanation-block'],
	compare: ['comparison-grid', 'definition-family', 'insight-strip', 'explanation-block'],
	timeline: ['timeline-block', 'reflection-prompt', 'explanation-block'],
	visual: ['diagram-block', 'diagram-series', 'diagram-compare', 'callout-block', 'explanation-block'],
	discover: ['simulation-block', 'diagram-block', 'callout-block', 'explanation-block']
};

const BOUNDED_COMPONENTS = [
	'comparison-grid',
	'diagram-block',
	'diagram-compare',
	'diagram-series',
	'practice-stack',
	'process-steps',
	'quiz-check',
	'reflection-prompt',
	'simulation-block',
	'timeline-block',
	'worked-example-card'
];

function unionUnique(...groups: string[][]): string[] {
	return [...new Set(groups.flat())];
}

function clamp(score: number): number {
	return Math.max(0.2, Math.min(1, Number(score.toFixed(2))));
}

function availableComponents(contract: TemplateContract): string[] {
	return unionUnique(contract.requiredComponents, contract.optionalComponents);
}

function hasAny(contract: TemplateContract, candidates: string[]): boolean {
	const available = new Set(availableComponents(contract));
	return candidates.some((candidate) => available.has(candidate));
}

function preferredRoles(contract: TemplateContract): SectionRole[] {
	if (hasAny(contract, ['simulation-block'])) {
		return ['intro', 'discover', 'explain', 'practice', 'summary'];
	}

	switch (contract.intent as LessonIntent) {
		case 'compare-ideas':
			return ['intro', 'compare', 'explain', 'practice', 'summary'];
		case 'teach-sequence':
			return ['intro', 'timeline', 'explain', 'practice', 'summary'];
		case 'teach-procedure':
			return ['intro', 'process', 'explain', 'practice', 'summary'];
		case 'explain-visually':
			return ['intro', 'visual', 'explain', 'practice', 'summary'];
		default:
			return ['intro', 'explain', 'practice', 'summary'];
	}
}

function deriveRoleDefaults(contract: TemplateContract): Partial<Record<SectionRole, string[]>> {
	const available = availableComponents(contract);
	const defaults: Partial<Record<SectionRole, string[]>> = {};

	for (const role of preferredRoles(contract)) {
		const components = ROLE_COMPONENT_CANDIDATES[role].filter((component) =>
			available.includes(component)
		);
		if (role === 'intro' && !components.includes('hook-hero') && available.includes('hook-hero')) {
			components.unshift('hook-hero');
		}
		if (role === 'summary' && available.includes('what-next-bridge') && !components.includes('what-next-bridge')) {
			components.push('what-next-bridge');
		}
		if (components.length > 0) {
			defaults[role] = components;
		}
	}

	if (!defaults.explain) {
		defaults.explain = available.filter((component) =>
			['explanation-block', 'definition-card', 'worked-example-card'].includes(component)
		);
	}
	if (!defaults.practice) {
		defaults.practice = available.filter((component) =>
			['practice-stack', 'student-textbox', 'short-answer', 'fill-in-blank'].includes(component)
		);
	}
	if (!defaults.summary && available.includes('what-next-bridge')) {
		defaults.summary = ['what-next-bridge'];
	}

	return defaults;
}

function deriveComponentBudget(contract: TemplateContract): Partial<Record<string, number>> {
	const available = availableComponents(contract);
	const budget: Partial<Record<string, number>> = {};

	for (const component of available) {
		if (!BOUNDED_COMPONENTS.includes(component)) {
			continue;
		}

		if (component === 'diagram-block') {
			budget[component] = contract.intent === 'explain-visually' ? 2 : 1;
			continue;
		}
		if (component === 'practice-stack') {
			budget[component] = 1;
			continue;
		}

		budget[component] = 1;
	}

	return budget;
}

function deriveMaxPerSection(contract: TemplateContract): Partial<Record<string, number>> {
	const available = availableComponents(contract);
	const limits: Partial<Record<string, number>> = {};

	for (const component of available) {
		if (BOUNDED_COMPONENTS.includes(component)) {
			limits[component] = 1;
		}
	}

	return limits;
}

function deriveSignalAffinity(contract: TemplateContract): SignalAffinity {
	const hasVisual = hasAny(contract, ['diagram-block', 'diagram-series', 'diagram-compare']);
	const hasTimeline = hasAny(contract, ['timeline-block']);
	const hasProcess = hasAny(contract, ['process-steps']);
	const hasSimulation = hasAny(contract, ['simulation-block']);
	const hasComparison = hasAny(contract, ['comparison-grid']);
	const hasWorkedExample = hasAny(contract, ['worked-example-card']);
	const printFriendly =
		contract.interactionLevel === 'none' ||
		contract.interactionLevel === 'light' ||
		contract.printRules.some((rule) => rule.toLowerCase().includes('print'));
	const screenFriendly = contract.interactionLevel === 'medium' || contract.interactionLevel === 'high';

	const byIntent: Record<LessonIntent, Pick<SignalAffinity, 'topic_type' | 'learning_outcome'>> = {
		'introduce-concept': {
			topic_type: { concept: 0.9, process: 0.45, facts: 0.6, mixed: 0.72 },
			learning_outcome: {
				'understand-why': 0.9,
				'be-able-to-do': 0.5,
				'remember-terms': 0.6,
				'apply-to-new': 0.65
			}
		},
		'explain-visually': {
			topic_type: { concept: 0.72, process: 0.62, facts: 0.52, mixed: 0.78 },
			learning_outcome: {
				'understand-why': 0.82,
				'be-able-to-do': 0.45,
				'remember-terms': 0.5,
				'apply-to-new': 0.62
			}
		},
		'compare-ideas': {
			topic_type: { concept: 0.7, process: 0.25, facts: 0.9, mixed: 0.82 },
			learning_outcome: {
				'understand-why': 0.62,
				'be-able-to-do': 0.42,
				'remember-terms': 0.92,
				'apply-to-new': 0.82
			}
		},
		'teach-sequence': {
			topic_type: { concept: 0.35, process: 0.82, facts: 0.52, mixed: 0.74 },
			learning_outcome: {
				'understand-why': 0.58,
				'be-able-to-do': 0.54,
				'remember-terms': 0.44,
				'apply-to-new': 0.72
			}
		},
		'teach-procedure': {
			topic_type: { concept: 0.28, process: 0.98, facts: 0.34, mixed: 0.62 },
			learning_outcome: {
				'understand-why': 0.42,
				'be-able-to-do': 0.96,
				'remember-terms': 0.36,
				'apply-to-new': 0.76
			}
		},
		'reduce-overload': {
			topic_type: { concept: 0.74, process: 0.52, facts: 0.6, mixed: 0.7 },
			learning_outcome: {
				'understand-why': 0.78,
				'be-able-to-do': 0.5,
				'remember-terms': 0.58,
				'apply-to-new': 0.6
			}
		},
		'reinforce-learning': {
			topic_type: { concept: 0.62, process: 0.72, facts: 0.76, mixed: 0.72 },
			learning_outcome: {
				'understand-why': 0.62,
				'be-able-to-do': 0.7,
				'remember-terms': 0.8,
				'apply-to-new': 0.76
			}
		},
		'build-rigor': {
			topic_type: { concept: 0.76, process: 0.56, facts: 0.72, mixed: 0.64 },
			learning_outcome: {
				'understand-why': 0.78,
				'be-able-to-do': 0.62,
				'remember-terms': 0.74,
				'apply-to-new': 0.7
			}
		}
	};

	const base = byIntent[contract.intent as LessonIntent];

	return {
		topic_type: Object.fromEntries(
			Object.entries(base.topic_type).map(([key, score]) => {
				let adjusted = score;
				if ((key === 'process' || key === 'mixed') && (hasProcess || hasTimeline)) {
					adjusted += 0.08;
				}
				if (key === 'concept' && hasComparison) {
					adjusted += 0.05;
				}
				return [key, clamp(adjusted)];
			})
		),
		learning_outcome: Object.fromEntries(
			Object.entries(base.learning_outcome).map(([key, score]) => {
				let adjusted = score;
				if (key === 'be-able-to-do' && (hasProcess || hasSimulation)) {
					adjusted += 0.1;
				}
				if (key === 'remember-terms' && hasComparison) {
					adjusted += 0.06;
				}
				return [key, clamp(adjusted)];
			})
		),
		class_style: {
			'tries-before-told': clamp(hasSimulation ? 0.92 : hasProcess ? 0.62 : 0.34),
			'needs-explanation-first': clamp(hasSimulation ? 0.48 : contract.intent === 'introduce-concept' || contract.intent === 'build-rigor' ? 0.88 : 0.62),
			'engages-with-visuals': clamp(hasVisual || hasTimeline ? 0.94 : 0.46),
			'responds-to-worked-examples': clamp(hasWorkedExample ? 0.88 : hasProcess ? 0.7 : 0.52),
			'restless-without-activity': clamp(
				contract.interactionLevel === 'high'
					? 0.82
					: contract.interactionLevel === 'medium'
						? 0.64
						: 0.44
			)
		},
		format: {
			'printed-booklet': clamp(printFriendly ? 0.84 : 0.58),
			'screen-based': clamp(screenFriendly ? 0.86 : 0.62),
			both: clamp(printFriendly && screenFriendly ? 0.82 : 0.72)
		}
	};
}

for (const contract of contracts) {
	const derivedAvailableComponents = availableComponents(contract);
	const summary = {
		id: contract.id,
		name: contract.name,
		family: contract.family,
		intent: contract.intent,
		tagline: contract.tagline,
		reading_style: contract.readingStyle,
		tags: contract.tags,
		best_for: contract.bestFor,
		not_ideal_for: contract.notIdealFor,
		learner_fit: contract.learnerFit,
		subjects: contract.subjects,
		interaction_level: contract.interactionLevel,
		lesson_flow: contract.lessonFlow,
		required_components: contract.requiredComponents,
		optional_components: contract.optionalComponents,
		always_present: contract.requiredComponents,
		available_components: derivedAvailableComponents,
		component_budget: deriveComponentBudget(contract),
		max_per_section: deriveMaxPerSection(contract),
		default_behaviours: contract.defaultBehaviours,
		section_role_defaults: deriveRoleDefaults(contract),
		signal_affinity: deriveSignalAffinity(contract),
		layout_notes: contract.layoutNotes,
		responsive_rules: contract.responsiveRules,
		print_rules: contract.printRules,
		allowed_presets: contract.allowedPresets,
		why_this_template_exists: contract.whyThisTemplateExists,
		generation_guidance: {
			tone: contract.generationGuidance.tone,
			pacing: contract.generationGuidance.pacing,
			chunking: contract.generationGuidance.chunking,
			emphasis: contract.generationGuidance.emphasis,
			avoid: contract.generationGuidance.avoid
		}
	};

	writeFileSync(`${OUT}/${contract.id}.json`, JSON.stringify(summary, null, 2));
}

// 2. Component field map
const componentFieldMap = getComponentFieldMap();
writeFileSync(`${OUT}/component-field-map.json`, JSON.stringify(componentFieldMap, null, 2));

// 3. Full component registry
const registryExport = Object.fromEntries(
	Object.values(componentRegistry).map((component) => [
		component.id,
		{
			id: component.id,
			name: component.name,
			purpose: component.purpose,
			cognitive_job: component.cognitiveJob,
			section_field: component.sectionField,
			group: component.group,
			status: component.status,
			capacity: component.capacity,
			behaviour_modes: component.behaviourModes,
			print_fallback: component.printFallback
		}
	])
);

writeFileSync(`${OUT}/component-registry.json`, JSON.stringify(registryExport, null, 2));

// 4. Preset registry
const presetExport = Object.fromEntries(
	basePresets.map((preset) => [
		preset.id,
		{
			id: preset.id,
			name: preset.name,
			palette: preset.palette,
			typography: preset.typography,
			density: preset.density,
			surface_style: preset.surfaceStyle
		}
	])
);

writeFileSync(`${OUT}/preset-registry.json`, JSON.stringify(presetExport, null, 2));

const templateCount = contracts.length;
const fieldCount = Object.keys(componentFieldMap).length;
const componentCount = Object.keys(registryExport).length;
const presetCount = Object.keys(presetExport).length;

console.log(`Exported ${templateCount} template contracts`);
console.log(`Exported component field map (${fieldCount} components with section fields)`);
console.log(`Exported full component registry (${componentCount} total components)`);
console.log(`Exported preset registry (${presetCount} presets)`);
console.log(`Output: ${OUT}/`);
