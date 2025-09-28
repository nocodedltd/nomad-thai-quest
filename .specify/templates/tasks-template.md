# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize TypeScript project with React and Vite dependencies
- [ ] T003 [P] Configure ESLint, Prettier, and code quality tools
- [ ] T004 [P] Set up Tailwind CSS with frosted glass theme
- [ ] T005 [P] Configure Jest and React Testing Library
- [ ] T006 [P] Set up Cypress for end-to-end testing

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T007 [P] Unit test user context in tests/unit/test_user_context.tsx
- [ ] T008 [P] Unit test theme context in tests/unit/test_theme_context.tsx
- [ ] T009 [P] Integration test user authentication flow in tests/integration/test_auth.tsx
- [ ] T010 [P] Integration test feature access control in tests/integration/test_access.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T011 [P] User context implementation in src/shared/contexts/user-context.tsx
- [ ] T012 [P] Theme context implementation in src/shared/contexts/theme-context.tsx
- [ ] T013 [P] Base UI components in src/shared/components/ui/
- [ ] T014 [P] Navigation component in src/shared/components/layout/navigation.tsx
- [ ] T015 [P] Paywall component in src/shared/components/paywall/paywall.tsx
- [ ] T016 [P] Main App component in src/app/App.tsx
- [ ] T017 [P] Router setup in src/app/main.tsx

## Phase 3.4: Integration
- [ ] T018 [P] Feature-specific components in src/features/[feature-name]/
- [ ] T019 [P] Page components in src/pages/
- [ ] T020 [P] External API integrations (affiliate links, content)
- [ ] T021 [P] Local storage integration for user data
- [ ] T022 [P] Performance optimization and lazy loading

## Phase 3.5: Polish
- [ ] T023 [P] Comprehensive unit test coverage (80% minimum)
- [ ] T024 [P] End-to-end tests for all user journeys
- [ ] T025 [P] Performance optimization and mobile testing
- [ ] T026 [P] Accessibility compliance testing
- [ ] T027 [P] Documentation updates and README

## Dependencies
- Tests (T007-T010) before implementation (T011-T017)
- T011 blocks T012, T018
- T016 blocks T018
- Implementation before polish (T023-T027)

## Parallel Example
```
# Launch T007-T010 together:
Task: "Unit test user context in tests/unit/test_user_context.tsx"
Task: "Unit test theme context in tests/unit/test_theme_context.tsx"
Task: "Integration test user authentication flow in tests/integration/test_auth.tsx"
Task: "Integration test feature access control in tests/integration/test_access.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task