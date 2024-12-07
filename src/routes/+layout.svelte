<script lang="ts">
  import '../app.css';
  import { pageMetadata } from '$lib/stores';
  import { page } from '$app/stores';

  let { children } = $props();
  const SITE_NAME = 'OwnLogs';
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href.split('#')[0]} />
  <meta property="twitter:domain" content={$page.url.hostname} />
  <meta property="twitter:url" content={$page.url.href.split('#')[0]} />
  <meta property="og:url" content={$page.url.href.split('#')[0]} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={SITE_NAME} />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@{SITE_NAME}" />
  <meta name="twitter:creator" content="@{SITE_NAME}" />
  <meta name="twitter:domain" content={$page.url.hostname} />
  <meta name="twitter:url" content={$page.url.href.split('#')[0]} />

  <!-- Dynamic data -->
  <title>{$pageMetadata.title} | {SITE_NAME}</title>
  <meta property="og:title" content="{$pageMetadata.title} | {SITE_NAME}" />
  <meta property="twitter:title" content="{$pageMetadata.title} | {SITE_NAME}" />

  <meta name="description" content={$pageMetadata.description} />
  <meta property="og:description" content={$pageMetadata.description} />
  <meta property="twitter:description" content={$pageMetadata.description} />

  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/light/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicons/light/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/light/favicon-16x16.png" />
</svelte:head>

<div class="flex min-h-svh flex-col">
  {@render children?.()}
</div>
