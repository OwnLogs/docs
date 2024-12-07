<script lang="ts">
  import { cn } from '$lib/utils';
  import { Motion } from 'svelte-motion';
  import { onMount } from 'svelte';

  const { words, class: className }: { words: string; class?: string } = $props();

  let wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  let framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  let wordSplit = words.split(' ');
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<Motion variants={wrapperFramerProps} initial="hidden" animate="show" let:motion>
  <h1
    class={cn(
      'text-wrap-balance text-4xl font-semibold leading-[3rem] text-primary md:text-6xl md:leading-[5rem]',
      mounted ? 'opacity-100' : 'opacity-0',
      className
    )}
    use:motion
  >
    {#each wordSplit as word}
      <Motion variants={framerProps} let:motion>
        <span class="inline-block pr-[8px]" use:motion>
          {#if word === ''}
            <span>&nbsp;</span>
          {:else}
            {word}
          {/if}
        </span>
      </Motion>
    {/each}
  </h1>
</Motion>
