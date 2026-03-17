<script lang="ts">
	import type { InsightStripContent } from '$lib/types';

	let { content }: { content: InsightStripContent } = $props();
</script>

<div
	class="grid gap-3"
	style="grid-template-columns: repeat({content.cells.length}, 1fr);"
>
	{#each content.cells as cell}
		<div
			class="rounded-2xl border p-4 text-center {cell.highlight
				? 'bg-accent/10 border-accent/30'
				: 'bg-card border-border'}"
		>
			<div class="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
				{cell.label}
			</div>
			<div class="text-xl font-bold text-foreground font-serif">{cell.value}</div>
			{#if cell.note}
				<p class="text-xs text-muted-foreground mt-1 leading-relaxed">{cell.note}</p>
			{/if}
		</div>
	{/each}
</div>
