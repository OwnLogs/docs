<script module>
  import { pre, img, a, table } from './index.js';

  export { pre, img, a, table };
</script>

<script lang="ts">
  import { formatDate } from '$lib/utils';
  const metadata = $props();
</script>

{#if metadata?.lastModified || metadata?.description}
  <section class="mb-8">
    {#if metadata?.lastModified}
      <small class="mb-1">{formatDate(new Date(metadata.lastModified))}</small>
    {/if}
    {#if metadata?.description}
      <p class="m-0 text-lg">{metadata.description}</p>
    {/if}
  </section>
{/if}

<slot />
