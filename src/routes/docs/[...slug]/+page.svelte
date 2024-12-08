<script>
  import Navbar from './navbar.svelte';
  import Sidebar from './sidebar.svelte';
  import Search from './Search.svelte';
  import Toc from './TOC.svelte';
  import Pagination from './Pagination.svelte';
  import { pageMetadata } from '$lib/stores';
  import { ModeWatcher } from 'mode-watcher'

  let { data } = $props();
  let sideBarOpen = $state(false);
  let searchOpen = $state(false);

  $effect(() => {
    pageMetadata.set({
      title: data?.name,
      description: data?.description
    });
  });
</script>

<ModeWatcher />

<Search bind:open={searchOpen} />

<div class="mx-auto flex h-svh w-full max-w-screen-2xl flex-row bg-background">
  <Sidebar bind:open={sideBarOpen} bind:searchOpen />
  <div class="flex h-full w-full flex-col">
    <Navbar page={data} bind:sideBarOpen bind:searchOpen />
    <div class="flex h-[calc(100svh-4rem)] grow flex-col-reverse lg:flex-row no-scrollbar max-lg:overflow-y-auto 2xl:border-r border-border">
      <main class="grow flex flex-col p-2 lg:p-4 no-scrollbar lg:overflow-y-auto">
        <div class="grow block">
          {#if data?.component}
            <data.component />
          {/if}
        </div>
        <Pagination page={data} />
      </main>

      <Toc page={data} />
    </div>
  </div>
</div>

<style>
  :global(body) {
    @apply !bg-sidebar;
  }
</style>
