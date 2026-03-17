<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { getStableComponents } from '$lib/registry';
	import { templateRegistry } from '$lib/template-registry';
	import { Badge } from '$lib/components/ui/badge';

	let { children } = $props();

	const components = getStableComponents();
	const templates = templateRegistry.map((definition) => definition.contract);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lectio - Educational Component Library</title>
</svelte:head>

<div class="min-h-screen bg-transparent">
	<div class="mx-auto flex min-h-screen max-w-[96rem] items-start gap-6 px-3 py-3 sm:px-4 lg:px-5">
		<aside class="hidden w-72 shrink-0 xl:sticky xl:top-3 xl:block xl:self-start">
			<div class="lesson-shell max-h-[calc(100vh-1.5rem)] p-5">
				<div class="relative z-10 flex max-h-[calc(100vh-3rem)] flex-col">
					<a href="/" class="block shrink-0 space-y-2">
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

					<nav class="mt-6 flex-1 space-y-6 overflow-y-auto pr-1 text-sm scrollbar-styled">
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
										<span class="font-medium">Template gallery</span>
										<span class="mt-1 block text-xs text-muted-foreground">
											10 starter templates
										</span>
									</a>
								</li>
								{#each templates as template}
									<li>
										<a
											href={`/templates/${template.id}`}
											class="block rounded-xl px-3 py-2 text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
										>
											<span class="font-medium">{template.name}</span>
											<span class="mt-1 block text-xs text-muted-foreground">
												{template.family}
											</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</aside>

		<main class="min-h-screen min-w-0 flex-1">
			{@render children()}
		</main>
	</div>
</div>
