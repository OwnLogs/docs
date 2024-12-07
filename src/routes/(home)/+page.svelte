<script>
  import Bento from './Bento/Bento.svelte';
  import Hero from './Hero/Hero.svelte';
  // import Features from './Features/Features.svelte';
  import Footer from './Footer.svelte';
  import { pageMetadata } from '$lib/stores';

  pageMetadata.set({
    title: 'Home',
    description:
      'OwnLogs is a platform that allows you to log your data and get insights in minutes.'
  });
</script>

<div class="mx-auto w-full max-w-screen-2xl p-1">
  <!-- Hero -->
  <section class="w-full space-y-[200px]">
    <Hero />

    <Bento />

    <!-- <Features /> -->

    <Footer />
  </section>
</div>
