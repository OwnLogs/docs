<script lang="ts">
  import { getTree, type Page } from '$lib/pages';
  import { cn } from '$lib/utils';
  import { page } from '$app/stores';
  import { ChevronDown, Search, Sun, Moon } from 'lucide-svelte';
  import { afterNavigate } from '$app/navigation';
  import { fade, fly, scale } from 'svelte/transition';
  import { toggleMode, mode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button';

  const entries = getTree();

  let { open = $bindable(false), searchOpen = $bindable(false) } = $props();

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
            class="list none relative mx-3.5 flex flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5"
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
    class="fixed inset-0 z-30 bg-primary/50 md:hidden"
    onclick={() => (open = false)}
    transition:fade
  ></button>
  <div
    class="fixed bottom-0 left-0 top-0 z-30 flex w-2/3 flex-col gap-10 bg-background p-2 md:hidden"
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
              class="list none relative mx-3.5 flex flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5"
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
    <div class="flex flex-row items-center gap-6 justify-center mt-auto">
      <!-- Github -->
      <a href="https://github.com/OwnLogs/ownlogs">
        <svg
          role="img"
          viewBox="0 0 24 24"
          class="size-6 fill-primary"
          xmlns="http://www.w3.org/2000/svg"
          ><title>GitHub</title><path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          /></svg
        >
      </a>
      <Button size="icon" variant="outline" onclick={toggleMode}>
        {#if $mode === 'dark'}
          <span in:scale>
            <Sun class="size-full" />
          </span>
        {:else}
          <span in:scale>
            <Moon class="size-full" />
          </span>
        {/if}
      </Button>
      <Button size="icon" variant="outline" onclick={() => (searchOpen = true)}>
        <Search class="size-full" />
      </Button>
    </div>
  </div>

{/if}
