<script lang="ts">
	import type { ExplanationContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';

	let { content }: { content: ExplanationContent } = $props();

	function highlightEmphasis(text: string, phrases: string[]): string {
		let result = text;
		for (const phrase of phrases) {
			const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			result = result.replace(
				new RegExp(escaped, 'gi'),
				(match) => `<strong class="font-semibold text-foreground">${match}</strong>`
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
</Card>
