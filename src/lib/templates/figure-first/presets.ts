import { basePresets } from '$lib/presets/base-presets';

export const figureFirstPresetIds = [
	'calm-green',
	'blue-classroom',
	'high-contrast-focus'
] as const;

export const figureFirstPresets = basePresets.filter((preset) =>
	figureFirstPresetIds.includes(preset.id as (typeof figureFirstPresetIds)[number])
);
