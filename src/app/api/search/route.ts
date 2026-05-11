import { NextResponse } from 'next/server';
import { getAllContent, type ContentMeta } from '@/lib/content';

// 키워드 검색 (제목·요약·본문·태그·도메인 매칭).
// 미래 벡터 시멘틱 검색으로 업그레이드 예정 (Phase C).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const type = url.searchParams.get('type');
  const domain = url.searchParams.get('domain');
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10) || 20, 100);

  let items = getAllContent().filter(c => c.visibility === 'public');

  if (type) items = items.filter(c => c.folder === type || c.type === type);
  if (domain) items = items.filter(c => c.domain.includes(domain as ContentMeta['domain'][number]));

  if (q) {
    const score = (c: ContentMeta): number => {
      let s = 0;
      if (c.title.toLowerCase().includes(q)) s += 10;
      if (c.agi_summary.toLowerCase().includes(q)) s += 5;
      if ((c.tags ?? []).some(t => t.toLowerCase().includes(q))) s += 4;
      if (c.body.toLowerCase().includes(q)) s += 2;
      if ((c.reflections ?? '').toLowerCase().includes(q)) s += 3;
      return s;
    };
    items = items
      .map(c => ({ c, s: score(c) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.c);
  }

  const results = items.slice(0, limit).map(c => ({
    id: c.id,
    title: c.title,
    date: c.date,
    type: c.type,
    domain: c.domain,
    agi_summary: c.agi_summary,
    url: `https://jthong.io/${c.folder}/${c.id}`,
  }));

  return NextResponse.json({
    query: q || null,
    filters: { type: type || null, domain: domain || null },
    count: results.length,
    results,
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
