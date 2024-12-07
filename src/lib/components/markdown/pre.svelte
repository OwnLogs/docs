<script lang="ts">
  import { scale } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { getIcon } from 'material-file-icons';
  import { CheckCheck, Copy, File } from 'lucide-svelte';

  interface Props {
    children: () => any;
    class?: string;
    name?: string;
    icon?: 'dynamic' | 'default';
    copyCode?: boolean;
    snippet?: boolean;
    lineNumbers?: boolean;
  }

  const {
    children,
    class: className,
    name,
    icon = 'dynamic',
    copyCode = true,
    snippet = false,
    lineNumbers = false
  }: Props = $props();
  let codeCopied = $state(false);
  let interval: NodeJS.Timeout | string | number | undefined = $state();
  let codeContainer: HTMLElement | undefined = $state();

  /**
   * Function to copy text.
   */
  function copyText() {
    if (!codeContainer) return;
    // Change the button icon to a checkmark
    codeCopied = true;
    const textToCopy = codeContainer.querySelector('code')?.innerText;
    if (!textToCopy) return;
    // Write the code to clipboard
    navigator.clipboard.writeText(textToCopy);
    if (interval) {
      clearTimeout(interval);
      interval = undefined;
    }
    interval = setTimeout(() => {
      // Reset the button icon back to default
      codeCopied = false;
    }, 2000);
  }
</script>

{#snippet copyCodeButton(absolute = true, snippet = false)}
  {#if copyCode !== false}
    <button
      onclick={copyText}
      tabindex="0"
      class={cn(
        'flex items-center justify-center rounded-full p-2 text-primary',
        absolute
          ? 'absolute bottom-1 right-5 top-4 aspect-square'
          : !snippet && 'aspect-square h-full',
        snippet && 'max shrink-0 rounded-none bg-background'
      )}
      name="Copy code"
      aria-label="Copy code"
    >
      {#if codeCopied}
        <div in:scale={{ start: 0.5 }}>
          <CheckCheck class="size-4" />
        </div>
      {:else}
        <div in:scale={{ start: 0.5 }}>
          <Copy class="size-4" />
        </div>
      {/if}
    </button>
  {/if}
{/snippet}

{#if snippet === true}
  <div class="snippet" bind:this={codeContainer}>
    {@render children()}
    {@render copyCodeButton(false, true)}
  </div>
{:else}
  <div
    class={cn('codeContainer relative my-4', lineNumbers === true && 'line-numbers')}
    bind:this={codeContainer}
  >
    {#if name}
      <div
        class="codeBlockName relative flex w-full flex-row items-center rounded-t-md border border-b-0 border-border px-3 py-1.5"
      >
        <p class="m-0 flex flex-row items-center gap-2 text-base font-medium text-primary">
          {#if icon == 'dynamic'}
            <span class="size-4">
              {@html getIcon(name).svg}
            </span>
          {:else if icon == 'default'}
            <File class="size-4" />
          {/if}
          {name}
        </p>
        <div class="ml-auto">
          {@render copyCodeButton(false, false)}
        </div>
      </div>
    {/if}
    <div class={className}>
      {@render children()}
      {#if !name}
        {@render copyCodeButton(true, false)}
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(.codeBlockName + div .shiki) {
    @apply !rounded-t-none;
  }
</style>
