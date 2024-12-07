import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export const pageMetadata: Writable<{
  title: string;
  description: string;
}> = writable({
  title: '',
  description: ''
});
