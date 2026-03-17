import { basePresets } from '$lib/presets/base-presets';

export const focusFlowPresetIds = [
	'high-contrast-focus',
	'calm-green',
	'warm-paper',
	'minimal-light'
] as const;

export const focusFlowPresets = basePresets.filter((preset) =>
	focusFlowPresetIds.includes(preset.id as (typeof focusFlowPresetIds)[number])
);
