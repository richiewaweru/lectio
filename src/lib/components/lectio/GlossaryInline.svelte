<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';

	let { term, definition }: { term: string; definition: string } = $props();
</script>

<Popover>
	<PopoverTrigger>
		<button
			class="inline cursor-pointer font-medium text-foreground underline decoration-dotted decoration-purple-300 underline-offset-2 transition-colors hover:decoration-purple-500"
		>
			{term}
		</button>
	</PopoverTrigger>
	<PopoverContent class="glass-panel w-56 rounded-[1.1rem] p-3">
		<div class="relative z-10">
			<div class="mb-1 text-xs font-semibold text-purple-600">{term}</div>
			<p class="text-xs leading-relaxed text-muted-foreground">{definition}</p>
		</div>
	</PopoverContent>
</Popover>
