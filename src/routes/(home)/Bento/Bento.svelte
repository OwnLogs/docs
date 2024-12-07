<script lang="ts">
  import BentoSQL from './SQL.svelte';
  import BentoDocker from './Docker/Docker.svelte';
  import { Timer, TriangleAlert, Info, OctagonAlert } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import Reveal from '../Reveal.svelte';

  class PeriodicLogs {
    logList: { title: string; description: string; icon: any; color: string; id: string }[] =
      $state([]);
    interval: ReturnType<typeof setInterval> | null;
    MAX_NUMBER_OF_LOGS = 5;
    lastIndex: number = -1;
    possibleLogs = [
      {
        title: 'Error',
        description: 'An error occurred while processing the request.',
        icon: OctagonAlert,
        color: 'text-red-600'
      },
      {
        title: 'Warning',
        description: 'Pruning old data is taking an unexpected amount of time.',
        icon: TriangleAlert,
        color: 'text-amber-600'
      },
      {
        title: 'Info',
        description: 'A new order has just been submitted.',
        icon: Info,
        color: 'text-blue-600'
      },
      {
        title: 'Error',
        description: 'Server has timed out.',
        icon: OctagonAlert,
        color: 'text-red-600'
      },
      {
        title: 'Warning',
        description: 'A request has been made to the server from an unknown IP.',
        icon: TriangleAlert,
        color: 'text-amber-600'
      }
    ];

    constructor() {
      this.interval = null;
    }

    addLog() {
      this.lastIndex = (this.lastIndex + 1) % this.possibleLogs.length;
      const newLog = { ...this.possibleLogs[this.lastIndex], id: Math.random().toString() };
      this.logList.unshift(newLog);
      if (this.logs.length > this.MAX_NUMBER_OF_LOGS) {
        this.logList = this.logs.slice(0, this.MAX_NUMBER_OF_LOGS);
      }
    }

    start() {
      this.interval = setInterval(this.addLog.bind(this), 2000);
    }

    stop() {
      if (this.interval) clearInterval(this.interval);
    }

    get logs() {
      return this.logList;
    }
  }

  const logs: PeriodicLogs = new PeriodicLogs();
  let isBentoVisible = $state(false);
  let bentoGrid: HTMLElement | undefined = $state();

  onMount(() => {
    const checkBentoVisibility = () => {
      if (!bentoGrid) {
        isBentoVisible = false;
        return;
      }
      const rect = bentoGrid.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      isBentoVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };

    checkBentoVisibility();
    window.addEventListener('scroll', checkBentoVisibility);

    // Add first log to logs list
    logs.addLog();

    return () => {
      window.removeEventListener('scroll', checkBentoVisibility);
    };
  });

  // When the bento grid is visible, add logs toasts, else stop
  $effect(() => {
    if (isBentoVisible) {
      logs.start();
    } else {
      logs.stop();
    }
  });
</script>

<div class="flex flex-col" id="features">
  <Reveal>
    <h2 class="text-center text-4xl font-semibold text-neutral-800 dark:text-neutral-200">
      Everything You Need
    </h2>
  </Reveal>
  <Reveal>
    <h3 class="text-center text-lg font-medium text-neutral-600 dark:text-neutral-400">
      Powerful features to help you manage and understand your logs better
    </h3>
  </Reveal>
  <!-- Bento grid -->
  <div class="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3" bind:this={bentoGrid}>
    <!-- Docker -->
    <Reveal class="lg:col-span-2">
      <BentoDocker />
    </Reveal>

    <!-- Real time logs -->
    <Reveal>
      <div
        class="flex flex-col items-center justify-between gap-1 rounded-xl border border-border bg-secondary"
      >
        <div class="relative h-[400px] grow overflow-hidden">
          <div class="flex w-full grow flex-col justify-start gap-2 p-6">
            {#each logs.logs as l (l.id)}
              <div
                class="flex w-full flex-row gap-2 rounded-lg bg-background p-3"
                animate:flip={{ duration: 300 }}
                transition:fly={{ x: '100%', duration: 300, delay: 100 }}
              >
                <l.icon class="{l.color} mt-1 size-6" />
                <div class="flex flex-col">
                  <span class="text-base font-medium">{l.title}</span>
                  <span class="text-sm text-muted-foreground">{l.description}</span>
                </div>
              </div>
            {/each}
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-secondary"
          ></div>
        </div>
        <div class="p-6 pt-0">
          <span class="text-base font-medium text-neutral-700 dark:text-neutral-300">
            <Timer class="inline size-[18px] align-middle" />
            Real-time logs.
          </span>
          <span class="text-base text-neutral-500"
            >View logs in real-time as they are generated</span
          >
        </div>
      </div>
    </Reveal>

    <!-- SQL editor -->
    <Reveal class="lg:col-span-3">
      <BentoSQL />
    </Reveal>
  </div>
</div>
