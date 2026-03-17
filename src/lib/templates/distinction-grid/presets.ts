import { basePresets } from '$lib/presets/base-presets';

export const distinctionGridPresetIds = [
	'blue-classroom',
	'warm-paper',
	'high-contrast-focus'
] as const;

export const distinctionGridPresets = basePresets.filter((preset) =>
	distinctionGridPresetIds.includes(preset.id as (typeof distinctionGridPresetIds)[number])
);
