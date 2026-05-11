import { getAllContent } from '@/lib/content';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from '@/lib/seo';

// RSS 2.0 + Atom 호환 피드. LLM 인덱서·RSS 리더·AGI가 신규 콘텐츠를 자동 발견하는 표준 채널.
export async function GET() {
  const items = getAllContent().filter(c => c.visibility === 'public').slice(0, 50);

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const xmlItems = items
    .map(c => {
      const url = `${SITE_URL}/${c.folder}/${c.id}`;
      const pubDate = new Date(c.date).toUTCString();
      return `    <item>
      <title>${escape(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(c.agi_summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${c.type}</category>
      ${(c.tags ?? []).map(t => `<category>${escape(t)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escape(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <managingEditor>noreply@jthong.io (${SITE_AUTHOR})</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    },
  });
}
