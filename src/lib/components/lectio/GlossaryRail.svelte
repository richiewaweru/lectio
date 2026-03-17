<script lang="ts">
	import type { GlossaryContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';

	let { content, class: className }: { content: GlossaryContent; class?: string } = $props();
</script>

<Card class={cn('lesson-shell border-primary/20 bg-primary text-primary-foreground', className)}>
	<div class="relative z-10 p-4">
		<div class="mb-3 space-y-2">
			<p class="eyebrow text-primary-foreground/72">Key terms</p>
			<p class="text-sm leading-6 text-primary-foreground/72">
				Vocabulary that should stay available while the learner moves through the section.
			</p>
		</div>

		<ScrollArea class="h-[18rem] lg:h-[28rem]">
			<ul class="space-y-3">
				{#each content.terms as term}
					<li class="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-3">
						<div class="text-sm font-semibold text-primary-foreground">{term.term}</div>
						<div class="text-xs leading-relaxed text-primary-foreground/74">{term.definition}</div>
						{#if term.used_in}
							<div class="mt-1 text-xs text-primary-foreground/56">Used in: {term.used_in}</div>
						{/if}
						{#if term.related?.length}
							<div class="mt-1 text-xs text-primary-foreground/56">
								See also: {term.related.join(', ')}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</ScrollArea>
	</div>
</Card>
