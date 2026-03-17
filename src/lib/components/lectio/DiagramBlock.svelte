<script lang="ts">
	import type { DiagramContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogTitle,
		DialogOverlay
	} from '$lib/components/ui/dialog';
	import { ZoomIn } from 'lucide-svelte';

	let { content }: { content: DiagramContent } = $props();
</script>

<Card class="border-primary/10 bg-white/88 p-6">
	<div class="space-y-4">
		<div class="flex flex-wrap items-center gap-3">
			<p class="eyebrow">Diagram</p>
			{#if content.figure_number}
				<span class="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/75">
					Figure {content.figure_number}
				</span>
			{/if}
		</div>

		<Dialog>
			<DialogTrigger>
				<div class="group relative cursor-pointer" role="img" aria-label={content.alt_text}>
					<div class="overflow-hidden rounded-[1.25rem] border border-border/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] [&_svg]:h-auto [&_svg]:w-full">
						{@html content.svg_content}
					</div>

					{#if content.callouts?.length}
						{#each content.callouts as callout, index}
							<Popover>
								<PopoverTrigger>
									<button
										type="button"
										class="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-primary text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105"
										style="left: {callout.x}%; top: {callout.y}%;"
										aria-label={callout.label}
										onclick={(event) => event.stopPropagation()}
									>
										{index + 1}
									</button>
								</PopoverTrigger>
								<PopoverContent class="glass-panel w-60 rounded-[1.1rem] p-3 text-sm leading-6 text-foreground/82">
									<div class="relative z-10">
										<p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
											{callout.label}
										</p>
										<p class="mt-2 text-sm leading-6 text-muted-foreground">
											{callout.explanation}
										</p>
									</div>
								</PopoverContent>
							</Popover>
						{/each}
					{/if}

					<div class="absolute right-3 top-3 rounded-full bg-white/82 p-1.5 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
						<ZoomIn class="h-4 w-4 text-muted-foreground" />
					</div>
				</div>
			</DialogTrigger>

			<DialogOverlay class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
			<DialogContent class="glass-panel max-w-4xl rounded-[1.75rem] p-6 animate-scale-in">
				<div class="relative z-10 space-y-4">
					<DialogTitle class="text-base font-semibold text-primary">
						{content.zoom_label ?? 'Diagram detail'}
					</DialogTitle>
					<div
						class="overflow-hidden rounded-[1.25rem] border border-border/70 bg-white p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] [&_svg]:h-auto [&_svg]:w-full"
						role="img"
						aria-label={content.alt_text}
					>
						{@html content.svg_content}
					</div>
					<p class="text-sm leading-6 text-muted-foreground">{content.caption}</p>
				</div>
			</DialogContent>
		</Dialog>

		<p class="text-sm leading-6 text-muted-foreground">{content.caption}</p>
	</div>
</Card>
