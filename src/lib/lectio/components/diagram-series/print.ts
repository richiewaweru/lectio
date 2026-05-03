import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "avoid",
	"preferredWidth": "full",
	"fallback": "All diagrams in sequence with step labels"
} satisfies LectioPrintSpec;
