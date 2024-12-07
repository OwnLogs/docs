<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import type { Page } from '$lib/pages';
  import { MediaQuery } from 'runed';
  import { PanelLeft, Search } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  interface Props {
    page: Page;
    sideBarOpen: boolean;
    searchOpen: boolean;
  }
  let { page, sideBarOpen = $bindable(false), searchOpen = $bindable(false) }: Props = $props();
  let breadCrumbs: string[] = $derived(page.slug ? page.slug.split('/') : []);

  const isMobile = new MediaQuery('(max-width: 768px)');
</script>

<div
  class="flex h-14 shrink-0 flex-row items-center justify-between border-b border-sidebar-border bg-background px-4"
>
  <div class="flex flex-row gap-4">
    {#if isMobile.matches}
      <button onclick={() => (sideBarOpen = !sideBarOpen)}>
        <PanelLeft class="size-4 text-sidebar-foreground" />
      </button>
    {/if}
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {#each breadCrumbs as crumb, i (crumb)}
          {#if i < breadCrumbs.length - 1}
            <Breadcrumb.Item>{crumb}</Breadcrumb.Item>
            <Breadcrumb.Separator />
          {:else}
            <Breadcrumb.Page>{crumb}</Breadcrumb.Page>
          {/if}
        {/each}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <div class="flex flex-row items-center gap-2">
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
    <Button size="icon" variant="outline" onclick={() => (searchOpen = true)}>
      <Search class="size-full" />
    </Button>
  </div>
</div>
