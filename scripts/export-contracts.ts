/**
 * scripts/export-contracts.ts
 *
 * Exports everything the Python pipeline needs to know about
 * Lectio's templates and components into agents/contracts/.
 *
 * Run this whenever templates, components, or presets change:
 *   npm run export-contracts
 *   LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts
 *
 * Output files:
 *   {out}/{template-id}.json       - one per template
 *   {out}/component-field-map.json - component to SectionContent field
 *   {out}/component-registry.json  - full component metadata
 *   {out}/preset-registry.json     - preset palette and style metadata
 *
 * The pipeline reads these files. It never imports from src/.
 * Single source of truth stays here in TypeScript.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { componentRegistry, getComponentFieldMap } from '../src/lib/registry';
import { basePresets } from '../src/lib/presets/base-presets';

// Import contracts directly from config files to avoid pulling in
// .svelte layout files through template-registry.ts.
import { classificationContract } from '../src/lib/templates/classification/config';
import { compareAndApplyContract } from '../src/lib/templates/compare-and-apply/config';
import { conceptCompactContract } from '../src/lib/templates/concept-compact/config';
import { diagramLedContract } from '../src/lib/templates/diagram-led/config';
import { formalTrackContract } from '../src/lib/templates/formal-track/config';
import { guidedConceptPathContract } from '../src/lib/templates/guided-concept-path/config';
import { guidedDiscoveryContract } from '../src/lib/templates/guided-discovery/config';
import { interactiveLabContract } from '../src/lib/templates/interactive-lab/config';
import { lowLoadContract } from '../src/lib/templates/low-load/config';
import { openCanvasContract } from '../src/lib/templates/open-canvas/config';
import { procedureContract } from '../src/lib/templates/procedure/config';
import { timelineContract } from '../src/lib/templates/timeline/config';
import { visualLedContract } from '../src/lib/templates/visual-led/config';

const outArgIndex = process.argv.indexOf('--out');
const outFromArg = outArgIndex !== -1 ? process.argv[outArgIndex + 1] : null;
const outFromEnv = process.env.LECTIO_CONTRACTS_DIR ?? null;
const OUT = resolve(outFromArg ?? outFromEnv ?? 'agents/contracts');
mkdirSync(OUT, { recursive: true });

const contracts = [
	classificationContract,
	compareAndApplyContract,
	conceptCompactContract,
	diagramLedContract,
	formalTrackContract,
	guidedConceptPathContract,
	guidedDiscoveryContract,
	interactiveLabContract,
	lowLoadContract,
	openCanvasContract,
	procedureContract,
	timelineContract,
	visualLedContract
];

for (const contract of contracts) {
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
		always_present: contract.always_present,
		available_components: contract.available_components,
		component_budget: contract.component_budget,
		max_per_section: contract.max_per_section,
		default_behaviours: contract.defaultBehaviours,
		section_role_defaults: contract.section_role_defaults,
		signal_affinity: contract.signal_affinity,
		layout_notes: contract.layoutNotes,
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

const componentFieldMap = getComponentFieldMap();
writeFileSync(`${OUT}/component-field-map.json`, JSON.stringify(componentFieldMap, null, 2));

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
