<script lang="ts">
	import type { KeyFactContent } from '$lib/schema/types';
	import { Card } from '$lib/components/ui/card';
	import RichText from './RichText.svelte';

	let { content }: { content: KeyFactContent } = $props();
</script>

<Card class="border-primary/15 bg-primary/4 rh-pad-card">
	<p class="text-2xl font-semibold leading-tight font-serif text-foreground">
		<RichText text={content.fact} />
	</p>
	{#if content.context}
		<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
			<RichText text={content.context} />
		</p>
	{/if}
	{#if content.source}
		<p class="mt-1 text-xs text-muted-foreground/70">
			Source: {content.source}
		</p>
	{/if}
</Card>
