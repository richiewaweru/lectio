import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'prose',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: false,
	fallback: 'Static, amber left rule'
} satisfies LectioPrintSpec;
