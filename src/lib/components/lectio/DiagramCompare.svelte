<script lang="ts">
	import type { DiagramCompareContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';

	let { content }: { content: DiagramCompareContent } = $props();

	let position = $state(50);
</script>

<Card class="p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
		Compare
	</div>

	<!-- Labels -->
	<div class="flex justify-between text-xs font-semibold mb-2">
		<span class="text-blue-600">{content.before_label}</span>
		<span class="text-accent">{content.after_label}</span>
	</div>

	<!-- Slider comparison -->
	<div class="relative overflow-hidden rounded-xl border" role="img" aria-label={content.alt_text}>
		<!-- After (full width background) -->
		<div class="w-full">
			{@html content.after_svg}
		</div>

		<!-- Before (clipped overlay) -->
		<div
			class="absolute inset-0 overflow-hidden"
			style="width: {position}%;"
		>
			<div class="w-full" style="width: {10000 / position}%;">
				{@html content.before_svg}
			</div>
		</div>

		<!-- Drag handle -->
		<div
			class="absolute top-0 bottom-0 w-0.5 bg-foreground/40"
			style="left: {position}%;"
		>
			<div class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-foreground/40 shadow-sm flex items-center justify-center">
				<span class="text-xs text-muted-foreground">⇔</span>
			</div>
		</div>
	</div>

	<!-- Range slider control -->
	<input
		type="range"
		min="5"
		max="95"
		bind:value={position}
		class="w-full mt-2 accent-accent"
		aria-label="Compare position slider"
	/>

	<p class="text-xs text-muted-foreground leading-relaxed mt-2">{content.caption}</p>
</Card>
