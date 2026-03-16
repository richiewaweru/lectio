<script lang="ts">
	import type { GlossaryContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';

	let { content, class: className }: { content: GlossaryContent; class?: string } = $props();
</script>

<Card class={cn('p-4', className)}>
	<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
		Key Terms
	</div>
	<ScrollArea class="max-h-[60vh]">
		<ul class="space-y-3">
			{#each content.terms as term}
				<li>
					<div class="text-sm font-semibold text-foreground">{term.term}</div>
					<div class="text-xs text-muted-foreground leading-relaxed">{term.definition}</div>
				</li>
			{/each}
		</ul>
	</ScrollArea>
</Card>
