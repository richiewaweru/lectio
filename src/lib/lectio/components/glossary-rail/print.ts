import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'prose',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: true,
	fallback: 'Inline vocabulary strip at section end'
} satisfies LectioPrintSpec;
