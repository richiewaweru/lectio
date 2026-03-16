<script lang="ts">
	import type { PracticeContent } from '$lib/types';
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
</script>

<div class="space-y-1">
	<div
		class="text-xs font-semibold tracking-widest uppercase text-muted-foreground pb-3 border-b mb-4"
	>
		Practice Problems
	</div>

	<Accordion type="single" collapsible class="space-y-2">
		{#each content.problems as problem, i}
			{@const diff = difficultyConfig[problem.difficulty]}
			<AccordionItem value={`problem-${i}`} class="border rounded-lg px-4 bg-card">
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
					<Collapsible>
						<CollapsibleTrigger>
							<Button variant="ghost" size="sm" class="text-muted-foreground text-xs h-7 px-2">
								Show hint &darr;
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div
								class="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-md p-3 leading-relaxed"
							>
								{problem.hint}
							</div>
						</CollapsibleContent>
					</Collapsible>

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
