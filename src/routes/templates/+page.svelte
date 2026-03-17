<script lang="ts">
	import { calculusSection, physicsSection } from '$lib/dummy-content';
	import GuidedConceptPath from '$lib/templates/GuidedConceptPath.svelte';
	import EnrichedLearningPath from '$lib/templates/EnrichedLearningPath.svelte';
	import { Button } from '$lib/components/ui/button';

	let activeTemplate = $state<'guided' | 'enriched'>('guided');
</script>

<div class="page-frame space-y-8">
	<header class="lesson-shell p-8 sm:p-10">
		<div class="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
			<div class="space-y-4">
				<p class="eyebrow">Templates</p>
				<h1 class="max-w-4xl text-4xl font-semibold tracking-tight font-serif text-primary sm:text-5xl">
					Preview full instructional arcs, not just isolated parts.
				</h1>
				<p class="max-w-3xl text-base leading-7 text-muted-foreground">
					Templates assemble the component library into named teaching strategies while
					keeping the same underlying schema and interaction patterns.
				</p>
			</div>

			<div class="flex flex-wrap gap-2">
				<Button
					variant={activeTemplate === 'guided' ? 'default' : 'outline'}
					class="rounded-full"
					onclick={() => (activeTemplate = 'guided')}
				>
					GuidedConceptPath
				</Button>
				<Button
					variant={activeTemplate === 'enriched' ? 'default' : 'outline'}
					class="rounded-full"
					onclick={() => (activeTemplate = 'enriched')}
				>
					EnrichedLearningPath
				</Button>
			</div>
		</div>
	</header>

	{#if activeTemplate === 'guided'}
		<section class="space-y-4">
			<div class="px-1">
				<p class="eyebrow">GuidedConceptPath</p>
				<p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
					Hook -> Explain -> Define -> Worked Example -> Pitfall -> Practice -> What Next.
					This keeps the original instructional arc and uses the calculus lesson content.
				</p>
			</div>
			<GuidedConceptPath section={calculusSection} />
		</section>
	{:else}
		<section class="space-y-4">
			<div class="px-1">
				<p class="eyebrow">EnrichedLearningPath</p>
				<p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
					Prerequisites -> Hook -> Explain -> Insights -> Definitions -> Diagrams -> Worked
					Example -> Process -> Pitfalls -> Quiz -> Practice -> Reflection -> Interview ->
					What Next. This uses the physics lesson content.
				</p>
			</div>
			<EnrichedLearningPath section={physicsSection} />
		</section>
	{/if}
</div>
