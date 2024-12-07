import type { PageServerLoad } from './$types';
import { pages } from '$conf';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  const docsHomePage = pages.filter((page) => !page?.children)[0];

  throw redirect(303, `/docs/${docsHomePage.name}`);
}) satisfies PageServerLoad;
