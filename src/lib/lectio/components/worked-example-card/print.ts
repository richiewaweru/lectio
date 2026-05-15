import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'itemized',
	itemSelector: '.worked-step-print',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: false,
	fallback: 'All steps expanded'
} satisfies LectioPrintSpec;
