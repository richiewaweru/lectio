<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
    value?: string | string[];
    children?: Snippet;
    class?: string;
  }

  let { type = 'single', collapsible = false, value = $bindable(), children, class: className, ...restProps }: Props = $props();
</script>

<AccordionPrimitive.Root {type} {collapsible} bind:value class={cn(className)} {...restProps}>
  {#if children}{@render children()}{/if}
</AccordionPrimitive.Root>
