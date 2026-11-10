// =============================================================================
// 自立活動 指導計画作成支援システム コアロジック (app.js)
// =============================================================================

const FORM_FIELD_IDS = [
  "grade", "disability", "summary", "step1",
  "step2_1_kenkou", "step2_1_shinri", "step2_1_ningen", "step2_1_kankyou", "step2_1_shintai", "step2_1_comm",
  "step2_2", "step2_3", "step3", "step4", "step5", // ← "step3" を追加
  "step6_kenkou", "step6_shinri", "step6_ningen", "step6_kankyou", "step6_shintai", "step6_comm",
  "step7", "step8_a", "step8_i", "step8_u", "step8_e"
];

// 横並び一括リサイズ連動グループ
const SYNC_GROUPS = [
  ["field_step2_1_kenkou", "field_step2_1_shinri", "field_step2_1_ningen", "field_step2_1_kankyou", "field_step2_1_shintai", "field_step2_1_comm"],
  ["field_step6_kenkou", "field_step6_shinri", "field_step6_ningen", "field_step6_kankyou", "field_step6_shintai", "field_step6_comm"],
  ["field_step8_a", "field_step8_i", "field_step8_u", "field_step8_e"]
];

const CAT_COLS = ["kenkou", "shinri", "ningen", "kankyou", "shintai", "comm"];
const CIRCLED_NUMS = ["⓪","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"];

function toCircledNum(n) {
  return CIRCLED_NUMS[n] || `(${n})`;
}

let isDirty = false; // ファイルに未保存の変更があるかどうかのフラグ

/* アプリケーション状態 */
let appState = {
  students: [
    {
      id: "student_1",
      number: 1,
      name: "児童生徒①",
      versions: [
        {
          versionId: "v1",
          versionName: "第1版 (当初計画)",
          updatedAt: new Date().toISOString(),
          data: {}
        }
      ]
    }
  ],
  activeStudentId: "student_1",
  activeVersionId: "v1"
};

let activeInputTarget = null;
let selectedNodeId = null;
let isSyncingHeight = false;

/* 初期化 */
document.addEventListener("DOMContentLoaded", () => {
  initReferencePanel();
  setupFormListeners();
  setupToolbarListeners();
  setupModals();
  setupTagButtons();
  setupSlashButtons();
  setupInteractiveNodes();
  setupPanelResizer();
  setupGroupResizeSync();
  loadFromLocalStorage();
  renderStudentSelect();
  loadFormData();
  setTimeout(redrawAllLines, 100);

  window.addEventListener("resize", () => {
    redrawAllLines();
  });

  // 印刷前後の正確なSVG描画フック
  window.addEventListener("beforeprint", () => {
    redrawAllLines();
  });
  window.addEventListener("afterprint", () => {
    redrawAllLines();
  });

  // ページを閉じる・移動する際の離脱警告
  window.addEventListener("beforeunload", (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = ""; // ブラウザ標準の確認ダイアログを表示させるための設定
    }
  });
});

