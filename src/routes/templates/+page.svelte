<script lang="ts">
	import { calculusSection } from '$lib/dummy-content';
	import GuidedConceptPath from '$lib/templates/GuidedConceptPath.svelte';
</script>

<div class="py-8">
	<div class="max-w-4xl mx-auto px-6 mb-8">
		<h1 class="text-3xl font-bold tracking-tight mb-2">GuidedConceptPath</h1>
		<p class="text-muted-foreground">
			A complete instructional arc: Hook &rarr; Explain &rarr; Define &rarr; Worked Example
			&rarr; Pitfall &rarr; Practice &rarr; What's Next. The glossary sits in a sticky sidebar
			on desktop.
		</p>
	</div>

	<GuidedConceptPath section={calculusSection} />
</div>
