import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "allow",
	"preferredWidth": "full",
	"fallback": "Bordered callout box"
} satisfies LectioPrintSpec;
