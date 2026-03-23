<svelte:head>
	<title>Contracts and pipelines — Lectio docs</title>
</svelte:head>

<p class="eyebrow">Contracts and pipelines</p>
<h1>JSON exports for agents and backends</h1>
<p class="lead">
	External pipelines (Python services, LLM agents, validators) should read exported JSON from this
	repository — not import TypeScript from <code>src/</code>. The export script keeps templates,
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
			<td><code>{'{'}template-id{'}'}.json</code> (×12)</td>
			<td>Template contract: flow, required/optional components, guidance, <code>allowed_presets</code></td>
		</tr>
		<tr>
			<td><code>component-field-map.json</code></td>
			<td>Maps component IDs to <code>SectionContent</code> field names</td>
		</tr>
		<tr>
			<td><code>component-registry.json</code></td>
			<td>Full metadata: capacity, behaviour modes, cognitive job, status</td>
		</tr>
		<tr>
			<td><code>preset-registry.json</code></td>
			<td>Preset palette, typography, density, surface style</td>
		</tr>
	</tbody>
</table>

<h2>Why the field map exists</h2>
<p>
	Each <code>ComponentMeta</code> entry declares <code>sectionField</code>. <code>getComponentFieldMap()</code>
	derives the ID-to-field map for template validation and for export. Adding a component means
	updating the registry and types, then re-exporting — no parallel hand-maintained tables.
</p>

<h2>When to re-run</h2>
<p>
	Whenever templates, components, or presets change, run <code>npm run package</code> for consumers and
	<code>npm run export-contracts</code> for pipeline snapshots before you publish or deploy generators.
</p>

<div class="doc-callout">
	<p>
		Authoritative deep dive (repo file): <code>docs/reference/registry-field-map.md</code> — same
		architecture as summarized here, with sample JSON and file pointers.
	</p>
</div>
