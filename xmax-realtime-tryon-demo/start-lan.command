#!/bin/zsh
set -e
cd "${0:A:h}"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "已创建 .env，请先填写 XMAX_API_KEY 后重新运行。"
  open -e .env
  exit 0
fi

if [[ ! -f certs/lan-key.pem || ! -f certs/lan-cert.pem ]]; then
  echo "缺少可信 HTTPS 证书，请先运行 ./setup-lan-cert.command"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

demo_ip="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
if [[ -z "$demo_ip" ]]; then
  echo "未识别到内网 IP，请连接局域网后重试。"
  exit 1
fi

echo "同一局域网设备请访问：https://${demo_ip}:${PORT:-4300}"
LAN_HTTPS=1 npm run dev
