#!/bin/bash
cd "$(dirname "$0")"

# ルート階層または当ディレクトリの判定
if [ -f "youtube_360_viewer/index.html" ]; then
  ROOT_DIR="."
  VIEWER_PATH="youtube_360_viewer/"
elif [ -f "index.html" ]; then
  ROOT_DIR=".."
  VIEWER_PATH="youtube_360_viewer/"
fi

cd "$ROOT_DIR" || exit 1

IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "127.0.0.1")

echo "============================================================"
echo "  🎬 YouTube 360° Viewer ローカルサーバー"
echo "============================================================"
echo ""
echo " 💻 Macで開く:"
echo "    http://localhost:8000/youtube_360_viewer/"
echo ""
echo " 📱 iPadで開く (同じWi-Fiに接続してください):"
echo "    http://${IP}:8000/youtube_360_viewer/"
echo ""
echo " ※ 終了するときは、このターミナルを閉じるか Ctrl + C を押してください"
echo "============================================================"
echo ""

# Macのデフォルトブラウザで自動で開く
sleep 1 && open "http://localhost:8000/youtube_360_viewer/" &

python3 -m http.server 8000

