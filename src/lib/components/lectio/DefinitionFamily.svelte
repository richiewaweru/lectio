<script lang="ts">
	import type { DefinitionFamilyContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import DefinitionCard from './DefinitionCard.svelte';

	let { content }: { content: DefinitionFamilyContent } = $props();
</script>

<Card class="border-l-4 border-l-purple-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-purple-600 mb-1">
		Definition Family
	</div>
	<h3 class="text-base font-semibold text-foreground mb-1 font-serif">{content.family_title}</h3>
	{#if content.family_intro}
		<p class="text-sm text-muted-foreground leading-relaxed mb-4">{content.family_intro}</p>
	{/if}
	<div class="space-y-3">
		{#each content.definitions as def}
			<DefinitionCard content={def} />
		{/each}
	</div>
</Card>
