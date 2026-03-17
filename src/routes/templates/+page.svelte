<script lang="ts">
	import { calculusSection, physicsSection } from '$lib/dummy-content';
	import GuidedConceptPath from '$lib/templates/GuidedConceptPath.svelte';
	import EnrichedLearningPath from '$lib/templates/EnrichedLearningPath.svelte';
	import { Separator } from '$lib/components/ui/separator';

	let activeTemplate = $state<'guided' | 'enriched'>('guided');
</script>

<div class="py-8">
	<div class="max-w-4xl mx-auto px-6 mb-8">
		<h1 class="text-3xl font-bold tracking-tight font-serif mb-2">Templates</h1>
		<p class="text-muted-foreground mb-6">
			Templates assemble components into complete instructional arcs. Choose a template to preview.
		</p>

		<div class="flex gap-2">
			<button
				class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
					{activeTemplate === 'guided'
						? 'bg-foreground text-background'
						: 'border bg-card hover:bg-muted'}"
				onclick={() => (activeTemplate = 'guided')}
			>
				GuidedConceptPath
			</button>
			<button
				class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
					{activeTemplate === 'enriched'
						? 'bg-foreground text-background'
						: 'border bg-card hover:bg-muted'}"
				onclick={() => (activeTemplate = 'enriched')}
			>
				EnrichedLearningPath
			</button>
		</div>
	</div>

	<Separator class="mb-8" />

	{#if activeTemplate === 'guided'}
		<div class="max-w-4xl mx-auto px-6 mb-4">
			<p class="text-sm text-muted-foreground">
				Original template — Hook &rarr; Explain &rarr; Define &rarr; Worked Example &rarr; Pitfall &rarr; Practice &rarr; What's Next. Uses calculus content.
			</p>
		</div>
		<GuidedConceptPath section={calculusSection} />
	{:else}
		<div class="max-w-4xl mx-auto px-6 mb-4">
			<p class="text-sm text-muted-foreground">
				Full template — Prerequisites &rarr; Hook &rarr; Explain &rarr; Insights &rarr; Definitions &rarr; Diagrams &rarr; Worked Example &rarr; Process &rarr; Pitfalls &rarr; Quiz &rarr; Practice &rarr; Reflection &rarr; Interview &rarr; What's Next. Uses physics content.
			</p>
		</div>
		<EnrichedLearningPath section={physicsSection} />
	{/if}
</div>
