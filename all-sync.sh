#!/bin/bash
for branch in `git branch -a | grep remotes/origin | grep -v HEAD | sed -e 's/remotes\/origin\///g'`; do
  git checkout $branch
  git pull origin $branch
  echo ".......................... Pull successful for origin/$branch"
  git push fork $branch
  echo ".......................... Push successful for fork/$branch"
done