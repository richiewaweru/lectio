<script lang="ts">
	import {
		ComparisonGrid,
		DefinitionCard,
		DefinitionFamily,
		ExplanationBlock,
		HookHero,
		InsightStrip,
		PitfallAlert,
		PracticeStack,
		WhatNextBridge
	} from '$lib/components/lectio';
	import type { SectionContent } from '$lib/types';

	import TemplateShell from '$lib/templates/TemplateShell.svelte';

	let { section }: { section: SectionContent } = $props();
</script>

<TemplateShell {section} singleColumn>
	<HookHero content={section.hook} />
	<ExplanationBlock content={section.explanation} />
	{#if section.definition_family}
		<DefinitionFamily content={section.definition_family} />
	{:else if section.definition}
		<DefinitionCard content={section.definition} />
	{/if}
	{#if section.insight_strip}
		<InsightStrip content={section.insight_strip} />
	{/if}
	{#if section.comparison_grid}
		<ComparisonGrid content={section.comparison_grid} />
	{/if}
	{#if section.pitfall}
		<PitfallAlert content={section.pitfall} />
	{/if}
	<PracticeStack content={section.practice} mode="accordion" />
	<WhatNextBridge content={section.what_next} />
</TemplateShell>
