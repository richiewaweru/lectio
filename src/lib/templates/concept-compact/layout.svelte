<script lang="ts">
	import {
		CalloutBlock,
		DefinitionCard,
		ExplanationBlock,
		HookHero,
		PitfallAlert,
		PracticeStack,
		SectionDivider,
		ShortAnswerQuestion,
		StudentTextbox,
		SummaryBlock,
		WhatNextBridge,
		WorkedExampleCard
	} from '$lib/components/lectio';
	import type { SectionContent } from '$lib/schema/types';

	import TemplateShell from '$lib/templates/TemplateShell.svelte';

	let { section }: { section: SectionContent } = $props();
</script>

<!--
  concept-compact — same arc as guided-concept-path, compressed for confident learners.
  Pedagogical arc: hook → callout → definition → explanation → worked example →
                   pitfall → practice → student response → close.
-->
<TemplateShell {section} singleColumn>
	<HookHero content={section.hook} />

	{#if section.divider}
		<SectionDivider content={section.divider} />
	{/if}

	{#if section.callout}
		<CalloutBlock content={section.callout} />
	{/if}

	{#if section.definition}
		<DefinitionCard content={section.definition} />
	{/if}

	<ExplanationBlock content={section.explanation} />

	{#if section.worked_example}
		<WorkedExampleCard content={section.worked_example} mode="accordion" />
	{/if}

	{#if section.pitfall}
		<PitfallAlert content={section.pitfall} />
	{/if}

	<PracticeStack content={section.practice} mode="accordion" />

	{#if section.short_answer}
		<ShortAnswerQuestion content={section.short_answer} />
	{/if}

	{#if section.student_textbox}
		<StudentTextbox content={section.student_textbox} />
	{/if}

	{#if section.summary}
		<SummaryBlock content={section.summary} />
	{/if}

	<WhatNextBridge content={section.what_next} />
</TemplateShell>
