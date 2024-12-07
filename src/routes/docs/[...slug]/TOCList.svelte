<script lang="ts">
  import type { Heading } from './TOC.svelte';
  import TOCList from './TOCList.svelte';
  import { cn } from '$lib/utils';

  interface Props {
    headings: Heading[];
    root?: boolean;
  }
  const { headings, root = false }: Props = $props();
</script>

<ol class={cn('mt-1 space-y-1', !root && 'mb-2 ml-4 border-l border-border')}>
  {#each headings as heading}
    <li class="list-none">
      <a href="#{heading.id}" class="block pl-4 font-mono transition-colors">
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <TOCList headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
