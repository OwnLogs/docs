<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex h-svh flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-sm space-y-4 text-center">
    <h1
      style="font-size: 5rem;"
      class="font-mono text-4xl font-bold tracking-tight text-foreground"
    >
      {$page.status}
    </h1>
    <p class="text-lg text-muted-foreground">{$page.error?.message}</p>
    <Button href="/">Go to Homepage</Button>
  </div>
</div>
