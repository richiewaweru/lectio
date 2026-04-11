<script lang="ts">
	import {
		DefinitionCard,
		DiagramBlock,
		ExplanationBlock,
		HookHero,
		PitfallAlert,
		PracticeStack,
		SimulationBlock,
		WhatNextBridge,
		WorkedExampleCard
	} from '$lib/components/lectio';
	import type { SectionContent } from '$lib/types';

	import TemplateShell from '$lib/templates/TemplateShell.svelte';

	let { section }: { section: SectionContent } = $props();
</script>

<TemplateShell {section} singleColumn>
	<HookHero content={section.hook} />
	{#if section.simulation}
		<SimulationBlock content={section.simulation} />
	{/if}
	<ExplanationBlock content={section.explanation} />
	{#if section.definition}
		<DefinitionCard content={section.definition} />
	{/if}
	{#if section.diagram}
		<DiagramBlock content={section.diagram} />
	{/if}
	{#if section.worked_example}
		<WorkedExampleCard content={section.worked_example} />
	{/if}
	{#if section.pitfall}
		<PitfallAlert content={section.pitfall} />
	{/if}
	<PracticeStack content={section.practice} mode="accordion" />
	<WhatNextBridge content={section.what_next} />
</TemplateShell>
