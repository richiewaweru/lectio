<script lang="ts">
	import type { ExplanationContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { BookOpen, Lightbulb, Info } from 'lucide-svelte';

	const calloutConfig = {
		remember: { label: 'Remember', class: 'bg-blue-50/75 text-blue-800 border-blue-200', icon: BookOpen },
		insight: { label: 'Key Insight', class: 'bg-violet-50/75 text-violet-800 border-violet-200', icon: Lightbulb },
		sidenote: { label: 'Side Note', class: 'bg-gray-50/75 text-gray-700 border-gray-200', icon: Info },
	};

	let { content }: { content: ExplanationContent } = $props();

	function highlightEmphasis(text: string, phrases: string[]): string {
		let result = text;
		for (const phrase of phrases) {
			const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			result = result.replace(
				new RegExp(escaped, 'gi'),
				(match) => `<mark class="lectio-emphasis">${match}</mark>`
			);
		}
		return result;
	}
</script>

<Card class="border-l-4 border-l-blue-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
		Explanation
	</div>
	<div class="text-sm leading-relaxed text-foreground/80 prose prose-sm max-w-none">
		{@html highlightEmphasis(content.body, content.emphasis)}
	</div>
	{#if content.callouts && content.callouts.length > 0}
		<div class="mt-4 space-y-3">
			{#each content.callouts as callout}
				{@const cfg = calloutConfig[callout.type]}
				<div class="flex gap-2.5 rounded-xl border p-3 text-xs leading-relaxed {cfg.class}">
					<cfg.icon class="h-4 w-4 flex-shrink-0 mt-0.5" />
					<div>
						<span class="font-semibold">{cfg.label}:</span>
						{callout.text}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Card>
