import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	"breakBehavior": "avoid",
	"preferredWidth": "full",
	"fallback": "All visible, write-in lines rendered; inline answers hidden by default"
} satisfies LectioPrintSpec;
