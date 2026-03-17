<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { TemplateContract, TemplatePresetDefinition } from '$lib/template-types';

	let {
		contract,
		presets
	}: {
		contract: TemplateContract;
		presets: TemplatePresetDefinition[];
	} = $props();
</script>

<div class="space-y-5">
	<div class="space-y-2">
		<p class="eyebrow">Template detail</p>
		<h2 class="text-2xl font-serif text-primary">Template contract</h2>
		<p class="text-sm leading-6 text-muted-foreground">
			Review the template contract without losing space for the live preview.
		</p>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Best for</p>
		<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
			{#each contract.bestFor as item}
				<li>- {item}</li>
			{/each}
		</ul>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Not ideal for</p>
		<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
			{#each contract.notIdealFor as item}
				<li>- {item}</li>
			{/each}
		</ul>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Lesson flow</p>
		<p class="mt-2 text-sm leading-6 text-muted-foreground">
			{contract.lessonFlow.join(' -> ')}
		</p>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Required components</p>
		<div class="mt-2 flex flex-wrap gap-2">
			{#each contract.requiredComponents as component}
				<Badge variant="outline">{component}</Badge>
			{/each}
		</div>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Optional components</p>
		<div class="mt-2 flex flex-wrap gap-2">
			{#each contract.optionalComponents as component}
				<Badge variant="outline">{component}</Badge>
			{/each}
		</div>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Default behaviours</p>
		<div class="mt-2 flex flex-wrap gap-2">
			{#if Object.entries(contract.defaultBehaviours).length}
				{#each Object.entries(contract.defaultBehaviours) as [component, behaviour]}
					<Badge class="bg-secondary text-secondary-foreground hover:bg-secondary">
						{component}: {behaviour}
					</Badge>
				{/each}
			{:else}
				<p class="text-sm text-muted-foreground">Static by default.</p>
			{/if}
		</div>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Responsive notes</p>
		<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
			{#each contract.responsiveRules as rule}
				<li>- {rule}</li>
			{/each}
		</ul>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Print notes</p>
		<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
			{#each contract.printRules as rule}
				<li>- {rule}</li>
			{/each}
		</ul>
	</div>

	<div>
		<p class="text-sm font-semibold text-primary">Allowed presets</p>
		<div class="mt-2 flex flex-wrap gap-2">
			{#each presets as preset}
				<Badge>{preset.name}</Badge>
			{/each}
		</div>
	</div>
</div>
