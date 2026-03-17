<script lang="ts">
	import type { SectionHeaderContent } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';

	let { content }: { content: SectionHeaderContent } = $props();
</script>

<header class="mb-8">
	{#if content.section_number}
		<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
			{content.section_number} · {content.subject} · {content.grade_band}
		</div>
	{:else}
		<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
			{content.subject} · {content.grade_band}
		</div>
	{/if}

	<h1 class="text-3xl font-bold tracking-tight font-serif">{content.title}</h1>

	{#if content.subtitle}
		<p class="text-lg text-muted-foreground mt-1">{content.subtitle}</p>
	{/if}

	{#if content.objective}
		<p class="text-sm text-muted-foreground/80 mt-2 italic">
			Objective: {content.objective}
		</p>
	{/if}

	{#if content.level_pills && content.level_pills.length > 0}
		<div class="flex flex-wrap gap-1.5 mt-3">
			{#each content.level_pills as pill}
				{@const variantClass =
					pill.variant === 'warm'
						? 'bg-emerald-50 text-emerald-700 border-emerald-200'
						: pill.variant === 'medium'
							? 'bg-amber-50 text-amber-700 border-amber-200'
							: pill.variant === 'cold'
								? 'bg-blue-50 text-blue-700 border-blue-200'
								: 'bg-muted text-muted-foreground border-border'}
				<Badge variant="outline" class="text-xs {variantClass}">{pill.label}</Badge>
			{/each}
		</div>
	{/if}
</header>