/* 横並び一括リサイズ連動 */
function setupGroupResizeSync() {
  if (!window.ResizeObserver) return;

  SYNC_GROUPS.forEach(group => {
    const elements = group.map(id => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const ro = new ResizeObserver((entries) => {
      if (isSyncingHeight) return;

      for (const entry of entries) {
        const target = entry.target;
        const newHeight = target.offsetHeight;

        isSyncingHeight = true;
        elements.forEach(el => {
          if (el !== target) {
            el.style.height = newHeight + "px";
          }
        });
        isSyncingHeight = false;

        redrawAllLines();
        break;
      }
    });

    elements.forEach(el => ro.observe(el));
  });

  const directLinkSection = document.getElementById("directLinkSection");
  if (directLinkSection) {
    const roSection = new ResizeObserver(() => {
      redrawAllLines();
    });
    roSection.observe(directLinkSection);
    const step7 = document.getElementById("field_step7");
    if (step7) roSection.observe(step7);
  }
}

/* 6区分27項目解説パネル初期化（挿入ボタン付き） */
function initReferencePanel() {
  const container = document.getElementById("refContentList");
  if (!container) return;
  container.innerHTML = "";

  const categories = window.DATA_JIRITSU || window.DATA_JIRITSU_ALL || [];

  if (categories.length === 0) {
    container.innerHTML = "<p style='padding:12px; color:#64748b;'>解説データ（data_jiritsu.js）が読み込まれていません。</p>";
    return;
  }

  categories.forEach(cat => {
    const grp = document.createElement("div");
    grp.className = "category-group";
    
    const head = document.createElement("div");
    head.className = "category-head";
    head.innerHTML = `
      <span><strong>${cat.code}. ${cat.name}</strong> (${cat.short})</span>
      <span id="cat-arrow-${cat.code}">▼</span>
    `;
    head.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      toggleCategory(cat.code);
    });

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "category-items";
    itemsContainer.id = `cat-items-${cat.code}`;

    cat.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.setAttribute("data-search", `${cat.name} ${item.num} ${item.title} ${item.about || ""} ${item.points || ""}`);
      
      card.innerHTML = `
        <div class="item-card-summary">
          <span class="item-title-text">${item.num} ${item.title}</span>
          <button type="button" class="btn-insert-item no-print" title="選択中の枠に項目名を挿入">+ 挿入</button>
          <span class="item-arrow">▶</span>
        </div>
        <div class="item-card-body" style="display:none;">
          <div class="item-section-title">① この項目について</div>
          <div class="item-card-desc">${item.about || ""}</div>
          <div class="item-section-title">② 具体的指導内容例と留意点</div>
          <div class="item-card-desc">${item.points || ""}</div>
        </div>
      `;

      const summary = card.querySelector(".item-card-summary");
      const body = card.querySelector(".item-card-body");
      const arrow = card.querySelector(".item-arrow");
      const insertBtn = card.querySelector(".btn-insert-item");

      // アコーディオン開閉
      summary.addEventListener("pointerdown", (e) => {
        if (e.target === insertBtn) return;
        e.preventDefault();
        const isHidden = body.style.display === "none" || body.style.display === "";
        body.style.display = isHidden ? "block" : "none";
        arrow.textContent = isHidden ? "▼" : "▶";
      });

      // 項目名挿入ボタン
      insertBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        insertItemTitleToActiveField(`${item.num} ${item.title}`);
      });

      itemsContainer.appendChild(card);
    });

    grp.appendChild(head);
    grp.appendChild(itemsContainer);
    container.appendChild(grp);
  });

  const searchInput = document.getElementById("refSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = container.querySelectorAll(".item-card");
      cards.forEach(card => {
        const text = card.getAttribute("data-search").toLowerCase();
        const match = text.includes(query);
        card.style.display = match ? "block" : "none";
        if (query && match) {
          card.querySelector(".item-card-body").style.display = "block";
          card.querySelector(".item-arrow").textContent = "▼";
        }
      });
    });
  }
}

function toggleCategory(code) {
  const el = document.getElementById(`cat-items-${code}`);
  const arrow = document.getElementById(`cat-arrow-${code}`);
  if (!el) return;
  if (el.style.display === "none") {
    el.style.display = "flex";
    if (arrow) arrow.textContent = "▼";
  } else {
    el.style.display = "none";
    if (arrow) arrow.textContent = "▶";
  }
}

/* 項目名をフォーカス中の入力欄に挿入 */
function insertItemTitleToActiveField(textToInsert) {
  let target = activeInputTarget;
  if (!target || !document.contains(target)) {
    target = document.getElementById("field_step6_shintai");
  }

  const start = target.selectionStart ?? target.value.length;
  const end = target.selectionEnd ?? target.value.length;
  const currentVal = target.value;

  const prefix = (start > 0 && currentVal[start - 1] !== "\n") ? "\n" : "";
  const insertContent = prefix + textToInsert;

  target.value = currentVal.substring(0, start) + insertContent + currentVal.substring(end);
  target.focus();
  target.selectionStart = target.selectionEnd = start + insertContent.length;

  target.dispatchEvent(new Event("input"));
}

/* 解説欄の横幅ドラッグ可変 */
function setupPanelResizer() {
  const resizer = document.getElementById("panelResizer");
  const refPanel = document.getElementById("refPanel");
  if (!resizer || !refPanel) return;

  let isDragging = false;

  resizer.addEventListener("mousedown", () => {
    isDragging = true;
    resizer.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 220 && newWidth <= window.innerWidth * 0.65) {
      document.documentElement.style.setProperty("--ref-width", `${newWidth}px`);
      redrawAllLines();
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      resizer.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setTimeout(redrawAllLines, 50);
    }
  });
}

