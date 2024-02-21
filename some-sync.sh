#!/bin/bash
branches=(
  "db_schema"
  "iyan/rewrite-ranking"
  "iyan/rewrite-matchmaking"
  "answers"
  "iyan/rewrite-matchmaking-history"
  "iyan/rewrite-users-page"
  "profile-component"
  "reset-password"
)

for branch in "${branches[@]}"; do
  git checkout $branch
  git pull origin $branch
  echo ".......................... Pull successful for origin/$branch"
  git push fork $branch
  echo ".......................... Push successful for fork/$branch"
done