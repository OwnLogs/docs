<script lang="ts">
  interface Props {
    src: string;
    alt: string;
    'data-caption': string;
  }

  const { src, alt, 'data-caption': caption }: Props = $props();
</script>

<figure>
  <img {src} {alt} class="cursor-zoom-in rounded object-contain" />
  {#if caption}
    <figcaption
      class="relative mt-2 block justify-center rounded-xl px-8 text-center text-base text-gray-700 dark:text-gray-400"
    >
      {caption}
    </figcaption>
  {/if}
</figure>
