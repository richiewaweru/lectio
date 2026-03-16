<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { componentRegistry } from '$lib/registry';
	import { Separator } from '$lib/components/ui/separator';

	let { children } = $props();

	const components = Object.values(componentRegistry);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lectio — Educational Component Library</title>
</svelte:head>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<aside class="hidden md:flex w-64 flex-col border-r bg-muted/30 p-6">
		<a href="/" class="block mb-6">
			<div class="text-xl font-bold tracking-tight">Lectio</div>
			<div class="text-xs text-muted-foreground">Educational Components</div>
		</a>

		<Separator class="mb-4" />

		<nav class="space-y-4 text-sm">
			<div>
				<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
					Components
				</div>
				<ul class="space-y-1">
					{#each components as comp}
						<li>
							<a
								href="/components#{comp.id}"
								class="block px-2 py-1 rounded-md hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
							>
								{comp.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<Separator />

			<div>
				<div class="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
					Templates
				</div>
				<ul class="space-y-1">
					<li>
						<a
							href="/templates"
							class="block px-2 py-1 rounded-md hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
						>
							GuidedConceptPath
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
