<script>
  import { cn } from '$lib/utils';
  import Reveal from '../Reveal.svelte';

  const features = [
    {
      title: 'Self hosted',
      description: 'Powerful features to help you manage and understand your logs better'
    },
    {
      title: ' Powerful Features',
      description: 'Powerful features to help you manage and understand your logs better'
    }
  ];
</script>

<div class="flex flex-col">
  <Reveal>
    <h2 class="text-center text-4xl font-semibold text-neutral-800 dark:text-neutral-200">
      Features
    </h2>
  </Reveal>

  <div class="mt-10 grid" style="height: calc(100svh * {features.length} - 4rem);">
    {#each features as { title, description }, i}
      <div class="grid h-svh grid-cols-2">
        <!-- Text -->
        <div
          class={cn(
            'sticky top-20 flex h-fit min-h-[50%] w-full flex-col',
            i % 2 === 0 ? 'col-start-1' : 'col-start-2'
          )}
        >
          <h1 class="text-xl font-medium">{title}</h1>
          <p class="text-base text-muted-foreground">{description}</p>
        </div>

        <div class=""></div>

        <!-- Image -->
      </div>
    {/each}
  </div>
</div>
