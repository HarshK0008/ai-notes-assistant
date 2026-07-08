# 0001 - Example: Choosing a Session Storage Strategy

## Status

Accepted

## Context

This is a placeholder ADR showing the expected shape — delete it once real
decisions are recorded. A real entry here would explain, for example, the
constraint that prompted picking between storing sessions in a database vs.
signed cookies for a given project.

## Decision

<Example>: Use database-backed sessions instead of stateless JWT cookies.

## Alternatives Considered

### Database-backed sessions

- **Pros**: Sessions can be revoked instantly; no token size limits.
- **Cons**: Requires a database round-trip per request; adds infrastructure dependency.

### Stateless JWT cookies

- **Pros**: No database lookup per request; simpler infrastructure.
- **Cons**: Cannot revoke a single session without a blocklist; token grows with claims.

## Consequences

Choosing database-backed sessions means every authenticated request costs one
extra query, but session revocation (logout everywhere, ban a user) becomes
trivial to implement correctly.
