<script lang="ts">
	import { getStableComponents } from '$lib/registry';
	import { calculusSection, physicsSection } from '$lib/dummy-content';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
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
		DiagramSeries
	} from '$lib/components/lectio';

	const components = getStableComponents();

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
		'glossary-inline': {
			content: {
				term: 'Derivative',
				definition: 'The instantaneous rate of change of a function at a given point.'
			}
		},
		'insight-strip': { content: physicsSection.insight_strip },
		'worked-example-card': { content: calculusSection.worked_example },
		'process-steps': { content: physicsSection.process },
		'practice-stack': { content: calculusSection.practice },
		'quiz-check': { content: physicsSection.quiz },
		'reflection-prompt': { content: physicsSection.reflection },
		'pitfall-alert': { content: calculusSection.pitfall },
		'diagram-block': { content: physicsSection.diagram },
		'diagram-compare': { content: physicsSection.diagram_compare },
		'diagram-series': { content: physicsSection.diagram_series }
	};

	function formatCapacityKey(key: string): string {
		return key
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (s) => s.toUpperCase())
			.trim();
	}
</script>

<div class="page-frame space-y-8">
	<header class="lesson-shell p-8 sm:p-10">
		<div class="relative z-10 space-y-4">
			<p class="eyebrow">Component showcase</p>
			<h1 class="max-w-4xl text-4xl font-semibold tracking-tight font-serif text-primary sm:text-5xl">
				Educational components shown in their strongest instructional state.
			</h1>
			<p class="max-w-3xl text-base leading-7 text-muted-foreground">
				Each preview is driven by the shared registry and feature-rich dummy content so
				potential users can see what each component can carry, not just the simplest case.
			</p>
		</div>
	</header>

	<div class="space-y-8">
		{#each components as comp}
			{@const preview = previews[comp.id]}
			<section id={comp.id} class="scroll-mt-8">
				<div class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
					<Card class="bg-primary p-6 text-primary-foreground">
						<div class="flex flex-wrap gap-2 mb-4">
							<Badge class="bg-white/12 text-primary-foreground hover:bg-white/12">
								Group {comp.group}
							</Badge>
							<Badge class="bg-white/12 text-primary-foreground hover:bg-white/12">
								{comp.status}
							</Badge>
							<Badge class="bg-white/12 text-primary-foreground hover:bg-white/12">
								{comp.cognitiveJob}
							</Badge>
						</div>

						<h2 class="text-2xl font-semibold font-serif">{comp.name}</h2>
						<p class="mt-2 text-sm leading-6 text-primary-foreground/74">{comp.purpose}</p>

						<div class="mt-5 space-y-4 text-sm">
							<div>
								<p class="font-semibold">Behaviour modes</p>
								<p class="mt-1 text-primary-foreground/68">{comp.behaviourModes.join(', ')}</p>
							</div>
							<div>
								<p class="font-semibold">Primitive</p>
								<p class="mt-1 text-primary-foreground/68">{comp.shadcnPrimitive}</p>
							</div>
							<div>
								<p class="font-semibold">Print fallback</p>
								<p class="mt-1 text-primary-foreground/68">{comp.printFallback}</p>
							</div>
							<div>
								<p class="font-semibold">Capacity</p>
								<dl class="mt-2 space-y-1">
									{#each Object.entries(comp.capacity) as [key, value]}
										<div class="flex justify-between gap-3 text-xs">
											<dt class="text-primary-foreground/58">{formatCapacityKey(key)}</dt>
											<dd class="text-right font-medium text-primary-foreground/90">{value}</dd>
										</div>
									{/each}
								</dl>
							</div>
						</div>
					</Card>

					<div class="lesson-shell min-h-[220px] p-5 sm:p-6">
						<div class="relative z-10">
							<div class="mb-4 flex items-center justify-between gap-3">
								<div>
									<p class="eyebrow">Live preview</p>
									<p class="mt-2 text-sm leading-6 text-muted-foreground">
										Rendered with showcase content that exercises the fuller surface area.
									</p>
								</div>
							</div>

							{#if preview}
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
									<div class="rounded-[1.35rem] border border-border/70 bg-white/82 p-4 text-sm leading-7 text-foreground/84">
										Inline term preview:
										<GlossaryInline
											term={preview.content.term}
											definition={preview.content.definition}
										/>
										can sit inside lesson prose without pulling the learner away from the main
										explanation.
									</div>
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
									<Card class="rounded-[1.35rem] border-dashed bg-white/70 p-6 text-center text-muted-foreground">
										<p class="text-sm italic">
											SimulationBlock - coming soon. Depends on the interaction pipeline.
										</p>
									</Card>
								{/if}
							{:else}
								<div class="rounded-xl border bg-muted/30 p-6 text-center text-sm italic text-muted-foreground">
									Preview not available for this component.
								</div>
							{/if}
						</div>
					</div>
				</div>
			</section>
		{/each}
	</div>
</div>
