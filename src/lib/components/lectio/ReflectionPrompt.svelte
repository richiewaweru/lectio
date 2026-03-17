<script lang="ts">
	import type { ReflectionContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Brain } from 'lucide-svelte';

	let { content }: { content: ReflectionContent } = $props();

	const typeLabels: Record<string, string> = {
		open: 'Reflect',
		'pair-share': 'Pair & Share',
		'sentence-stem': 'Complete the Thought',
		timed: 'Timed Reflection',
		connect: 'Make a Connection',
		predict: 'Predict',
		transfer: 'Transfer',
	};
</script>

<Card class="border-l-4 border-l-indigo-400 bg-indigo-50/50 p-6">
	<div class="flex gap-3">
		<Brain class="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
		<div class="flex-1">
			<div class="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-2">
				{typeLabels[content.type] ?? 'Reflect'}
			</div>
			<p class="text-sm leading-relaxed text-foreground">{content.prompt}</p>

			{#if content.type === 'sentence-stem' && content.sentence_stem}
				<p class="mt-2 text-sm italic text-indigo-600/80 bg-white/60 rounded-xl p-3">
					{content.sentence_stem}
				</p>
			{/if}

			{#if content.type === 'timed' && content.time_minutes}
				<p class="mt-2 text-xs text-muted-foreground">
					Take {content.time_minutes} minute{content.time_minutes > 1 ? 's' : ''} to think about this.
				</p>
			{/if}

			{#if content.type === 'pair-share' && content.pair_instruction}
				<p class="mt-2 text-xs text-indigo-600 font-medium italic">
					{content.pair_instruction}
				</p>
			{/if}

			{#if content.space && content.space > 0}
				<div class="mt-3 space-y-3 print-only">
					{#each Array.from({ length: content.space }) as _}
						<div class="border-b border-indigo-200 h-8"></div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</Card>
