import type { LectioContentContract } from '$lib/lectio/core/content-contract';
import { metadata } from './metadata';

export const contentContract = {
	componentId: metadata.id,
	sectionField: metadata.sectionField,
	fieldContracts: {
		callouts: {
			format: 'positioned_callouts',
			description: 'Callout markers anchored to key points in the diagram.',
			renderBehavior: 'Rendered as overlays on image_url with labels and connectors.',
			constraints: ['Each callout.x must be between 0 and 100.', 'Each callout.y must be between 0 and 100.']
		}
	}
} satisfies LectioContentContract;
