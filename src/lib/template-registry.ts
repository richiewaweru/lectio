import type { TemplateDefinition, TemplateFilters } from '$lib/template-types';
import { validateTemplateDefinition } from '$lib/template-validation';

import { compareAndApplyContract } from '$lib/templates/compare-and-apply/config';
import CompareAndApplyLayout from '$lib/templates/compare-and-apply/layout.svelte';
import { compareAndApplyPresets } from '$lib/templates/compare-and-apply/presets';
import { compareAndApplyPreview } from '$lib/templates/compare-and-apply/preview';
import { diagramLedLessonContract } from '$lib/templates/diagram-led-lesson/config';
import DiagramLedLessonLayout from '$lib/templates/diagram-led-lesson/layout.svelte';
import { diagramLedLessonPresets } from '$lib/templates/diagram-led-lesson/presets';
import { diagramLedLessonPreview } from '$lib/templates/diagram-led-lesson/preview';
import { distinctionGridContract } from '$lib/templates/distinction-grid/config';
import DistinctionGridLayout from '$lib/templates/distinction-grid/layout.svelte';
import { distinctionGridPresets } from '$lib/templates/distinction-grid/presets';
import { distinctionGridPreview } from '$lib/templates/distinction-grid/preview';
import { figureFirstContract } from '$lib/templates/figure-first/config';
import FigureFirstLayout from '$lib/templates/figure-first/layout.svelte';
import { figureFirstPresets } from '$lib/templates/figure-first/presets';
import { figureFirstPreview } from '$lib/templates/figure-first/preview';
import { focusFlowContract } from '$lib/templates/focus-flow/config';
import FocusFlowLayout from '$lib/templates/focus-flow/layout.svelte';
import { focusFlowPresets } from '$lib/templates/focus-flow/presets';
import { focusFlowPreview } from '$lib/templates/focus-flow/preview';
import { formalTrackContract } from '$lib/templates/formal-track/config';
import FormalTrackLayout from '$lib/templates/formal-track/layout.svelte';
import { formalTrackPresets } from '$lib/templates/formal-track/presets';
import { formalTrackPreview } from '$lib/templates/formal-track/preview';
import { guidedConceptCompactContract } from '$lib/templates/guided-concept-compact/config';
import GuidedConceptCompactLayout from '$lib/templates/guided-concept-compact/layout.svelte';
import { guidedConceptCompactPresets } from '$lib/templates/guided-concept-compact/presets';
import { guidedConceptCompactPreview } from '$lib/templates/guided-concept-compact/preview';
import { guidedConceptPathContract } from '$lib/templates/guided-concept-path/config';
import GuidedConceptPathLayout from '$lib/templates/guided-concept-path/layout.svelte';
import { guidedConceptPathPresets } from '$lib/templates/guided-concept-path/presets';
import { guidedConceptPathPreview } from '$lib/templates/guided-concept-path/preview';
import { guidedDiscoveryContract } from '$lib/templates/guided-discovery/config';
import GuidedDiscoveryLayout from '$lib/templates/guided-discovery/layout.svelte';
import { guidedDiscoveryPresets } from '$lib/templates/guided-discovery/presets';
import { guidedDiscoveryPreview } from '$lib/templates/guided-discovery/preview';
import { interactiveLabContract } from '$lib/templates/interactive-lab/config';
import InteractiveLabLayout from '$lib/templates/interactive-lab/layout.svelte';
import { interactiveLabPresets } from '$lib/templates/interactive-lab/presets';
import { interactiveLabPreview } from '$lib/templates/interactive-lab/preview';
import { processTrainerContract } from '$lib/templates/process-trainer/config';
import ProcessTrainerLayout from '$lib/templates/process-trainer/layout.svelte';
import { processTrainerPresets } from '$lib/templates/process-trainer/presets';
import { processTrainerPreview } from '$lib/templates/process-trainer/preview';
import { timelineNarrativeContract } from '$lib/templates/timeline-narrative/config';
import TimelineNarrativeLayout from '$lib/templates/timeline-narrative/layout.svelte';
import { timelineNarrativePresets } from '$lib/templates/timeline-narrative/presets';
import { timelineNarrativePreview } from '$lib/templates/timeline-narrative/preview';

