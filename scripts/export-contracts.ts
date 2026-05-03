/**
 * scripts/export-contracts.ts
 *
 * Exports everything the Python pipeline needs to know about
 * Lectio's templates and components into contracts/.
 *
 * Run this whenever templates, components, or presets change:
 *   npm run export-contracts
 *   LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts
 *
 * Output files:
 *   {out}/{template-id}.json       - one per template
 *   {out}/section-content-schema.json - full SectionContent JSON schema
 *   {out}/component-field-map.json - component to SectionContent field
 *   {out}/component-registry.json  - full component metadata
 *   {out}/preset-registry.json     - preset palette and style metadata
 *   {out}/manifest.json            - v3 agent-facing manifest (by phase)
 *   {out}/component-schemas.json   - JSON schema slice per component id
 *   {out}/print-rules.json         - print metadata (components + templates)
 *   {out}/component-examples.json  - validated example payloads per component
 *
 * The pipeline reads these files. It never imports from src/.
 * Single source of truth stays here in TypeScript.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createGenerator } from 'ts-json-schema-generator';
import { validateAllLectioContentModules } from '../src/lib/lectio/core/validate-component';
import {
	buildLectioManifest,
	componentRegistry,
	getComponentFieldMap,
	lectioComponentModules
} from '../src/lib/schema/registry';
import { basePresets } from '../src/lib/presets/base-presets';

// Import contracts directly from config files to avoid pulling in
// .svelte layout files through templates/registry.ts.
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
const OUT = resolve(outFromArg ?? outFromEnv ?? 'contracts');
mkdirSync(OUT, { recursive: true });

type JsonObject = Record<string, unknown>;

const lectioModulesList = Array.from(lectioComponentModules);
const validationIssues = validateAllLectioContentModules(lectioModulesList);
if (validationIssues.length > 0) {
	// eslint-disable-next-line no-console
	console.error('[Lectio] Component module validation failed:');
	for (const issue of validationIssues) {
		// eslint-disable-next-line no-console
		console.error(`- ${issue.path}: ${issue.message}`);
	}
	process.exit(1);
}

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

const sectionSchema = createGenerator({
	path: resolve('src/lib/schema/types.ts'),
	tsconfig: resolve('tsconfig.json'),
	type: 'SectionContent',
	additionalProperties: false
}).createSchema('SectionContent');

writeFileSync(`${OUT}/section-content-schema.json`, JSON.stringify(sectionSchema, null, 2));

function resolveLocalRef(root: JsonObject, ref: string): JsonObject {
	const parts = ref
		.replace(/^#\//, '')
		.split('/')
		.map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'));
	let node: unknown = root;
	for (const part of parts) {
		node = (node as JsonObject)[part];
	}
	return (node ?? {}) as JsonObject;
}

function getSectionContentPropertyMap(schemaJson: JsonObject): JsonObject {
	const defs = ((schemaJson.$defs ?? schemaJson.definitions ?? {}) as JsonObject) ?? {};
	const sectionSchema =
		typeof schemaJson.$ref === 'string'
			? resolveLocalRef(schemaJson, schemaJson.$ref as string)
			: ((defs.SectionContent as JsonObject | undefined) ?? schemaJson);
	return (sectionSchema.properties as JsonObject | undefined) ?? {};
}

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
		contextually_present: contract.contextually_present ?? [],
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
			teacher_label: component.teacherLabel,
			teacher_description: component.teacherDescription,
			cognitive_job: component.cognitiveJob,
			section_field: component.sectionField,
			group: component.group,
			status: component.status,
			capacity: component.capacity,
			behaviour_modes: component.behaviourModes,
			print_fallback: component.printFallback,
			generation_hint: component.generationHint ?? null
		}
	])
);

writeFileSync(`${OUT}/component-registry.json`, JSON.stringify(registryExport, null, 2));

writeFileSync(`${OUT}/manifest.json`, JSON.stringify(buildLectioManifest(), null, 2));

const sectionProps = getSectionContentPropertyMap(sectionSchema as JsonObject);
const componentSchemasExport = Object.fromEntries(
	lectioModulesList
		.filter((component) => component.metadata.sectionField !== null)
		.map((component) => {
			const field = String(component.metadata.sectionField);
			const fragment = sectionProps[field];
			if (!fragment) {
				throw new Error(
					`[Lectio] Missing SectionContent JSON Schema property for mapped field "${field}" (${component.metadata.id}).`
				);
			}
			// Keep local $ref indirection — full dereference can recurse on cyclic schemas.
			return [component.metadata.id, fragment];
		})
);

writeFileSync(`${OUT}/component-schemas.json`, JSON.stringify(componentSchemasExport, null, 2));

const componentExamplesExport = Object.fromEntries(
	lectioModulesList.map((component) => [component.metadata.id, component.examples])
);
writeFileSync(`${OUT}/component-examples.json`, JSON.stringify(componentExamplesExport, null, 2));

const printRulesExport = {
	components: Object.fromEntries(lectioModulesList.map((c) => [c.metadata.id, c.print]))
};

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

const templatePrintRules = Object.fromEntries(
	contracts.map((contract) => [contract.id, contract.printRules])
);
writeFileSync(
	`${OUT}/print-rules.json`,
	JSON.stringify({ ...printRulesExport, templates: templatePrintRules }, null, 2)
);

const templateCount = contracts.length;
const fieldCount = Object.keys(componentFieldMap).length;
const componentCount = Object.keys(registryExport).length;
const presetCount = Object.keys(presetExport).length;

console.log(`Exported ${templateCount} template contracts`);
console.log('Exported SectionContent schema');
console.log(`Exported component field map (${fieldCount} components with section fields)`);
console.log(`Exported full component registry (${componentCount} total components)`);
console.log(`Exported preset registry (${presetCount} presets)`);
console.log('Exported manifest.json (v3)');
console.log('Exported component-schemas.json');
console.log('Exported component-examples.json');
console.log('Exported print-rules.json');
console.log(`Output: ${OUT}/`);
