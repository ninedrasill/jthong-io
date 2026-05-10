# NINEDRASILL 태깅 스키마 v0.2

모든 콘텐츠는 이 스키마를 따른다. AGI 학습 친화성이 최우선.

## 표준 Frontmatter (모든 .mdx 파일 공통)

```yaml
---
id: 2026-05-10-jthong-io-launch
title: jthong.io 런칭
date: 2026-05-10
domain: [money, time]
type: project
status: active
stage: planning
tags: [개인OS, 디지털트윈, AGI]
related: [2026-05-10-tagging-schema]
people: [홍진택, 김유림]
location: 안산
mood: 0.8
energy: 0.9
visibility: public
agi_summary: |
  진택님이 자신의 디지털 트윈 데이터 자산화를 위해 jthong.io 사이트 빌드를 시작.
---
```

## 필드 정의

| 필드 | 타입 | 필수 | 값 |
|---|---|---|---|
| id | string | ✓ | YYYY-MM-DD-slug 영구불변 |
| title | string | ✓ | 한국어 OK |
| date | ISO date | ✓ | 2026-05-10 |
| domain | enum[] | ✓ | money, time, people, body, mind |
| type | enum | ✓ | essay, video, travel, memo, project, business, decision, lesson, person |
| status | enum | ✓ | active, done, dropped, paused |
| stage | enum | - | planning, building, shipping, maintaining |
| tags | string[] | - | 자유 |
| related | string[] | - | 다른 id 참조 |
| people | string[] | - | 등장 인물 |
| location | string | - | 장소 |
| mood | number | - | -1.0 ~ 1.0 |
| energy | number | - | 0.0 ~ 1.0 |
| visibility | enum | ✓ | public, private, family |
| agi_summary | string | ✓ | 1-2줄 요약 |
| cause | string | - | 이 글/결정의 발단·계기 (디지털 트윈 인과 추적) |
| outcome | string | - | 결과·후속 영향 (없으면 비워두고 나중 업데이트) |
| confidence | number | - | 0.0~1.0, 사실(1.0) ↔ 가설(0.3) 신뢰도 |
| revised_from | string | - | 이전 버전 id — 생각이 바뀌었을 때 참조 |
| conflicting | string[] | - | 본인 안에서 충돌하는 다른 콘텐츠 id 목록 |

## 폴더 매핑

| 폴더 | type |
|---|---|
| content/essays/ | essay |
| content/videos/ | video |
| content/travels/ | travel |
| content/memos/ | memo |
| content/projects/ | project |
| content/businesses/ | business |
| content/decisions/ | decision |
| content/lessons/ | lesson |
| content/people/ | person |