/* フォーム・イベント設定 */
function setupFormListeners() {
  FORM_FIELD_IDS.forEach(id => {
    const el = document.getElementById(`field_${id}`);
    if (!el) return;
    el.addEventListener("focus", () => { activeInputTarget = el; });
    el.addEventListener("input", () => {
      saveCurrentFieldToState(id, el.value);
      triggerAutoSave();
    });
  });
}

function setupSlashButtons() {
  document.querySelectorAll(".slash-btn").forEach(btn => {
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const col = btn.getAttribute("data-col");
      toggleSlashCol(col);
    });
  });
}

function toggleSlashCol(colKey) {
  const data = getCurrentVersionData();
  if (!data.slashedCols) data.slashedCols = [];
  const idx = data.slashedCols.indexOf(colKey);
  if (idx >= 0) {
    data.slashedCols.splice(idx, 1);
  } else {
    data.slashedCols.push(colKey);
  }
  applySlashStyles();
  triggerAutoSave();
}

function applySlashStyles() {
  const data = getCurrentVersionData();
  const slashed = data.slashedCols || [];
  CAT_COLS.forEach(col => {
    const td = document.getElementById(`td_step6_${col}`);
    const btn = document.querySelector(`.slash-btn[data-col="${col}"]`);
    const isSlashed = slashed.includes(col);
    if (td) td.classList.toggle("slashed", isSlashed);
    if (btn) btn.classList.toggle("active", isSlashed);
  });
}

/* ⑥〜⑧ ダイレクト結線ロジック */
function setupInteractiveNodes() {
  document.querySelectorAll(".connect-node").forEach(node => {
    node.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleNodeClick(node.getAttribute("data-node"));
    });
  });
}

function handleNodeClick(nodeId) {
  if (!selectedNodeId) {
    selectedNodeId = nodeId;
    highlightNode(nodeId, true);
    return;
  }

  if (selectedNodeId === nodeId) {
    highlightNode(nodeId, false);
    selectedNodeId = null;
    return;
  }

  const isN1_Step6 = selectedNodeId.startsWith("step6_");
  const isN2_Step8 = nodeId.startsWith("step8_");
  const isN1_Step8 = selectedNodeId.startsWith("step8_");
  const isN2_Step6 = nodeId.startsWith("step6_");

  if ((isN1_Step6 && isN2_Step8) || (isN1_Step8 && isN2_Step6)) {
    const fromId = isN1_Step6 ? selectedNodeId : nodeId;
    const toId = isN1_Step6 ? nodeId : selectedNodeId;
    toggleDirectLink(fromId, toId);
  }

  highlightNode(selectedNodeId, false);
  selectedNodeId = null;
}

function highlightNode(nodeId, isSelected) {
  const node = document.querySelector(`.connect-node[data-node="${nodeId}"]`);
  if (node) node.classList.toggle("selected", isSelected);
}

function toggleDirectLink(fromId, toId) {
  const data = getCurrentVersionData();
  if (!data.directLinks) data.directLinks = [];

  const existingIdx = data.directLinks.findIndex(l => l.from === fromId && l.to === toId);
  if (existingIdx >= 0) {
    data.directLinks.splice(existingIdx, 1);
  } else {
    data.directLinks.push({ from: fromId, to: toId });
  }

  redrawAllLines();
  triggerAutoSave();
}

