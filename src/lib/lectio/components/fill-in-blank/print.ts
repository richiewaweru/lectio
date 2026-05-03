import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "allow",
	"preferredWidth": "full",
	"fallback": "Passage with underlined blanks, word bank box below"
} satisfies LectioPrintSpec;
