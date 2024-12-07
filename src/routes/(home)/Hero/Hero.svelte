<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  // import AnimatedShinyText from './AnimatedShinyText.svelte';
  import WordAnimate from './WordAnimate.svelte';
  import LightOverview from '$lib/assets/homepage/Light-Overview.png?enhanced';
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let fakeCursorContainer: HTMLElement | null = $state(null);
  let fakeCursorOpacity = $state(0);
  let fakeCursorPos = $state({ x: 0, y: 0 });
  let fakeCursorNameTagPos = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.03,
      damping: 0.25
    }
  );

  onMount(() => {
    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!fakeCursorContainer) return;
      const x = clientX - fakeCursorContainer.getBoundingClientRect().left;
      const y = clientY - fakeCursorContainer.getBoundingClientRect().top;
      fakeCursorPos = { x, y };
      fakeCursorNameTagPos.set({ x, y });
      fakeCursorOpacity = 1;
    };
    const mouseLeave = () => {
      fakeCursorOpacity = 0;
    };

    fakeCursorContainer?.addEventListener('mousemove', mouseMove);
    fakeCursorContainer?.addEventListener('mouseleave', mouseLeave);

    return () => {
      fakeCursorContainer?.removeEventListener('mousemove', mouseMove);
      fakeCursorContainer?.removeEventListener('mouseleave', mouseLeave);
    };
  });
</script>

<div
  class="flex w-full flex-col items-center justify-center rounded-2xl bg-secondary px-4 pt-12 md:px-6 md:pt-24 lg:justify-between"
>
  <div class="text-wrap-balance space-y-4 text-center md:w-2/3">
    <WordAnimate words="Transform Your Logs into Actionable Insights" />
    <h2 class="font-base text-base text-muted-foreground md:text-xl">
      Collect, analyze, and visualize your logs with our powerful, Docker-powered platform.
      Enterprise-grade features, completely free and open source.
    </h2>

    <Button href="/docs">Get started</Button>
  </div>

  <!-- Product preview -->
  <div class="flex h-full w-full grow flex-col max-lg:hidden">
    <div
      class="relative mt-auto aspect-video w-full translate-y-14 overflow-hidden rounded-3xl border-2 border-primary bg-background p-3"
    >
      <div class="absolute inset-0 -z-10 bg-primary/30 dark:bg-primary/20"></div>
      <div
        class="relative size-full cursor-none overflow-hidden rounded-2xl bg-background shadow hover:cursor-none"
        bind:this={fakeCursorContainer}
      >
        <div
          class="absolute z-10 flex flex-col drop-shadow-sm transition-opacity"
          style="top: {fakeCursorPos.y}px; left: {fakeCursorPos.x}px; opacity: {fakeCursorOpacity};"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 fill-background"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
            /></svg
          >
        </div>
        <div
          class="absolute z-10 translate-x-5 translate-y-5 rounded bg-primary px-2 py-0.5 text-sm font-medium text-primary-foreground shadow-md transition-opacity"
          style="top: {$fakeCursorNameTagPos.y}px; left: {$fakeCursorNameTagPos.x}px; opacity: {fakeCursorOpacity};"
        >
          You
        </div>
        <enhanced:img src={LightOverview} draggable="false" class="size-full object-cover" />
      </div>
    </div>
  </div>
</div>

