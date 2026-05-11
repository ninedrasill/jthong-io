import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/seo';

// OpenAPI 3.1 명세 — AGI·ChatGPT·Claude·기타 LLM 도구가 API를 자동으로 이해/호출하도록.
export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'JT HONG Digital Twin API',
      version: '0.3.0',
      description: '홍진택(JT Hong)의 개인 OS / 디지털 트윈 콘텐츠 API. 5대 영역, 10개 콘텐츠 타입.',
      contact: { name: 'JT Hong', url: SITE_URL },
    },
    servers: [{ url: SITE_URL }],
    paths: {
      '/api/content.json': {
        get: {
          operationId: 'getAllContent',
          summary: '전체 public 콘텐츠 JSON 일괄 (RAG·임베딩용)',
          responses: { '200': { description: 'OK' } },
        },
      },
      '/api/content/{id}': {
        get: {
          operationId: 'getContentById',
          summary: '개별 콘텐츠 조회',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            '200': { description: 'OK' },
            '403': { description: '비공개 콘텐츠 (family/private)' },
            '404': { description: '없음' },
          },
        },
      },
      '/api/search': {
        get: {
          operationId: 'search',
          summary: '키워드 검색',
          parameters: [
            { name: 'q', in: 'query', schema: { type: 'string' }, description: '검색어' },
            {
              name: 'type', in: 'query', schema: { type: 'string' },
              description: 'essays|videos|travels|memos|projects|businesses|decisions|lessons|people|books',
            },
            {
              name: 'domain', in: 'query', schema: { type: 'string' },
              description: 'money|time|people|body|mind',
            },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
          ],
          responses: { '200': { description: 'OK' } },
        },
      },
      '/feed.xml': {
        get: {
          operationId: 'getFeed',
          summary: 'RSS 2.0 피드 (신규 콘텐츠 자동 발견)',
          responses: { '200': { description: 'application/rss+xml' } },
        },
      },
      '/llms.txt': {
        get: {
          operationId: 'getLlmsTxt',
          summary: 'LLM 크롤러 안내 (markdown index)',
          responses: { '200': { description: 'text/markdown' } },
        },
      },
      '/api/chat': {
        post: {
          operationId: 'chat',
          summary: '디지털 트윈 챗봇 (미래 활성, 현재 503)',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    history: { type: 'array', items: { type: 'object' } },
                  },
                  required: ['message'],
                },
              },
            },
          },
          responses: {
            '200': { description: 'streaming response' },
            '503': { description: '현재 비활성' },
          },
        },
      },
    },
  };
  return NextResponse.json(spec);
}
