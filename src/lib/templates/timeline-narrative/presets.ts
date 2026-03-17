import { basePresets } from '$lib/presets/base-presets';

export const timelineNarrativePresetIds = [
	'warm-paper',
	'blue-classroom',
	'minimal-light'
] as const;

export const timelineNarrativePresets = basePresets.filter((preset) =>
	timelineNarrativePresetIds.includes(preset.id as (typeof timelineNarrativePresetIds)[number])
);
