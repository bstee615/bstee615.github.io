---
title: "Auto-Syncing Upstream Periodically to a Fork for Open-Source Contribution"
description: "When using a fork to contribute to an open-source repo, it's useful for the fork's main branch to stay up to date with the upstream repository's main branch. For example, I contribute to VS Code, which merges hundreds of pull requests per week."
date: 2026-07-01
kind: blog
---

When using a [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) to contribute to an open-source repo, it's useful for the fork's `main` branch to stay up to date with the upstream repository's `main` branch. For example, I contribute to [VS Code](https://github.com/microsoft/vscode), which merges hundreds of pull requests per week.

## Problem: the fork's `main` branch should stay clean to avoid polluting upstream PRs

- no fork-only commits
- no merge commits from upstream
- no workflow files that would make the branch differ from upstream

The goal is that every feature branch can be created from the fork's `main` branch and produce a clean PR against upstream.

A [GitHub scheduled workflow](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) could periodically sync the fork with upstream. The tricky part is that GitHub scheduled workflows only run from the default branch of the repository. If the sync workflow is committed to the fork's `main` branch, then `main` is no longer identical to upstream.

## Solution: use a separate maintenance repository to host the scheduled workflow

For example:

- upstream repository: `widget-company/widgets`
- my fork: `bstee615/widgets`
- maintenance repository: `bstee615/fork-maintenance`

The maintenance repository contains the GitHub Actions workflow. The fork repository's `main` branch remains a clean tracking branch for upstream.

### Workflow

The workflow should:

1. Run on a schedule and via manual dispatch.
2. Clone the fork repository's `main` branch.
3. Add the upstream repository as a remote.
4. Fetch both `origin/main` and `upstream/main`.
5. Check whether the fork is already up to date.
6. Check whether the fork can be fast-forwarded.
7. Refuse to continue if the fork's `main` branch has diverged.
8. Run `git merge --ff-only upstream/main`.
9. Push the updated `main` branch back to the fork.

The important invariant is `--ff-only`. The workflow must never create a merge commit and must never force-push.

### Example Workflow

<!-- prettier-ignore -->
```yaml
name: Sync fork main

on:
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

concurrency:
  group: sync-fork-main
  cancel-in-progress: false

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Fast-forward fork main from upstream
        env:
          GH_TOKEN: ${{ secrets.WIDGETS_SYNC_TOKEN }}
        run: |
          set -euo pipefail

          git clone --branch main "https://x-access-token:${GH_TOKEN}@github.com/my-user/project.git" project
          cd project

          git remote add upstream https://github.com/upstream-owner/project.git
          git fetch origin main
          git fetch upstream main

          origin_sha="$(git rev-parse origin/main)"
          upstream_sha="$(git rev-parse upstream/main)"
          merge_base="$(git merge-base origin/main upstream/main)"

          if [ "$origin_sha" = "$upstream_sha" ]; then
            echo "Fork main is already up to date."
            exit 0
          fi

          if [ "$merge_base" != "$origin_sha" ]; then
            echo "::error::Fork main has diverged from upstream main. Refusing to merge or force-push."
            exit 1
          fi

          git checkout main
          git merge --ff-only upstream/main
          git push origin main
```

### Token Scope

The maintenance repository needs a secret containing a token that can push to the fork repository.

Use a fine-grained personal access token scoped only to the fork repository:

- Repository access: only the fork repository
- Contents: read and write
- Metadata: read-only, automatically included

Store it as a secret in the maintenance repository, for example:

```bash
gh secret set WIDGETS_SYNC_TOKEN --repo my-user/fork-maintenance
```

The token does not need access to the upstream repository if the upstream repository is public.

## Why Not Use GitHub's Fork Sync API?

GitHub has a fork sync API and `gh repo sync`, but those mechanisms can perform a merge when a fast-forward is not possible.

For a fork `main` branch that is intended to stay clean for pull request work, explicit Git commands are safer:

- `git merge --ff-only` preserves linear history.
- A divergence fails loudly instead of being repaired automatically.
- No force-push is used.

This keeps the fork's `main` branch as a safe base for new pull request branches.
