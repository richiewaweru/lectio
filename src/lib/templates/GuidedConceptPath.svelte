<script lang="ts">
	import type { SectionContent } from '$lib/types';
	import { warnIfInvalid } from '$lib/validate';
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

	let { section }: { section: SectionContent } = $props();

	warnIfInvalid(section);
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
	<!-- Section header -->
	<header class="mb-8">
		<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
			{section.subject} · {section.grade_band}
		</div>
		<h1 class="text-3xl font-bold tracking-tight">{section.title}</h1>
		{#if section.subtitle}
			<p class="text-lg text-muted-foreground mt-1">{section.subtitle}</p>
		{/if}
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
		<!-- Main content column -->
		<div class="space-y-6">
			<HookHero content={section.hook} />
			<ExplanationBlock content={section.explanation} />

			{#if section.definition}
				<DefinitionCard content={section.definition} />
			{/if}

			{#if section.worked_example}
				<WorkedExampleCard content={section.worked_example} mode="step-reveal" />
			{/if}

			{#if section.pitfall}
				<PitfallAlert content={section.pitfall} />
			{/if}

			<PracticeStack content={section.practice} />
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
