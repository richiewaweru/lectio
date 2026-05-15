import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'prose',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: true,
	fallback: 'Pull quote block with left border'
} satisfies LectioPrintSpec;
