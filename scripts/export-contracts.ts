/**
 * scripts/export-contracts.ts
 *
 * Exports everything the Python pipeline needs to know about
 * Lectio's templates and components into agents/contracts/.
 *
 * Run this whenever templates or components change:
 *   npm run export-contracts
 *
 * Output files:
 *   agents/contracts/{template-id}.json   — one per template
 *   agents/contracts/component-field-map.json  — component → SectionContent field
 *   agents/contracts/component-registry.json   — full component metadata
 *
 * The pipeline reads these files. It never imports from src/.
 * Single source of truth stays here in TypeScript.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { templateRegistry } from '../src/lib/template-registry';
import { componentRegistry, getComponentFieldMap } from '../src/lib/registry';

const OUT = 'agents/contracts';
mkdirSync(OUT, { recursive: true });

// ── 1. Template contracts ─────────────────────────────────────────────────────
// Export only the fields the pipeline needs — not the Svelte render
// component, not the preset UI definitions, not the preview section.

for (const template of templateRegistry) {
	const { contract } = template;

	const summary = {
		id: contract.id,
		name: contract.name,
		family: contract.family,
		intent: contract.intent,
		tagline: contract.tagline,
		lesson_flow: contract.lessonFlow,
		required_components: contract.requiredComponents,
		optional_components: contract.optionalComponents,
		default_behaviours: contract.defaultBehaviours,
		generation_guidance: {
			tone: contract.generationGuidance.tone,
			pacing: contract.generationGuidance.pacing,
			chunking: contract.generationGuidance.chunking,
			emphasis: contract.generationGuidance.emphasis,
			avoid: contract.generationGuidance.avoid
		},
		best_for: contract.bestFor,
		not_ideal_for: contract.notIdealFor,
		learner_fit: contract.learnerFit,
		subjects: contract.subjects,
		interaction_level: contract.interactionLevel
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

// ── Summary ───────────────────────────────────────────────────────────────────

const fieldCount = Object.keys(componentFieldMap).length;
const templateCount = templateRegistry.length;
const componentCount = Object.keys(registryExport).length;

console.log(`✓ Exported ${templateCount} template contracts`);
console.log(`✓ Exported component field map (${fieldCount} components with section fields)`);
console.log(`✓ Exported full component registry (${componentCount} total components)`);
console.log(`  Output: ${OUT}/`);
