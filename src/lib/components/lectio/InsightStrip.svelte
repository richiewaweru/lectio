<script lang="ts">
	import type { InsightStripContent } from '$lib/schema/types';
	import { renderInlineMarkdown } from '$lib/utils/markdown';

	let { content }: { content: InsightStripContent } = $props();
</script>

<section class="rh-gap-component-tight" data-print-container="table" data-print-color-reset="true">
	{#each content.cells as cell, index}
		<div
			class="rh-radius-card border p-5 shadow-sm transition-colors {cell.highlight
				? 'border-violet-200 bg-violet-50 text-violet-950'
				: 'border-border/70 bg-white/82 text-foreground'}"
		>
			<div class="grid rh-gap-cluster md:grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,220px)] md:items-center">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
						{index + 1 < 10 ? `0${index + 1}` : index + 1}
					</p>
					<p class="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/72">
						{cell.label}
					</p>
				</div>

				<p class="text-2xl leading-tight font-serif">{@html renderInlineMarkdown(cell.value)}</p>

				<div class="md:text-right">
					{#if cell.note}
						<p class="text-sm leading-6 text-muted-foreground">{@html renderInlineMarkdown(cell.note)}</p>
					{:else}
						<p class="text-sm leading-6 text-muted-foreground/75">Key comparison point</p>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</section>
