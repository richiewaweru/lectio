import type { z } from 'zod';
import { componentSchema } from './schema';

type ExampleDatum = z.infer<typeof componentSchema>;

export const examples: ExampleDatum[] = [
	{
		"caption": "A labelled diagram for the lesson.",
		"alt_text": "Diagram showing key parts referenced in the prose."
	}
];
