# Complete Action

1. Stage all changes and commit with a descriptive message, following the commit
   conventions and AI-attribution rule in @.claude/config/project.config.md
2. Check the **Merge strategy** and **Release mechanism** in
   @.claude/config/project.config.md and follow whichever this project uses:
   - **push-per-branch**: push the feature branch to origin; if the release
     mechanism is "pull request," stop here and open one instead of merging locally.
   - **single-merged-push-to-main**: switch to main, merge the feature branch
     locally (no push yet), delete the local feature branch, then push main to
     origin once with everything included.
3. Delete the feature branch (locally, and from origin if it was previously pushed —
   skip this if a pull request is still open)
4. Reset current-feature.md:
   - Change H1 back to `# Current Feature`
   - Clear Goals and Notes sections (keep placeholder comments)
   - Add feature summary to the END of History
5. Commit the reset: `chore: reset current-feature.md after completing [feature]`

Do not guess the merge strategy — if `project.config.md` doesn't specify one, ask before proceeding.