/* 画面・印刷共通のピクセルパーフェクト結線描画 */
function redrawAllLines() {
  const data = getCurrentVersionData();
  const links = data.directLinks || [];
  const svg = document.getElementById("directSvgLayer");
  const container = document.getElementById("directLinkSection");

  if (!svg || !container) return;
  svg.innerHTML = "";

  const cRect = container.getBoundingClientRect();
  const cWidth = cRect.width || container.offsetWidth || 800;
  const cHeight = cRect.height || container.offsetHeight || 500;

  // SVG属性とインラインスタイルの両方を明示設定（印刷用サイズ潰れ防止）
  svg.setAttribute("viewBox", `0 0 ${cWidth} ${cHeight}`);
  svg.setAttribute("width", `${cWidth}`);
  svg.setAttribute("height", `${cHeight}`);
  svg.style.width = `${cWidth}px`;
  svg.style.height = `${cHeight}px`;

  links.forEach(link => {
    const n1 = document.querySelector(`.connect-node[data-node="${link.from}"]`);
    const n2 = document.querySelector(`.connect-node[data-node="${link.to}"]`);
    if (!n1 || !n2) return;

    const r1 = n1.getBoundingClientRect();
    const r2 = n2.getBoundingClientRect();

    const x1 = r1.left + r1.width / 2 - cRect.left;
    const y1 = r1.top + r1.height / 2 - cRect.top;
    const x2 = r2.left + r2.width / 2 - cRect.left;
    const y2 = r2.top + r2.height / 2 - cRect.top;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);
    path.setAttribute("class", "direct-link-path");
    path.setAttribute("title", "タップしてこの線を削除");

    path.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDirectLink(link.from, link.to);
    });

    svg.appendChild(path);
  });
}

