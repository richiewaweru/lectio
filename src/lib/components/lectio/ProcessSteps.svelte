<script lang="ts">
	import type { ProcessContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { TriangleAlert } from 'lucide-svelte';

	let { content }: { content: ProcessContent } = $props();
</script>

<Card class="border-l-4 border-l-indigo-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
		Process
	</div>
	<h3 class="text-base font-semibold text-foreground mb-1 font-serif">{content.title}</h3>
	{#if content.intro}
		<p class="text-sm text-muted-foreground leading-relaxed mb-4">{content.intro}</p>
	{/if}

	<div class="space-y-4">
		{#each content.steps as step, i}
			<div class="flex gap-3">
				<!-- Step number -->
				<div class="flex flex-col items-center">
					<div
						class="flex-shrink-0 w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold {content.checklist_mode
							? 'border-2 border-indigo-300 text-indigo-600'
							: 'bg-indigo-100 text-indigo-700'}"
					>
						{content.checklist_mode ? '' : step.number}
					</div>
					{#if i < content.steps.length - 1}
						<div class="w-px flex-1 bg-indigo-200 mt-1"></div>
					{/if}
				</div>

				<div class="flex-1 pb-2">
					<div class="text-sm font-semibold text-foreground">{step.action}</div>
					<p class="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.detail}</p>

					{#if step.input || step.output}
						<div class="flex gap-4 mt-1.5 text-xs">
							{#if step.input}
								<span class="text-muted-foreground">
									<span class="font-semibold">In:</span> {step.input}
								</span>
							{/if}
							{#if step.output}
								<span class="text-muted-foreground">
									<span class="font-semibold">Out:</span> {step.output}
								</span>
							{/if}
						</div>
					{/if}

					{#if step.warning}
						<div class="flex gap-1.5 items-start mt-2 text-xs text-amber-700 bg-amber-50 rounded-xl p-2">
							<TriangleAlert class="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
							<span>{step.warning}</span>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Card>
