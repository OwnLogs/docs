<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children }: { class?: string; children?: any } = $props();
</script>

<div
  class={cn(
    'relative flex size-14 items-center justify-center overflow-hidden rounded-full border-2 bg-background p-2 shadow-lg transition-colors hover:border-primary hover:bg-primary/20',
    className
  )}
>
  <div class="absolute inset-0 -z-10 bg-background"></div>
  {@render children?.()}
</div>
