import type { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/books/lifetime`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    ...['essays', 'videos', 'travels', 'memos', 'projects', 'businesses', 'decisions', 'lessons', 'people', 'books'].map(
      type => ({
        url: `${SITE_URL}/type/${type}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }),
    ),
    ...['money', 'time', 'people', 'body', 'mind'].map(domain => ({
      url: `${SITE_URL}/domain/${domain}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  const contentRoutes: MetadataRoute.Sitemap = getAllContent()
    .filter(c => c.visibility === 'public')
    .map(c => ({
      url: `${SITE_URL}/${c.folder}/${c.id}`,
      lastModified: new Date(c.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...contentRoutes];
}
