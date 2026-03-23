<script lang="ts">
	import DocsMobileNav from '$lib/navigation/DocsMobileNav.svelte';

	let { children } = $props();
</script>

<div class="page-frame">
	<DocsMobileNav />
	<div class="lesson-shell p-6 sm:p-8 lg:p-10">
		<div class="relative z-10 doc-prose">
			{@render children()}
		</div>
	</div>
</div>
