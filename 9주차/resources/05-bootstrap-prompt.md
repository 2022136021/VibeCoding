# AI Agent 부트스트랩 프롬프트

본 폴더의 권장 문서 스캐폴드(`04-doc-scaffold.md`)를 **AI Agent로 자동 생성**하기 위한 프롬프트 모음.

## 0. 사전 준비

- 빈 GitHub 리포지토리 1개 생성
- 로컬에 클론
- 워크스페이스 루트에 `AUTHORING.{본인이름}.v0.1.0.md` 작성 (가산점 B를 노릴 경우)
- AI Agent (GitHub Copilot / Claude Code / Cursor 등) 활성화

## 1. 1단계 — 비전·기획 생성

```
나는 [한 줄 주제]를 만들고 싶다. 다음을 수행해줘.

1) 이 프로젝트의 비전과 목표를 .planning/00-vision.md에 작성
2) 핵심 사용자 시나리오 3개를 .planning/01-requirements.md에 작성
3) 기능을 MoSCoW(Must/Should/Could/Won't)로 분류
4) 모호한 부분은 나에게 선택형 질문으로 물어본 후 작성

플랫폼은 모바일 앱(Flutter/React Native/네이티브 중 추천 1개와 이유)을 제안해.
```

## 2. 2단계 — WBS·일정 생성

```
.planning/00-vision.md 와 .planning/01-requirements.md 를 읽고

1) WBS를 .planning/02-wbs.md에 만들어줘 (3단계 깊이까지)
2) 6주(10주차~14주차) 일정을 .planning/04-schedule.md에 작성
   - 각 주차별 목표, 산출물, 검증 방법 명시
   - 12주차에 중간 발표가 있고, 15주차가 최종 발표임을 반영
3) 위험 요소 5개와 대응 방안을 함께 작성
```

## 3. 3단계 — 설계 생성

```
요구사항을 기반으로
1) .planning/03-architecture.md 에 시스템 아키텍처 작성
   - Mermaid 다이어그램 포함
   - 주요 모듈/레이어 설명
2) docs/architecture.md 에 사람이 읽는 버전으로 다시 작성
3) 핵심 의사결정은 .planning/decisions/ADR-NNNN-*.md 로 분리
```

## 4. 4단계 — 환경/배포/테스트 문서 생성

```
프로젝트의 기술 스택을 기준으로
1) docs/setup.md   — zero에서 run까지 (운영체제별 명령 포함)
2) docs/deploy.md  — 빌드와 배포의 모든 단계
3) docs/testing.md — 테스트 작성 규약과 실행 명령

각 문서는 신입 개발자가 5분 안에 따라할 수 있도록 작성.
```

## 5. 5단계 — 에이전트 운영 문서 생성

```
AUTHORING.{본인이름}.v0.1.0.md 를 읽고
이 프로젝트의 AGENTS.md 를 생성해줘.

만약 도메인 고유 규칙이 필요하면 SPECS.md 도 함께 만들고,
필요한 서브에이전트(.github/agents/*.agent.md)와
슬래시 명령(.github/prompts/*.prompt.md)을 카탈로그에서 골라 설치해줘.
```

## 6. 6단계 — 발표 자료 자동 생성

```
.planning/ 와 docs/ 의 내용을 기반으로
docs/presentation/interim.md (중간 발표)를 Marp 형식으로 작성해줘.

- 청중: 동료 개발자
- 시간: 7분
- 구성: 문제정의 → 접근 → 진행상황 → 데모(영상/스크린샷) → 다음 단계
- 데모 시연이 가능한 부분은 명시
```

최종 발표용도 동일하게:

```
docs/presentation/final.md 를 Marp 형식으로 작성해줘.
- 시간: 12분
- 구성: 문제 → 솔루션 → 아키텍처 → 데모 → 회고 → 향후
- "개발자 기본 소양" Q&A 대비 백업 슬라이드 5장 포함
```

## 주의 — 절대 잊지 말 것

> AI Agent가 만든 모든 문서는 **본인이 처음부터 끝까지 읽고**
> 이해되지 않는 부분은 **다시 물어서 본인의 언어로 정리**해야 합니다.
>
> 발표/Q&A에서 "AI가 그렇게 했어요"는 답이 되지 않습니다.
