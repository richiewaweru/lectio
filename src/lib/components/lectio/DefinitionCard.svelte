<script lang="ts">
	import type { DefinitionContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let { content }: { content: DefinitionContent } = $props();
	let showFormal = $state(false);
</script>

<Card class="border-l-4 border-l-purple-400 bg-purple-50/50 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-purple-600 mb-2">
		Definition
	</div>
	<div class="text-base font-semibold text-foreground mb-2">
		{content.term}
	</div>
	<p class="text-sm leading-relaxed text-foreground">
		{showFormal ? content.formal : content.plain}
	</p>
	{#if content.formal && content.plain}
		<Button
			variant="ghost"
			size="sm"
			onclick={() => (showFormal = !showFormal)}
			class="mt-2 text-purple-600 text-xs h-7 px-2"
		>
			{showFormal ? 'Show plain language' : 'Show formal definition'}
		</Button>
	{/if}
	{#if content.etymology}
		<p class="mt-2 text-xs text-muted-foreground italic">
			Etymology: {content.etymology}
		</p>
	{/if}
	{#if content.examples && content.examples.length > 0}
		<ul class="mt-3 space-y-1">
			{#each content.examples as ex}
				<li class="text-xs text-muted-foreground italic">&ldquo;{ex}&rdquo;</li>
			{/each}
		</ul>
	{/if}
	{#if content.related_terms && content.related_terms.length > 0}
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each content.related_terms as rt}
				<Badge variant="outline" class="text-purple-600 border-purple-200 text-xs">{rt}</Badge>
			{/each}
		</div>
	{/if}
</Card>
