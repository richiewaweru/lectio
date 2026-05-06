// @vitest-environment node

import { execFileSync } from 'child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { describe, expect, it } from 'vitest';

type JsonObject = Record<string, unknown>;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function runTsxScript(scriptPath: string, args: string[]): void {
	execFileSync(process.execPath, ['--import', 'tsx', scriptPath, ...args], {
		cwd: ROOT,
		stdio: 'pipe'
	});
}

function readJson(path: string): JsonObject {
	return JSON.parse(readFileSync(path, 'utf8')) as JsonObject;
}

function resolveLocalRef(root: JsonObject, ref: string): JsonObject {
	const parts = ref
		.replace(/^#\//, '')
		.split('/')
		.map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'));
	let node: unknown = root;
	for (const part of parts) {
		node = (node as JsonObject)[part];
	}
	return (node ?? {}) as JsonObject;
}

describe('contract exports', () => {
	it('exports schema, unified content contract, and python adapter from SectionContent artifacts', () => {
		const tempDir = mkdtempSync(join(tmpdir(), 'lectio-contracts-'));
		const outDir = join(tempDir, 'contracts');
		const pyOut = join(tempDir, 'generated', 'python', 'section_content.py');

		try {
			runTsxScript('scripts/export-contracts.ts', ['--out', outDir]);

			const schemaPath = join(outDir, 'section-content-schema.json');
			const unifiedContractPath = join(outDir, 'lectio-content-contract.json');

			expect(existsSync(schemaPath)).toBe(true);
			expect(existsSync(unifiedContractPath)).toBe(true);

			const schema = readJson(schemaPath);
			const defs = ((schema.$defs ?? schema.definitions ?? {}) as JsonObject) ?? {};
			const sectionSchema =
				typeof schema.$ref === 'string'
					? resolveLocalRef(schema, schema.$ref as string)
					: ((defs.SectionContent as JsonObject | undefined) ?? schema);
			const sectionProps = (sectionSchema.properties as JsonObject | undefined) ?? {};

			expect(sectionProps.callout).toBeTruthy();
			expect(sectionProps.summary).toBeTruthy();

			const diagramSchema = (defs.DiagramContent as JsonObject | undefined) ?? {};
			const diagramProps = (diagramSchema.properties as JsonObject | undefined) ?? {};
			expect(diagramProps.image_url).toBeTruthy();

			const simulationTypeSchema = (defs.SimulationType as JsonObject | undefined) ?? {};
			expect(simulationTypeSchema.type).toBe('string');
			expect(simulationTypeSchema.enum).toBeUndefined();

			const unified = readJson(unifiedContractPath) as Record<string, JsonObject>;
			expect(unified.version).toBe('1.0.0');
			expect(unified.default_template_id).toBe('guided-concept-path');
			expect(unified.formatting_policy).toBeTruthy();
			expect(unified.templates).toBeTruthy();
			expect(unified.planner_index).toBeTruthy();

			const componentCards = (unified.component_cards ?? {}) as Record<string, JsonObject>;
			expect(componentCards['diagram-block']).toBeTruthy();
			expect(componentCards['glossary-inline']).toBeUndefined();

			const diagramBlock = componentCards['diagram-block'] as Record<string, JsonObject>;
			const fieldContracts = (diagramBlock.field_contracts ?? {}) as Record<string, JsonObject>;
			expect(fieldContracts.callouts).toBeTruthy();

			const excluded = (unified.excluded_components ?? {}) as Record<string, JsonObject>;
			expect(excluded['image-block']).toBeTruthy();
			expect(excluded['video-embed']).toBeTruthy();
			expect(excluded['glossary-inline']).toBeTruthy();

			runTsxScript('scripts/generate-python-types.ts', ['--schema', schemaPath, '--out', pyOut]);

			expect(existsSync(pyOut)).toBe(true);
			const python = readFileSync(pyOut, 'utf8');
			expect(python).toContain('# -- AUTO-GENERATED - DO NOT EDIT');
			expect(python).toContain('class CalloutBlockContent(BaseModel):');
			expect(python).toContain('class SummaryBlockContent(BaseModel):');
			expect(python).toContain('class DiagramContent(BaseModel):');
			expect(python).toContain('class SectionContent(BaseModel):');
			expect(python).toContain('SimulationType = str');
			expect(python).not.toContain('SimulationType = Literal[');
		} finally {
			rmSync(tempDir, { recursive: true, force: true });
		}
	}, 30000);

	it('publishes explicit contract and generated artifact export surfaces', () => {
		const pkg = readJson(join(ROOT, 'package.json')) as Record<string, unknown>;
		const exportsMap = (pkg.exports as Record<string, unknown>) ?? {};
		expect(exportsMap['./contracts/*']).toBe('./contracts/*');
		expect(exportsMap['./generated/*']).toBe('./generated/*');

		expect(existsSync(join(ROOT, 'contracts', 'section-content-schema.json'))).toBe(true);
		expect(existsSync(join(ROOT, 'contracts', 'lectio-content-contract.json'))).toBe(true);
		expect(existsSync(join(ROOT, 'generated', 'python', 'section_content.py'))).toBe(true);
	});
});
