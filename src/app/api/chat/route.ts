import { NextResponse } from 'next/server';

// 미래 AGI 챗봇 엔드포인트 (현재 비활성, 활성화 시 코드 채움).
//
// 활성화 시 동작:
// 1. 방문자 메시지 받음 (POST)
// 2. /api/content.json 또는 벡터 DB에서 관련 콘텐츠 검색 (RAG)
// 3. Claude API or OpenAI API에 진택님 페르소나 + 컨텍스트 전달
// 4. 응답 스트리밍 반환
//
// 활성 조건:
// - 콘텐츠 50~100개 누적 후
// - 벡터 DB 인덱싱 (Supabase pgvector 추천)
// - LLM API 키 환경변수 설정 (CLAUDE_API_KEY 또는 OPENAI_API_KEY)
// - 레이트 리미팅 (Upstash Redis 또는 Vercel KV)
// - 가족·비공개 콘텐츠 노출 차단 가드

export async function POST() {
  return NextResponse.json(
    {
      error: 'chat_disabled',
      message: '디지털 트윈 챗봇은 콘텐츠 누적 후 활성화됩니다. (예정: 2027)',
    },
    { status: 503 },
  );
}

export async function GET() {
  return NextResponse.json({
    status: 'placeholder',
    description: 'AGI chat endpoint — future activation pending content accumulation.',
    contracts: {
      request: {
        method: 'POST',
        body: { message: 'string', history: 'Array<{role,content}>' },
      },
      response: 'streaming text/event-stream',
    },
  });
}
