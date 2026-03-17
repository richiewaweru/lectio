<script lang="ts">
	import type { SectionContent } from '$lib/types';
	import { warnIfInvalid } from '$lib/validate';
	import {
		SectionHeader,
		PrerequisiteStrip,
		HookHero,
		ExplanationBlock,
		InsightStrip,
		DefinitionCard,
		DefinitionFamily,
		DiagramBlock,
		WorkedExampleCard,
		ProcessSteps,
		DiagramCompare,
		DiagramSeries,
		PitfallAlert,
		QuizCheck,
		PracticeStack,
		ReflectionPrompt,
		InterviewAnchor,
		WhatNextBridge,
		GlossaryRail,
	} from '$lib/components/lectio';

	let { section }: { section: SectionContent } = $props();

	warnIfInvalid(section);
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
	<SectionHeader content={section.header} />

	<div class="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
		<!-- Main content column -->
		<div class="space-y-6">
			{#if section.prerequisites}
				<PrerequisiteStrip content={section.prerequisites} />
			{/if}

			<HookHero content={section.hook} />
			<ExplanationBlock content={section.explanation} />

			{#if section.insight_strip}
				<InsightStrip content={section.insight_strip} />
			{/if}

			{#if section.definition_family}
				<DefinitionFamily content={section.definition_family} />
			{:else if section.definition}
				<DefinitionCard content={section.definition} />
			{/if}

			{#if section.diagram}
				<DiagramBlock content={section.diagram} />
			{/if}

			{#if section.worked_example}
				<WorkedExampleCard content={section.worked_example} mode="step-reveal" />
			{/if}

			{#if section.worked_examples}
				{#each section.worked_examples as ex}
					<WorkedExampleCard content={ex} mode="step-reveal" />
				{/each}
			{/if}

			{#if section.process}
				<ProcessSteps content={section.process} />
			{/if}

			{#if section.diagram_compare}
				<DiagramCompare content={section.diagram_compare} />
			{/if}

			{#if section.diagram_series}
				<DiagramSeries content={section.diagram_series} />
			{/if}

			{#if section.pitfall}
				<PitfallAlert content={section.pitfall} />
			{/if}

			{#if section.pitfalls}
				{#each section.pitfalls as p}
					<PitfallAlert content={p} />
				{/each}
			{/if}

			{#if section.quiz}
				<QuizCheck content={section.quiz} />
			{/if}

			<PracticeStack content={section.practice} />

			{#if section.reflection}
				<ReflectionPrompt content={section.reflection} />
			{/if}

			{#if section.interview}
				<InterviewAnchor content={section.interview} />
			{/if}

			<WhatNextBridge content={section.what_next} />
		</div>

		<!-- Sidebar -->
		{#if section.glossary}
			<aside class="hidden lg:block">
				<GlossaryRail content={section.glossary} class="sticky top-8" />
			</aside>
		{/if}
	</div>
</div>
