#!/bin/sh

curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/gatbsyjs/gatsby-source-wordpress-experimental/actions/workflows/wp-gatsby-pr.yml/dispatches \
  -d '{"ref":"chore/test-$GITHUB_REF", "inputs": { "version": $GITHUB_REF }}'
