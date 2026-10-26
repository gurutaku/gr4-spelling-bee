#!/usr/bin/env bash
set -Eeuo pipefail

npx javascript-obfuscator words.js --output words.secured.js \
  --compact true \
  --control-flow-flattening false \
  --dead-code-injection false \
  --string-array true \
  --string-array-encoding 'none'