<script lang="ts">
	import type { PitfallContent } from '$lib/types';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';
	import { TriangleAlert } from 'lucide-svelte';

	let { content }: { content: PitfallContent } = $props();

	const displayExamples = content.examples ?? (content.example ? [content.example] : []);
</script>

<Alert class="border-orange-200 bg-orange-50">
	<TriangleAlert class="h-4 w-4 text-orange-600" />
	<AlertTitle class="text-orange-700 font-semibold text-sm">
		Common Pitfall &mdash; {content.misconception}
	</AlertTitle>
	{#if content.why}
		<p class="text-xs italic text-orange-600/80 mt-1">
			Why students think this: {content.why}
		</p>
	{/if}
	<AlertDescription class="text-sm leading-relaxed mt-1">
		{content.correction}
	</AlertDescription>

	{#if displayExamples.length > 0}
		<Collapsible class="mt-2">
			<CollapsibleTrigger>
				<Button variant="ghost" size="sm" class="text-orange-600 text-xs h-6 px-2">
					{displayExamples.length === 1 ? 'See example' : `See examples (${displayExamples.length})`} &rarr;
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div class="mt-2 space-y-2">
					{#each displayExamples as ex}
						<div class="text-xs text-muted-foreground bg-white/60 rounded p-2 italic">
							{ex}
						</div>
					{/each}
				</div>
			</CollapsibleContent>
		</Collapsible>
	{/if}
</Alert>
