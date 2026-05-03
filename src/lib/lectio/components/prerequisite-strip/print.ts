import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "allow",
	"preferredWidth": "full",
	"fallback": "Inline list of prerequisites"
} satisfies LectioPrintSpec;
