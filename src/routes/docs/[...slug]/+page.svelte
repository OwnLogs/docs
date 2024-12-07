<script>
  import Navbar from './navbar.svelte';
  import Sidebar from './sidebar.svelte';
  import Search from './Search.svelte';
  import Toc from './TOC.svelte';
  import Pagination from './Pagination.svelte';
  import { pageMetadata } from '$lib/stores';

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

<Search bind:open={searchOpen} />

<div class="mx-auto flex h-svh w-full max-w-screen-2xl flex-row bg-background">
  <Sidebar bind:open={sideBarOpen} />
  <div class="flex h-full w-full flex-col">
    <Navbar page={data} bind:sideBarOpen bind:searchOpen />
    <div class="flex h-[calc(100svh-4rem)] grow flex-col-reverse lg:flex-row">
      <main class="no-scrollbar flex grow flex-col overflow-y-auto p-2 lg:p-4">
        {#if data?.component}
          <svelte:component this={data.component} />
        {/if}
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
