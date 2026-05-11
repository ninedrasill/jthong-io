import { NextResponse } from 'next/server';
import { getById } from '@/lib/content';

// 개별 콘텐츠 머신 리더블 엔드포인트.
// 미래 AI 챗봇이 특정 글을 핀포인트로 가져갈 때 사용.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = getById(id);
  if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  if (item.visibility !== 'public') {
    return NextResponse.json({ error: 'not_public' }, { status: 403 });
  }
  return NextResponse.json({
    ...item,
    url: `https://jthong.io/${item.folder}/${item.id}`,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
