<script lang="ts">
  import { Database, LoaderCircle } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { scale } from 'svelte/transition';
  import LogLevel from '$lib/components/LogLevel.svelte';
  import type { LogLevel as LogLevelType } from '@shared/types';
  import Button from '$lib/components/ui/button/button.svelte';

  const getRandomRecentDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
    return date.toLocaleTimeString();
  };

  const possibleTableLogs: {
    id: number;
    status: LogLevelType;
    timestamp: string;
    message: string;
  }[] = [
    {
      id: 1254,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'An error occurred while processing the request.'
    },
    {
      id: 1253,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'Pruning old data is taking an unexpected amount of time.'
    },
    {
      id: 1252,
      status: 'info',
      timestamp: getRandomRecentDate(),
      message: 'A new order has just been submitted.'
    },
    {
      id: 1251,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'Server has timed out.'
    },
    {
      id: 1250,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'A request has been made to the server from an unknown IP.'
    },
    {
      id: 1249,
      status: 'info',
      timestamp: getRandomRecentDate(),
      message: 'A new order has just been submitted.'
    },
    {
      id: 1248,
      status: 'error',
      timestamp: getRandomRecentDate(),
      message: 'Server has timed out.'
    },
    {
      id: 1247,
      status: 'warn',
      timestamp: getRandomRecentDate(),
      message: 'A request has been made to the server from an unknown IP.'
    }
  ];

  let tableLogs = $state(possibleTableLogs);
  let isRegeneratingLogsTable = $state(false);

  const regenerateLogs = () => {
    isRegeneratingLogsTable = true;
    tableLogs = tableLogs
      .map((log) => ({
        ...log,
        timestamp: getRandomRecentDate()
      }))
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));

    setTimeout(() => {
      isRegeneratingLogsTable = false;
    }, 300);
  };

  const slqQuery = [
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'SELECT'
        },
        {
          class: 'text',
          text: ' * '
        }
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'FROM'
        },
        {
          class: 'text',
          text: ' logs '
        }
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'WHERE'
        },
        {
          class: 'text',
          text: ' status '
        },
        {
          class: 'keyword',
          text: 'IN'
        },
        {
          class: 'text',
          text: " (\n\t'"
        },
        {
          class: 'string',
          text: 'error'
        },
        {
          class: 'text',
          text: "',\n\t'"
        },
        {
          class: 'string',
          text: 'warn'
        },
        {
          class: 'text',
          text: "',\n\t'"
        },
        {
          class: 'string',
          text: 'info'
        },
        {
          class: 'text',
          text: "'\n) "
        }
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'ORDER BY'
        },
        {
          class: 'text',
          text: ' timestamp DESC '
        }
      ]
    },
    {
      class: 'line',
      children: [
        {
          class: 'keyword',
          text: 'LIMIT'
        },
        {
          class: 'string',
          text: ' 8'
        },
        {
          class: 'text',
          text: ';'
        }
      ]
    }
  ];
</script>

<div class="rounded-xl border border-border bg-secondary lg:col-span-3">
  <div class="relative grid w-full items-center gap-4 p-4 lg:grid-cols-3">
    <div class="flex h-full flex-col rounded-lg border border-border bg-background">
      <!-- Heading -->
      <div class="flex flex-row items-center px-4 py-3">
        <p class="text-base font-medium">SQL Editor</p>
        <Button
          class="relative ml-auto h-fit px-2.5 py-1.5 text-sm"
          id="border-button"
          onclick={regenerateLogs}
          disabled={isRegeneratingLogsTable}
        >
          {#if isRegeneratingLogsTable}
            <span in:scale={{ duration: 100 }}>
              <LoaderCircle class="size-6 animate-spin" />
            </span>
          {:else}
            <svg
              fill="none"
              class="size-8"
              in:scale={{ duration: 100 }}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M12.2013 8.30753C12.0607 9.21127 11.0356 9.85196 8.98535 11.1334C6.70868 12.5563 5.57034 13.2677 4.65804 12.9412C4.45376 12.8681 4.26273 12.7622 4.09245 12.6277C3.33203 12.0272 3.33203 10.6848 3.33203 8.00002C3.33203 5.31525 3.33203 3.97287 4.09245 3.37231C4.26273 3.23783 4.45376 3.13195 4.65804 3.05883C5.57034 2.73229 6.70868 3.44375 8.98535 4.86668C11.0356 6.14807 12.0607 6.78877 12.2013 7.69251C12.233 7.89629 12.233 8.10375 12.2013 8.30753Z"
                fill="currentColor"
              ></path></svg
            >
          {/if}
          Run
          <div
            class="border-button absolute -inset-1 rounded-lg border border-border after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:w-full after:-translate-x-1/2 after:-translate-y-1/2 after:animate-[button-gradient-animate_4s_linear_infinite] after:content-['']"
          ></div>
        </Button>
        <style>
          @keyframes button-gradient-animate {
            100% {
              transform: translate(-50%, -50%) rotate(1turn);
            }
          }
          .editor .keyword {
            @apply text-amber-600;
          }
          .editor .string {
            @apply text-blue-600;
          }

          .border-button {
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: add, add;
            mask-composite: xor;
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            transition: opacity 0.45s cubic-bezier(0.6, 0.6, 0, 1);
          }

          .border-button::after {
            background: conic-gradient(transparent 0%, hsl(var(--primary)) 15%, transparent 15.1%);
          }
        </style>
      </div>
      <!-- Editor -->
      <div class="flex h-fit grow flex-col border-t border-border p-4">
        <div class="editor my-auto whitespace-pre-wrap font-mono text-base">
          {#each slqQuery as line}
            <p>
              {#each line.children as child}
                <span class={child.class}>{child.text}</span>
              {/each}
            </p>
          {/each}
        </div>
      </div>
    </div>
    <!-- Table -->
    <div
      class="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-background lg:col-span-2"
    >
      <p class="px-4 py-1 text-base font-medium">Latest Logs</p>
      <div class="h-full grow border-t border-border px-4 py-1">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <td class="px-4 text-sm font-medium">ID</td>
              <td class="px-4 text-sm font-medium">Status</td>
              <td class="px-4 text-sm font-medium">Timestamp</td>
              <td class="px-4 text-sm font-medium">Message</td>
            </tr>
          </thead>
          <tbody>
            {#each tableLogs as log (log.id)}
              <tr animate:flip={{ duration: 300 }}>
                <td class="text-thin px-4 py-2 text-sm text-muted-foreground"
                  ><p class="line-clamp-2 lg:line-clamp-1">{log.id}</p></td
                >
                <td class="text-thin px-4 py-2 text-sm text-muted-foreground">
                  <LogLevel level={log.status} class="py-0.2 px-1 text-xs" />
                </td>
                <td class="text-thin px-4 py-2 text-sm text-muted-foreground"
                  ><p class="line-clamp-2 lg:line-clamp-1">{log.timestamp}</p></td
                >
                <td class="text-thin px-4 py-2 text-sm text-muted-foreground">
                  <p class="line-clamp-2 lg:line-clamp-1">{log.message}</p>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="p-6 pt-0">
    <span class="text-base font-medium text-neutral-700 dark:text-neutral-300">
      <Database class="inline size-[18px] align-middle" />
      Query your data ‒ your way.
    </span>
    <span class="text-base text-neutral-500"
      >Streamline your data analysis with our seamless SQL editor. Give everyone in your team the
      superpowers they need.</span
    >
  </div>
</div>
