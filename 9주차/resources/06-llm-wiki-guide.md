# LLM Wiki 기반 본인 암묵지 운영 가이드

가산점 항목 C (+3점)에 해당.

## 왜 만드는가

- 같은 실수를 반복하지 않기 위해
- 잘 통한 패턴을 잊지 않기 위해
- **다음 프로젝트, 다음 회사에서 본인의 자산이 되기 위해**

## 어디에 만드는가

| 옵션 | 장점 | 단점 |
|---|---|---|
| GitHub private repo | 검색·버전관리 가능 | 셋업 필요 |
| Obsidian / Logseq vault | 로컬, 빠름 | 동기화 직접 |
| Notion / Bear | UI 좋음 | 검색·이식성 약함 |

> 어떤 도구든 좋습니다. **꾸준히 쌓고 있다는 사실**이 중요.

## 권장 카테고리 (예시)

```
my-llm-wiki/
├── prompts/
│   ├── good-patterns.md       # 잘 먹힌 프롬프트
│   └── failed-prompts.md      # 안 먹힌 이유와 함께
├── tools/
│   ├── copilot-tips.md
│   ├── claude-code-tips.md
│   └── cursor-tips.md
├── lessons/
│   ├── 2026-04-shader-bug.md  # 사례 단위 로그
│   └── 2026-04-rep-penalty.md
├── references/
│   ├── anthropic-docs.md      # 공식 문서 정리
│   ├── openai-cookbook.md
│   └── github-copilot-wiki.md
└── README.md
```

## 좋은 항목의 형식

```markdown
# [짧은 제목]

## 상황
- 무엇을 하려고 했는가

## 시도한 것
- 1차: ...
- 2차: ...

## 결론
- 무엇이 통했고 / 안 통했는가
- 왜 그랬는가

## 다음에 할 일
- 한 줄 액션
```

## 가산점 인정 기준

- 최소 **10개 이상 항목**
- 최근 6개월 이내 갱신 흔적 (커밋 로그 또는 수정 시각)
- 최신 LLM 관련 출처에서 **인용·정리한 흔적**
- 본인의 **실제 작업과 연결된 사례**가 최소 3개

## 추천 출처

- Anthropic Docs / Claude Engineering Blog
- OpenAI Cookbook
- GitHub Copilot 공식 문서 / Wiki
- Cursor / Windsurf / Antigravity 공식 문서
- 깃허브 트렌딩의 AI Agent 관련 신규 리포지토리
