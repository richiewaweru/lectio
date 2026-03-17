import { basePresets } from '$lib/presets/base-presets';

export const diagramLedLessonPresetIds = [
	'calm-green',
	'blue-classroom',
	'warm-paper'
] as const;

export const diagramLedLessonPresets = basePresets.filter((preset) =>
	diagramLedLessonPresetIds.includes(preset.id as (typeof diagramLedLessonPresetIds)[number])
);
