<script lang="ts">
	import type { GlossaryContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';

	let { content, class: className }: { content: GlossaryContent; class?: string } = $props();
</script>

<Card class={cn('p-4 bg-primary text-primary-foreground border-primary', className)}>
	<div class="text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-3">
		Key Terms
	</div>
	<ScrollArea class="h-[18rem] lg:h-[28rem]">
		<ul class="space-y-3">
			{#each content.terms as term}
				<li class="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-3">
					<div class="text-sm font-semibold text-primary-foreground">{term.term}</div>
					<div class="text-xs text-primary-foreground/70 leading-relaxed">{term.definition}</div>
					{#if term.used_in}
						<div class="text-xs text-primary-foreground/50 mt-0.5">Used in: {term.used_in}</div>
					{/if}
					{#if term.related && term.related.length > 0}
						<div class="text-xs text-primary-foreground/50 mt-0.5">See also: {term.related.join(', ')}</div>
					{/if}
				</li>
			{/each}
		</ul>
	</ScrollArea>
</Card>
