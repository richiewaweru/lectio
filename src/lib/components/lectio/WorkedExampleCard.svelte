<script lang="ts">
	import type { WorkedExampleContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/ui/collapsible';

	let {
		content,
		mode = 'step-reveal',
	}: {
		content: WorkedExampleContent;
		mode?: 'static' | 'step-reveal' | 'accordion';
	} = $props();

	let revealed = $state(mode === 'static' ? 999 : 0);
</script>

<Card class="border-l-4 border-l-violet-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-violet-600 mb-1">
		Worked Example
	</div>
	<h3 class="text-base font-semibold mb-2 font-serif">{content.title}</h3>
	<p class="text-sm text-muted-foreground leading-relaxed mb-4">{content.setup}</p>

	<div class="space-y-3">
		{#each content.steps as step, i}
			{#if i <= revealed}
				<div class="flex gap-3 animate-step-reveal">
					<div
						class="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs flex items-center justify-center font-bold"
					>
						{i + 1}
					</div>
					<div>
						<div class="text-xs font-semibold text-violet-600 mb-1">{step.label}</div>
						<div class="text-sm leading-relaxed text-foreground">{step.content}</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	{#if mode === 'step-reveal' && revealed < content.steps.length - 1}
		<Button
			variant="outline"
			size="sm"
			onclick={() => (revealed += 1)}
			class="mt-4 text-violet-600 border-violet-200 rounded-full"
		>
			Show next step &rarr;
		</Button>
	{/if}

	{#if revealed >= content.steps.length - 1 && content.conclusion}
		<div class="mt-4 pt-3 border-t text-sm font-medium text-foreground bg-violet-50 rounded-xl p-3">
			{content.conclusion}
		</div>
	{/if}

	{#if revealed >= content.steps.length - 1 && content.answer}
		<div class="mt-3 text-sm bg-violet-100 rounded-xl p-3">
			<span class="font-bold text-violet-700">Answer:</span>
			<span class="text-foreground">{content.answer}</span>
		</div>
	{/if}

	{#if revealed >= content.steps.length - 1 && content.alternatives && content.alternatives.length > 0}
		<Collapsible class="mt-3">
			<CollapsibleTrigger>
				<Button variant="ghost" size="sm" class="text-violet-600 text-xs h-6 px-2">
					Other approaches &rarr;
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul class="mt-2 space-y-1.5">
					{#each content.alternatives as alt}
						<li class="text-xs text-muted-foreground bg-muted/50 rounded p-2 leading-relaxed">
							{alt}
						</li>
					{/each}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	{/if}
</Card>
