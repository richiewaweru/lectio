<script lang="ts">
	import type { SimulationContent } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';

	let { content }: { content: SimulationContent } = $props();
</script>

<Card class="border-primary/10 bg-white/88 p-6">
	<div class="space-y-4">
		<div class="space-y-3">
			<div class="flex flex-wrap items-center gap-3">
				<p class="eyebrow">Simulation</p>
				<Badge variant="outline">Scaffold</Badge>
			</div>
			<h3 class="text-2xl font-semibold font-serif text-primary">Manipulate and discover</h3>
		</div>

		{#if content.explanation}
			<p class="text-base leading-7 text-foreground/84">{content.explanation}</p>
		{/if}

		<div
			class="flex items-center justify-center rounded-[1.25rem] border border-dashed border-border/80 bg-secondary/35 p-6 text-center text-sm leading-6 text-muted-foreground"
			style="min-height: {content.spec.dimensions.height}px;"
		>
			Interactive experience will mount here when the interaction pipeline is connected.
		</div>

		<div class="grid gap-3 rounded-[1.25rem] bg-white/82 p-4 text-sm leading-6 text-foreground/82 md:grid-cols-2">
			<div>
				<p class="font-semibold text-primary">Type</p>
				<p>{content.spec.type}</p>
			</div>
			<div>
				<p class="font-semibold text-primary">Goal</p>
				<p>{content.spec.goal}</p>
			</div>
			<div>
				<p class="font-semibold text-primary">Dimensions</p>
				<p>{content.spec.dimensions.width} by {content.spec.dimensions.height}px</p>
			</div>
			<div>
				<p class="font-semibold text-primary">Print fallback</p>
				<p>{content.spec.print_translation}</p>
			</div>
		</div>

		{#if content.fallback_diagram}
			<div class="space-y-3 rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
				<p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
					Fallback diagram
				</p>
				<div
					role="img"
					aria-label={content.fallback_diagram.alt_text}
					class="overflow-hidden rounded-[1rem] border border-border/70 bg-white [&_svg]:h-auto [&_svg]:w-full"
				>
					{@html content.fallback_diagram.svg_content}
				</div>
				<p class="text-sm leading-6 text-muted-foreground">
					{content.fallback_diagram.caption}
				</p>
			</div>
		{/if}
	</div>
</Card>
