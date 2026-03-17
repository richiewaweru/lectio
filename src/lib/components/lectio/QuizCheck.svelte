<script lang="ts">
	import type { QuizContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { CircleCheck, CircleX } from 'lucide-svelte';

	let { content }: { content: QuizContent } = $props();

	let selected = $state<number | null>(null);
	let submitted = $state(false);

	function select(index: number) {
		if (submitted) return;
		selected = index;
		submitted = true;
	}

	function reset() {
		selected = null;
		submitted = false;
	}
</script>

<Card class="border-l-4 border-l-emerald-400 p-6">
	<div class="text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-2">
		Concept Check
	</div>
	<p class="text-sm font-medium text-foreground leading-relaxed mb-4">{content.question}</p>

	<div class="space-y-2">
		{#each content.options as option, i}
			{@const isSelected = selected === i}
			{@const isCorrect = option.correct}
			{@const showResult = submitted && isSelected}
			<button
				class="w-full text-left rounded-xl border p-3 text-sm transition-all duration-200 cursor-pointer
					{submitted
						? isSelected
							? isCorrect
								? 'border-emerald-400 bg-emerald-50'
								: 'border-red-400 bg-red-50'
							: submitted && isCorrect
								? 'border-emerald-300 bg-emerald-50/50'
								: 'border-border bg-card opacity-60'
						: 'border-border bg-card hover:border-emerald-300 hover:bg-emerald-50/30'}"
				onclick={() => select(i)}
				disabled={submitted}
			>
				<div class="flex items-start gap-2">
					{#if showResult}
						{#if isCorrect}
							<CircleCheck class="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
						{:else}
							<CircleX class="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
						{/if}
					{:else if submitted && isCorrect}
						<CircleCheck class="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
					{:else}
						<div class="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0 mt-0.5"></div>
					{/if}
					<div>
						<span>{option.text}</span>
						{#if submitted && (content.show_explanations !== false)}
							<p class="text-xs text-muted-foreground mt-1">{option.explanation}</p>
						{/if}
					</div>
				</div>
			</button>
		{/each}
	</div>

	{#if submitted}
		<div class="mt-4 flex items-center justify-between">
			<p class="text-sm font-medium {selected !== null && content.options[selected].correct ? 'text-emerald-700' : 'text-red-700'}">
				{selected !== null && content.options[selected].correct ? content.feedback_correct : content.feedback_incorrect}
			</p>
			<Button variant="ghost" size="sm" class="text-xs" onclick={reset}>
				Try again
			</Button>
		</div>
	{/if}
</Card>
