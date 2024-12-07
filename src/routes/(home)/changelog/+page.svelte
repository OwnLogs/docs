<script lang="ts">
  import type { PageData } from './$types';
  import { format } from 'date-fns';
  import { pageMetadata } from '$lib/stores';
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import { CheckCheck, TriangleAlert, Star } from 'lucide-svelte';

  pageMetadata.set({
    title: 'Changelog',
    description:
      'We are constantly improving OwnLogs. Here you can find the latest updates and changes.',
    breadcrumbs: []
  });

  let { data }: { data: PageData } = $props();
  const { changeLog } = data;
</script>

<div class="mx-auto w-full max-w-screen-xl p-1">
  <div class="p-4">
    <h1 class="text-3xl font-bold">Changelog</h1>
    <div class="mt-4">
      {#each changeLog as { version, date, notes, fixes, breakingChanges, features }}
        <div class="grid grid-cols-1 gap-4 border-t border-border py-24 lg:grid-cols-4">
          <div class="flex flex-col">
            <time datetime={date} class="text-sm text-muted-foreground"
              >{format(date, 'MMMM do yyyy')}</time
            >
          </div>
          <div class="space-y-4 lg:col-span-3">
            <!-- Version number -->
            <h2 class="text-4xl font-bold">
              v{version}
            </h2>
            <!-- Notes -->
            {#if notes}
              <div class="space-y-2">
                {#each notes as note}
                  <p class="text-base font-medium">{@html note}</p>
                {/each}
              </div>
            {/if}

            <!-- Accordions -->
            {#if breakingChanges || features || fixes}
              <Accordion.Root type="single">
                <!-- Breaking changes -->
                {#if breakingChanges}
                  <Accordion.Item value="breakingChanges">
                    <Accordion.Trigger>
                      <div class="flex flex-row items-center gap-4">
                        <TriangleAlert class="size-6 text-red-600" />
                        Breaking changes
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each breakingChanges as change}
                          <p class="text-base font-normal">{@html change}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}

                <!-- Features -->
                {#if features}
                  <Accordion.Item value="features">
                    <Accordion.Trigger>
                      <div class="flex flex-row items-center gap-4">
                        <Star class="size-6 text-amber-600" />
                        Features
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each features as feature}
                          <p class="text-base font-normal">{@html feature}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}

                <!-- Fixes -->
                {#if fixes}
                  <Accordion.Item value="fixes">
                    <Accordion.Trigger>
                      <div class="flex flex-row items-center gap-4">
                        <CheckCheck class="size-6 text-green-600" />
                        Fixes
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div class="space-y-2">
                        {#each fixes as fix}
                          <p class="text-base font-normal">{@html fix}</p>
                        {/each}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                {/if}
              </Accordion.Root>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
