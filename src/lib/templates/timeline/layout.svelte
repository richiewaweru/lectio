<script lang="ts">
	import {
		ExplanationBlock,
		HookHero,
		PitfallAlert,
		PracticeStack,
		ReflectionPrompt,
		TimelineBlock,
		WhatNextBridge
	} from '$lib/components/lectio';
	import type { SectionContent } from '$lib/types';

	import TemplateShell from '$lib/templates/TemplateShell.svelte';

	let { section }: { section: SectionContent } = $props();
</script>

<TemplateShell {section} singleColumn>
	<HookHero content={section.hook} />
	{#if section.timeline}
		<TimelineBlock content={section.timeline} mode="timeline-scrubber" />
	{/if}
	<ExplanationBlock content={section.explanation} />
	{#if section.pitfall}
		<PitfallAlert content={section.pitfall} />
	{/if}
	{#if section.reflection}
		<ReflectionPrompt content={section.reflection} />
	{/if}
	<PracticeStack content={section.practice} mode="accordion" />
	<WhatNextBridge content={section.what_next} />
</TemplateShell>