/* ツールバー操作設定 */
function setupToolbarListeners() {
  const btnToggleRef = document.getElementById("btnToggleRef");
  if (btnToggleRef) {
    btnToggleRef.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      document.getElementById("refPanel").classList.toggle("collapsed");
      setTimeout(redrawAllLines, 60);
    });
  }

  const btnCloseRef = document.getElementById("btnCloseRef");
  if (btnCloseRef) {
    btnCloseRef.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      document.getElementById("refPanel").classList.add("collapsed");
      setTimeout(redrawAllLines, 60);
    });
  }

  // 「キャッシュ削除」ボタンの処理
  const btnClearCache = document.getElementById("btnClearCache");
  if (btnClearCache) {
    btnClearCache.addEventListener("click", () => {
      if (confirm("一時保存データ（キャッシュ）をクリアして初期化しますか？")) {
        // sessionStorage と localStorage の両方を消去
        sessionStorage.clear();
        localStorage.clear();

        alert("データを消去しました。");
        location.reload();
      }
    });
  }

  const fontSizeSelect = document.getElementById("fontSizeSelect");
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener("change", (e) => {
      document.documentElement.style.setProperty("--base-font-size", e.target.value);
      setTimeout(redrawAllLines, 60);
    });
  }

  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      document.body.setAttribute("data-theme", e.target.value);
    });
  }

  // 印刷ボタン
  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      redrawAllLines();
      setTimeout(() => {
        window.print();
      }, 150);
    });
  }

  const studentSelect = document.getElementById("studentSelect");
  if (studentSelect) {
    studentSelect.addEventListener("change", (e) => {
      appState.activeStudentId = e.target.value;
      const currentStudent = getCurrentStudent();
      appState.activeVersionId = currentStudent ? currentStudent.versions[0].versionId : "v1";
      renderVersionSelect();
      loadFormData();
    });
  }

  const versionSelect = document.getElementById("versionSelect");
  if (versionSelect) {
    versionSelect.addEventListener("change", (e) => {
      appState.activeVersionId = e.target.value;
      loadFormData();
    });
  }

  const btnNewStudent = document.getElementById("btnNewStudent");
  if (btnNewStudent) {
    btnNewStudent.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const nextNum = appState.students.length + 1;
      const nextName = `児童生徒${toCircledNum(nextNum)}`;
      const name = prompt("児童生徒の識別名を入力してください:", nextName);
      if (!name) return;

      const newStudent = {
        id: "student_" + Date.now(),
        number: nextNum,
        name: name,
        versions: [
          {
            versionId: "v1",
            versionName: "第1版 (当初計画)",
            updatedAt: new Date().toISOString(),
            data: {}
          }
        ]
      };
      appState.students.push(newStudent);
      appState.activeStudentId = newStudent.id;
      appState.activeVersionId = "v1";
      renderStudentSelect();
      renderVersionSelect();
      loadFormData();
      triggerAutoSave();
    });
  }

  const btnNewVersion = document.getElementById("btnNewVersion");
  if (btnNewVersion) {
    btnNewVersion.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const currentStudent = getCurrentStudent();
      if (!currentStudent) return;
      const vNum = currentStudent.versions.length + 1;
      const vName = prompt("新しいバージョンの名称を入力してください", `第${vNum}版 (${new Date().toLocaleDateString()})`);
      if (!vName) return;

      const currentData = getCurrentVersionData();
      const newVer = {
        versionId: "v" + Date.now(),
        versionName: vName,
        updatedAt: new Date().toISOString(),
        data: JSON.parse(JSON.stringify(currentData))
      };
      currentStudent.versions.push(newVer);
      appState.activeVersionId = newVer.versionId;
      renderVersionSelect();
      loadFormData();
      triggerAutoSave();
    });
  }

  // 保存（エクスポート）
  const btnExport = document.getElementById("btnExportEncrypted");
  if (btnExport) {
    btnExport.addEventListener("pointerdown", async (e) => {
      e.preventDefault();
      const pwd = await showPasswordPromptModal({
        title: "保存用暗号化パスワードの設定",
        desc: "このファイルを保護するためのパスワードを設定してください（文字数は表示されません）。",
        isConfirmRequired: true
      });

      if (!pwd) return;

      try {
        const jsonStr = JSON.stringify(appState);
        const encrypted = await CryptoEngine.encrypt(jsonStr, pwd);
        const blob = new Blob([encrypted], { type: "application/json" });
        const a = document.createElement("a");
        const student = getCurrentStudent();
        const sName = student ? student.name : "jiritsu_plan";
        a.download = `自立活動計画_${sName}_${new Date().toISOString().slice(0,10)}.enc`;
        a.href = URL.createObjectURL(blob);
        a.click();
        
        isDirty = false; // ★ここに追加（ファイル出力が成功したため保存済みにする）

      } catch (err) {
        alert("暗号化エクスポート中にエラーが発生しました: " + err.message);
      }
    });
  }

  // 読込（インポート）
  const btnImport = document.getElementById("btnImportEncrypted");
  const fileInput = document.getElementById("importFileInput");
  if (btnImport && fileInput) {
    btnImport.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const encData = event.target.result;
        const pwd = await showPasswordPromptModal({
          title: "復号パスワードの入力",
          desc: "ファイルを読み込むための暗号化パスワードを入力してください。",
          isConfirmRequired: false
        });

        if (!pwd) {
          e.target.value = "";
          return;
        }

        try {
          const decData = await CryptoEngine.decrypt(encData, pwd);
          appState = JSON.parse(decData);
          renderStudentSelect();
          renderVersionSelect();
          loadFormData();
          triggerAutoSave();
          isDirty = false;
          alert("暗号化データを正常に読み込みました。");
        } catch (err) {
          alert(err.message);
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });
  }

  // 課題関連図ポップアップオープン
  // 課題関連図ポップアップオープン
  const btnOpenDiagram = document.getElementById("btnOpenDiagram");
  if (btnOpenDiagram) {
    btnOpenDiagram.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const currentData = getCurrentVersionData();
      const student = getCurrentStudent();
      
      // ポップアップ側に「現在の版の図面データ」を渡す
      localStorage.setItem("jiritsu_diagram_source_data", JSON.stringify({
        studentName: student ? student.name : "児童生徒",
        step3Text: currentData.step3 || "",
        savedLayout: currentData.diagramLayout || null
      }));

      // ポップアップを開く
      const win = window.open("diagram/diagram.html", "jiritsuDiagramWin", "width=1280,height=850,resizable=yes,scrollbars=yes");
      if (win) win.focus();
    });
  }

  // ポップアップ（課題関連図）側で保存されたデータを受け取ってappStateに反映
  window.addEventListener("storage", (e) => {
    if (e.key === "jiritsu_diagram_saved_layout_sync") {
      try {
        const layoutData = JSON.parse(e.newValue);
        const data = getCurrentVersionData();
        data.diagramLayout = layoutData;
        triggerAutoSave();
      } catch (err) {
        console.error(err);
      }
    }
  });
}

