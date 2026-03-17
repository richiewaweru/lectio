<script lang="ts">
	import type { PracticeContent, PracticeProblem } from '$lib/types';
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent,
	} from '$lib/components/ui/accordion';
	import { Badge } from '$lib/components/ui/badge';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	let { content }: { content: PracticeContent } = $props();

	const difficultyConfig = {
		warm: { label: 'Warm', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
		medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 border-amber-200' },
		cold: { label: 'Cold', className: 'bg-blue-50 text-blue-700 border-blue-200' },
	};

	function getHints(p: PracticeProblem): string[] {
		if (p.hints && p.hints.length > 0) return p.hints;
		return [p.hint];
	}

	let hintsRevealed = $state<Record<number, number>>({});

	function revealNextHint(index: number, total: number) {
		const current = hintsRevealed[index] ?? 0;
		if (current < total) {
			hintsRevealed[index] = current + 1;
		}
	}
</script>

<div class="space-y-1">
	<div
		class="text-xs font-semibold tracking-widest uppercase text-muted-foreground pb-3 border-b mb-4"
	>
		Practice Problems
	</div>

	<Accordion type="single" class="space-y-2">
		{#each content.problems as problem, i}
			{@const diff = difficultyConfig[problem.difficulty]}
			{@const hints = getHints(problem)}
			{@const shown = hintsRevealed[i] ?? 0}
			<AccordionItem value={`problem-${i}`} class="border rounded-xl px-4 bg-card">
				<AccordionTrigger class="hover:no-underline py-4">
					<div class="flex items-start gap-3 text-left">
						<Badge variant="outline" class={diff.className}>
							{diff.label}
						</Badge>
						<span class="text-sm leading-relaxed">
							{problem.question}
						</span>
					</div>
				</AccordionTrigger>
				<AccordionContent class="pb-4">
					<!-- Tiered hints -->
					{#if shown > 0}
						<div class="space-y-2 mb-2">
							{#each hints.slice(0, shown) as hint, h}
								<div class="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3 leading-relaxed">
									{#if hints.length > 1}
										<span class="font-semibold text-xs">Hint {h + 1}:</span>
									{/if}
									{hint}
								</div>
							{/each}
						</div>
					{/if}
					{#if shown < hints.length}
						<Button
							variant="ghost"
							size="sm"
							class="text-muted-foreground text-xs h-7 px-2"
							onclick={() => revealNextHint(i, hints.length)}
						>
							{hints.length === 1 ? 'Show hint' : `Show hint ${shown + 1} of ${hints.length}`} &darr;
						</Button>
					{/if}

					<!-- Answer -->
					{#if problem.answer}
						<Collapsible class="mt-2">
							<CollapsibleTrigger>
								<Button variant="ghost" size="sm" class="text-emerald-600 text-xs h-7 px-2">
									Show answer &darr;
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<div class="mt-2 text-sm bg-emerald-50 text-emerald-800 rounded-xl p-3 leading-relaxed font-medium">
									{problem.answer}
								</div>
							</CollapsibleContent>
						</Collapsible>
					{/if}

					<!-- Worked solution -->
					{#if problem.solution}
						<Collapsible class="mt-2">
							<CollapsibleTrigger>
								<Button variant="ghost" size="sm" class="text-muted-foreground text-xs h-7 px-2">
									Show worked solution &darr;
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<div class="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-xl p-3 leading-relaxed">
									{problem.solution}
								</div>
							</CollapsibleContent>
						</Collapsible>
					{/if}

					{#if problem.writein_lines && problem.writein_lines > 0}
						<div class="mt-3 space-y-3 print-only">
							{#each Array.from({ length: problem.writein_lines }) as _, j}
								<div class="border-b border-muted h-8"></div>
							{/each}
						</div>
					{/if}
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
