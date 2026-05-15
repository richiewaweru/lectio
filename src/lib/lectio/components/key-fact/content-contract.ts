import type { LectioContentContract } from '$lib/lectio/core/content-contract';
import { metadata } from './metadata';

export const contentContract = {
	componentId: metadata.id,
	sectionField: metadata.sectionField,
	fieldContracts: {
		fact: {
			format: 'inline_markdown',
			description: 'The key fact statement.',
			renderBehavior: 'Inline markdown with optional emphasis and math.'
		},
		context: {
			format: 'inline_markdown',
			description: 'Optional framing context.',
			renderBehavior: 'Inline markdown.'
		},
		source: {
			format: 'plain_text',
			description: 'Optional attribution or source label.',
			renderBehavior: 'Plain text.'
		}
	},
	componentConstraints: ['Keep the fact line short and exam-ready.']
} satisfies LectioContentContract;
