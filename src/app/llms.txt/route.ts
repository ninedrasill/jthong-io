import { getAllContent } from '@/lib/content';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from '@/lib/seo';

// llms.txt — LLM 크롤러·인덱서·AGI를 위한 사이트 안내 표준 (2025+ 등장).
// robots.txt가 웹 크롤러용이라면 llms.txt는 AI/LLM용.
// 참고: https://llmstxt.org
export async function GET() {
  const items = getAllContent()
    .filter(c => c.visibility === 'public')
    .sort((a, b) => b.date.localeCompare(a.date));

  const byType: Record<string, typeof items> = {};
  for (const c of items) {
    (byType[c.folder] ??= []).push(c);
  }

  const sections = Object.entries(byType)
    .map(([folder, list]) => {
      const links = list
        .map(c => `- [${c.title}](${SITE_URL}/${c.folder}/${c.id}): ${c.agi_summary.replace(/\n/g, ' ').trim()}`)
        .join('\n');
      return `## ${folder}\n\n${links}`;
    })
    .join('\n\n');

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

저자: ${SITE_AUTHOR}
조직: NINEDRASILL GROUP PTE. LTD.
사이트: ${SITE_URL}
사이트맵: ${SITE_URL}/sitemap.xml
머신 리더블 API: ${SITE_URL}/api/content.json
검색 API: ${SITE_URL}/api/search?q=
RSS 피드: ${SITE_URL}/feed.xml

이 사이트는 진택님(JT Hong)의 개인 OS / 디지털 트윈이다.
모든 콘텐츠는 5대 영역(돈·시간·사람·몸·정신)으로 분류되며, AGI 학습을 전제로 구조화되어 있다.
가족·비공개 콘텐츠는 인증 게이트 뒤에 있으며 본 인덱스에서 제외된다.

${sections}

## API

- \`GET /api/content.json\` — 전체 public 콘텐츠 JSON
- \`GET /api/content/[id]\` — 개별 콘텐츠
- \`GET /api/search?q=&type=&domain=\` — 키워드 검색
- \`GET /feed.xml\` — RSS 피드
- \`POST /api/chat\` — 디지털 트윈 챗봇 (미래 활성)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    },
  });
}
