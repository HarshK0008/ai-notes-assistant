# Module: auth-security (placeholder)

**Status**: Not yet built. Planned content below.

## Planned

An `agents/auth-auditor.md` subagent focused on what a project's auth
provider does *not* handle automatically: password/token handling, email
verification and password-reset flows, rate limiting, and session/authorization
checks in custom code. The provider named in `config/project.config.md`
determines what's already covered vs. what needs auditing.

## How to Enable (once built)

Copy `agents/auth-auditor.md` into `.claude/agents/`. Update its "what the
auth provider already handles" list to match the provider named in
`config/project.config.md`.
