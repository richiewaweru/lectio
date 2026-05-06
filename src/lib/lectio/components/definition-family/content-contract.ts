import type { LectioContentContract } from '$lib/lectio/core/content-contract';
import { metadata } from './metadata';

export const contentContract = {
	componentId: metadata.id,
	sectionField: metadata.sectionField,
	fieldContracts: {
		content: {
			format: 'structured_object',
			description: 'Schema-aligned content payload for this component.'
		}
	}
} satisfies LectioContentContract;
