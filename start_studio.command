#!/bin/bash
cd "$(dirname "$0")"

echo "============================================================"
echo "  🎨 ことばずかん - Draw Things Studio サーバー"
echo "============================================================"
echo ""
echo " 🌐 スタジオ＆レビュー画面を開きます:"
echo "    http://127.0.0.1:8085/kotoba_zukan/review.html"
echo ""
echo " ※ 終了するときは、このターミナルを閉じるか Ctrl + C を押してください"
echo "============================================================"
echo ""

# ブラウザを自動で開く
sleep 1 && open "http://127.0.0.1:8085/kotoba_zukan/review.html" &

# サーバー起動
python3 kotoba_zukan/scripts/dt_studio.py
