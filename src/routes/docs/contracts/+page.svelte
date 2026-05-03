<svelte:head>
	<title>Contracts and pipelines - Lectio docs</title>
</svelte:head>

<p class="eyebrow">Contracts and pipelines</p>
<h1>JSON exports for agents and backends</h1>
<p class="lead">
	External pipelines (Python services, LLM agents, validators) should read exported artifacts from this
	repository - not import TypeScript from <code>src/</code>. The export script keeps templates,
	components, presets, and field maps in sync with the registry.
</p>

<h2>Run the exporter</h2>
<pre><code>npm run export-contracts
npm run export-contracts -- --out /path/to/output
LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts</code></pre>

<h2>Artifacts</h2>
<table>
	<thead>
		<tr>
			<th>File</th>
			<th>Contents</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>{'{'}template-id{'}'}.json</code> (x13)</td>
			<td>Template contract: <code>always_present</code>, <code>available_components</code>, <code>component_budget</code>, <code>max_per_section</code>, <code>signal_affinity</code>, <code>section_role_defaults</code>, generation guidance, <code>allowed_presets</code></td>
		</tr>
		<tr>
			<td><code>section-content-schema.json</code></td>
			<td>Canonical JSON schema for <code>SectionContent</code></td>
		</tr>
		<tr>
			<td><code>component-field-map.json</code></td>
			<td>Maps component IDs to <code>SectionContent</code> field names</td>
		</tr>
		<tr>
			<td><code>component-registry.json</code></td>
			<td>Full metadata: capacity, behaviour modes, cognitive job, status, and <code>generation_hint</code></td>
		</tr>
		<tr>
			<td><code>preset-registry.json</code></td>
			<td>Preset palette, typography, density, surface style</td>
		</tr>
		<tr>
			<td><code>manifest.json</code></td>
			<td>v3 agent-facing manifest: components grouped by pedagogical phase (<code>teacher_label</code> + technical metadata)</td>
		</tr>
		<tr>
			<td><code>component-schemas.json</code></td>
			<td>JSON schema fragments per component ID (derived from each <code>SectionContent</code> property)</td>
		</tr>
		<tr>
			<td><code>component-examples.json</code></td>
			<td>Example payloads validated against each component’s Lectio schema (used for tooling/tests)</td>
		</tr>
		<tr>
			<td><code>print-rules.json</code></td>
			<td>V3 print/layout hints per component plus template <code>print_rules</code> aggregation</td>
		</tr>
		<tr>
			<td><code>generated/python/section_content.py</code></td>
			<td>Official Pydantic v2 adapter generated from the SectionContent schema</td>
		</tr>
	</tbody>
</table>

<h2>Why the field map exists</h2>
<p>
	Each component module declares <code>sectionField</code>; <code>getComponentFieldMap()</code>
	derives the ID-to-field map for template validation and for export. Adding a component means
	extending component modules under <code>src/lib/lectio/components</code> and updating
	<code>SectionContent</code> types, then re-exporting — no parallel hand-maintained maps.
</p>

<h2>When to re-run</h2>
<p>
	Whenever templates, components, or presets change, run <code>npm run package</code> for consumers and
	<code>npm run export-contracts</code> for pipeline snapshots before you publish or deploy generators.
</p>

<div class="doc-callout">
	<p>
		Authoritative deep dive (repo file): <code>docs/reference/registry-field-map.md</code> - same
		architecture as summarized here, with sample JSON and file pointers.
	</p>
</div>
