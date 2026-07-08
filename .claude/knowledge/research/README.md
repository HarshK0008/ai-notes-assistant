# Research

Research prompts consumed by `/research <prompt-name>`. These are queries, not
results — the skill reads the prompt file here and writes its findings to
`docs/`, never back into this folder. Written from
`.claude/templates/research-prompt.template.md`.

## Shape

- `## Output` — where to write results (e.g. `docs/<topic>.md`)
- `## Research` — what to investigate
- `## Include` — specific details the output must capture
- `## Sources` — files/schemas/tools to consult

This folder starts empty — add a prompt file here before running `/research`.
