import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "avoid",
	"preferredWidth": "full",
	"fallback": "Full static, amber left border"
} satisfies LectioPrintSpec;