<!-- <div class="flex flex-col gap-4">
  <h1 class="text-3xl font-semibold text-center">
    Integrate It With Your Favorite
    <AnimatedShinyText class="inline">Languages</AnimatedShinyText>
  </h1>
  <div class="w-fit mx-auto flex flex-row justify-center py-2 gap-4 items-center" style="mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #FFF 50%, rgba(255, 255, 255, 0.4) 100%);">
    <div class="p-3 rounded-xl bg-accent border border-border size-14 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 256 346"><path fill="#5382a1" d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034c0 0 7.93 4.972 19.003 9.279c-67.611 28.977-153.019-1.679-99.913-16.517m-8.262-37.814s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43c0 0 5.526 5.602 14.215 8.666c-81.747 23.904-172.798 1.885-114.296-17.532"/><path fill="#e76f00" d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858c0 0-118.238 29.53-61.765 94.6"/><path fill="#5382a1" d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471c-12.323-5.36 10.787-12.8 18.056-14.362c7.581-1.644 11.914-1.337 11.914-1.337c-13.705-9.655-88.583 18.957-38.034 27.15c137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89c25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183c29.981-14.492 54.358-12.848 54.358-12.848m112.605 62.942c64.8-33.672 34.839-66.03 13.927-61.67c-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647c0 .001 1.003-.895 1.302-1.697"/><path fill="#e76f00" d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377c-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37"/><path fill="#5382a1" d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64c0 0-4.348 11.158-51.404 20.018c-53.088 9.99-118.564 8.824-157.399 2.421c.001 0 7.95 6.58 48.83 9.201"/></svg>
    </div>
    <div class="p-3 rounded-xl bg-accent border border-border size-14 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 256 256"><path fill="#f7df1e" d="M0 0h256v256H0z"/><path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"/></svg>
    </div>
    <div class="rounded-full size-24 border border-border bg-sidebar shadow-sm p-4 relative">
      <img src="/logos/Dark.svg" class="size-full rounded-full" alt="">
    </div>
    <div class="p-3 rounded-xl bg-accent border border-border size-14 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 256 255"><defs><linearGradient id="logosPython0" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stop-color="#387eb8"/><stop offset="100%" stop-color="#366994"/></linearGradient><linearGradient id="logosPython1" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stop-color="#ffe052"/><stop offset="100%" stop-color="#ffc331"/></linearGradient></defs><path fill="url(#logosPython0)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072M92.802 19.66a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.13"/><path fill="url(#logosPython1)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897m34.114-19.586a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.131a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13"/></svg>
    </div>
    <div class="p-3 rounded-xl bg-accent border border-border size-14 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-full" viewBox="0 0 256 135"><defs><radialGradient id="logosPhp0" cx=".837" cy="-125.811" r="363.057" gradientTransform="translate(76.464 81.918)scale(.463)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#4c6b97"/><stop offset="1" stop-color="#231f20"/></radialGradient></defs><ellipse cx="128" cy="67.3" fill="url(#logosPhp0)" rx="128" ry="67.3"/><ellipse cx="128" cy="67.3" fill="#6181b6" rx="123" ry="62.3"/><path fill="#fff" d="m152.9 87.5l6.1-31.4c1.4-7.1.2-12.4-3.4-15.7c-3.5-3.2-9.5-4.8-18.3-4.8h-10.6l3-15.6c.1-.6 0-1.2-.4-1.7s-.9-.7-1.5-.7h-14.6c-1 0-1.8.7-2 1.6l-6.5 33.3c-.6-3.8-2-7-4.4-9.6c-4.3-4.9-11-7.4-20.1-7.4H52.1c-1 0-1.8.7-2 1.6L37 104.7c-.1.6 0 1.2.4 1.7s.9.7 1.5.7h14.7c1 0 1.8-.7 2-1.6l3.2-16.3h10.9c5.7 0 10.6-.6 14.3-1.8q5.85-1.95 10.5-6.3c2.5-2.3 4.6-4.9 6.2-7.7l-2.6 13.5c-.1.6 0 1.2.4 1.7s.9.7 1.5.7h14.6c1 0 1.8-.7 2-1.6l7.2-37h10c4.3 0 5.5.8 5.9 1.2c.3.3.9 1.5.2 5.2L134.1 87c-.1.6 0 1.2.4 1.7s.9.7 1.5.7h15c.9-.3 1.7-1 1.9-1.9m-67.6-26c-.9 4.7-2.6 8.1-5.1 10s-6.6 2.9-12 2.9h-6.5l4.7-24.2h8.4c6.2 0 8.7 1.3 9.7 2.4c1.3 1.6 1.6 4.7.8 8.9m130-18.6c-4.3-4.9-11-7.4-20.1-7.4h-28.3c-1 0-1.8.7-2 1.6l-13.1 67.5c-.1.6 0 1.2.4 1.7s.9.7 1.5.7h14.7c1 0 1.8-.7 2-1.6l3.2-16.3h10.9c5.7 0 10.6-.6 14.3-1.8q5.85-1.95 10.5-6.3c2.6-2.4 4.8-5.1 6.4-8s2.8-6.1 3.5-9.6c1.7-8.7.4-15.5-3.9-20.5M200 61.5c-.9 4.7-2.6 8.1-5.1 10s-6.6 2.9-12 2.9h-6.5l4.7-24.2h8.4c6.2 0 8.7 1.3 9.7 2.4c1.4 1.6 1.7 4.7.8 8.9"/><path fill="#000004" d="M74.8 48.2c5.6 0 9.3 1 11.2 3.1s2.3 5.6 1.3 10.6c-1 5.2-3 9-5.9 11.2q-4.35 3.3-13.2 3.3h-8.9l5.5-28.2zM39 105h14.7l3.5-17.9h12.6c5.6 0 10.1-.6 13.7-1.8s6.8-3.1 9.8-5.9q3.75-3.45 6-7.5c1.5-2.7 2.6-5.7 3.2-9c1.6-8 .4-14.2-3.5-18.7s-10.1-6.7-18.6-6.7H52.1zm74.3-85.4h14.6l-3.5 17.9h13c8.2 0 13.8 1.4 16.9 4.3s4 7.5 2.8 13.9L151 87.1h-14.8l5.8-29.9c.7-3.4.4-5.7-.7-6.9s-3.6-1.9-7.3-1.9h-11.7l-7.5 38.7h-14.6zm76.2 28.6c5.6 0 9.3 1 11.2 3.1s2.3 5.6 1.3 10.6c-1 5.2-3 9-5.9 11.2q-4.35 3.3-13.2 3.3H174l5.5-28.2zM153.7 105h14.7l3.5-17.9h12.6c5.6 0 10.1-.6 13.7-1.8s6.8-3.1 9.8-5.9q3.75-3.45 6-7.5c1.5-2.7 2.6-5.7 3.2-9c1.6-8 .4-14.2-3.5-18.7s-10.1-6.7-18.6-6.7h-28.3z"/></svg>
    </div>
  </div>
</div> -->
