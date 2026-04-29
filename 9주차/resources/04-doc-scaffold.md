# 프로젝트 문서 스캐폴드 권장 트리

> 이 트리는 **AI Agent에게 자동 생성을 시키는 것**을 권장합니다.
> 손으로 만들지 말고, 부트스트랩 프롬프트(`05-bootstrap-prompt.md`)를 사용하세요.

## 권장 디렉토리 구조

```
my-project/
├── AGENTS.md                         # 에이전트 운영 헌법 (자동 로드)
├── SPECS.md                          # 도메인 고유 규칙 (선택)
├── AUTHORING.{본인이름}.v{버전}.md   # 본인만의 부트스트랩 (가산점 B)
├── README.md                         # 프로젝트 설명, 빌드/실행
├── BONUS.md                          # 가산점 신청 정리
│
├── .github/
│   ├── agents/                       # 서브에이전트 정의
│   │   ├── feasibility-researcher.agent.md
│   │   ├── implementation-planner.agent.md
│   │   ├── code-reviewer.agent.md
│   │   └── test-writer.agent.md
│   ├── prompts/                      # 슬래시 명령 템플릿
│   │   ├── spec.prompt.md
│   │   ├── plan.prompt.md
│   │   ├── implement.prompt.md
│   │   └── retro.prompt.md
│   ├── instructions/                 # applyTo 패턴별 자동 컨텍스트
│   │   └── *.instructions.md
│   ├── skills/                       # 재사용 가능한 절차적 노하우
│   │   └── */SKILL.md
│   └── chatmodes/                    # 특수 채팅 모드 (선택)
│
├── .planning/                        # AI Agent 산출 계획·로그
│   ├── 00-vision.md
│   ├── 01-requirements.md
│   ├── 02-wbs.md
│   ├── 03-architecture.md
│   ├── 04-schedule.md
│   └── decisions/
│       └── ADR-NNNN-*.md
│
├── docs/                             # 사람이 읽는 문서
│   ├── architecture.md
│   ├── setup.md                      # 환경 설정 (zero → run)
│   ├── deploy.md                     # 빌드/배포
│   ├── testing.md                    # 테스트 작성/실행
│   └── presentation/                 # 발표 자료
│       ├── interim.md                # 중간 발표
│       └── final.md                  # 최종 발표
│
├── src/                              # 실제 코드 (플랫폼별 상이)
├── test/                             # 테스트 코드
└── .gitignore
```

## 각 문서의 역할 요약

| 파일 | 역할 |
|---|---|
| `AGENTS.md` | 에이전트가 매 턴 자동 참조하는 헌법 |
| `SPECS.md` | 이 프로젝트만의 도메인 규칙 |
| `.planning/` | AI Agent가 생성하는 계획 산출물 |
| `docs/setup.md` | 새 사람이 와서 5분 안에 실행 가능하도록 |
| `docs/deploy.md` | 발표 Q&A 답변용 핵심 자료 |
| `docs/testing.md` | 테스트 명령 한 줄로 정리 |
| `docs/presentation/` | 중간/최종 발표 자료 |

## "개발자 기본 소양" 평가와의 매칭

발표 Q&A에서 받게 될 질문 → 답이 미리 정리된 문서:

- "환경 설정은 어떻게 하나요?" → `docs/setup.md`
- "빌드/배포는?" → `docs/deploy.md`
- "테스트는 어떻게 돌리나요?" → `docs/testing.md`
- "구조는 어떻게 되나요?" → `docs/architecture.md`
- "왜 이 기술을 선택했나요?" → `.planning/decisions/ADR-*.md`

> **모든 문서는 AI Agent가 작성**할 수 있습니다.
> 단, **본인이 읽고 이해**한 후에야 발표할 자격이 있습니다.
