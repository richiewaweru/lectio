<script lang="ts">
	import type { PrerequisiteContent } from '$lib/types';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';

	let { content }: { content: PrerequisiteContent } = $props();
</script>

<div class="rounded-2xl border border-teal-200 bg-teal-50/50 p-4">
	<div class="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-2">
		{content.label ?? 'Before we begin'}
	</div>
	<div class="flex flex-wrap gap-2">
		{#each content.items as item}
			{#if item.refresher}
				<Popover>
					<PopoverTrigger>
						<button
							class="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-teal-700 transition-all duration-200 hover:bg-teal-100 hover:border-teal-300 cursor-pointer"
						>
							{item.concept}
							<span class="text-teal-400">?</span>
						</button>
					</PopoverTrigger>
					<PopoverContent
						class="w-64 rounded-xl border bg-card p-3 text-xs text-muted-foreground leading-relaxed shadow-warm-sm"
					>
						<div class="font-semibold text-foreground mb-1">{item.concept}</div>
						{item.refresher}
					</PopoverContent>
				</Popover>
			{:else}
				<span
					class="inline-flex items-center rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-teal-700"
				>
					{item.concept}
				</span>
			{/if}
		{/each}
	</div>
</div>
