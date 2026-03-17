import { basePresets } from '$lib/presets/base-presets';

export const guidedConceptCompactPresetIds = [
	'blue-classroom',
	'warm-paper',
	'minimal-light'
] as const;

export const guidedConceptCompactPresets = basePresets.filter((preset) =>
	guidedConceptCompactPresetIds.includes(
		preset.id as (typeof guidedConceptCompactPresetIds)[number]
	)
);
