import type { PageLoad } from './$types';

export const load = (async () => {
  interface Release {
    version: string;
    date: string;
    notes?: string[];
    breakingChanges?: string[];
    fixes?: string[];
    features?: string[];
  }
  const changeLog: Release[] = [
    {
      version: '1.0.0',
      date: '2021-07-01',
      notes: ['Initial release'],
      breakingChanges: ['Changed interface for the JS package'],
      features: ['Added a new page'],
      fixes: ['Fixed a bug']
    },
    {
      version: '1.0.0',
      date: '2021-07-01',
      notes: ['Initial release'],
      breakingChanges: ['Changed interface for the JS package'],
      features: ['Added a new page'],
      fixes: ['Fixed a bug']
    },
    {
      version: '1.0.0',
      date: '2021-07-01',
      notes: ['Initial release'],
      breakingChanges: ['Changed interface for the JS package'],
      features: ['Added a new page'],
      fixes: ['Fixed a bug']
    }
  ];
  return { changeLog };
}) satisfies PageLoad;
