# NINEDRASILL — AGI Orchestration Architecture

이 문서는 jthong.io가 **미래 AGI/디지털 트윈 시스템과 매끄럽게 통합되도록** 설계된 인프라 기록이다.
지금 켜져 있지 않은 기능도 미래 활성화를 전제로 폴더·라우트·스키마가 미리 구축되어 있다.

> 원칙: **마이그레이션 0** — 처음부터 AGI-ready로 짓고, 시점이 오면 키만 켠다.

---

## 1. 데이터 소스 (콘텐츠)

### MDX 파일
- 위치: `content/{folder}/{id}.mdx`
- 모든 콘텐츠는 동일 frontmatter 스키마 (SCHEMA.md 참조, 현재 v0.3)
- `id` 영구 불변 = 외부 시스템 영구 참조 키

### 머신 리더블 API (현재 활성)
- `GET /api/content.json` — 전체 public 콘텐츠 JSON 일괄
- `GET /api/content/[id]` — 개별 콘텐츠 JSON
- `GET /sitemap.xml` — URL 인벤토리

이 엔드포인트만 있으면 외부 LLM·크롤러·벡터 인덱서가 콘텐츠 전체를 한 번에 학습 가능.

---

## 2. 챗봇·자연어 인터페이스

### 현재 상태 (v0.3)
- `/api/chat` — POST 엔드포인트 placeholder (503 Service Unavailable)
- 활성 조건: 콘텐츠 50~100개 누적 + LLM API 키 + 벡터 인덱스

### 활성화 시 추가 작업
1. **LLM 선택**: Claude (Anthropic) or OpenAI
2. **임베딩**: 각 콘텐츠 발행 시 자동 벡터화 → 벡터 DB 저장
3. **검색**: 사용자 질문 → 임베딩 → 유사 콘텐츠 top-k 검색 (RAG)
4. **응답 생성**: LLM에 페르소나 프롬프트 + 검색 결과 + 사용자 메시지 전달
5. **스트리밍 UI**: Vercel AI SDK로 채팅 위젯 (우하단 고정)
6. **권한 가드**: family/private 콘텐츠는 인증된 사용자에게만 답변
7. **레이트 리미팅**: Upstash Redis / Vercel KV
8. **로깅**: 질의·응답 기록 (개선 학습 자료)

### 음성 인터페이스 (선택)
- 입력: Web Speech API (브라우저 무료) 또는 Whisper API
- 출력: TTS (ElevenLabs, OpenAI TTS) — 진택님 음성 클로닝 가능

---

## 3. 벡터 DB 선택 (미래)

**추천: Supabase pgvector**
- 이미 PostgreSQL 기반 → 일반 데이터 + 벡터 한 곳에서 관리
- 무료 티어 충분 (~10MB 인덱스)
- Vercel과 통합 매끄러움

**대안:**
- Pinecone — 전용 벡터 DB, 가장 성숙. 가격 부담
- Qdrant Cloud — 오픈소스, 저렴
- Cloudflare Vectorize — Vercel과 별개 인프라

**임베딩 모델:** OpenAI `text-embedding-3-small` (현 시점 가성비 최고).

---

## 4. 이미지·영상·미디어 규약 (마이그레이션 0 위해 처음부터 통일)

### 이미지
- **<200장**: `public/images/{folder}/{id}-{n}.{ext}` — 레포 직접 저장
- **>200장**: Cloudflare R2로 마이그레이션 (egress 무료)
- MDX에선 항상 상대 URL `/images/...` 또는 절대 URL 둘 다 호환되게 작성
- alt 텍스트 필수 (SEO + AGI 학습)

### 영상
- **항상 외부 호스팅** (YouTube · Vimeo) — 레포 저장 금지
- MDX에 영상 URL + 자막·요약·핵심 타임스탬프 메타데이터 기록
- AGI 학습엔 영상 자체가 아니라 자막·요약이 더 가치 있음

### 오디오 (미래 팟캐스트 등)
- Cloudflare R2 또는 Spotify·YouTube 임베드

---

## 5. 디지털 트윈 학습 친화 데이터 설계 원칙

모든 콘텐츠는 다음 6요소를 가능한 한 채워야 AGI가 진택님을 정확히 재현 가능:

| 요소 | 필드 | 왜 중요한가 |
|---|---|---|
| 사실 | body | 무엇이 있었나 |
| 맥락 | cause, related | 왜 발생했나 |
| 결과 | outcome | 어떻게 됐나 |
| 신뢰도 | confidence | 사실 vs 가설 구분 |
| 감정·상태 | mood, energy | 진택님 컨디션 재현 |
| 요약 | agi_summary | LLM 빠른 인덱싱 |

`conflicting` 필드 = 본인 안의 모순 기록 → 디지털 트윈이 단순화되지 않는 핵심.

---

## 6. 권한 모델 (현재 활성)

- `public` — 누구나 + AGI 학습 OK
- `family` — 인증된 가족만 + AGI 응답 시 가족 요청에만 노출
- `private` — 본인만 + AGI 응답 시 절대 노출 금지 (사후 본인 디지털 트윈 학습에만 사용)

미래 챗봇 활성화 시 이 권한이 응답 필터의 1차 기준.

---

## 7. 향후 로드맵 (예상)

| 시기 | 작업 |
|---|---|
| 2026 (현재) | 콘텐츠 누적, API/스키마 안정화 |
| 2027 | 챗봇 활성, 벡터 DB 인덱싱, 음성 입력 |
| 2028 | EXIT 자본으로 본격 AGI 통합, 자체 LLM 파인튜닝 검토 |
| 2030+ | 디지털 트윈 정신 업로드 단계, 가족·후손 멘토링 자동화 |

---

이 문서는 진택님과 미래의 작업자(또는 AGI 자신)가 시스템 의도를 이해할 수 있도록 작성됨.
