<script lang="ts">
  import Nav from './Nav.svelte';

  let { children } = $props();
</script>

<Nav />

{@render children?.()}
