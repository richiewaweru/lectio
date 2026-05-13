import type { LectioPrintSpec } from '$lib/lectio/core/types';

export const print = {
	breakBehavior: 'itemized',
	itemSelector: '.definition-family-print-item',
	preferredWidth: 'full',
	hasMedia: false,
	requiresColorReset: false,
	fallback: 'All definitions expanded'
} satisfies LectioPrintSpec;