/* パスワードモーダル制御 */
function showPasswordPromptModal({ title, desc, isConfirmRequired }) {
  return new Promise((resolve) => {
    const modal = document.getElementById("passwordModal");
    const titleEl = document.getElementById("pwdModalTitle");
    const descEl = document.getElementById("pwdModalDesc");
    const p1 = document.getElementById("inputPassword");
    const p2 = document.getElementById("inputPasswordConfirm");
    const p2Group = document.getElementById("pwdField2Group");
    const errEl = document.getElementById("pwdMismatchError");
    const submitBtn = document.getElementById("btnSubmitPassword");
    const cancelBtn = document.getElementById("btnCancelPassword");

    p1.value = "";
    p2.value = "";
    if (errEl) errEl.style.display = "none";
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    if (p2Group) p2Group.style.display = isConfirmRequired ? "block" : "none";

    modal.classList.add("active");
    p1.focus();

    const cleanup = () => {
      modal.classList.remove("active");
      submitBtn.removeEventListener("click", onOk);
      cancelBtn.removeEventListener("click", onCancel);
    };

    const onOk = (ev) => {
      ev.preventDefault();
      const val1 = p1.value;
      const val2 = p2.value;

      if (!val1) {
        alert("パスワードを入力してください。");
        return;
      }

      if (isConfirmRequired && val1 !== val2) {
        if (errEl) errEl.style.display = "block";
        return;
      }

      cleanup();
      resolve(val1);
    };

    const onCancel = (ev) => {
      ev.preventDefault();
      cleanup();
      resolve(null);
    };

    submitBtn.addEventListener("click", onOk);
    cancelBtn.addEventListener("click", onCancel);
  });
}

/* 生徒管理モーダル設定 */
function setupModals() {
  const btnCancelPassword = document.getElementById("btnCancelPassword");
  if (btnCancelPassword) {
    btnCancelPassword.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      document.getElementById("passwordModal").classList.remove("active");
    });
  }

  const btnEditStudent = document.getElementById("btnEditStudent");
  if (btnEditStudent) {
    btnEditStudent.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const st = getCurrentStudent();
      if (!st) return;
      document.getElementById("studentNameInput").value = st.name;
      document.getElementById("studentModal").classList.add("active");
    });
  }

  const btnCancelStudent = document.getElementById("btnCancelStudent");
  if (btnCancelStudent) {
    btnCancelStudent.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      document.getElementById("studentModal").classList.remove("active");
    });
  }

  const btnSaveStudent = document.getElementById("btnSaveStudent");
  if (btnSaveStudent) {
    btnSaveStudent.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const st = getCurrentStudent();
      if (st) {
        st.name = document.getElementById("studentNameInput").value;
        renderStudentSelect();
        triggerAutoSave();
      }
      document.getElementById("studentModal").classList.remove("active");
    });
  }

  const btnDeleteStudent = document.getElementById("btnDeleteStudent");
  if (btnDeleteStudent) {
    btnDeleteStudent.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (appState.students.length <= 1) {
        alert("最後の1人は削除できません。");
        return;
      }
      if (confirm("現在の児童生徒データを削除しますか？この操作は取り消せません。")) {
        appState.students = appState.students.filter(s => s.id !== appState.activeStudentId);
        appState.activeStudentId = appState.students[0].id;
        appState.activeVersionId = appState.students[0].versions[0].versionId;
        renderStudentSelect();
        renderVersionSelect();
        loadFormData();
        triggerAutoSave();
        document.getElementById("studentModal").classList.remove("active");
      }
    });
  }
}

/* 暗号化エンジン (Web Crypto API: AES-GCM 256bit) */
class CryptoEngine {
  // Base64 相互変換ユーティリティ (大容量データでもスタックオーバーフローしない安全な実装)
  static bytesToBase64(bytes) {
    let binString = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  }

  static base64ToBytes(base64) {
    const binString = atob(base64);
    const len = binString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    return bytes;
  }

  // パスワードから暗号鍵を生成 (PBKDF2)
  static async deriveKey(password, salt, iterations = 600000) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: iterations,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // 暗号化 (エクスポート用)
  static async encrypt(plainText, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const iterations = 600000; // OWASP推奨基準 (60万回)

    const key = await this.deriveKey(password, salt, iterations);
    const enc = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      enc.encode(plainText)
    );

