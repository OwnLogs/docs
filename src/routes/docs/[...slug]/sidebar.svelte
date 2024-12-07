<script lang="ts">
  import { getTree, type Page } from '$lib/pages';
  import { cn } from '$lib/utils';
  import { page } from '$app/stores';
  import { ChevronDown } from 'lucide-svelte';
  import { afterNavigate } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';

  const entries = getTree();

  let { open = $bindable(false) } = $props();

  afterNavigate(() => {
    open = false;
  });
</script>

{#snippet child(p: Page)}
  <li
    class={cn(
      'flex w-full cursor-pointer items-center justify-between rounded-md text-sm font-medium ring-sidebar-ring',
      $page.url.pathname === p.url
        ? 'bg-primary text-primary-foreground'
        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
    )}
  >
    <a href={p.url} class="w-full px-4 py-2">{p.name}</a>
  </li>
{/snippet}

<!-- On desktop -->
<div
  class="flex h-full w-[300px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-2 max-lg:invisible max-lg:hidden"
>
  <a
    href="/"
    class="peer/menu-button flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-2 outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:font-medium"
  >
    <img src="/logos/Light.svg" class="size-8 rounded-md" alt="OwnLogs logo" />
    <div class="grid flex-1 text-left text-sm leading-tight">
      <span class="truncate font-semibold">OwnLogs</span>
    </div>
  </a>
  <!-- Pages list -->
  <ul class="flex w-full flex-col">
    {#each entries as p}
      {#if p?.children}
        {@const active = p.children.some((c) => c.url === $page.url.pathname)}
        <details open={active} class="group flex w-full flex-col gap-1">
          <summary
            class="flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>{p.name}</span>
            <ChevronDown
              class="size-4 text-muted-foreground transition-transform group-open:rotate-180"
            />
          </summary>
          <ul
            class="list none relative mx-3.5 flex flex-col gap-1 border-l border-sidebar-border px-2.5 px-4 py-0.5"
          >
            {#each p.children as page}
              {@render child(page)}
            {/each}
          </ul>
        </details>
      {:else}
        {@render child(p)}
      {/if}
    {/each}
  </ul>
</div>

{#if open}
  <button
    aria-label="Nav background, click to dismiss"
    class="fixed inset-0 z-30 bg-neutral-900/50 md:hidden"
    onclick={() => (open = false)}
    transition:fade
  ></button>
  <div
    class="fixed bottom-0 left-0 top-0 z-30 flex w-2/3 flex-col gap-10 bg-background p-6 md:hidden"
    transition:fly={{ x: '-100%' }}
  >
    <h2 class="text-center text-lg font-semibold">OwnLogs</h2>
    <ul class="flex w-full flex-col items-start justify-start">
      {#each entries as p}
        {#if p?.children}
          {@const active = p.children.some((c) => c.url === $page.url.pathname)}
          <details open={active} class="group flex w-full flex-col gap-1">
            <summary
              class="flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <span>{p.name}</span>
              <ChevronDown
                class="size-4 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <ul
              class="list none relative mx-3.5 flex flex-col gap-1 border-l border-sidebar-border px-2.5 px-4 py-0.5"
            >
              {#each p.children as page}
                {@render child(page)}
              {/each}
            </ul>
          </details>
        {:else}
          {@render child(p)}
        {/if}
      {/each}
    </ul>
  </div>
{/if}
