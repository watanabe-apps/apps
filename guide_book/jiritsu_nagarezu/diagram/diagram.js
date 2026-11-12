// =============================================================================
// 自立活動 課題関連図 ロジック (diagram.js) - ③抽出課題・タグ認識修正版
// =============================================================================

const CATEGORY_MAP = {
  "kenkou": { code: "健", name: "健康の保持", tagClass: "tag-kenkou" },
  "shinri": { code: "心", name: "心理的な安定", tagClass: "tag-shinri" },
  "ningen": { code: "人", name: "人間関係の形成", tagClass: "tag-ningen" },
  "kankyou": { code: "環", name: "環境の把握", tagClass: "tag-kankyou" },
  "shintai": { code: "身", name: "身体の動き", tagClass: "tag-shintai" },
  "comm":   { code: "コ", name: "コミュニケーション", tagClass: "tag-comm" },
  "none":   { code: "未", name: "区分未設定", tagClass: "tag-step2_2" }
};

document.addEventListener("DOMContentLoaded", () => {
  let cards = [];
  let links = [];
  let currentToolMode = "solid"; // solid, dashed, bidirectional, delete-line
  let connectingSourceNode = null;

  const cardCanvas = document.getElementById("cardCanvas");
  const svgLayer = document.getElementById("diagramSvgLayer");
  const workspaceContainer = document.getElementById("workspaceContainer");
  const studentNameBadge = document.getElementById("studentNameBadge");
  const cardToggleList = document.getElementById("cardToggleList");

  // 1. データ読み込み
  const rawSource = localStorage.getItem("jiritsu_diagram_source_data");
  let sourceObj = { studentName: "児童生徒", data: {} };
  if (rawSource) {
    try {
      sourceObj = JSON.parse(rawSource);
    } catch (e) {
      console.error(e);
    }
  }

  studentNameBadge.textContent = sourceObj.studentName || "児童生徒";

  // ③ 抽出した課題からカードを生成
  initCardsFromStep3(sourceObj);
  loadSavedDiagramLayout();
  renderAllCards();
  redrawAllDiagramLines();
  renderSidebarToggles();

  // 2. ツールバー操作
  document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentToolMode = btn.getAttribute("data-mode");
      if (workspaceContainer) {
        workspaceContainer.classList.toggle("mode-delete-line", currentToolMode === "delete-line");
      }
      resetConnectingState();
    });
  });

  document.getElementById("btnToggleSidebar").addEventListener("click", () => {
    document.getElementById("diagramSidebar").classList.toggle("open");
  });

  document.getElementById("btnCloseSidebar").addEventListener("click", () => {
    document.getElementById("diagramSidebar").classList.remove("open");
  });

  document.getElementById("btnResetLayout").addEventListener("click", () => {
    if (confirm("カードの配置を初期位置に自動整列しますか？")) {
      autoLayoutCards();
      renderAllCards();
      redrawAllDiagramLines();
      saveDiagramLayout();
    }
  });

  document.getElementById("btnAddCustomCard").addEventListener("click", () => {
    const text = prompt("追加する課題内容を入力してください:");
    if (!text) return;
    const parsed = parseCategoryFromText(text);
    const newCard = {
      id: "custom_" + Date.now(),
      category: parsed.categoryKey,
      text: parsed.cleanText,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      visible: true
    };
    cards.push(newCard);
    renderAllCards();
    renderSidebarToggles();
    saveDiagramLayout();
  });

  document.getElementById("btnPrintDiagram").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("btnCloseDiagram").addEventListener("click", () => {
    window.close();
  });

  // 3. ③のテキスト解析とカード生成
  function initCardsFromStep3(source) {
    cards = [];
    if (!source) return;

    // app.js から渡される step3Text または data.step3 のいずれからでも取得可能にする
    const step3Text = source.step3Text || source.data?.step3 || "";
    if (!step3Text.trim()) return;

    const lines = step3Text.split("\n")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    lines.forEach((line, idx) => {
      const parsed = parseCategoryFromText(line);
      cards.push({
        id: `step3_${idx}`,
        category: parsed.categoryKey,
        text: parsed.cleanText,
        x: 40 + (idx % 3) * 280,
        y: 40 + Math.floor(idx / 3) * 160,
        visible: true
      });
    });
  }

  // 全角・半角・文頭「・」・文頭/文末の区分タグを正確に抽出
  function parseCategoryFromText(rawText) {
    let text = rawText.trim();
    let categoryKey = "none";

    // 箇条書き記号（・やハイフン、アスタリスク等）を文頭から一時除去してトリム
    text = text.replace(/^[・\-\*・\s]+/, "").trim();

    // 全角・半角の括弧（ ( [ ［ 【 等に対応
    const tagRegex = /[（(【\[［](健|心|人|環|身|コ)[）)】\]］]/g;
    let match;
    let foundTag = null;

    while ((match = tagRegex.exec(text)) !== null) {
      foundTag = match[1];
    }

    if (foundTag) {
      const charMap = {
        "健": "kenkou",
        "心": "shinri",
        "人": "ningen",
        "環": "kankyou",
        "身": "shintai",
        "コ": "comm"
      };
      categoryKey = charMap[foundTag] || "none";
      // テキストからタグ部分を除去してカード本文を綺麗にする
      text = text.replace(tagRegex, "").trim();
    }

    // 末尾や文頭に残った不要な記号・空白の整理
    text = text.replace(/^[・\-\*・\s]+/, "").trim();

    return { categoryKey, cleanText: text };
  }

  // 自動整列
  function autoLayoutCards() {
    cards.forEach((c, idx) => {
      c.x = 40 + (idx % 3) * 280;
      c.y = 40 + Math.floor(idx / 3) * 160;
    });
  }

  // 4. カードの描画
  function renderAllCards() {
    cardCanvas.innerHTML = "";

    cards.forEach(card => {
      if (!card.visible) return;

      const catInfo = CATEGORY_MAP[card.category] || CATEGORY_MAP["none"];

      const el = document.createElement("div");
      el.className = "diagram-card";
      el.id = `card_${card.id}`;
      el.style.left = `${card.x}px`;
      el.style.top = `${card.y}px`;

      let selectHtml = `<select class="card-category-select ${catInfo.tagClass}" data-card-id="${card.id}">`;
      Object.keys(CATEGORY_MAP).forEach(k => {
        const item = CATEGORY_MAP[k];
        selectHtml += `<option value="${k}" ${card.category === k ? "selected" : ""}>${item.code}：${item.name}</option>`;
      });
      selectHtml += `</select>`;

      el.innerHTML = `
        <div class="card-header">
          ${selectHtml}
          <button type="button" class="btn-card-hide" title="このカードを非表示">✕</button>
        </div>
        <div class="card-body">${escapeHTML(card.text)}</div>
        <div class="card-connect-handle handle-top" data-anchor="top" title="上から結線"></div>
        <div class="card-connect-handle handle-bottom" data-anchor="bottom" title="下から結線"></div>
        <div class="card-connect-handle handle-left" data-anchor="left" title="左から結線"></div>
        <div class="card-connect-handle handle-right" data-anchor="right" title="右から結線"></div>
      `;

      setupCardDrag(el, card);

      const selectEl = el.querySelector(".card-category-select");
      selectEl.addEventListener("change", (e) => {
        card.category = e.target.value;
        renderAllCards();
        renderSidebarToggles();
        saveDiagramLayout();
      });

      el.querySelector(".btn-card-hide").addEventListener("click", (e) => {
        e.stopPropagation();
        card.visible = false;
        renderAllCards();
        renderSidebarToggles();
        redrawAllDiagramLines();
        saveDiagramLayout();
      });

      el.querySelectorAll(".card-connect-handle").forEach(handle => {
        handle.addEventListener("click", (e) => {
          e.stopPropagation();
          const anchor = handle.getAttribute("data-anchor");
          handleConnectClick(card.id, anchor);
        });
      });

      cardCanvas.appendChild(el);
    });
  }

  // カードドラッグ
  function setupCardDrag(el, card) {
    let startX, startY, initialLeft, initialTop;

    el.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("card-connect-handle") ||
        e.target.classList.contains("btn-card-hide") ||
        e.target.classList.contains("card-category-select")
      ) return;

      startX = e.clientX;
      startY = e.clientY;
      initialLeft = card.x;
      initialTop = card.y;

      const onMouseMove = (ev) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        card.x = Math.max(0, initialLeft + dx);
        card.y = Math.max(0, initialTop + dy);
        el.style.left = `${card.x}px`;
        el.style.top = `${card.y}px`;
        redrawAllDiagramLines();
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        saveDiagramLayout();
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  // 5. 結線処理
  function handleConnectClick(cardId, anchor) {
    if (currentToolMode === "delete-line") return;

    if (!connectingSourceNode) {
      connectingSourceNode = { cardId, anchor };
      const sourceCardEl = document.getElementById(`card_${cardId}`);
      if (sourceCardEl) sourceCardEl.classList.add("selected-source");
      return;
    }

    if (connectingSourceNode.cardId === cardId) {
      resetConnectingState();
      return;
    }

    const newLink = {
      id: `link_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      fromCard: connectingSourceNode.cardId,
      fromAnchor: connectingSourceNode.anchor,
      toCard: cardId,
      toAnchor: anchor,
      type: currentToolMode
    };

    links.push(newLink);
    resetConnectingState();
    redrawAllDiagramLines();
    saveDiagramLayout();
  }

  function resetConnectingState() {
    connectingSourceNode = null;
    document.querySelectorAll(".diagram-card").forEach(c => c.classList.remove("selected-source"));
  }

  // 6. SVGライン描画
  function redrawAllDiagramLines() {
    svgLayer.querySelectorAll(".diagram-link-group, .diagram-link").forEach(el => el.remove());

    links.forEach(link => {
      const fromCard = cards.find(c => c.id === link.fromCard);
      const toCard = cards.find(c => c.id === link.toCard);

      if (!fromCard || !toCard || !fromCard.visible || !toCard.visible) return;

      const fromEl = document.getElementById(`card_${link.fromCard}`);
      const toEl = document.getElementById(`card_${link.toCard}`);
      if (!fromEl || !toEl) return;

      const p1 = getAnchorCoordinate(fromEl, link.fromAnchor);
      const p2 = getAnchorCoordinate(toEl, link.toAnchor);
      const d = createCurvedPath(p1.x, p1.y, p2.x, p2.y, link.fromAnchor, link.toAnchor);

      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", "diagram-link-group");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", `diagram-link ${link.type}`);

      if (link.type === "solid") {
        path.setAttribute("marker-end", "url(#arrow-solid)");
      } else if (link.type === "dashed") {
        path.setAttribute("marker-end", "url(#arrow-dashed)");
      } else if (link.type === "bidirectional") {
        path.setAttribute("marker-start", "url(#arrow-bi)");
        path.setAttribute("marker-end", "url(#arrow-bi)");
      }

      const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hitPath.setAttribute("d", d);
      hitPath.setAttribute("class", "diagram-link-hit");

      group.appendChild(path);
      group.appendChild(hitPath);

      group.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentToolMode === "delete-line" || confirm("この矢印を削除しますか？")) {
          links = links.filter(l => l !== link);
          redrawAllDiagramLines();
          saveDiagramLayout();
        }
      });

      svgLayer.appendChild(group);
    });
  }

  function getAnchorCoordinate(cardEl, anchor) {
    const left = cardEl.offsetLeft;
    const top = cardEl.offsetTop;
    const width = cardEl.offsetWidth;
    const height = cardEl.offsetHeight;

    switch (anchor) {
      case "top": return { x: left + width / 2, y: top };
      case "bottom": return { x: left + width / 2, y: top + height };
      case "left": return { x: left, y: top + height / 2 };
      case "right": return { x: left + width, y: top + height / 2 };
      default: return { x: left + width / 2, y: top + height / 2 };
    }
  }

  function createCurvedPath(x1, y1, x2, y2, a1, a2) {
    const dx = Math.abs(x2 - x1) * 0.5;
    const dy = Math.abs(y2 - y1) * 0.5;

    let cx1 = x1, cy1 = y1, cx2 = x2, cy2 = y2;

    if (a1 === "right") cx1 += dx;
    if (a1 === "left") cx1 -= dx;
    if (a1 === "bottom") cy1 += dy;
    if (a1 === "top") cy1 -= dy;

    if (a2 === "right") cx2 += dx;
    if (a2 === "left") cx2 -= dx;
    if (a2 === "bottom") cy2 += dy;
    if (a2 === "top") cy2 -= dy;

    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  // 7. サイドバー
  function renderSidebarToggles() {
    cardToggleList.innerHTML = "";
    cards.forEach(card => {
      const cat = CATEGORY_MAP[card.category] || CATEGORY_MAP["none"];
      const row = document.createElement("div");
      row.className = "toggle-item";
      row.innerHTML = `
        <input type="checkbox" id="chk_${card.id}" ${card.visible ? "checked" : ""}>
        <label for="chk_${card.id}" title="${escapeHTML(card.text)}">[${cat.code}] ${escapeHTML(card.text)}</label>
      `;

      row.querySelector("input").addEventListener("change", (e) => {
        card.visible = e.target.checked;
        renderAllCards();
        redrawAllDiagramLines();
        saveDiagramLayout();
      });

      cardToggleList.appendChild(row);
    });
  }

  // データの読み込み
  function loadSavedDiagramLayout() {
    const rawSource = localStorage.getItem("jiritsu_diagram_source_data");
    if (!rawSource) return;
    try {
      const sourceObj = JSON.parse(rawSource);
      const saved = sourceObj.savedLayout; // 現在の版の保存データを取得
      if (!saved) return;

      if (saved.cards && saved.cards.length > 0) {
        saved.cards.forEach(sc => {
          const target = cards.find(c => c.id === sc.id);
          if (target) {
            target.x = sc.x;
            target.y = sc.y;
            target.visible = sc.visible;
            if (target.category === "none" && sc.category) {
              target.category = sc.category;
            }
          } else if (sc.id.startsWith("custom_")) {
            cards.push(sc);
          }
        });
      }
      if (saved.links) {
        links = saved.links;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // データの保存（本体側へリアルタイム同期）
  function saveDiagramLayout() {
    const layoutData = { cards, links };
    const rawSource = localStorage.getItem("jiritsu_diagram_source_data");
    if (rawSource) {
      try {
        const parsedSource = JSON.parse(rawSource);
        parsedSource.savedLayout = layoutData;
        localStorage.setItem("jiritsu_diagram_source_data", JSON.stringify(parsedSource));
      } catch (e) {
        console.error(e);
      }
    }
    // 本体側ウィンドウに同期イベントを発火させる
    localStorage.setItem("jiritsu_diagram_saved_layout_sync", JSON.stringify(layoutData));
  }

  function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }
});