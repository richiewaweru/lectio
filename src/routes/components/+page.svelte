<script lang="ts">
	import { componentRegistry } from '$lib/registry';
	import { calculusSection, physicsSection } from '$lib/dummy-content';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		SectionHeader,
		HookHero,
		ExplanationBlock,
		PrerequisiteStrip,
		WhatNextBridge,
		InterviewAnchor,
		DefinitionCard,
		DefinitionFamily,
		GlossaryRail,
		GlossaryInline,
		InsightStrip,
		WorkedExampleCard,
		ProcessSteps,
		PracticeStack,
		QuizCheck,
		ReflectionPrompt,
		PitfallAlert,
		DiagramBlock,
		DiagramCompare,
		DiagramSeries,
	} from '$lib/components/lectio';

	const components = Object.values(componentRegistry);

	// Map component id to preview content
	const previews: Record<string, { content: any; extra?: any }> = {
		'section-header': { content: physicsSection.header },
		'hook-hero': { content: calculusSection.hook },
		'explanation-block': { content: calculusSection.explanation },
		'prerequisite-strip': { content: physicsSection.prerequisites },
		'what-next-bridge': { content: calculusSection.what_next },
		'interview-anchor': { content: physicsSection.interview },
		'definition-card': { content: calculusSection.definition },
		'definition-family': { content: physicsSection.definition_family },
		'glossary-rail': { content: calculusSection.glossary },
		'glossary-inline': { content: { term: 'Derivative', definition: 'The instantaneous rate of change of a function at a given point.' } },
		'insight-strip': { content: physicsSection.insight_strip },
		'worked-example-card': { content: calculusSection.worked_example },
		'process-steps': { content: physicsSection.process },
		'practice-stack': { content: calculusSection.practice },
		'quiz-check': { content: physicsSection.quiz },
		'reflection-prompt': { content: physicsSection.reflection },
		'pitfall-alert': { content: calculusSection.pitfall },
		'diagram-block': { content: physicsSection.diagram },
		'diagram-compare': { content: physicsSection.diagram_compare },
		'diagram-series': { content: physicsSection.diagram_series },
	};
</script>

<div class="max-w-4xl mx-auto px-6 py-12">
	<h1 class="text-3xl font-bold tracking-tight font-serif mb-2">Components</h1>
	<p class="text-muted-foreground mb-8">
		Each component encodes a cognitive job — a specific role in the instructional arc. Previews
		use calculus and physics dummy content.
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
						<div class="flex gap-1.5 shrink-0">
							<Badge variant="outline">{comp.shadcnPrimitive}</Badge>
							<Badge variant="outline" class="text-xs {comp.status === 'stable' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
								{comp.status}
							</Badge>
						</div>
					</div>

					<!-- Meta -->
					<div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
						<div>
							<span class="text-muted-foreground">Cognitive job:</span>
							<span class="font-medium ml-1">{comp.cognitiveJob}</span>
						</div>
						<div>
							<span class="text-muted-foreground">Group:</span>
							<span class="font-medium ml-1">{comp.group}</span>
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
						<div class="rounded-xl border bg-background p-4">
							{#if comp.id === 'section-header'}
								<SectionHeader content={preview.content} />
							{:else if comp.id === 'hook-hero'}
								<HookHero content={preview.content} />
							{:else if comp.id === 'explanation-block'}
								<ExplanationBlock content={preview.content} />
							{:else if comp.id === 'prerequisite-strip'}
								<PrerequisiteStrip content={preview.content} />
							{:else if comp.id === 'what-next-bridge'}
								<WhatNextBridge content={preview.content} />
							{:else if comp.id === 'interview-anchor'}
								<InterviewAnchor content={preview.content} />
							{:else if comp.id === 'definition-card'}
								<DefinitionCard content={preview.content} />
							{:else if comp.id === 'definition-family'}
								<DefinitionFamily content={preview.content} />
							{:else if comp.id === 'glossary-rail'}
								<GlossaryRail content={preview.content} />
							{:else if comp.id === 'glossary-inline'}
								<p class="text-sm">Click the dotted term to see the definition: <GlossaryInline term={preview.content.term} definition={preview.content.definition} /></p>
							{:else if comp.id === 'insight-strip'}
								<InsightStrip content={preview.content} />
							{:else if comp.id === 'worked-example-card'}
								<WorkedExampleCard content={preview.content} mode="step-reveal" />
							{:else if comp.id === 'process-steps'}
								<ProcessSteps content={preview.content} />
							{:else if comp.id === 'practice-stack'}
								<PracticeStack content={preview.content} />
							{:else if comp.id === 'quiz-check'}
								<QuizCheck content={preview.content} />
							{:else if comp.id === 'reflection-prompt'}
								<ReflectionPrompt content={preview.content} />
							{:else if comp.id === 'pitfall-alert'}
								<PitfallAlert content={preview.content} />
							{:else if comp.id === 'diagram-block'}
								<DiagramBlock content={preview.content} />
							{:else if comp.id === 'diagram-compare'}
								<DiagramCompare content={preview.content} />
							{:else if comp.id === 'diagram-series'}
								<DiagramSeries content={preview.content} />
							{:else if comp.id === 'simulation-block'}
								<Card class="p-6 text-center text-muted-foreground">
									<p class="text-sm italic">SimulationBlock — coming soon. Depends on interaction pipeline.</p>
								</Card>
							{/if}
						</div>
					{:else}
						<div class="rounded-xl border bg-muted/30 p-6 text-center text-sm text-muted-foreground italic">
							Preview not available for this component.
						</div>
					{/if}
				</Card>
			</section>
		{/each}
	</div>
</div>
