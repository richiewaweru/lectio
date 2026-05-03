import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "avoid",
	"preferredWidth": "full",
	"fallback": "Static diagram at midstate"
} satisfies LectioPrintSpec;
