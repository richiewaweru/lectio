import { basePresets } from '$lib/presets/base-presets';

export const processTrainerPresetIds = [
	'blue-classroom',
	'warm-paper',
	'minimal-light'
] as const;

export const processTrainerPresets = basePresets.filter((preset) =>
	processTrainerPresetIds.includes(preset.id as (typeof processTrainerPresetIds)[number])
);
