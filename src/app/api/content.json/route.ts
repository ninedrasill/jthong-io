import { NextResponse } from 'next/server';
import { getAllContent } from '@/lib/content';

// AGI/RAG-ready full content dump (public only).
// 미래 디지털 트윈 학습·오케스트레이션의 1차 데이터 소스.
export async function GET() {
  const items = getAllContent()
    .filter(c => c.visibility === 'public')
    .map(c => ({
      id: c.id,
      title: c.title,
      date: c.date,
      domain: c.domain,
      type: c.type,
      status: c.status,
      tags: c.tags ?? [],
      related: c.related ?? [],
      people: c.people ?? [],
      agi_summary: c.agi_summary,
      cause: c.cause ?? null,
      outcome: c.outcome ?? null,
      confidence: c.confidence ?? null,
      // book-specific
      author: c.author ?? null,
      genre: c.genre ?? null,
      importance: c.importance ?? null,
      reflections: c.reflections ?? null,
      reads: c.reads ?? null,
      // full text for embedding
      body: c.body,
      folder: c.folder,
      url: `https://jthong.io/${c.folder}/${c.id}`,
    }));

  return NextResponse.json({
    site: 'jthong.io',
    schema_version: '0.3',
    author: 'JT Hong (홍진택)',
    organization: 'NINEDRASILL GROUP PTE. LTD.',
    generated_at: new Date().toISOString(),
    count: items.length,
    items,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
