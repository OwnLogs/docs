<script lang="ts">
  import { Motion, AnimatePresence } from 'svelte-motion';
  import { cn } from '$lib/utils';

  interface Props {
    class?: string;
    once?: boolean;
    blur?: number;
    duration?: number;
    delay?: number;
    yOffset?: number;
    inViewMargin?: string;
    children: () => any;
  }

  const {
    children,
    class: className,
    once = true,
    blur = 6,
    duration = 0.4,
    delay = 0,
    yOffset = 6,
    inViewMargin = '-250px'
  }: Props = $props();

  let id = crypto.randomUUID().slice(0, 8);
  let defaultVariants = {
    hidden: { opacity: 0, y: yOffset, filter: `blur(${blur}px)` },
    visible: { opacity: 1, y: 0, filter: `blur(0px)` }
  };

  let isInView = $state(false);

  function inview(node: HTMLElement, options: any) {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting;
      });
    }, options);

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<AnimatePresence list={[{ key: id }]}>
  <Motion
    initial="hidden"
    animate={isInView ? 'visible' : 'hidden'}
    exit="hidden"
    variants={defaultVariants}
    transition={{
      delay: 0.04 + delay,
      duration,
      ease: 'easeOut'
    }}
    let:motion
  >
    <div
      use:inview={{ rootMargin: inViewMargin, unobserveOnEnter: once }}
      use:motion
      class={cn(className)}
    >
      {@render children?.()}
    </div>
  </Motion>
</AnimatePresence>
