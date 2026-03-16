<script lang="ts">
	import type { HookHeroContent } from '$lib/types';

	let { content }: { content: HookHeroContent } = $props();
</script>

<div class="relative rounded-xl bg-foreground text-background p-8 overflow-hidden">
	<!-- Decorative background character -->
	<div
		class="absolute right-4 top-0 text-[10rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none"
	>
		?
	</div>

	<div class="relative flex gap-6">
		<div class="flex-1">
			<div class="text-xs font-semibold tracking-widest uppercase text-orange-300 mb-3">
				Intuition Hook
			</div>
			<h2 class="text-2xl font-bold leading-tight mb-3 max-w-lg">
				{content.headline}
			</h2>
			<p class="text-sm leading-relaxed text-white/70 max-w-lg">
				{content.body}
			</p>
		</div>
		{#if content.image}
			<img
				src={content.image.url}
				alt={content.image.alt}
				class="hidden sm:block w-40 h-32 object-cover rounded-lg flex-shrink-0"
				onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
			/>
		{/if}
	</div>
</div>