export const templateRegistry: TemplateDefinition[] = [
	{
		contract: guidedConceptPathContract,
		preview: guidedConceptPathPreview,
		presets: guidedConceptPathPresets,
		render: GuidedConceptPathLayout,
		readmePath: 'src/lib/templates/guided-concept-path/README.md'
	},
	{
		contract: figureFirstContract,
		preview: figureFirstPreview,
		presets: figureFirstPresets,
		render: FigureFirstLayout,
		readmePath: 'src/lib/templates/figure-first/README.md'
	},
	{
		contract: compareAndApplyContract,
		preview: compareAndApplyPreview,
		presets: compareAndApplyPresets,
		render: CompareAndApplyLayout,
		readmePath: 'src/lib/templates/compare-and-apply/README.md'
	},
	{
		contract: focusFlowContract,
		preview: focusFlowPreview,
		presets: focusFlowPresets,
		render: FocusFlowLayout,
		readmePath: 'src/lib/templates/focus-flow/README.md'
	},
	{
		contract: guidedConceptCompactContract,
		preview: guidedConceptCompactPreview,
		presets: guidedConceptCompactPresets,
		render: GuidedConceptCompactLayout,
		readmePath: 'src/lib/templates/guided-concept-compact/README.md'
	},
	{
		contract: formalTrackContract,
		preview: formalTrackPreview,
		presets: formalTrackPresets,
		render: FormalTrackLayout,
		readmePath: 'src/lib/templates/formal-track/README.md'
	},
	{
		contract: diagramLedLessonContract,
		preview: diagramLedLessonPreview,
		presets: diagramLedLessonPresets,
		render: DiagramLedLessonLayout,
		readmePath: 'src/lib/templates/diagram-led-lesson/README.md'
	},
	{
		contract: distinctionGridContract,
		preview: distinctionGridPreview,
		presets: distinctionGridPresets,
		render: DistinctionGridLayout,
		readmePath: 'src/lib/templates/distinction-grid/README.md'
	},
	{
		contract: timelineNarrativeContract,
		preview: timelineNarrativePreview,
		presets: timelineNarrativePresets,
		render: TimelineNarrativeLayout,
		readmePath: 'src/lib/templates/timeline-narrative/README.md'
	},
	{
		contract: processTrainerContract,
		preview: processTrainerPreview,
		presets: processTrainerPresets,
		render: ProcessTrainerLayout,
		readmePath: 'src/lib/templates/process-trainer/README.md'
	},
	{
		contract: interactiveLabContract,
		preview: interactiveLabPreview,
		presets: interactiveLabPresets,
		render: InteractiveLabLayout,
		readmePath: 'src/lib/templates/interactive-lab/README.md'
	},
	{
		contract: guidedDiscoveryContract,
		preview: guidedDiscoveryPreview,
		presets: guidedDiscoveryPresets,
		render: GuidedDiscoveryLayout,
		readmePath: 'src/lib/templates/guided-discovery/README.md'
	}
];

export const templateRegistryMap = Object.fromEntries(
	templateRegistry.map((definition) => [definition.contract.id, definition])
) satisfies Record<string, TemplateDefinition>;

export function getTemplateById(templateId: string) {
	return templateRegistryMap[templateId];
}

export function filterTemplates(filters: TemplateFilters) {
	return templateRegistry.filter((definition) => {
		const { contract } = definition;

		if (filters.family && contract.family !== filters.family) {
			return false;
		}

		if (filters.intent && contract.intent !== filters.intent) {
			return false;
		}

		if (filters.learnerFit && !contract.learnerFit.includes(filters.learnerFit)) {
			return false;
		}

		if (
			filters.subject &&
			!contract.subjects.some((subject) => subject.toLowerCase() === filters.subject?.toLowerCase())
		) {
			return false;
		}

		if (filters.interactionLevel && contract.interactionLevel !== filters.interactionLevel) {
			return false;
		}

		return true;
	});
}

export function getTemplateFamilies() {
	return Array.from(new Set(templateRegistry.map((definition) => definition.contract.family)));
}

export function validateAllTemplates() {
	return templateRegistry.map((definition) => ({
		id: definition.contract.id,
		...validateTemplateDefinition(definition)
	}));
}
