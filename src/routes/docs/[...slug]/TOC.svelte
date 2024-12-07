<script module lang="ts">
  export interface Heading {
    id: string;
    text: string;
    level: number;
    children: Heading[];
  }
</script>

<script lang="ts">
  import TOCList from './TOCList.svelte';
  import type { Page } from '$lib/pages';
  import { Spring } from 'svelte/motion';
  import { afterNavigate } from '$app/navigation';

  interface Props {
    page: Page;
  }

  const { page }: Props = $props();

  let componentElement: HTMLElement | undefined = $state();
  let headings: Heading[] = $state([]);
  let tocList: HTMLElement | undefined = $state();
  let headingScrolls: { [key: string]: number } = {};
  let indicatorCords = new Spring(
    {
      top: 0,
      height: 0,
      left: 0,
      right: 0
    },
    {
      stiffness: 0.1,
      damping: 0.25
    }
  );

  afterNavigate(() => {
    if (!componentElement) return;

    const headingsElements = componentElement.querySelectorAll('h1, h2, h3, h4');
    headings = createHeadingTree(Array.from(headingsElements) as HTMLHeadingElement[]);
    setTopPos(headings);

    const navBar = document.getElementsByTagName('nav')[0];
    const topOffset = navBar.clientHeight;
    const container = document.querySelector('main') as HTMLElement;
    windowScrollHandler(topOffset, container);
    container.addEventListener('scroll', () => {
      windowScrollHandler(topOffset, container);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        windowScrollHandler(topOffset, container);
      });
    };
  });

  function createHeadingTree(headings: HTMLHeadingElement[]): Heading[] {
    const stack: Heading[] = [];
    const root: Heading[] = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      const item: Heading = {
        id: heading.id,
        text: heading.textContent || '',
        level,
        children: []
      };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length) {
        stack[stack.length - 1]?.children?.push(item);
      } else {
        root.push(item);
      }

      stack.push(item);
    });

    return root;
  }

  function setTopPos(headings: Heading[]) {
    headings.forEach((e) => {
      const element = document.getElementById(e.id);
      if (!element) return;
      headingScrolls[e.id] = element.getBoundingClientRect().top + window.scrollY;

      if (e.children.length > 0) {
        setTopPos(e.children);
      }
    });
  }

  function windowScrollHandler(offset: number, container: HTMLElement) {
    const scrollPosition = container.scrollTop;
    const maxScrollPosition = container.scrollHeight - container.clientHeight;
    // Calculate the progress based on how much the user has scrolled relative to the maximum scroll position
    const progress = scrollPosition / maxScrollPosition;

    // Interpolate the trigger value between offset and container.scrollHeight
    // As progress goes from 0 to 1, trigger smoothly moves from scrollPosition + offset to scrollPosition + container.scrollHeight
    const trigger = scrollPosition + offset + progress * (container.scrollHeight - offset);
    let activeHeadingInSidebar;

    // Find the lowest heading that is above the trigger
    for (let i in headingScrolls) {
      if (headingScrolls[i] <= trigger) {
        const currentHeading = document.querySelector(`[href="#${i}"]`) as HTMLElement;
        if (!currentHeading) return;
        activeHeadingInSidebar = currentHeading;
      }
    }
    if (!activeHeadingInSidebar) return;
    if (activeHeadingInSidebar.offsetTop === indicatorCords.target.top) return;
    const left = activeHeadingInSidebar.parentElement?.offsetLeft || 0;
    const yPadding = 4;
    const xPadding = 8;
    indicatorCords.target = {
      top: activeHeadingInSidebar.offsetTop - yPadding / 2,
      height: activeHeadingInSidebar.offsetHeight + yPadding,
      left: left + xPadding,
      right: left + xPadding
    };
  }
</script>

<div class="invisible hidden opacity-0" bind:this={componentElement}>
  <svelte:component this={page.component} />
</div>

<div class="shrink-0 py-4">
  <!-- On desktop -->
  <div
    class="relative h-full w-[250px] overflow-y-auto max-lg:invisible max-lg:hidden"
    bind:this={tocList}
  >
    <!-- TOC Items -->
    <div>
      <TOCList {headings} root={true} />
    </div>

    <!-- Indicator -->
    <div
      class="pointer-events-none absolute rounded-lg bg-primary-foreground"
      style:top={indicatorCords.current.top + 'px'}
      style:right={indicatorCords.current.right + 'px'}
      style:left={indicatorCords.current.left + 'px'}
      style:height={indicatorCords.current.height + 'px'}
      style="mix-blend-mode: difference;"
    ></div>
  </div>

  <!-- On mobile -->
  <div class="lg:invisible lg:hidden">
    <h1 class="px-2 font-mono text-2xl font-bold">{page.name}</h1>
    <TOCList {headings} root={true} />
  </div>
</div>
