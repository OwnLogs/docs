<script lang="ts">
  import Nav from './Nav.svelte';
  import { setMode } from 'mode-watcher';

  let { children } = $props();

  setMode('light');
</script>

<Nav />

{@render children?.()}
