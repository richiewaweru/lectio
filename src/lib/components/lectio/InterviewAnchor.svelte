<script lang="ts">
	import type { InterviewContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { MessageCircle } from 'lucide-svelte';

	let { content }: { content: InterviewContent } = $props();
</script>

<Card class="border-l-4 border-l-orange-400 bg-orange-50/50 p-6">
	<div class="flex gap-3">
		<MessageCircle class="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
		<div>
			<div class="text-xs font-semibold tracking-widest uppercase text-orange-600 mb-2">
				Explain It
			</div>
			<p class="text-sm leading-relaxed text-foreground mb-2">
				{content.prompt}
			</p>
			<p class="text-xs text-muted-foreground italic">
				Audience: {content.audience}
			</p>
			{#if content.follow_up}
				<div class="mt-3 pt-2 border-t border-orange-200">
					<p class="text-xs text-orange-600 font-medium">Follow-up:</p>
					<p class="text-sm text-foreground/80 leading-relaxed">{content.follow_up}</p>
				</div>
			{/if}
		</div>
	</div>
</Card>
