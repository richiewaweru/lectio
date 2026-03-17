<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';

	let { term, definition }: { term: string; definition: string } = $props();
</script>

<Popover>
	<PopoverTrigger>
		<button
			class="inline underline decoration-dotted decoration-purple-300 underline-offset-2 text-foreground font-medium cursor-pointer hover:decoration-purple-500 transition-colors"
		>
			{term}
		</button>
	</PopoverTrigger>
	<PopoverContent
		class="w-56 rounded-xl border bg-card p-3 shadow-warm-sm"
	>
		<div class="text-xs font-semibold text-purple-600 mb-1">{term}</div>
		<p class="text-xs text-muted-foreground leading-relaxed">{definition}</p>
	</PopoverContent>
</Popover>
