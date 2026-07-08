# Test Action

1. Read current-feature.md to understand what was implemented
2. Identify the functions/modules added or modified for this feature
3. Check if tests already exist for these functions
4. For code without tests that has testable logic, write tests:
   - Use the test runner(s) named in @.claude/config/project.config.md
   - Follow the Testing Policy in @.claude/config/project.config.md (what's required, when E2E is warranted)
   - Test happy path and error cases; do not write tests just to write them
5. Run the project's test command and verify all tests pass
6. Report test coverage for the new feature code
