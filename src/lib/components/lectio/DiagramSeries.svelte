<script lang="ts">
	import type { DiagramSeriesContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let { content }: { content: DiagramSeriesContent } = $props();

	let current = $state(0);
</script>

<Card class="p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
		Diagram Series
	</div>
	<h3 class="text-base font-semibold text-foreground mb-4 font-serif">{content.title}</h3>

	<!-- Step indicators -->
	<div class="flex gap-2 mb-4">
		{#each content.diagrams as _, i}
			<button
				class="flex-1 h-1.5 rounded-full transition-colors cursor-pointer {i === current
					? 'bg-accent'
					: i < current
						? 'bg-accent/40'
						: 'bg-muted'}"
				onclick={() => (current = i)}
				aria-label="Go to step {i + 1}"
			></button>
		{/each}
	</div>

	<!-- Current diagram -->
	{@const diagram = content.diagrams[current]}
	<div class="text-xs font-semibold text-accent mb-2">
		Step {current + 1}: {diagram.step_label}
	</div>
	<div class="rounded-xl border overflow-hidden">
		{@html diagram.svg_content}
	</div>
	<p class="text-xs text-muted-foreground leading-relaxed mt-2">{diagram.caption}</p>

	<!-- Navigation -->
	<div class="flex justify-between mt-4">
		<Button
			variant="outline"
			size="sm"
			disabled={current === 0}
			onclick={() => (current -= 1)}
			class="text-xs"
		>
			&larr; Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={current === content.diagrams.length - 1}
			onclick={() => (current += 1)}
			class="text-xs"
		>
			Next &rarr;
		</Button>
	</div>
</Card>
