<script lang="ts">
	import type { DiagramContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '$lib/components/ui/dialog';
	import { ZoomIn } from 'lucide-svelte';

	let { content }: { content: DiagramContent } = $props();
</script>

<Card class="p-6">
	{#if content.figure_number}
		<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
			Figure {content.figure_number}
		</div>
	{/if}

	<!-- SVG container with callout overlay -->
	<div class="relative" role="img" aria-label={content.alt_text}>
		{@html content.svg_content}

		{#if content.callouts && content.callouts.length > 0}
			{#each content.callouts as callout, i}
				<Popover>
					<PopoverTrigger>
						<button
							class="absolute w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm"
							style="left: {callout.x}%; top: {callout.y}%; transform: translate(-50%, -50%);"
							aria-label={callout.label}
						>
							{i + 1}
						</button>
					</PopoverTrigger>
					<PopoverContent class="w-56 rounded-xl border bg-card p-3 shadow-warm-sm">
						<div class="text-xs font-semibold text-foreground mb-1">{callout.label}</div>
						<p class="text-xs text-muted-foreground leading-relaxed">{callout.explanation}</p>
					</PopoverContent>
				</Popover>
			{/each}
		{/if}
	</div>

	<p class="text-xs text-muted-foreground leading-relaxed mt-3">{content.caption}</p>

	{#if content.zoom_label}
		<Dialog>
			<DialogTrigger>
				<Button variant="ghost" size="sm" class="mt-2 text-xs text-muted-foreground gap-1">
					<ZoomIn class="h-3.5 w-3.5" />
					{content.zoom_label}
				</Button>
			</DialogTrigger>
			<DialogContent class="max-w-3xl rounded-2xl border bg-card p-6 shadow-warm">
				<DialogTitle class="sr-only">{content.caption}</DialogTitle>
				<div role="img" aria-label={content.alt_text}>
					{@html content.svg_content}
				</div>
				<p class="text-sm text-muted-foreground mt-3">{content.caption}</p>
			</DialogContent>
		</Dialog>
	{/if}
</Card>
