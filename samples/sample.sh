#!/usr/bin/env bash
set -euo pipefail
NAME="gray-dp"
if [[ -z "$1" ]]; then
  echo "Building ${NAME}" | tee build.log
fi
for f in *.json; do cat "$f"; done
