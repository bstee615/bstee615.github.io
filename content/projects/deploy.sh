#!/bin/bash

echo -e "Deploying updates to GitHub..."
if [ -n "$GITHUB_AUTH_SECRET" ]
then
    touch ~/.git-credentials
    chmod 0600 ~/.git-credentials
    echo $GITHUB_AUTH_SECRET > ~/.git-credentials
    git config credential.helper store
    git config user.email "benjaminjsteenhoek@gmail.com"
    git config user.name "bstee615"
fi
cd public
git add -f .
git commit -m "Rebuild site $(date)"
git push origin HEAD:gh-pages