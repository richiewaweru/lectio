<script lang="ts">
	import type { ProcessContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { TriangleAlert } from 'lucide-svelte';

	let { content }: { content: ProcessContent } = $props();
</script>

<Card class="border-l-4 border-l-indigo-400 bg-white/85 p-6">
	<div class="space-y-4">
		<div class="space-y-2">
			<p class="eyebrow text-indigo-600">Process</p>
			<h3 class="text-2xl font-semibold font-serif text-primary">{content.title}</h3>
			{#if content.intro}
				<p class="text-sm leading-6 text-muted-foreground">{content.intro}</p>
			{/if}
		</div>

		<div class="space-y-4">
			{#each content.steps as step, index}
				<div class="flex gap-3">
					<div class="flex flex-col items-center">
						<div
							class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold {content.checklist_mode
								? 'border-2 border-indigo-300 text-indigo-600'
								: 'bg-indigo-100 text-indigo-700'}"
						>
							{content.checklist_mode ? '' : step.number}
						</div>
						{#if index < content.steps.length - 1}
							<div class="mt-1 w-px flex-1 bg-indigo-200"></div>
						{/if}
					</div>

					<div class="flex-1 pb-2">
						<div class="text-sm font-semibold text-foreground">{step.action}</div>
						<p class="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>

						{#if step.input || step.output}
							<div class="mt-1.5 flex gap-4 text-xs">
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
							<div class="mt-2 flex items-start gap-1.5 rounded-xl bg-amber-50 p-2 text-xs text-amber-700">
								<TriangleAlert class="mt-0.5 h-3.5 w-3.5 shrink-0" />
								<span>{step.warning}</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Card>
