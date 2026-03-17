<script lang="ts">
	import type { PitfallContent } from '$lib/types';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';
	import { TriangleAlert } from 'lucide-svelte';

	let { content }: { content: PitfallContent } = $props();

	const displayExamples = $derived(content.examples ?? (content.example ? [content.example] : []));
	const isMinor = $derived(content.severity === 'minor');
</script>

<Alert class={isMinor ? 'border-amber-200 bg-amber-50/60' : 'border-orange-200 bg-orange-50/80'}>
	<TriangleAlert class="h-4 w-4 {isMinor ? 'text-amber-500' : 'text-orange-600'}" />
	<AlertTitle class="{isMinor ? 'text-amber-700' : 'text-orange-700'} text-sm font-semibold">
		Common Pitfall - {content.misconception}
	</AlertTitle>

	{#if content.why}
		<p class="mt-1 text-xs italic text-orange-600/80">
			Why students think this: {content.why}
		</p>
	{/if}

	<AlertDescription class="mt-1 text-sm leading-relaxed">
		{content.correction}
	</AlertDescription>

	{#if displayExamples.length > 0}
		<Collapsible class="mt-2">
			<CollapsibleTrigger>
				<Button variant="ghost" size="sm" class="h-6 px-2 text-xs text-orange-600">
					{displayExamples.length === 1 ? 'See example' : `See examples (${displayExamples.length})`} ->
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div class="mt-2 space-y-2">
					{#each displayExamples as example}
						<div class="rounded-xl bg-white/70 p-2 text-xs italic text-muted-foreground">
							{example}
						</div>
					{/each}
				</div>
			</CollapsibleContent>
		</Collapsible>
	{/if}
</Alert>
