import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'table',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: true,
	fallback: 'Static table'
} satisfies LectioPrintSpec;
