<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { getStableComponents } from '$lib/registry';
	import { Badge } from '$lib/components/ui/badge';

	let { children } = $props();

	const components = getStableComponents();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lectio - Educational Component Library</title>
</svelte:head>

<div class="min-h-screen bg-transparent">
	<div class="mx-auto flex min-h-screen max-w-[96rem] gap-6 px-3 py-3 sm:px-4 lg:px-5">
		<aside class="hidden w-72 shrink-0 xl:block">
			<div class="lesson-shell sticky top-3 p-5">
				<div class="relative z-10 space-y-6">
					<a href="/" class="block space-y-2">
						<div class="flex items-center gap-2">
							<Badge class="bg-primary text-primary-foreground hover:bg-primary">Lectio</Badge>
							<Badge variant="outline">SvelteKit</Badge>
						</div>
						<div>
							<h1 class="text-2xl font-semibold tracking-tight font-serif text-primary">
								Educational components
							</h1>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								A component system for teaching moves, not just interface widgets.
							</p>
						</div>
					</a>

					<nav class="space-y-6 text-sm">
						<div>
							<p class="eyebrow">Components</p>
							<ul class="mt-3 space-y-1.5">
								{#each components as comp}
									<li>
										<a
											href="/components#{comp.id}"
											class="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
										>
											<span class="font-medium">{comp.name}</span>
											<span class="mt-1 block text-xs text-muted-foreground">
												Group {comp.group} - {comp.cognitiveJob}
											</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>

						<div>
							<p class="eyebrow">Templates</p>
							<ul class="mt-3 space-y-1.5">
								<li>
									<a
										href="/templates"
										class="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
									>
										<span class="font-medium">GuidedConceptPath</span>
										<span class="mt-1 block text-xs text-muted-foreground">
											Core instructional arc
										</span>
									</a>
								</li>
								<li>
									<a
										href="/templates"
										class="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
									>
										<span class="font-medium">EnrichedLearningPath</span>
										<span class="mt-1 block text-xs text-muted-foreground">
											Full-surface visualization template
										</span>
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</aside>

		<main class="min-h-0 flex-1">
			{@render children()}
		</main>
	</div>
</div>
