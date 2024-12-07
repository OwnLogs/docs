<script lang="ts">
  import { cn } from '$lib/utils';

  const {
    level,
    class: className,
    ...restProps
  }: {
    level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    class?: string;
  } = $props();

  const levelClasses = {
    debug: 'text-background dark:text-foreground bg-gray-600 dark:bg-gray-600',
    info: 'text-background dark:text-foreground bg-blue-600 dark:bg-blue-600',
    warn: 'text-background dark:text-foreground bg-amber-600 dark:bg-amber-600',
    error: 'text-background dark:text-foreground bg-red-600 dark:bg-red-600',
    fatal: 'text-background dark:text-foreground bg-rose-600 dark:bg-rose-600'
  };
</script>

<span
  class={cn(
    'rounded-full px-2 py-1 text-xs font-semibold uppercase',
    levelClasses[level],
    className
  )}
  {...restProps}
>
  {level}
</span>
