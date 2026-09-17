#!/bin/zsh
set -e
cd "${0:A:h}"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "已创建 .env，请先填写 XMAX_API_KEY 后重新运行。"
  open -e .env
  exit 0
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

open "http://localhost:${PORT:-4300}"
npm run dev
