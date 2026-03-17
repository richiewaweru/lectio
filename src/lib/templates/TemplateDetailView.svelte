<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card } from '$lib/components/ui/card';
	import { getTemplateById } from '$lib/template-registry';

	let { templateId }: { templateId: string } = $props();

	const definition = $derived(getTemplateById(templateId));
</script>

{#if definition}
	{@const PreviewComponent = definition.render}

	<div class="page-frame space-y-8">
		<header class="lesson-shell p-8 sm:p-10">
			<div class="relative z-10 space-y-5">
				<div class="flex flex-wrap items-center gap-2">
					<Badge class="bg-primary/10 text-primary hover:bg-primary/10">
						{definition.contract.family}
					</Badge>
					<Badge variant="outline">{definition.contract.interactionLevel}</Badge>
					<Badge variant="outline">{definition.contract.intent}</Badge>
				</div>
				<div class="space-y-3">
					<p class="eyebrow">Template detail</p>
					<h1 class="text-4xl text-primary font-serif sm:text-5xl">
						{definition.contract.name}
					</h1>
					<p class="max-w-3xl text-lg leading-8 text-muted-foreground">
						{definition.contract.tagline}
					</p>
				</div>
				<div class="flex flex-wrap gap-3">
					<a
						href="/templates"
						class="inline-flex items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Back to gallery
					</a>
					<a
						href="/components"
						class="inline-flex items-center rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						View components
					</a>
				</div>
			</div>
		</header>

		<div class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<Card class="border-white/60 bg-white/82 p-6">
				<div class="space-y-5">
					<h2 class="text-2xl text-primary font-serif">Template contract</h2>

					<div>
						<p class="text-sm font-semibold text-primary">Best for</p>
						<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
							{#each definition.contract.bestFor as item}
								<li>- {item}</li>
							{/each}
						</ul>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Not ideal for</p>
						<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
							{#each definition.contract.notIdealFor as item}
								<li>- {item}</li>
							{/each}
						</ul>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Lesson flow</p>
						<p class="mt-2 text-sm leading-6 text-muted-foreground">
							{definition.contract.lessonFlow.join(' -> ')}
						</p>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Required components</p>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each definition.contract.requiredComponents as component}
								<Badge variant="outline">{component}</Badge>
							{/each}
						</div>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Optional components</p>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each definition.contract.optionalComponents as component}
								<Badge variant="outline">{component}</Badge>
							{/each}
						</div>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Default behaviours</p>
						<div class="mt-2 flex flex-wrap gap-2">
							{#if Object.entries(definition.contract.defaultBehaviours).length}
								{#each Object.entries(definition.contract.defaultBehaviours) as [component, behaviour]}
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
							{#each definition.contract.responsiveRules as rule}
								<li>- {rule}</li>
							{/each}
						</ul>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Print notes</p>
						<ul class="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
							{#each definition.contract.printRules as rule}
								<li>- {rule}</li>
							{/each}
						</ul>
					</div>

					<div>
						<p class="text-sm font-semibold text-primary">Allowed presets</p>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each definition.presets as preset}
								<Badge>{preset.name}</Badge>
							{/each}
						</div>
					</div>
				</div>
			</Card>

			<section class="space-y-4">
				<div>
					<p class="eyebrow">Live preview</p>
					<p class="mt-2 text-sm leading-6 text-muted-foreground">
						{definition.preview.summary}
					</p>
				</div>

				<PreviewComponent section={definition.preview.section} />
			</section>
		</div>
	</div>
{:else}
	<div class="page-frame">
		<Card class="border-dashed bg-white/80 p-8 text-center text-muted-foreground">
			Template not found.
		</Card>
	</div>
{/if}
