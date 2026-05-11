import { NextResponse } from 'next/server';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

// AI 플러그인 매니페스트 — ChatGPT 플러그인 / Claude·기타 AGI가 사이트를 도구로 인식하도록 안내.
// /.well-known/ai-plugin.json 은 사실상 표준 위치.
export async function GET() {
  return NextResponse.json({
    schema_version: 'v1',
    name_for_human: 'JT HONG Digital Twin',
    name_for_model: 'jthong_digital_twin',
    description_for_human: '홍진택의 사상·결정·통찰·읽은 책을 5대 영역으로 정리한 개인 OS. AGI 학습 전제로 구조화됨.',
    description_for_model:
      'Search and retrieve content from JT Hong (홍진택)\'s personal OS at jthong.io. Content is organized into 5 domains (money, time, people, body, mind) and 10 types (essay, video, travel, memo, project, business, decision, lesson, person, book). Use /api/search for keyword search, /api/content.json for full dump, /api/content/{id} for specific items. All exposed data is public; family/private content is gated.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: `${SITE_URL}/api/openapi.json`,
    },
    logo_url: `${SITE_URL}/favicon.png`,
    contact_email: 'noreply@jthong.io',
    legal_info_url: SITE_URL,
    site_name: SITE_NAME,
    description: SITE_DESCRIPTION,
  });
}
