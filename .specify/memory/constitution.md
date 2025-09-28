# The Farang Forge Constitution

## Core Principles

### I. User-Centric Design (NON-NEGOTIABLE)
Every feature MUST prioritize user experience and value delivery. All components must be designed for the Thailand digital nomad community with clear user journeys, accessibility considerations, and mobile-first responsive design. User feedback loops are mandatory for all major features.

### II. Feature-First Architecture
Every major feature (Income, Visa, Living, Learning, Accommodation) MUST be self-contained with its own components, data, and business logic. Features must be independently testable, deployable, and maintainable. Clear feature boundaries prevent coupling and enable parallel development.

### III. Test-Driven Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. All user stories must have corresponding test scenarios. Integration tests required for cross-feature functionality.

### IV. Progressive Enhancement
The application MUST work for all user types (Guest, Free, Paid) with graceful degradation. Core functionality must be accessible to free users, with premium features clearly marked and properly gated. No feature should be completely locked behind paywalls without preview access.

### V. Thailand-Specific Localization
All content, features, and functionality MUST be specifically tailored for Thailand digital nomads. This includes visa information, accommodation options, income opportunities, and cultural considerations. Generic international content is not acceptable.

### VI. Performance & Scalability
Application MUST maintain sub-2-second load times on 3G connections. All images must be optimized, lazy-loaded, and responsive. Database queries must be efficient and cached appropriately. Mobile performance is prioritized over desktop.

### VII. Security & Privacy
User data MUST be protected with proper authentication, authorization, and data encryption. All external integrations (affiliate links, payment systems) must use secure protocols. User privacy is paramount - no unnecessary data collection.

## Technology Standards

### Frontend Requirements
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS with custom frosted glass theme
- React Router for navigation
- Radix UI for accessible components
- Responsive design (mobile-first)

### State Management
- React Context for global state (user, theme)
- Local state for component-specific data
- No external state management libraries unless justified

### Testing Requirements
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Minimum 80% code coverage for new features

### Code Quality
- ESLint + Prettier for code formatting
- TypeScript strict mode enabled
- No any types without justification
- Meaningful variable and function names
- Comprehensive JSDoc comments

## Feature Development Standards

### User Access Levels
- **Guest**: Preview access to roadmap, limited content
- **Free**: Full roadmap access, basic features, preview of premium content
- **Paid**: Complete access to all features, courses, and premium content

### Content Management
- All educational content must be structured with lessons, quizzes, and homework
- Progress tracking mandatory for all learning paths
- Achievement system for user engagement
- Regular content updates and maintenance

### Integration Requirements
- All external links must open in new tabs
- Affiliate links must be properly disclosed
- Payment integrations must be PCI compliant
- Analytics must respect user privacy preferences

## Development Workflow

### Feature Development Process
1. Create feature specification using `/specify` command
2. Clarify requirements using `/clarify` command
3. Generate implementation plan using `/plan` command
4. Create task list using `/tasks` command
5. Implement following TDD approach
6. Test across all user access levels
7. Deploy with proper monitoring

### Code Review Requirements
- All PRs must be reviewed by at least one team member
- Tests must pass before merge
- Performance impact must be assessed
- User experience must be validated
- Security implications must be reviewed

### Quality Gates
- No feature can be deployed without tests
- All user stories must have acceptance criteria
- Performance budgets must be maintained
- Accessibility standards must be met
- Mobile responsiveness must be verified

## Governance

This constitution supersedes all other practices. Amendments require:
- Documentation of the change rationale
- Impact assessment on existing features
- Migration plan for breaking changes
- Approval from project maintainers

All development must verify compliance with this constitution. Complexity must be justified with clear business value. Use the feature specifications and implementation plans as the source of truth for development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27