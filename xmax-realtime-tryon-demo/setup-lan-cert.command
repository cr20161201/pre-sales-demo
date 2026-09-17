#!/bin/zsh
set -e
cd "${0:A:h}"

if ! command -v mkcert >/dev/null 2>&1; then
  echo "未找到 mkcert。请先安装并信任本地 CA："
  echo "  brew install mkcert"
  echo "  mkcert -install"
  echo "完成后重新运行本脚本。"
  exit 1
fi

demo_ip="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
if [[ -z "$demo_ip" ]]; then
  echo "未识别到内网 IP，请连接局域网后重试。"
  exit 1
fi

mkdir -p certs
mkcert -key-file certs/lan-key.pem -cert-file certs/lan-cert.pem localhost 127.0.0.1 "$demo_ip"
echo "证书已生成。手机或触控屏还需信任 mkcert 的根证书，摄像头权限才能稳定使用。"
