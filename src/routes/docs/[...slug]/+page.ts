import type { PageLoad } from './$types';
import { slugify } from '$lib/utils';
import { pageBySlug } from '$lib/pages';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const slug = slugify(params.slug);
  if (params.slug !== slug) throw redirect(303, `/docs/${slug}`);

  const page = await pageBySlug(slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });

  const component = pages[page.filePath];
  if (!component) error(404, 'Page not found');

  page.component = component.default;
  page.slug = slug;

  return page;
}) satisfies PageLoad;
