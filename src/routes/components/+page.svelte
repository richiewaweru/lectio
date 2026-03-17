<script lang="ts">
	import { componentRegistry } from '$lib/registry';
	import { calculusSection } from '$lib/dummy-content';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		HookHero,
		ExplanationBlock,
		DefinitionCard,
		WorkedExampleCard,
		PracticeStack,
		PitfallAlert,
		GlossaryRail,
		WhatNextBridge,
	} from '$lib/components/lectio';

	const components = Object.values(componentRegistry);

	// Map component id to content + component for live preview
	const previews: Record<string, { component: any; content: any }> = {
		'hook-hero': { component: HookHero, content: calculusSection.hook },
		'explanation-block': { component: ExplanationBlock, content: calculusSection.explanation },
		'definition-card': { component: DefinitionCard, content: calculusSection.definition },
		'worked-example-card': {
			component: WorkedExampleCard,
			content: calculusSection.worked_example,
		},
		'practice-stack': { component: PracticeStack, content: calculusSection.practice },
		'pitfall-alert': { component: PitfallAlert, content: calculusSection.pitfall },
		'glossary-rail': { component: GlossaryRail, content: calculusSection.glossary },
		'what-next-bridge': { component: WhatNextBridge, content: calculusSection.what_next },
	};
</script>

<div class="max-w-4xl mx-auto px-6 py-12">
	<h1 class="text-3xl font-bold tracking-tight font-serif mb-2">Components</h1>
	<p class="text-muted-foreground mb-8">
		Each component encodes a cognitive job — a specific role in the instructional arc. Previews
		use calculus dummy content.
	</p>

	<div class="space-y-12">
		{#each components as comp}
			{@const preview = previews[comp.id]}
			<section id={comp.id} class="scroll-mt-8">
				<Card class="p-6">
					<!-- Header -->
					<div class="flex items-start justify-between gap-4 mb-4">
						<div>
							<h2 class="text-xl font-semibold font-serif">{comp.name}</h2>
							<p class="text-sm text-muted-foreground mt-1">{comp.purpose}</p>
						</div>
						<Badge variant="outline" class="shrink-0">{comp.shadcnPrimitive}</Badge>
					</div>

					<!-- Meta -->
					<div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
						<div>
							<span class="text-muted-foreground">Cognitive job:</span>
							<span class="font-medium ml-1">{comp.cognitiveJob}</span>
						</div>
						<div>
							<span class="text-muted-foreground">Modes:</span>
							<span class="font-medium ml-1">{comp.behaviourModes.join(', ')}</span>
						</div>
						<div>
							<span class="text-muted-foreground">Print fallback:</span>
							<span class="font-medium ml-1">{comp.printFallback}</span>
						</div>
					</div>

					<Separator class="my-4" />

					<!-- Live preview -->
					<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
						Live Preview
					</div>
					{#if preview}
						<div class="rounded-lg border bg-background p-4">
							{#if comp.id === 'hook-hero'}
								<HookHero content={preview.content} />
							{:else if comp.id === 'explanation-block'}
								<ExplanationBlock content={preview.content} />
							{:else if comp.id === 'definition-card'}
								<DefinitionCard content={preview.content} />
							{:else if comp.id === 'worked-example-card'}
								<WorkedExampleCard content={preview.content} mode="step-reveal" />
							{:else if comp.id === 'practice-stack'}
								<PracticeStack content={preview.content} />
							{:else if comp.id === 'pitfall-alert'}
								<PitfallAlert content={preview.content} />
							{:else if comp.id === 'glossary-rail'}
								<GlossaryRail content={preview.content} />
							{:else if comp.id === 'what-next-bridge'}
								<WhatNextBridge content={preview.content} />
							{/if}
						</div>
					{/if}
				</Card>
			</section>
		{/each}
	</div>
</div>
