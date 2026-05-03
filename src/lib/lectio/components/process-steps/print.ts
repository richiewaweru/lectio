import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "avoid",
	"preferredWidth": "full",
	"fallback": "All steps visible, checkbox squares for print"
} satisfies LectioPrintSpec;
