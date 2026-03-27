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
 *   {out}/{template-id}.json          — one per template
 *   {out}/component-field-map.json    — component → SectionContent field
 *   {out}/component-registry.json     — full component metadata
 *   {out}/preset-registry.json        — preset palette and style metadata
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
const outFromArg  = outArgIndex !== -1 ? process.argv[outArgIndex + 1] : null;
const outFromEnv  = process.env.LECTIO_CONTRACTS_DIR ?? null;
const OUT         = resolve(outFromArg ?? outFromEnv ?? 'agents/contracts');
mkdirSync(OUT, { recursive: true });

// ── 1. Template contracts ─────────────────────────────────────────────────────
// Export only the fields the pipeline needs — not the Svelte render
// component, not the preset UI definitions, not the preview section.

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
	visualLedContract,
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

// ── 2. Component field map ────────────────────────────────────────────────────
// Derived from the registry — never hardcoded.
// The pipeline uses this to validate sections against template contracts
// without knowing Lectio's internal structure.

const componentFieldMap = getComponentFieldMap();
writeFileSync(`${OUT}/component-field-map.json`, JSON.stringify(componentFieldMap, null, 2));

// ── 3. Full component registry ────────────────────────────────────────────────
// Useful for pipeline tools that need capacity limits or component metadata.

const registryExport = Object.fromEntries(
	Object.values(componentRegistry).map((c) => [
		c.id,
		{
			id: c.id,
			name: c.name,
			purpose: c.purpose,
			cognitive_job: c.cognitiveJob,
			section_field: c.sectionField,
			group: c.group,
			status: c.status,
			capacity: c.capacity,
			behaviour_modes: c.behaviourModes,
			print_fallback: c.printFallback
		}
	])
);

writeFileSync(`${OUT}/component-registry.json`, JSON.stringify(registryExport, null, 2));

// ── 4. Preset registry ───────────────────────────────────────────────────────
// Visual preset metadata for the pipeline.

const presetExport = Object.fromEntries(
	basePresets.map((p) => [
		p.id,
		{
			id:            p.id,
			name:          p.name,
			palette:       p.palette,
			typography:    p.typography,
			density:       p.density,
			surface_style: p.surfaceStyle,
		}
	])
);

writeFileSync(`${OUT}/preset-registry.json`, JSON.stringify(presetExport, null, 2));

// ── Summary ───────────────────────────────────────────────────────────────────

const templateCount = contracts.length;
const fieldCount = Object.keys(componentFieldMap).length;
const componentCount = Object.keys(registryExport).length;
const presetCount = Object.keys(presetExport).length;

console.log(`✓ Exported ${templateCount} template contracts`);
console.log(`✓ Exported component field map (${fieldCount} components with section fields)`);
console.log(`✓ Exported full component registry (${componentCount} total components)`);
console.log(`✓ Exported preset registry (${presetCount} presets)`);
console.log(`  Output: ${OUT}/`);
