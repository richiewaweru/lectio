import type { ZodIssue, ZodTypeAny } from 'zod';

import type { LectioComponentModule } from './types';

type ValidatableModule = Pick<
	LectioComponentModule,
	'schema' | 'metadata' | 'print' | 'examples'
>;

const PHASES = new Set<number>([1, 2, 3, 4, 5, 6, 7]);

export interface LectioComponentValidationIssue {
	readonly path: string;
	readonly message: string;
}

export function validateLectioContentModule(module: ValidatableModule): LectioComponentValidationIssue[] {
	const issues: LectioComponentValidationIssue[] = [];
	const m = module.metadata;
	const prefix = `[${m.registryKey}:${m.id}]`;

	if (!m.id.trim()) issues.push({ path: 'metadata.id', message: `${prefix} Missing metadata.id` });
	if (!m.name.trim())
		issues.push({ path: 'metadata.name', message: `${prefix} Missing metadata.name` });
	if (!m.role.trim()) issues.push({ path: 'metadata.role', message: `${prefix} Missing metadata.role` });
	if (!m.registryKey.trim()) {
		issues.push({ path: 'metadata.registryKey', message: `${prefix} Missing metadata.registryKey` });
	}

	if (!PHASES.has(m.phase))
		issues.push({ path: 'metadata.phase', message: `${prefix} phase must be 1–7` });

	if (!(m.sectionField === null || typeof m.sectionField === 'string'))
		issues.push({ path: 'metadata.sectionField', message: `${prefix} metadata.sectionField must be string|null` });

	for (const key of ['breakBehavior', 'preferredWidth', 'fallback'] as const) {
		if (!(typeof module.print[key] === 'string' && module.print[key].trim().length > 0)) {
			issues.push({
				path: `print.${key}`,
				message: `${prefix} print.${String(key)} missing`
			});
		}
	}

	if (!(module.schema && typeof module.schema === 'object' && 'safeParse' in module.schema)) {
		issues.push({
			path: 'schema',
			message: `${prefix} schema missing or invalid`
		});
	}

	const schemaPresent = !!(module.schema && typeof module.schema === 'object' && 'safeParse' in module.schema);

	if (!Array.isArray(module.examples)) {
		issues.push({ path: 'examples', message: `${prefix} examples must be an array` });
	} else if (schemaPresent && m.sectionField !== null) {
		module.examples.forEach((example, idx) => {
			const typedSchema = module.schema as ZodTypeAny;
			const parsed = typedSchema.safeParse(example);
			if (!parsed.success) {
				appendZodIssues(issues, prefix, parsed.error.issues, `examples.${idx}`);
			}
		});
	} else if (schemaPresent && m.sectionField === null) {
		// Inline-only components validate examples against exported schema slice (inline props)
		module.examples.forEach((example, idx) => {
			const typedSchema = module.schema as ZodTypeAny;
			const parsed = typedSchema.safeParse(example);
			if (!parsed.success) {
				appendZodIssues(issues, prefix, parsed.error.issues, `examples.${idx}`);
			}
		});
	}

	return issues;
}

function appendZodIssues(
	issues: LectioComponentValidationIssue[],
	modulePrefix: string,
	zissues: readonly ZodIssue[],
	basePath: string
): void {
	for (const issue of zissues) {
		const pathTail = issue.path.filter((p): p is string | number => p !== '').join('.');
		const resolved = pathTail ? `${basePath}.${pathTail}` : basePath;
		issues.push({
			path: resolved,
			message: `${modulePrefix} ${resolved}: ${issue.message}`
		});
	}
}

export function validateAllLectioContentModules(modules: readonly ValidatableModule[]): LectioComponentValidationIssue[] {
	return modules.flatMap((m) => validateLectioContentModule(m));
}
