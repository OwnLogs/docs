<script>
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils';
  import { Button } from '$lib/components/ui/button';
  import { Menu, X } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';

  let isNavActive = $state(false);
  let mobileMenuOpen = $state(false);

  const onScrollHandler = () => {
    isNavActive = window.scrollY > 0;
  };

  onMount(() => {
    onScrollHandler();
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });

  afterNavigate(() => {
    mobileMenuOpen = false;
  });
</script>

<!-- Mobile side nav -->
{#if mobileMenuOpen}
  <button
    aria-label="Nav background, click to dismiss"
    class="fixed inset-0 z-30 bg-neutral-900/50 md:hidden"
    onclick={() => (mobileMenuOpen = false)}
    transition:fade
  ></button>
  <div
    class="fixed bottom-0 left-0 top-0 z-30 flex w-2/3 flex-col gap-10 bg-background p-6 md:hidden"
    transition:fly={{ x: '-100%' }}
  >
    <!-- Heading and close button -->
    <div class="flex flex-row items-center justify-between">
      <h3 class="text-lg font-semibold">OwnLogs</h3>
      <Button
        variant="outline"
        class="aspext-square h-fit p-1"
        aria-label="Close nav"
        onclick={() => (mobileMenuOpen = false)}
      >
        <X class="size-6" />
      </Button>
    </div>

    <div class="flex flex-col gap-2">
      <a class="font-mono text-sm text-muted-foreground" href="#features">Features</a>
      <a class="font-mono text-sm text-muted-foreground" href="/docs">Docs</a>
      <a class="font-mono text-sm text-muted-foreground" href="/changelog">Changelog</a>
      <a class="font-mono text-sm text-muted-foreground" href="/support">Support</a>
    </div>

    <!-- CTA -->
    <Button href="/docs" class="mt-auto">Docs</Button>
  </div>
{/if}

<div class="fixed left-2 right-2 top-2 z-20">
  <div class="mx-auto w-full max-w-screen-2xl">
    <nav
      class={cn(
        'mx-auto flex h-16 flex-row items-center justify-between rounded-2xl border px-3 text-primary transition-all duration-500',
        isNavActive
          ? 'w-[90%] border-border bg-background shadow md:w-2/3'
          : 'w-full border-sidebar bg-sidebar'
      )}
    >
      <a href="/" class="flex flex-row items-center">
        <div class="size-8">
          <img src="/logos/Light.svg" alt="Light OwnLogs logo" class="size-full" />
        </div>
        <span
          class={cn(
            'overflow-hidden text-lg font-medium transition-all duration-500',
            isNavActive ? 'w-24 max-md:ml-4 md:w-0' : 'ml-4 w-24'
          )}>OwnLogs</span
        >
        <div
          class={cn(
            'h-6 border-l border-border transition-opacity duration-500',
            isNavActive ? 'max-md:opacity-0 md:ml-4 md:opacity-100' : 'opacity-0'
          )}
        ></div>
      </a>

      <div class="hidden flex-row items-center md:flex">
        <a
          class="rounded-lg px-2 py-1 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary"
          href="/#features">Features</a
        >
        <a
          class="rounded-lg px-2 py-1 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary"
          href="/docs">Docs</a
        >
        <a
          class="rounded-lg px-2 py-1 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary"
          href="/changelog">Changelog</a
        >
      </div>

      <!-- Desktop CTA -->
      <Button
        variant="outline"
        href="/docs"
        class={cn(
          'text-base font-medium duration-500 max-md:hidden',
          isNavActive && 'border-primary bg-primary text-primary-foreground'
        )}
      >
        Docs
      </Button>

      <!-- Expand nav on mobile button -->
      <Button
        variant="outline"
        class="size-fit p-2 md:hidden"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <Menu class="size-6" />
      </Button>
    </nav>
  </div>
</div>

<!-- Spacer -->
<div class="h-20"></div>
