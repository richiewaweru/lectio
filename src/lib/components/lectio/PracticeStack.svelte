<script lang="ts">
	import type { PracticeContent } from '$lib/types';
	import { Card } from '$lib/components/ui/card';
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import { Badge } from '$lib/components/ui/badge';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	let { content }: { content: PracticeContent } = $props();

	const difficultyConfig: Record<string, { label: string; className: string }> = {
		warm: { label: 'Warm', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
		medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 border-amber-200' },
		cold: { label: 'Cold', className: 'bg-blue-50 text-blue-700 border-blue-200' },
		extension: { label: 'Extension', className: 'bg-purple-50 text-purple-700 border-purple-200' }
	};

	let hintsRevealed = $state<Record<number, number>>({});

	function revealNextHint(index: number, total: number) {
		const current = hintsRevealed[index] ?? 0;
		if (current < total) {
			hintsRevealed[index] = current + 1;
		}
	}
</script>

<Card class="border-primary/10 bg-white/88 p-6">
	<div class="space-y-4">
		<div class="space-y-2">
			<p class="eyebrow text-amber-600">{content.label ?? 'Practice problems'}</p>
			<p class="text-sm leading-6 text-muted-foreground">
				Open one problem at a time, reveal hints progressively, and only expand the worked
				solution if it is needed.
			</p>
		</div>

		<Accordion type="single" class="space-y-2">
			{#each content.problems as problem, i}
				{@const diff = difficultyConfig[problem.difficulty] ?? difficultyConfig.medium}
				{@const shown = hintsRevealed[i] ?? 0}
				<AccordionItem value={`problem-${i}`} class="rounded-xl border bg-card px-4">
					<AccordionTrigger class="py-4 hover:no-underline">
						<div class="flex items-start gap-3 text-left">
							<Badge variant="outline" class={diff.className}>{diff.label}</Badge>
							<div>
								{#if problem.context}
									<div class="mb-1 text-xs italic text-muted-foreground">{problem.context}</div>
								{/if}
								<span class="text-sm leading-relaxed">{problem.question}</span>
							</div>
						</div>
					</AccordionTrigger>

					<AccordionContent class="pb-4">
						{#if shown > 0}
							<div class="mb-2 space-y-2">
								{#each problem.hints.slice(0, shown) as hint}
									<div class="rounded-xl bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
										{#if problem.hints.length > 1}
											<span class="text-xs font-semibold">Hint {hint.level}:</span>
										{/if}
										{hint.text}
									</div>
								{/each}
							</div>
						{/if}

						{#if shown < problem.hints.length}
							<Button
								variant="ghost"
								size="sm"
								class="h-7 px-2 text-xs text-muted-foreground"
								onclick={() => revealNextHint(i, problem.hints.length)}
							>
								{problem.hints.length === 1 ? 'Show hint' : `Show hint ${shown + 1} of ${problem.hints.length}`} v
							</Button>
						{/if}

						{#if problem.solution}
							<Collapsible class="mt-2">
								<CollapsibleTrigger>
									<Button variant="ghost" size="sm" class="h-7 px-2 text-xs text-emerald-600">
										Show answer v
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<div class="mt-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium leading-relaxed text-emerald-800">
										{problem.solution.answer}
									</div>

									{#if problem.solution.worked}
										<Collapsible class="mt-2">
											<CollapsibleTrigger>
												<Button variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground">
													Show worked solution v
												</Button>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<div class="mt-2 rounded-xl bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
													<div class="mb-1 text-xs font-semibold">
														Approach: {problem.solution.approach}
													</div>
													{problem.solution.worked}
												</div>
											</CollapsibleContent>
										</Collapsible>
									{/if}
								</CollapsibleContent>
							</Collapsible>
						{/if}

						{#if problem.writein_lines && problem.writein_lines > 0}
							<div class="print-only mt-3 space-y-3">
								{#each Array.from({ length: problem.writein_lines }) as _}
									<div class="h-8 border-b border-muted"></div>
								{/each}
							</div>
						{/if}
					</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</Card>