    return JSON.stringify({
      app: "jiritsu_plan",
      v: 2,
      iterations: iterations,
      salt: this.bytesToBase64(salt),
      iv: this.bytesToBase64(iv),
      data: this.bytesToBase64(new Uint8Array(ciphertext))
    });
  }

  // 復号 (インポート用)
  static async decrypt(encryptedJsonStr, password) {
    let packageObj;
    try {
      packageObj = JSON.parse(encryptedJsonStr);
    } catch (e) {
      throw new Error("ファイル形式が不正です（JSONとして読み込めません）。");
    }

    if (!packageObj || !packageObj.salt || !packageObj.iv || !packageObj.data) {
      throw new Error("選択されたファイルは有効な暗号化データではありません。");
    }

    try {
      const salt = this.base64ToBytes(packageObj.salt);
      const iv = this.base64ToBytes(packageObj.iv);
      const ciphertext = this.base64ToBytes(packageObj.data);
      
      // 過去バージョン（100,000回）で保存されたファイルとの後方互換性を保持
      const iterations = packageObj.iterations || 100000;

      const key = await this.deriveKey(password, salt, iterations);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        ciphertext
      );

      return new TextDecoder().decode(decrypted);
    } catch (e) {
      throw new Error("復号に失敗しました。パスワードが正しくないか、データが破損しています。");
    }
  }
}

/* データ入出力 */
function getCurrentStudent() {
  return appState.students.find(s => s.id === appState.activeStudentId) || appState.students[0];
}

function getCurrentVersion() {
  const student = getCurrentStudent();
  if (!student) return null;
  return student.versions.find(v => v.versionId === appState.activeVersionId) || student.versions[0];
}

function getCurrentVersionData() {
  const ver = getCurrentVersion();
  if (!ver) return {};
  if (!ver.data) ver.data = {};
  return ver.data;
}

function saveCurrentFieldToState(fieldKey, value) {
  const data = getCurrentVersionData();
  data[fieldKey] = value;
  const ver = getCurrentVersion();
  if (ver) ver.updatedAt = new Date().toISOString();
}

function loadFormData() {
  const data = getCurrentVersionData();
  FORM_FIELD_IDS.forEach(id => {
    const el = document.getElementById(`field_${id}`);
    if (el) {
      el.value = data[id] || "";
      el.style.height = "";
    }
  });
  applySlashStyles();
  setTimeout(redrawAllLines, 50);
}

function renderStudentSelect() {
  const sel = document.getElementById("studentSelect");
  if (!sel) return;
  sel.innerHTML = "";
  appState.students.forEach(st => {
    const opt = document.createElement("option");
    opt.value = st.id;
    opt.textContent = st.name;
    if (st.id === appState.activeStudentId) opt.selected = true;
    sel.appendChild(opt);
  });
}

function renderVersionSelect() {
  const sel = document.getElementById("versionSelect");
  if (!sel) return;
  sel.innerHTML = "";
  const st = getCurrentStudent();
  if (!st) return;
  st.versions.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.versionId;
    opt.textContent = v.versionName;
    if (v.versionId === appState.activeVersionId) opt.selected = true;
    sel.appendChild(opt);
  });
}

function triggerAutoSave() {
  isDirty = true; // 変更があったため未保存フラグをオン
  try {
    sessionStorage.setItem("jiritsu_plan_plain_backup", JSON.stringify(appState));
  } catch (e) {
    console.warn("Auto save failed", e);
  }
}

function loadFromLocalStorage() {
  try {
    const plain = sessionStorage.getItem("jiritsu_plan_plain_backup");
    if (plain) {
      appState = JSON.parse(plain);
    }
  } catch (e) {
    console.error("Session storage load error", e);
  }
}

/* 区分タグボタン設定 */
function setupTagButtons() {
  document.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const tagChar = btn.getAttribute("data-tag");
      insertTag(tagChar);
    });
  });
}

/* カーソル位置に（健）等のタグを挿入 */
function insertTag(tagChar) {
  // フォーカスされている入力欄、またはデフォルトで③を指定
  let target = activeInputTarget;
  if (!target || !document.contains(target)) {
    target = document.getElementById("field_step3");
  }

  const tag = `（${tagChar}）`;
  const start = target.selectionStart ?? target.value.length;
  const end = target.selectionEnd ?? target.value.length;
  const text = target.value;

  target.value = text.substring(0, start) + tag + text.substring(end);
  target.focus();
  target.selectionStart = target.selectionEnd = start + tag.length;
  target.dispatchEvent(new Event("input"));
}