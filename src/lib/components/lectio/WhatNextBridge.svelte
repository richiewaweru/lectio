<script lang="ts">
	import type { WhatNextContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';

	let { content }: { content: WhatNextContent } = $props();
</script>

<Card class="border-l-4 border-l-amber-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-2">
		What's Next
	</div>
	<p class="text-sm leading-relaxed text-foreground/80 mb-2">
		{content.body}
	</p>
	{#if content.prerequisites && content.prerequisites.length > 0}
		<div class="text-xs text-muted-foreground mb-2">
			<span class="font-semibold">Prerequisites:</span>
			{content.prerequisites.join(' · ')}
		</div>
	{/if}
	<p class="text-sm font-semibold text-amber-700">
		{content.next} &rarr;
	</p>
</Card>
