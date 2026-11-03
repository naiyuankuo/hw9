(function () {
  "use strict";

  // 安全的 Marked 初始化 (相容 Marked.js v4 到 v15+ CDN 版本)
  try {
    if (typeof marked !== "undefined") {
      if (typeof marked.use === "function") {
        marked.use({ breaks: true, gfm: true });
      } else if (typeof marked.setOptions === "function") {
        marked.setOptions({ breaks: true, gfm: true });
      }
    }
  } catch (e) {
    console.warn("Marked.js 初始化略過:", e);
  }

  // 安全渲染 Lucide 圖示 (防止 CDN 載入延遲時引發 uncaught exception)
  function safeCreateIcons() {
    try {
      if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons();
      }
    } catch (err) {
      console.warn("Lucide 圖示渲染警告:", err);
    }
  }

  // 安全解析 Markdown (避免格式錯誤中斷渲染)
  function safeMarkdownParse(content) {
    if (!content) return "";
    try {
      if (typeof marked !== "undefined") {
        if (typeof marked.parse === "function") {
          return marked.parse(content);
        } else if (typeof marked === "function") {
          return marked(content);
        }
      }
    } catch (err) {
      console.warn("Markdown 解析異常:", err);
    }
    return String(content)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }

  // 獲取預設教材 (優先讀取 window.DEFAULT_MATERIALS，若無則啟動內建安全備援)
  function getDefaultMaterials() {
    if (typeof window !== "undefined" && Array.isArray(window.DEFAULT_MATERIALS) && window.DEFAULT_MATERIALS.length > 0) {
      return window.DEFAULT_MATERIALS;
    }
    if (typeof DEFAULT_MATERIALS !== "undefined" && Array.isArray(DEFAULT_MATERIALS) && DEFAULT_MATERIALS.length > 0) {
      return DEFAULT_MATERIALS;
    }
    return [
      {
        id: "mat-prompt-engineering",
        title: "AI 提示工程核心心法：從指令到精準輸出",
        category: "AI 核心",
        source: "Prompt Engineering Guide 精選整理",
        tags: ["Prompt", "AI", "LLM", "CoT"],
        summary: "掌握與大型語言模型 (LLM) 溝通的三大黃金法則：角色設定、Few-Shot 範例與思維鏈 (Chain-of-Thought)。",
        content: "## 為什麼需要提示工程？\n\n大型語言模型本質上是機率文字補全機器。給予模糊的輸入，模型只能產出大眾化的平庸答案..."
      },
      {
        id: "mat-calculus-core",
        title: "微積分核心教材：極限、微分與微積分基本定理",
        category: "學習資料",
        source: "微積分精要講義",
        tags: ["微積分", "數學", "極限", "導數"],
        summary: "從極限幾何概念切入，掌握割線斜率趨近切線斜率的過程，貫通微分與積分的互逆關聯。",
        content: "## 微積分的核心概念：掌握變化的數學\n\n### 1. 導數的幾何意義\n$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$\n\n### 2. 微積分基本定理\n$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$"
      },
      {
        id: "mat-linear-algebra-core",
        title: "線性代數直觀指南：向量空間與矩陣幾何變換",
        category: "學習資料",
        source: "線性代數幾何觀",
        tags: ["線性代數", "矩陣", "特徵值", "數學"],
        summary: "理解矩陣作為空間線性變換的幾何本質，掌握行列式、特徵值與特徵向量的物理意義。",
        content: "## 線性代數：空間的幾何變換\n\n### 特徵方程式\n$$A\\mathbf{v} = \\lambda \\mathbf{v}$$\n特徵向量在變換矩陣作用下僅發生伸縮，方向保持不變！"
      },
      {
        id: "mat-discrete-math-core",
        title: "離散數學基礎：邏輯、集合、圖論與演算法思維",
        category: "學習資料",
        source: "資工離散核心手冊",
        tags: ["離散數學", "圖論", "邏輯", "資工"],
        summary: "電腦科學的數學基石。涵蓋命題邏輯、遞迴關係、二元樹與圖論最短路徑觀念。",
        content: "## 離散數學：電腦科學的靈魂\n\n### 歐拉平面圖定理\n$$V - E + F = 2$$\n頂點數 $V$、邊數 $E$、面數 $F$。"
      }
    ];
  }

  function getDefaultNotes() {
    if (typeof window !== "undefined" && Array.isArray(window.DEFAULT_NOTES) && window.DEFAULT_NOTES.length > 0) {
      return window.DEFAULT_NOTES;
    }
    if (typeof DEFAULT_NOTES !== "undefined" && Array.isArray(DEFAULT_NOTES) && DEFAULT_NOTES.length > 0) {
      return DEFAULT_NOTES;
    }
    return [
      {
        id: "note-demo-1",
        materialId: "mat-prompt-engineering",
        materialTitle: "AI 提示工程核心心法：從指令到精準輸出",
        title: "💡 提示工程練習心得：CoT 對寫作業超有幫助",
        category: "AI 核心",
        tags: ["實作心得", "Prompt"],
        content: "今天試著在讓 AI 寫作業題目時加上「請一步一步思考」，生成的邏輯架構真的比原本直接要答案清楚太多了！",
        createdAt: "2026/11/03"
      }
    ];
  }

  function getDefaultChat() {
    if (typeof window !== "undefined" && Array.isArray(window.DEFAULT_CHAT_MESSAGES) && window.DEFAULT_CHAT_MESSAGES.length > 0) {
      return window.DEFAULT_CHAT_MESSAGES;
    }
    if (typeof DEFAULT_CHAT_MESSAGES !== "undefined" && Array.isArray(DEFAULT_CHAT_MESSAGES) && DEFAULT_CHAT_MESSAGES.length > 0) {
      return DEFAULT_CHAT_MESSAGES;
    }
    return [
      {
        id: "msg-welcome",
        sender: "ai",
        text: "哈囉！我是你的隨身 AI 學習助教 🤖\n\n我可以幫你：\n1. 摘要或解釋「原始資料庫」裡的任何概念\n2. 幫你把你寫的「學習筆記」梳理條理\n3. 針對你想複習的主題出測驗考考你！\n\n請問今天想聊聊或學習什麼呢？",
        time: "20:00"
      }
    ];
  }

// ==========================================
// 0. 本地 IndexedDB 原版 PDF 二進位安全儲存庫
// ==========================================
const DB_CONFIG = { name: "LearnFlowDB", version: 1, storeName: "pdf_blobs" };

function openPdfDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
        db.createObjectStore(DB_CONFIG.storeName);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function savePdfBlob(id, blob) {
  try {
    const db = await openPdfDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_CONFIG.storeName, "readwrite");
      tx.objectStore(DB_CONFIG.storeName).put(blob, id);
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB 儲存 PDF 失敗:", err);
  }
}

async function getPdfBlob(id) {
  try {
    const db = await openPdfDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(DB_CONFIG.storeName, "readonly");
      const req = tx.objectStore(DB_CONFIG.storeName).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

async function deletePdfBlob(id) {
  try {
    const db = await openPdfDatabase();
    const tx = db.transaction(DB_CONFIG.storeName, "readwrite");
    tx.objectStore(DB_CONFIG.storeName).delete(id);
  } catch (err) {}
}

  // ==========================================
  // 1. 狀態管理 (Application State)
  // ==========================================
  const state = {
    materials: [],
    notes: [],
    chatMessages: [],
    currentTab: "materials",
    activeReaderMaterial: null
  };

  const STORAGE_KEYS = {
    MATERIALS: "learnflow_materials_list",
    NOTES: "learnflow_user_notes",
    CHAT: "learnflow_chat_history"
  };

  // ==========================================
  // 2. 本地儲存初始化 (Persistence)
  // ==========================================
  function initStorage() {
    // 載入原資料庫（若首次開啟或儲存為空，自動載入預設教材初始化）
    try {
      const storedMats = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      if (storedMats) {
        try {
          const parsed = JSON.parse(storedMats);
          if (Array.isArray(parsed) && parsed.length > 0) {
            state.materials = parsed;
          } else {
            state.materials = [...getDefaultMaterials()];
            saveMaterials();
          }
        } catch (parseErr) {
          state.materials = [...getDefaultMaterials()];
          saveMaterials();
        }
      } else {
        state.materials = [...getDefaultMaterials()];
        saveMaterials();
      }
    } catch (e) {
      console.warn("讀取原資料庫異常，改用預設教材:", e);
      state.materials = [...getDefaultMaterials()];
    }

    // 載入筆記
    try {
      const storedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (storedNotes) {
        try {
          const parsed = JSON.parse(storedNotes);
          state.notes = Array.isArray(parsed) ? parsed : [...getDefaultNotes()];
        } catch (parseErr) {
          state.notes = [...getDefaultNotes()];
        }
      } else {
        state.notes = [...getDefaultNotes()];
        saveNotes();
      }
    } catch (e) {
      state.notes = [...getDefaultNotes()];
    }

    // 載入對話歷史
    try {
      const storedChat = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (storedChat) {
        try {
          const parsed = JSON.parse(storedChat);
          state.chatMessages = Array.isArray(parsed) && parsed.length > 0 ? parsed : [...getDefaultChat()];
        } catch (parseErr) {
          state.chatMessages = [...getDefaultChat()];
        }
      } else {
        state.chatMessages = [...getDefaultChat()];
        saveChat();
      }
    } catch (e) {
      state.chatMessages = [...getDefaultChat()];
    }
  }

  function saveMaterials() {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(state.materials));
    } catch (e) {
      console.error("儲存原資料庫失敗:", e);
    }
  }

  function saveCustomMaterials(newMat) {
    state.materials.unshift(newMat);
    saveMaterials();
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(state.notes));
    } catch (e) {
      console.error("儲存筆記失敗:", e);
    }
  }

  function saveChat() {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(state.chatMessages));
    } catch (e) {
      console.error("儲存對話失敗:", e);
    }
  }

  // ==========================================
  // 3. Tab 1: 原始資料庫渲染 & 本地檔案上傳
  // ==========================================
  function renderMaterials() {
    const grid = document.getElementById("materials-grid");
    if (!grid) return;

    if (!state.materials || state.materials.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full bg-white border border-slate-200/90 rounded-3xl p-12 text-center shadow-sm">
          <div class="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i data-lucide="book-open" class="w-8 h-8"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800">目前資料庫尚無教材</h3>
          <p class="text-slate-500 mt-2 text-sm max-w-md mx-auto">
            您可以點擊上方「上傳教材」上傳自己的檔案 (.md / .docx / .pdf)，或點擊下方按鈕立即載入範例教材。
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <button id="restore-defaults-btn" class="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-sm transition-all text-sm flex items-center gap-2">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              <span>載入預設範例教材</span>
            </button>
            <button id="empty-state-upload-btn" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-sm flex items-center gap-2">
              <i data-lucide="upload" class="w-4 h-4"></i>
              <span>上傳本機檔案</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById("restore-defaults-btn")?.addEventListener("click", () => {
        if (typeof window.resetDefaultMaterials === "function") window.resetDefaultMaterials();
      });
      document.getElementById("empty-state-upload-btn")?.addEventListener("click", () => {
        document.getElementById("upload-modal")?.classList.remove("hidden");
      });
      safeCreateIcons();
      return;
    }

    let html = "";
    state.materials.forEach((mat) => {
      const linkedNotesCount = state.notes.filter((n) => n.materialId === mat.id).length;

      const tagsHtml = (mat.tags || [])
        .map((t) => `<span class="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium">#${t}</span>`)
        .join("");

      html += `
        <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs px-3 py-1 rounded-full font-bold bg-brand-50 text-brand-700">
                ${mat.category || "學習資料"}
              </span>
              <span class="text-xs text-slate-400 font-medium">${mat.source || "自訂資料"}</span>
            </div>

            <h3 class="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
              ${mat.title}
            </h3>

            <p class="text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
              ${mat.summary || "暫無摘要說明"}
            </p>

            <div class="flex flex-wrap gap-1.5 mt-4">
              ${tagsHtml}
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <i data-lucide="link" class="w-3.5 h-3.5"></i>
              <span>已建立 <strong>${linkedNotesCount}</strong> 則關聯筆記</span>
            </span>

            <div class="flex items-center gap-1.5">
              <button class="open-reader-btn px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all" data-id="${mat.id}">
                閱讀講義
              </button>
              <button class="quick-note-for-mat-btn px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-1" data-id="${mat.id}">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                <span>寫筆記</span>
              </button>
              <button class="delete-mat-btn p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" data-id="${mat.id}" title="刪除此資料">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    safeCreateIcons();

    // 綁定事件
    grid.querySelectorAll(".open-reader-btn").forEach((btn) => {
      btn.addEventListener("click", () => openReaderModal(btn.dataset.id));
    });

    grid.querySelectorAll(".quick-note-for-mat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mat = state.materials.find((m) => m.id === btn.dataset.id);
        if (mat) openNoteModal(null, mat);
      });
    });

    grid.querySelectorAll(".delete-mat-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteMaterial(btn.dataset.id));
    });
  }

  // 刪除原始資料邏輯
  function deleteMaterial(materialId) {
    const mat = state.materials.find((m) => m.id === materialId);
    if (!mat) return;

    if (confirm(`確定要刪除原始資料「${mat.title}」嗎？此動作無法復原。`)) {
      // 1. 從資料庫中移除
      state.materials = state.materials.filter((m) => m.id !== materialId);
      saveMaterials();
      deletePdfBlob(materialId);

      // 2. 解除曾關聯此資料的筆記（保護使用者筆記不被連帶刪除）
      let unlinkedCount = 0;
      state.notes.forEach((n) => {
        if (n.materialId === materialId) {
          n.materialId = null;
          n.materialTitle = `${n.materialTitle}（原資料已刪除）`;
          unlinkedCount++;
        }
      });
      if (unlinkedCount > 0) saveNotes();

      // 3. 重新渲染畫面
      renderMaterials();
      renderNotes();
      showToast(`已成功刪除「${mat.title}」`);
    }
  }

  // 核心特色：本地檔案 (.md / .txt / .docx / .pdf) 直接上傳與純前端解析
  async function handleNativeFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    const ext = file.name.split(".").pop().toLowerCase();
    const newMaterialId = "mat-upload-" + Date.now();

    showToast(`正在解析檔案「${file.name}」中...`);

    try {
      let content = "";
      let categoryName = "教材講義";
      let isPdfFile = false;

      if (ext === "md" || ext === "txt") {
        // 1. 純文字與 Markdown 讀取
        content = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsText(file, "UTF-8");
        });
        categoryName = ext === "md" ? "Markdown 講義" : "純文字資料";
      } else if (ext === "docx") {
        // 2. Word (.docx) 解析（透過 Mammoth.js 純前端轉換）
        if (typeof mammoth === "undefined") {
          throw new Error("Word 解析庫尚未載入，請確認網路連線。");
        }
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToMarkdown({ arrayBuffer });
        content = result.value || "（Word 檔案內無文字內容）";
        categoryName = "Word 文件";
      } else if (ext === "pdf") {
        // 3. PDF (.pdf) 解析（透過 Mozilla PDF.js 純前端文字萃取並存入 IndexedDB 原版庫）
        if (typeof window.pdfjsLib === "undefined") {
          throw new Error("PDF 解析庫尚未載入，請確認網路連線。");
        }
        isPdfFile = true;

        // 🌟 轉為 ArrayBuffer 並建立標準 application/pdf Blob 存入 IndexedDB
        const arrayBuffer = await file.arrayBuffer();
        const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
        await savePdfBlob(newMaterialId, pdfBlob);

        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        // 背景文字萃取（提供 AI 檢索用）：提高至 60 頁，兼顧 AI 檢索涵蓋度與效能
        const maxPagesToExtract = Math.min(totalPages, 60);

        let extractedText = `> 📄 **PDF 全書資訊**：全書共 ${totalPages} 頁（原版 PDF 高清視覺閱讀器已就緒，可完整翻閱所有頁數）。\n\n`;

        for (let pageNum = 1; pageNum <= maxPagesToExtract; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          let lastY = null;
          let pageText = "";
          for (const item of textContent.items) {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 6) {
              pageText += "\n";
            } else if (pageText && !pageText.endsWith(" ")) {
              pageText += " ";
            }
            pageText += item.str;
            lastY = item.transform[5];
          }

          extractedText += `### 頁碼 ${pageNum}\n\n${pageText}\n\n---\n\n`;
        }

        content = extractedText;
        categoryName = "PDF 全本教材";
      } else {
        alert("不支援的檔案格式，請上傳 .md, .txt, .docx 或 .pdf 檔案。");
        return;
      }

      // 自動產生摘要
      const cleanSummary = content
        .replace(/[#*`>-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 110);

      const newMaterial = {
        id: newMaterialId,
        title: fileNameWithoutExt,
        category: categoryName,
        source: `本機檔案匯入 (${file.name})`,
        tags: [ext.toUpperCase(), "本機上傳"],
        summary: cleanSummary ? cleanSummary + "..." : "本機直接上傳之學習資料",
        content: content,
        isPdf: isPdfFile
      };

      saveCustomMaterials(newMaterial);
      renderMaterials();
      showToast(`🎉 成功匯入「${file.name}」至資料庫！`);
    } catch (err) {
      console.error("解析檔案失敗:", err);
      alert(`解析檔案失敗：${err.message || "檔案可能已損毀或受到保護"}`);
    } finally {
      event.target.value = "";
    }
  }

  // ==========================================
  // 3. 高清原版 PDF 畫布視覺閱讀器引擎 (PDF.js Canvas Engine: 支援單頁 / 雙頁展開 / 全螢幕)
  // ==========================================
  let activePdfBlobUrl = null;
  let currentPdfDoc = null;
  let currentPdfPage = 1;
  let currentPdfScale = 1.25;
  let isRenderingPdf = false;
  let pdfPagePending = null;
  let isDualPageMode = false;

  async function renderSingleCanvasPage(pageNum, canvas, scale) {
    if (!currentPdfDoc || !canvas) return;
    const page = await currentPdfDoc.getPage(pageNum);
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: scale });

    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0); // 重設變換矩陣避免縮放累積
    ctx.scale(dpr, dpr);

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  }

  async function renderPdfSpread(pageNum) {
    if (!currentPdfDoc) return;
    isRenderingPdf = true;

    try {
      const leftCanvas = document.getElementById("pdf-page-canvas-left");
      const rightCanvas = document.getElementById("pdf-page-canvas-right");
      if (!leftCanvas) return;

      if (!isDualPageMode) {
        // 單頁模式
        if (rightCanvas) rightCanvas.classList.add("hidden");
        leftCanvas.classList.remove("hidden");
        await renderSingleCanvasPage(pageNum, leftCanvas, currentPdfScale);

        const curPageInput = document.getElementById("pdf-current-page-input");
        if (curPageInput) curPageInput.value = pageNum;
      } else {
        // 雙頁展開模式（左右並排顯示兩頁）
        leftCanvas.classList.remove("hidden");
        if (rightCanvas) rightCanvas.classList.remove("hidden");

        // 渲染左頁
        await renderSingleCanvasPage(pageNum, leftCanvas, currentPdfScale);

        // 渲染右頁（若有下一頁）
        const rightPageNum = pageNum + 1;
        if (rightPageNum <= currentPdfDoc.numPages && rightCanvas) {
          rightCanvas.style.display = "";
          await renderSingleCanvasPage(rightPageNum, rightCanvas, currentPdfScale);
        } else if (rightCanvas) {
          rightCanvas.style.display = "none";
        }

        const curPageInput = document.getElementById("pdf-current-page-input");
        if (curPageInput) {
          const rightDisplay = rightPageNum <= currentPdfDoc.numPages ? ` - ${rightPageNum}` : "";
          curPageInput.value = `${pageNum}${rightDisplay}`;
        }
      }
    } catch (err) {
      console.warn("PDF.js 畫布繪製:", err);
    } finally {
      isRenderingPdf = false;
      if (pdfPagePending !== null) {
        const nextNum = pdfPagePending;
        pdfPagePending = null;
        renderPdfSpread(nextNum);
      }
    }

    // 更新工具列資訊
    const totalPagesEl = document.getElementById("pdf-total-pages-span");
    if (totalPagesEl) totalPagesEl.textContent = currentPdfDoc.numPages;
    const zoomText = document.getElementById("pdf-zoom-level-text");
    if (zoomText) zoomText.textContent = Math.round(currentPdfScale * 100) + "%";

    const prevBtn = document.getElementById("pdf-prev-page-btn");
    if (prevBtn) prevBtn.disabled = pageNum <= 1;
    const nextBtn = document.getElementById("pdf-next-page-btn");
    if (nextBtn) {
      const maxPage = isDualPageMode ? currentPdfDoc.numPages - 1 : currentPdfDoc.numPages;
      nextBtn.disabled = pageNum >= maxPage;
    }
  }

  function queueRenderPdfSpread(pageNum) {
    if (isRenderingPdf) {
      pdfPagePending = pageNum;
    } else {
      renderPdfSpread(pageNum);
    }
  }

  function handleNextPage() {
    if (!currentPdfDoc) return;
    const step = isDualPageMode ? 2 : 1;
    if (currentPdfPage + step <= currentPdfDoc.numPages) {
      currentPdfPage += step;
      queueRenderPdfSpread(currentPdfPage);
    } else if (isDualPageMode && currentPdfPage + 1 <= currentPdfDoc.numPages) {
      currentPdfPage += 1;
      queueRenderPdfSpread(currentPdfPage);
    }
  }

  function handlePrevPage() {
    if (!currentPdfDoc) return;
    const step = isDualPageMode ? 2 : 1;
    if (currentPdfPage - step >= 1) {
      currentPdfPage -= step;
      queueRenderPdfSpread(currentPdfPage);
    } else if (currentPdfPage > 1) {
      currentPdfPage = 1;
      queueRenderPdfSpread(currentPdfPage);
    }
  }

  function toggleDualPageMode() {
    isDualPageMode = !isDualPageMode;
    const label = document.getElementById("pdf-dual-mode-label");
    const btn = document.getElementById("pdf-toggle-dual-btn");

    if (label) {
      label.textContent = isDualPageMode ? "單頁模式" : "雙頁開本";
    }
    if (btn) {
      if (isDualPageMode) {
        btn.classList.add("bg-brand-600", "text-white");
        btn.classList.remove("bg-slate-800");
      } else {
        btn.classList.remove("bg-brand-600", "text-white");
        btn.classList.add("bg-slate-800");
      }
    }

    // 自動微調縮放比例適配雙頁展開
    fitPdfWidth();
  }

  function fitPdfWidth() {
    if (!currentPdfDoc) return;
    currentPdfDoc.getPage(currentPdfPage).then((page) => {
      const viewportContainer = document.getElementById("pdf-viewport-container");
      const containerWidth = viewportContainer ? viewportContainer.clientWidth - 48 : 800;
      const unscaledViewport = page.getViewport({ scale: 1.0 });

      if (isDualPageMode) {
        // 雙頁展開模式：寬度平分給左右兩頁，外加頁面間隙
        currentPdfScale = Math.max(0.4, Math.min(2.0, (containerWidth - 48) / (unscaledViewport.width * 2)));
      } else {
        // 單頁模式：適配整面寬度
        currentPdfScale = Math.max(0.6, Math.min(2.5, containerWidth / unscaledViewport.width));
      }
      queueRenderPdfSpread(currentPdfPage);
    });
  }

  async function setupVisualPdfViewer(pdfBlob, contentBox, mat) {
    if (activePdfBlobUrl) {
      URL.revokeObjectURL(activePdfBlobUrl);
    }
    activePdfBlobUrl = URL.createObjectURL(pdfBlob);

    const arrayBuffer = await pdfBlob.arrayBuffer();
    if (!window.pdfjsLib) {
      throw new Error("PDF.js 視覺渲染核心尚未載入");
    }

    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    currentPdfDoc = await loadingTask.promise;
    currentPdfPage = 1;
    // 預設寬螢幕 (>=1024px) 建議啟用雙頁模式
    isDualPageMode = window.innerWidth >= 1150;
    currentPdfScale = isDualPageMode ? 0.95 : 1.25;

    contentBox.innerHTML = `
      <div class="flex flex-col h-full select-none">
        
        <!-- 專業 PDF 原版導覽控制列 (翻頁、跳頁、縮放、雙頁展開、全螢幕、適配寬度、下載、外鏈開啟) -->
        <div class="p-2 sm:p-2.5 bg-slate-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-md shrink-0 mb-3 border border-slate-700">
          
          <!-- 左側：翻頁控制與頁碼跳轉 -->
          <div class="flex items-center gap-1 sm:gap-2">
            <button id="pdf-prev-page-btn" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1" title="上一頁 (快捷鍵: ← / PageUp)">
              <i data-lucide="chevron-left" class="w-4 h-4"></i>
              <span class="hidden sm:inline">上一頁</span>
            </button>

            <div class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 rounded-xl text-xs border border-slate-700/60">
              <span class="text-slate-400">頁數</span>
              <input 
                type="text" 
                id="pdf-current-page-input" 
                value="${isDualPageMode ? '1 - 2' : '1'}" 
                class="w-16 text-center bg-slate-800 border border-slate-600 rounded-lg text-white font-bold py-0.5 focus:outline-none focus:border-brand-500 text-xs"
                title="輸入頁碼按 Enter 跳轉"
              />
              <span class="text-slate-400">/ <span id="pdf-total-pages-span">${currentPdfDoc.numPages}</span></span>
            </div>

            <button id="pdf-next-page-btn" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1" title="下一頁 (快捷鍵: → / PageDown / Space)">
              <span class="hidden sm:inline">下一頁</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- 中間：雙頁模式切換與縮放控制 -->
          <div class="flex items-center gap-1.5">
            <!-- 雙頁展開模式切換按鈕 -->
            <button id="pdf-toggle-dual-btn" class="px-2.5 py-1.5 ${isDualPageMode ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'} rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700/60" title="切換雙頁開本 / 單頁模式 (快捷鍵: D)">
              <i data-lucide="book-open" class="w-4 h-4 ${isDualPageMode ? 'text-white' : 'text-brand-400'}"></i>
              <span id="pdf-dual-mode-label">${isDualPageMode ? '單頁模式' : '雙頁開本'}</span>
            </button>

            <div class="h-4 w-px bg-slate-700 mx-0.5 hidden sm:block"></div>

            <button id="pdf-zoom-out-btn" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs transition-all" title="縮小 (快捷鍵: -)">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            
            <button id="pdf-zoom-reset-btn" class="px-2 py-1 bg-slate-950/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono font-bold border border-slate-700/60" title="重設縮放">
              <span id="pdf-zoom-level-text">${Math.round(currentPdfScale * 100)}%</span>
            </button>

            <button id="pdf-zoom-in-btn" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs transition-all" title="放大 (快捷鍵: +)">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>

            <button id="pdf-fit-width-btn" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all hidden sm:flex items-center gap-1" title="最適螢幕寬度 (快捷鍵: W)">
              <i data-lucide="maximize" class="w-3.5 h-3.5"></i>
              <span class="hidden md:inline">適配寬度</span>
            </button>
          </div>

          <!-- 右側：全螢幕切換、外鏈開啟與下載原檔 -->
          <div class="flex items-center gap-1.5">
            <!-- 專屬全螢幕切換按鈕 -->
            <button id="pdf-fullscreen-action-btn" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm" title="全螢幕專注閱讀 (快捷鍵: F)">
              <i data-lucide="maximize-2" class="w-4 h-4" id="pdf-fs-action-icon"></i>
              <span class="hidden sm:inline" id="pdf-fs-action-label">全螢幕</span>
            </button>

            <a href="${activePdfBlobUrl}" target="_blank" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1" title="在瀏覽器獨立分頁開啟">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              <span class="hidden lg:inline">獨立分頁</span>
            </a>

            <a href="${activePdfBlobUrl}" download="${mat.title}.pdf" class="p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1" title="下載完整原版 PDF 檔案">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">下載</span>
            </a>
          </div>

        </div>

        <!-- 高清原版 PDF 畫布渲染視窗 (深色背景襯托真實紙張雙頁展開) -->
        <div id="pdf-viewport-container" class="flex-1 w-full bg-slate-950/95 rounded-2xl overflow-auto flex items-center justify-center p-2 sm:p-5 min-h-[480px] border border-slate-800 shadow-inner">
          <div id="pdf-spread-container" class="flex items-center justify-center gap-3 sm:gap-6 flex-wrap sm:flex-nowrap mx-auto my-auto transition-all">
            <canvas id="pdf-page-canvas-left" class="shadow-2xl rounded-sm bg-white transition-all"></canvas>
            <canvas id="pdf-page-canvas-right" class="shadow-2xl rounded-sm bg-white transition-all hidden"></canvas>
          </div>
        </div>

        <!-- 底部折疊：AI 文字摘要索引草稿 -->
        <details class="text-xs text-slate-500 pt-2 group shrink-0">
          <summary class="cursor-pointer font-bold text-slate-700 hover:text-brand-600 flex items-center gap-1">
            <span>檢視 AI 語意檢索之文字索引草稿</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 group-open:rotate-180 transition-transform"></i>
          </summary>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-2 markdown-body text-xs max-h-36 overflow-y-auto leading-relaxed">
            ${safeMarkdownParse(mat.content)}
          </div>
        </details>

      </div>
    `;

    safeCreateIcons();

    // 工具列按鈕事件綁定
    document.getElementById("pdf-prev-page-btn")?.addEventListener("click", handlePrevPage);
    document.getElementById("pdf-next-page-btn")?.addEventListener("click", handleNextPage);
    document.getElementById("pdf-toggle-dual-btn")?.addEventListener("click", toggleDualPageMode);
    document.getElementById("pdf-fullscreen-action-btn")?.addEventListener("click", toggleFullscreenReader);

    document.getElementById("pdf-current-page-input")?.addEventListener("change", (e) => {
      const match = e.target.value.match(/\d+/);
      let p = match ? parseInt(match[0], 10) : 1;
      if (isNaN(p) || p < 1) p = 1;
      if (p > currentPdfDoc.numPages) p = currentPdfDoc.numPages;
      currentPdfPage = p;
      queueRenderPdfSpread(currentPdfPage);
    });

    document.getElementById("pdf-zoom-in-btn")?.addEventListener("click", () => {
      currentPdfScale = Math.min(3.0, currentPdfScale + 0.15);
      queueRenderPdfSpread(currentPdfPage);
    });

    document.getElementById("pdf-zoom-out-btn")?.addEventListener("click", () => {
      currentPdfScale = Math.max(0.4, currentPdfScale - 0.15);
      queueRenderPdfSpread(currentPdfPage);
    });

    document.getElementById("pdf-zoom-reset-btn")?.addEventListener("click", () => {
      currentPdfScale = isDualPageMode ? 0.95 : 1.25;
      queueRenderPdfSpread(currentPdfPage);
    });

    document.getElementById("pdf-fit-width-btn")?.addEventListener("click", fitPdfWidth);

    // 繪製第一頁或雙頁展開
    await renderPdfSpread(currentPdfPage);
  }

  function setupMissingPdfBlobCard(contentBox, mat) {
    contentBox.innerHTML = `
      <div class="flex flex-col h-full space-y-4">
        <div class="p-8 text-center bg-brand-50/50 border-2 border-dashed border-brand-300 rounded-3xl space-y-4 max-w-xl mx-auto my-auto shadow-sm">
          <div class="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <i data-lucide="file-text" class="w-8 h-8"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-slate-900">檢視《${mat.title}》原版 PDF 高清原檔</h3>
            <p class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              此教材為先前匯入的 PDF。點擊下方按鈕選取你的本機原檔 PDF，系統將立即為你開啟<strong>高清原頁視覺閱讀器（含完整版面排版、圖形、色彩與公式）</strong>，並永久儲存至本機！
            </p>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <label class="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl cursor-pointer shadow-md transition-all flex items-center justify-center gap-2">
              <i data-lucide="upload" class="w-4 h-4"></i>
              <span>選取本機原版 PDF 立即檢視</span>
              <input type="file" accept=".pdf" class="hidden" id="bind-pdf-inline-input">
            </label>
          </div>
          
          <p class="text-xs text-slate-400">💡 提示：只需選取綁定一次，日後重新整理亦能直接以高清視覺翻頁閱讀！</p>
        </div>

        <details class="text-xs text-slate-500 pt-2 group shrink-0">
          <summary class="cursor-pointer font-bold text-slate-700 hover:text-brand-600 flex items-center gap-1">
            <span>檢視純文字草稿備份</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 group-open:rotate-180 transition-transform"></i>
          </summary>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-2 markdown-body text-xs max-h-40 overflow-y-auto leading-relaxed">
            ${safeMarkdownParse(mat.content)}
          </div>
        </details>
      </div>
    `;

    document.getElementById("bind-pdf-inline-input")?.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        showToast("正在載入原版 PDF 視覺原檔...");
        const arrayBuffer = await file.arrayBuffer();
        const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
        await savePdfBlob(mat.id, pdfBlob);
        showToast("🎉 原版 PDF 已成功就緒！");
        await setupVisualPdfViewer(pdfBlob, contentBox, mat);
      } catch (err) {
        alert("載入原版 PDF 失敗：" + err.message);
      }
    });

    safeCreateIcons();
  }

  async function openReaderModal(materialId) {
    const mat = state.materials.find((m) => m.id === materialId);
    if (!mat) return;

    state.activeReaderMaterial = mat;

    document.getElementById("modal-material-category").textContent = mat.category || "學習資料";
    document.getElementById("modal-material-title").textContent = mat.title;
    document.getElementById("modal-material-source").textContent = `資料來源：${mat.source || "自訂資料"}`;
    document.getElementById("modal-material-summary").textContent = mat.summary || "無摘要";

    const tagsBox = document.getElementById("modal-material-tags");
    tagsBox.innerHTML = (mat.tags || [])
      .map((t) => `<span class="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium">#${t}</span>`)
      .join("");

    const contentBox = document.getElementById("modal-material-content");

    // 檢查是否有儲存在 IndexedDB 的原版 PDF
    const storedPdfBlob = await getPdfBlob(mat.id);
    const isPdfMaterial = (mat.category && mat.category.includes("PDF")) || mat.isPdf || (mat.tags && mat.tags.includes("PDF"));

    if (storedPdfBlob) {
      // 🌟 核心：啟動 PDF.js 高清原檔視覺畫布閱讀器 (100% 原版版面、色彩與圖形)
      await setupVisualPdfViewer(storedPdfBlob, contentBox, mat);
    } else if (isPdfMaterial) {
      // 🌟 舊版或尚未載入原檔之 PDF：提供一鍵「立即選取本機原版 PDF 檔案」
      setupMissingPdfBlobCard(contentBox, mat);
    } else {
      // 標準 Markdown 渲染
      contentBox.innerHTML = safeMarkdownParse(mat.content || mat.summary);
    }

    // 更新邊讀邊記側邊欄的預設標題與本教材累積筆記列表
    const sideTitle = document.getElementById("side-note-title");
    if (sideTitle) sideTitle.value = `[隨堂筆記] ${mat.title}`;
    const sideTags = document.getElementById("side-note-tags");
    if (sideTags) sideTags.value = (mat.tags || []).join(", ");
    const sideContent = document.getElementById("side-note-content");
    if (sideContent) sideContent.value = "";
    renderSideNotesList(mat.id);

    document.getElementById("reader-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    safeCreateIcons();
  }

  function closeReaderModal() {
    document.getElementById("reader-modal").classList.add("hidden");
    document.body.style.overflow = "";
    if (activePdfBlobUrl) {
      URL.revokeObjectURL(activePdfBlobUrl);
      activePdfBlobUrl = null;
    }
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    currentPdfDoc = null;
    applyFullscreenReader(false);
    state.activeReaderMaterial = null;
  }

  // ==========================================
  // 3.1 專業閱讀工作台：全螢幕與邊讀邊記側邊欄邏輯
  // ==========================================
  let isFullscreenReader = false;

  async function toggleFullscreenReader() {
    isFullscreenReader = !isFullscreenReader;
    applyFullscreenReader(isFullscreenReader);

    // 啟動瀏覽器原生全螢幕 API 實現純粹沉浸式閱讀
    try {
      const modal = document.getElementById("reader-modal");
      if (isFullscreenReader) {
        if (!document.fullscreenElement && modal?.requestFullscreen) {
          await modal.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen().catch(() => {});
        }
      }
    } catch (e) {}

    setTimeout(() => {
      fitPdfWidth();
    }, 180);
  }

  function applyFullscreenReader(fullscreen) {
    isFullscreenReader = fullscreen;
    const modal = document.getElementById("reader-modal");
    const card = document.getElementById("reader-modal-card");
    const topIcon = document.getElementById("fullscreen-icon");
    const pdfIcon = document.getElementById("pdf-fs-action-icon");
    const pdfLabel = document.getElementById("pdf-fs-action-label");
    if (!modal || !card) return;

    if (fullscreen) {
      modal.classList.remove("p-2", "sm:p-4");
      modal.classList.add("p-0");
      card.classList.remove("max-w-5xl", "h-[92vh]", "rounded-3xl");
      card.classList.add("max-w-none", "w-screen", "h-screen", "rounded-none", "border-0");
      if (topIcon) topIcon.setAttribute("data-lucide", "minimize-2");
      if (pdfIcon) pdfIcon.setAttribute("data-lucide", "minimize-2");
      if (pdfLabel) pdfLabel.textContent = "退出全螢幕";
    } else {
      modal.classList.remove("p-0");
      modal.classList.add("p-2", "sm:p-4");
      card.classList.remove("max-w-none", "w-screen", "h-screen", "rounded-none", "border-0");
      card.classList.add("max-w-5xl", "h-[92vh]", "rounded-3xl");
      if (topIcon) topIcon.setAttribute("data-lucide", "maximize-2");
      if (pdfIcon) pdfIcon.setAttribute("data-lucide", "maximize-2");
      if (pdfLabel) pdfLabel.textContent = "全螢幕";
    }
    safeCreateIcons();
  }

  function toggleSideNotePanel() {
    const panel = document.getElementById("reader-side-note-panel");
    const btn = document.getElementById("toggle-side-note-btn");
    if (!panel) return;

    const isHidden = panel.classList.contains("hidden");
    if (isHidden) {
      panel.classList.remove("hidden");
      if (btn) {
        btn.classList.remove("bg-brand-50", "text-brand-700");
        btn.classList.add("bg-brand-600", "text-white");
      }
      if (state.activeReaderMaterial) {
        renderSideNotesList(state.activeReaderMaterial.id);
      }
    } else {
      panel.classList.add("hidden");
      if (btn) {
        btn.classList.remove("bg-brand-600", "text-white");
        btn.classList.add("bg-brand-50", "text-brand-700");
      }
    }
    safeCreateIcons();
  }

  function renderSideNotesList(materialId) {
    const countEl = document.getElementById("side-notes-count");
    const listEl = document.getElementById("side-notes-list");
    if (!listEl) return;

    const linkedNotes = state.notes.filter((n) => n.materialId === materialId);
    if (countEl) countEl.textContent = linkedNotes.length;

    if (linkedNotes.length === 0) {
      listEl.innerHTML = `<div class="p-3 text-center text-xs text-slate-400 italic bg-white/70 rounded-xl border border-dashed border-slate-200">本教材尚未有筆記，在上方隨寫即存！</div>`;
      return;
    }

    listEl.innerHTML = linkedNotes
      .map(
        (n) => `
        <div class="p-2.5 bg-white rounded-xl border border-slate-200 text-xs shadow-xs space-y-1 hover:border-brand-300 transition-all">
          <div class="font-bold text-slate-800 flex items-center justify-between">
            <span class="truncate max-w-[190px] text-brand-900">${n.title}</span>
            <span class="text-[10px] text-slate-400 font-normal">${n.createdAt}</span>
          </div>
          <p class="text-slate-600 line-clamp-2 text-[11px] leading-relaxed">${n.content}</p>
        </div>
      `
      )
      .join("");
  }

  function handleSideNoteSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("side-note-title").value.trim();
    const tagsStr = document.getElementById("side-note-tags").value.trim();
    const content = document.getElementById("side-note-content").value.trim();

    if (!title || !content) {
      alert("請填寫筆記標題與內容！");
      return;
    }

    const mat = state.activeReaderMaterial;
    const tags = tagsStr ? tagsStr.split(/[,，\s]+/).filter(Boolean) : ["研讀筆記"];

    const newNote = {
      id: "note-" + Date.now(),
      materialId: mat ? mat.id : null,
      materialTitle: mat ? mat.title : null,
      title: title,
      category: mat ? mat.category : "學習筆記",
      tags: tags,
      content: content,
      createdAt: new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "/")
    };

    state.notes.unshift(newNote);
    saveNotes();
    renderNotes();

    // 清空內容文字框並立即刷新下方列表
    document.getElementById("side-note-content").value = "";
    if (mat) {
      renderSideNotesList(mat.id);
    }
    showToast("🎉 隨堂筆記已儲存並成功關聯至此教材！");
  }

  // ==========================================
  // 4. Tab 2: 我的筆記本渲染
  // ==========================================
  function renderNotes() {
    const grid = document.getElementById("notes-grid");
    const emptyState = document.getElementById("notes-empty-state");
    if (!grid) return;

    if (state.notes.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    let html = "";
    state.notes.forEach((note) => {
      const tagsHtml = (note.tags || [])
        .map((t) => `<span class="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">#${t}</span>`)
        .join("");

      let linkedHtml = "";
      if (note.materialId && note.materialTitle) {
        linkedHtml = `
          <div class="mb-3 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-xl text-xs text-brand-700 flex items-center justify-between">
            <span class="flex items-center gap-1.5 font-semibold truncate">
              <i data-lucide="link" class="w-3.5 h-3.5 shrink-0 text-brand-600"></i>
              <span class="truncate">關聯資料：${note.materialTitle}</span>
            </span>
            <button class="view-linked-mat-btn text-[11px] underline font-bold shrink-0 ml-2" data-mat-id="${note.materialId}">
              檢視原文
            </button>
          </div>
        `;
      }

      const parsedContent = safeMarkdownParse(note.content);

      html += `
        <div class="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            ${linkedHtml}

            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs px-3 py-1 rounded-full font-bold bg-indigo-50 text-indigo-700">
                ${note.category || "自訂心得"}
              </span>
              <span class="text-xs text-slate-400 font-medium">${note.createdAt}</span>
            </div>

            <h3 class="text-xl font-bold text-slate-900 leading-snug">${note.title}</h3>

            <div class="flex flex-wrap gap-1 mt-2.5 mb-3.5">
              ${tagsHtml}
            </div>

            <div class="markdown-body text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100 max-h-56 overflow-y-auto">
              ${parsedContent}
            </div>
          </div>

          <div class="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400">已自動儲存至 LocalStorage</span>
            <div class="flex items-center gap-1">
              <button class="edit-note-btn p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-all" data-id="${note.id}" title="編輯筆記">
                <i data-lucide="edit" class="w-4 h-4"></i>
              </button>
              <button class="delete-note-btn p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" data-id="${note.id}" title="刪除筆記">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    safeCreateIcons();

    // 綁定編輯與刪除
    grid.querySelectorAll(".edit-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => openNoteModal(btn.dataset.id));
    });

    grid.querySelectorAll(".delete-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteNote(btn.dataset.id));
    });

    grid.querySelectorAll(".view-linked-mat-btn").forEach((btn) => {
      btn.addEventListener("click", () => openReaderModal(btn.dataset.matId));
    });
  }

  // 筆記 Modal
  function openNoteModal(noteId = null, linkedMaterial = null) {
    const modal = document.getElementById("note-modal");
    const header = document.getElementById("note-modal-header");
    const idInput = document.getElementById("form-note-id");
    const matIdInput = document.getElementById("form-note-mat-id");
    const matTitleInput = document.getElementById("form-note-mat-title");
    const linkedBox = document.getElementById("form-linked-material-box");
    const linkedTitleText = document.getElementById("form-linked-title-text");

    const titleInput = document.getElementById("form-note-title");
    const categoryInput = document.getElementById("form-note-category");
    const tagsInput = document.getElementById("form-note-tags");
    const contentInput = document.getElementById("form-note-content");

    if (noteId) {
      const note = state.notes.find((n) => n.id === noteId);
      if (!note) return;
      header.textContent = "編輯學習筆記";
      idInput.value = note.id;
      matIdInput.value = note.materialId || "";
      matTitleInput.value = note.materialTitle || "";

      if (note.materialTitle) {
        linkedBox.classList.remove("hidden");
        linkedTitleText.textContent = note.materialTitle;
      } else {
        linkedBox.classList.add("hidden");
      }

      titleInput.value = note.title;
      categoryInput.value = note.category || "";
      tagsInput.value = (note.tags || []).join(", ");
      contentInput.value = note.content;
    } else if (linkedMaterial) {
      header.textContent = `針對原資料做筆記：${linkedMaterial.title}`;
      idInput.value = "";
      matIdInput.value = linkedMaterial.id;
      matTitleInput.value = linkedMaterial.title;

      linkedBox.classList.remove("hidden");
      linkedTitleText.textContent = linkedMaterial.title;

      titleInput.value = `📝 ${linkedMaterial.title} - 我的理解與反思`;
      categoryInput.value = linkedMaterial.category;
      tagsInput.value = (linkedMaterial.tags || []).join(", ");
      contentInput.value = `### 💡 核心心得歸納\n- \n\n### ❓ 待釐清或延伸問題\n- `;
    } else {
      header.textContent = "撰寫新學習筆記";
      idInput.value = "";
      matIdInput.value = "";
      matTitleInput.value = "";
      linkedBox.classList.add("hidden");

      titleInput.value = "";
      categoryInput.value = "自訂心得";
      tagsInput.value = "";
      contentInput.value = "";
    }

    modal.classList.remove("hidden");
    titleInput.focus();
    safeCreateIcons();
  }

  function closeNoteModal() {
    document.getElementById("note-modal").classList.add("hidden");
  }

  function handleNoteSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("form-note-id").value;
    const materialId = document.getElementById("form-note-mat-id").value || null;
    const materialTitle = document.getElementById("form-note-mat-title").value || "";
    const title = document.getElementById("form-note-title").value.trim();
    const category = document.getElementById("form-note-category").value.trim() || "自訂筆記";
    const rawTags = document.getElementById("form-note-tags").value;
    const content = document.getElementById("form-note-content").value.trim();

    if (!title || !content) {
      showToast("請完整填寫標題與內容");
      return;
    }

    const tags = rawTags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const today = new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });

    if (id) {
      const idx = state.notes.findIndex((n) => n.id === id);
      if (idx !== -1) {
        state.notes[idx] = {
          ...state.notes[idx],
          materialId,
          materialTitle,
          title,
          category,
          tags,
          content
        };
        showToast("筆記已更新！");
      }
    } else {
      const newNote = {
        id: "note-" + Date.now(),
        materialId,
        materialTitle,
        title,
        category,
        tags,
        content,
        createdAt: today
      };
      state.notes.unshift(newNote);
      showToast("新筆記已儲存！");
    }

    saveNotes();
    closeNoteModal();
    renderNotes();
    renderMaterials();
  }

  function deleteNote(noteId) {
    if (confirm("確定要刪除這則筆記嗎？")) {
      state.notes = state.notes.filter((n) => n.id !== noteId);
      saveNotes();
      renderNotes();
      renderMaterials();
      showToast("筆記已刪除");
    }
  }

  // ==========================================
  // 5. Tab 3: AI 知識伴讀與整合檢索 (高清晰、條理化解答引擎)
  // ==========================================
  function renderChat() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    let html = "";
    state.chatMessages.forEach((msg) => {
      const isAI = msg.sender === "ai";

      // 極簡優雅的參考資源膠囊（不雜亂）
      let referencePillsHtml = "";
      if (isAI && msg.matchedData) {
        const { materials, notes } = msg.matchedData;
        const hasMats = materials && materials.length > 0;
        const hasNotes = notes && notes.length > 0;

        if (hasMats || hasNotes) {
          referencePillsHtml += `
            <div class="mt-3.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span class="text-slate-400 font-semibold text-[11px] mr-1">📎 關聯資源：</span>
          `;

          if (hasMats) {
            materials.forEach((m) => {
              referencePillsHtml += `
                <button class="chat-open-mat-btn px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200/60 rounded-lg transition-all font-medium flex items-center gap-1" data-id="${m.id}">
                  <span>📚 ${m.title}</span>
                </button>
              `;
            });
          }

          if (hasNotes) {
            notes.forEach((n) => {
              referencePillsHtml += `
                <span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-lg font-medium">
                  📝 ${n.title}
                </span>
              `;
            });
          }

          referencePillsHtml += `</div>`;
        }
      }

      html += `
        <div class="flex flex-col ${isAI ? "items-start" : "items-end"} gap-1.5 animate-fade-in">
          <div class="flex items-center gap-2 text-xs text-slate-400 px-1">
            <span class="font-bold ${isAI ? "text-brand-600" : "text-slate-600"}">${isAI ? "AI 學習助教" : "我"}</span>
            <span>${msg.time || ""}</span>
          </div>

          <div class="max-w-[92%] sm:max-w-[85%] p-5 text-base leading-relaxed ${isAI ? "chat-bubble-ai" : "chat-bubble-user"}">
            <div class="markdown-body ${!isAI ? "text-white" : ""}">
              ${safeMarkdownParse(msg.text)}
            </div>

            ${referencePillsHtml}

            ${
              isAI
                ? `<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end">
                    <button class="save-ai-to-note-btn text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 rounded-lg transition-all" data-text="${encodeURIComponent(
                      msg.text
                    )}">
                      <i data-lucide="file-plus-2" class="w-3.5 h-3.5"></i>
                      <span>📥 一鍵存入筆記本</span>
                    </button>
                   </div>`
                : ""
            }
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    safeCreateIcons();

    // 若有載入 KaTeX 則自動渲染數學公式
    if (typeof renderMathInElement !== "undefined") {
      try {
        renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }

    container.scrollTop = container.scrollHeight;

    // 綁定一鍵存入筆記
    container.querySelectorAll(".save-ai-to-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = decodeURIComponent(btn.dataset.text);
        openNoteModal(null, null);
        document.getElementById("form-note-title").value = "💡 來自 AI 助教的解答重點";
        document.getElementById("form-note-category").value = "隨堂心得";
        document.getElementById("form-note-tags").value = "AI問答, 重點複習";
        document.getElementById("form-note-content").value = text;
      });
    });

    // 綁定在對話中直接點擊查看原資料
    container.querySelectorAll(".chat-open-mat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        openReaderModal(btn.dataset.id);
      });
    });
  }

  function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" });

    // 加入使用者訊息
    state.chatMessages.push({
      id: "msg-" + Date.now(),
      sender: "user",
      text: text,
      time: timeStr
    });

    input.value = "";
    renderChat();

    // 模擬 AI 生成條理化回答與資料庫動態萃取
    setTimeout(() => {
      const { replyText, matchedData } = generateSmartResponseWithSearch(text);
      state.chatMessages.push({
        id: "msg-" + Date.now(),
        sender: "ai",
        text: replyText,
        time: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }),
        matchedData: matchedData
      });
      saveChat();
      renderChat();
    }, 500);
  }

  // 核心：高度條理化、具備數學與專業教材萃取能力的智能引擎
  function generateSmartResponseWithSearch(query) {
    const rawQ = query.trim();
    const q = rawQ.toLowerCase();

    // 分詞與關鍵字萃取（過濾常見贅字）
    const stopWords = ["請問", "什麼是", "可以", "解釋", "一下", "嗎", "？", "?", "如何", "在學什麼", "有甚麼", "有什麼", "關於", "的", "是", "了", "我想", "了解", "知道"];
    let cleanQ = q;
    stopWords.forEach((w) => {
      cleanQ = cleanQ.replaceAll(w, " ");
    });
    const keywords = cleanQ.split(/\s+/).filter((w) => w.length >= 2);
    if (keywords.length === 0) keywords.push(q);

    // 1. 檢索匹配的原始資料（支援標題、分類、標籤與正文雙向語意比對）
    const matchedMats = state.materials.filter((m) => {
      const titleLower = (m.title || "").toLowerCase();
      const catLower = (m.category || "").toLowerCase();
      const tags = (m.tags || []).map((t) => t.toLowerCase());

      return (
        titleLower.includes(q) ||
        catLower.includes(q) ||
        tags.some((t) => t.includes(q) || q.includes(t)) ||
        keywords.some(
          (kw) =>
            titleLower.includes(kw) ||
            kw.includes(titleLower) ||
            catLower.includes(kw) ||
            tags.some((t) => kw.includes(t) || t.includes(kw))
        )
      );
    });

    // 2. 檢索匹配的個人筆記
    const matchedNotes = state.notes.filter((n) => {
      const titleLower = (n.title || "").toLowerCase();
      const tags = (n.tags || []).map((t) => t.toLowerCase());

      return (
        titleLower.includes(q) ||
        tags.some((t) => t.includes(q) || q.includes(t)) ||
        keywords.some(
          (kw) =>
            titleLower.includes(kw) ||
            kw.includes(titleLower) ||
            tags.some((t) => kw.includes(t) || t.includes(kw))
        )
      );
    });

    let reply = "";

    // === 學科領域專屬精準解析 (使用清晰標準數學符號，絕無破版代碼) ===
    
    // 1. 微積分相關
    if (q.includes("微積分") || q.includes("導數") || q.includes("極限") || q.includes("積分") || q.includes("ftc") || q.includes("微分")) {
      reply = `### 📐 微積分核心定理與概念解析

- **核心本質**：微積分是研究「無窮逼近與連續變化」的數學工具。
- **三大不可不知的基石**：
  1. **極限與連續 (Limits & Continuity)**：導數與積分的數學嚴格性皆建立在極限之上。
  2. **導數 (Derivative)**：代表函數在某一點的「瞬時變化率」或幾何上的切線斜率。
  3. **微積分基本定理 (FTC)**：連結了微分與積分，證明求面積的定積分可透過求反導函數的差值計算：
     \`∫_a^b f(x) dx = F(b) - F(a)\`
- **工程實務應用**：機器學習中的「梯度下降法 (Gradient Descent)」便是利用多變數微積分的梯度方向尋找損失函數極小值！`;
    }

    // 2. 線性代數相關
    else if (q.includes("線性代數") || q.includes("矩陣") || q.includes("特徵值") || q.includes("特徵向量") || q.includes("向量") || q.includes("空間") || q.includes("pca")) {
      reply = `### 🔢 線性代數：空間轉換與幾何意涵

- **核心本質**：線性代數不是單純的數字乘法，而是「空間的旋轉、拉伸與降維變換」。
- **三大核心要點**：
  1. **矩陣是線性變換**：矩陣 A 乘以向量 x（\`A · x = y\`），本質是將向量映射到由 A 的各欄 (Column) 所定義的新坐標系中。
  2. **特徵向量與特徵值 (\`A · v = λ · v\`)**：在空間變換中，**方向未曾改變**、僅長度被縮放了 λ 倍的特殊主軸方向即為特徵向量。
  3. **線性獨立**：向量之間互不冗餘，能以最精簡的維度張成 (Span) 目標空間。
- **工程實務應用**：資料科學中的主成分分析 (PCA)、Google PageRank 網頁排序皆以特徵值分解為核心！`;
    }

    // 3. 離散數學相關
    else if (q.includes("離散數學") || q.includes("邏輯") || q.includes("圖論") || q.includes("集合") || q.includes("等價") || q.includes("樹")) {
      reply = `### 🧩 離散數學：計算機科學的理論底層

- **核心本質**：處理非連續的「離散結構」，是演算法、資料結構與編程邏輯的數學語言。
- **三大核心要點**：
  1. **命題邏輯與等價**：條件命題 \`P → Q\` 與其對偶逆否命題 \`¬Q → ¬P\` 完全等價，是反證法的核心基石。
  2. **等價關係**：具備「反身性、對稱性、遞移性」的三大特質，是關聯式資料庫正規化的理論來源。
  3. **圖論 (Graph Theory)**：頂點與邊組成的網絡模型，涵蓋最短路徑 (Dijkstra)、樹 (Tree) 結構與歐拉/哈密頓路徑。`;
    }

    // 4. AI 部份原理與系統架構
    else if (q.includes("ai") && (q.includes("原理") || q.includes("架構") || q.includes("運作") || q.includes("rag") || q.includes("檢索") || q.includes("伴讀"))) {
      reply = `### 🤖 LearnFlow AI 知識伴讀與整合檢索原理

本系統的 AI 模組採用**純前端輕量化 RAG (檢索增強生成，Retrieval-Augmented Generation) 架構**：

1. **多維雙軌檢索 (Dual-Track Grounded Retrieval)**：
   - 當你輸入問題時，系統會同時掃描「📚 原始資料庫 (含上傳的 PDF/Word/Markdown)」與「📝 個人筆記本」，透過分詞、詞頻比對與標籤相關度進行精準匹配。
2. **學科領域精準對齊 (Domain Grounding)**：
   - 內建微積分、線性代數、離散數學與提示工程之領域知識庫，能提供條理化、零幻覺的高清解析。
3. **動態資源回連膠囊 (Context Pills)**：
   - AI 在產出回答時，會自動在下方生成匹配之教材與筆記連結按鈕，點擊即可一秒打開原版課本研讀，達成「問答 ➔ 研讀 ➔ 筆記」的閉環。
4. **一鍵存入筆記 (One-Click Extract)**：
   - 點擊回答右下角「📥 一鍵存入筆記本」，系統會自動將 AI 精華整理儲存為個人筆記，資料持久保存在本機 localStorage！`;
    }

    // 5. AI 提示工程相關
    else if (q.includes("prompt") || q.includes("提示") || q.includes("cot") || q.includes("few-shot")) {
      reply = `### 💡 AI 提示工程核心心法

- **核心本質**：引導高維機率語言模型 (LLM) 收斂至高精確度解答的規格說明書。
- **三大黃金法則**：
  1. **設定角色與受眾 (Role)**：賦予具體專家定位（如「資深演算法工程師」）。
  2. **思維鏈 (Chain-of-Thought, CoT)**：加入「**請一步一步思考 (Think step by step)**」，強迫模型展開中間推導，能顯著降低邏輯幻覺。
  3. **少樣本示範 (Few-Shot)**：提供 1~2 組「輸入 ➔ 輸出」範例讓 AI 模仿結構。`;
    }

    // 6. JavaScript 非同步相關
    else if (q.includes("async") || q.includes("非同步") || q.includes("promise") || q.includes("event loop")) {
      reply = `### ⚡ JavaScript 非同步與 Event Loop 解析

- **核心本質**：JavaScript 為單執行緒，透過瀏覽器事件循環 (Event Loop) 實現非阻塞 I/O。
- **語法演進**：\`Callback 巢狀地獄\` ➔ \`Promise 鏈式呼叫\` ➔ \`async / await\` 語法糖。
- **微任務 vs 巨任務**：Promise.then (Microtask) 的執行優先權永遠高於 setTimeout (Macrotask)！`;
    }

    // 7. 學習法與記憶相關
    else if (q.includes("記憶") || q.includes("間隔") || q.includes("學習法") || q.includes("recall")) {
      reply = `### 🧠 認知科學：打破遺忘曲線的雙大利器

- **主動回想 (Active Recall)**：讀完後蓋上書，自己解釋給自己聽（提取記憶能強化大腦神經突觸）。
- **間隔重複 (Spaced Repetition)**：在即將遺忘的臨界點複習（第 1 天 ➔ 第 3 天 ➔ 第 7 天）。
- **避免熟悉感假象**：反覆重讀劃線只是看懂，不代表大腦真正能夠提取！`;
    }

    // 8. 友好問候與系統導覽
    else if (q.includes("你好") || q.includes("嗨") || q.includes("哈囉") || q.includes("hello") || q.includes("hi") || q.includes("你是誰") || q.includes("說明")) {
      reply = `### 👋 你好！我是你的 LearnFlow 隨身學習助教

很高興為你服務！我可以協助你：
- **📐 學科觀念導讀**：微積分（導數、極限、基本定理）、線性代數（矩陣變換、特徵值）、離散數學（邏輯、圖論）等。
- **🔍 檢索你的課本與筆記**：直接搜尋你上傳的講義內容，並提供精確指引。
- **📝 隨堂筆記輔助**：隨時幫你把對話精華「一鍵存入筆記本」！

請問你今天想研讀或探討哪個主題呢？`;
    }

    // === 動態 RAG 檢索：若使用者上傳了專屬檔案，從講義中精準抽取內容 ===
    else if (matchedMats.length > 0) {
      const topMat = matchedMats[0];

      // 過濾掉 PDF 頁碼標頭、元資訊與分隔線，尋找真正的正文段落
      const rawParas = (topMat.content || "")
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter((p) => p && !p.startsWith("> 📄") && !p.startsWith("### 頁碼") && p !== "---");

      // 優先尋找包含任一關鍵字的段落
      const matchedPara =
        rawParas.find((p) => keywords.some((kw) => p.toLowerCase().includes(kw))) ||
        rawParas[0] ||
        topMat.summary;

      // 乾淨格式化摘錄內容（移除多餘換行，維持單行引用不破版）
      const cleanSnippet = matchedPara
        .replace(/[#*`>-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);

      reply = `### 📖 針對「${rawQ}」的知識庫查詢結果

根據你資料庫中保存的 **《${topMat.title}》**，為你整理出相關核心要點：

> ${cleanSnippet}...

- **所屬分類**：${topMat.category || "自訂資料"}
- **核心摘要**：${topMat.summary || "已收錄至知識庫"}
- *(你可以點擊下方「📎 關聯資源」快速打開整篇原文研讀！)*`;
    }

    // === 通用精確解答 ===
    else {
      reply = `### 🤖 關於「${rawQ}」的解析

針對你的提問，建議依循以下結構化步驟思考：
1. **定義問題本質**：將「${rawQ}」拆解為核心定理與應用情境。
2. **與現有知識庫連結**：可至「原始資料庫」搜尋相關章節，或上傳課本進行深度對話。
3. **主動實踐測試**：試著用自己的話寫成一則隨堂筆記，能幫助加深長期記憶！`;
    }

    return {
      replyText: reply,
      matchedData: {
        materials: matchedMats.slice(0, 2),
        notes: matchedNotes.slice(0, 2)
      }
    };
  }

  // ==========================================
  // 6. 手動新增資料 Modal
  // ==========================================
  function handleMaterialSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("form-mat-title").value.trim();
    const category = document.getElementById("form-mat-category").value.trim() || "自訂資料";
    const source = document.getElementById("form-mat-source").value.trim() || "手動新增";
    const rawTags = document.getElementById("form-mat-tags").value;
    const summary = document.getElementById("form-mat-summary").value.trim();
    const content = document.getElementById("form-mat-content").value.trim();

    if (!title || !content) {
      showToast("請填寫標題與詳細內文");
      return;
    }

    const tags = rawTags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newMat = {
      id: "mat-" + Date.now(),
      title,
      category,
      source,
      tags,
      summary: summary || title,
      content
    };

    saveCustomMaterials(newMat);
    document.getElementById("material-modal").classList.add("hidden");
    renderMaterials();
    showToast("資料已成功加入資料庫！");
  }

  // ==========================================
  // 7. 導覽分頁切換 (3 Tabs)
  // ==========================================
  function switchTab(tabName) {
    state.currentTab = tabName;

    document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
      if (btn.dataset.tab === tabName) {
        btn.className = "nav-tab-btn active px-4 py-2 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 bg-brand-600 text-white shadow-sm shadow-brand-500/25 shrink-0";
      } else {
        btn.className = "nav-tab-btn px-4 py-2 rounded-xl text-sm sm:text-base font-semibold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0";
      }
    });

    document.querySelectorAll(".tab-view").forEach((view) => {
      view.classList.add("hidden");
    });

    const activeView = document.getElementById(`tab-${tabName}`);
    if (activeView) activeView.classList.remove("hidden");

    if (tabName === "materials") renderMaterials();
    else if (tabName === "notes") renderNotes();
    else if (tabName === "ai") renderChat();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================
  // 8. 提示訊息 (Toast)
  // ==========================================
  let toastTimer = null;
  function showToast(text) {
    const toast = document.getElementById("toast");
    const txtEl = document.getElementById("toast-text");
    if (!toast || !txtEl) return;

    txtEl.textContent = text;
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    }, 2400);
  }

  // ==========================================
  // 9. 事件綁定 (Event Listeners)
  // ==========================================
  function bindEvents() {
    // 頂部分頁切換
    document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Logo 點擊回首頁
    document.getElementById("brand-home-btn")?.addEventListener("click", () => switchTab("materials"));

    // 本地檔案上傳按鈕 (觸發 hidden file input)
    const fileInput = document.getElementById("file-upload-input");
    document.getElementById("upload-file-btn")?.addEventListener("click", () => {
      fileInput?.click();
    });
    fileInput?.addEventListener("change", handleNativeFileUpload);

    // 手動新增資料按鈕與表單
    document.getElementById("add-material-btn")?.addEventListener("click", () => {
      document.getElementById("material-form").reset();
      document.getElementById("material-modal").classList.remove("hidden");
    });
    document.getElementById("close-material-modal-btn")?.addEventListener("click", () => {
      document.getElementById("material-modal").classList.add("hidden");
    });
    document.getElementById("cancel-mat-btn")?.addEventListener("click", () => {
      document.getElementById("material-modal").classList.add("hidden");
    });
    document.getElementById("material-form")?.addEventListener("submit", handleMaterialSubmit);

    // 筆記按鈕與表單
    document.getElementById("add-note-btn")?.addEventListener("click", () => openNoteModal());
    document.getElementById("close-note-modal-btn")?.addEventListener("click", closeNoteModal);
    document.getElementById("cancel-note-btn")?.addEventListener("click", closeNoteModal);
    document.getElementById("note-edit-form")?.addEventListener("submit", handleNoteSubmit);

    // 筆記解除關聯
    document.getElementById("remove-link-btn")?.addEventListener("click", () => {
      document.getElementById("form-note-mat-id").value = "";
      document.getElementById("form-note-mat-title").value = "";
      document.getElementById("form-linked-material-box").classList.add("hidden");
    });

    // 閱讀工作台控制 (全螢幕、邊讀邊記側邊欄、隨堂筆記儲存)
    document.getElementById("close-reader-btn")?.addEventListener("click", closeReaderModal);
    document.getElementById("toggle-fullscreen-reader-btn")?.addEventListener("click", toggleFullscreenReader);
    document.getElementById("toggle-side-note-btn")?.addEventListener("click", toggleSideNotePanel);
    document.getElementById("side-note-form")?.addEventListener("submit", handleSideNoteSubmit);
    document.getElementById("reader-close-bottom-btn")?.addEventListener("click", closeReaderModal);
    document.getElementById("reader-create-note-btn")?.addEventListener("click", () => {
      if (state.activeReaderMaterial) {
        const mat = state.activeReaderMaterial;
        closeReaderModal();
        openNoteModal(null, mat);
      }
    });

    // 鍵盤快捷鍵：Escape 關閉、← / → 翻頁、Space 下一頁、D 雙頁模式、F 全螢幕
    window.addEventListener("keydown", (e) => {
      const readerModal = document.getElementById("reader-modal");
      if (!readerModal || readerModal.classList.contains("hidden")) return;

      const isTyping = document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          closeReaderModal();
        }
      } else if (currentPdfDoc && !isTyping) {
        if (e.key === "ArrowLeft" || e.key === "PageUp") {
          handlePrevPage();
        } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          handleNextPage();
        } else if (e.key === "d" || e.key === "D") {
          toggleDualPageMode();
        } else if (e.key === "f" || e.key === "F") {
          toggleFullscreenReader();
        } else if (e.key === "+" || e.key === "=") {
          currentPdfScale = Math.min(3.0, currentPdfScale + 0.15);
          queueRenderPdfSpread(currentPdfPage);
        } else if (e.key === "-" || e.key === "_") {
          currentPdfScale = Math.max(0.4, currentPdfScale - 0.15);
          queueRenderPdfSpread(currentPdfPage);
        } else if (e.key === "w" || e.key === "W") {
          fitPdfWidth();
        }
      }
    });

    // 監聽原生全螢幕狀態變更，自動對齊 UI
    document.addEventListener("fullscreenchange", () => {
      const isNativeFs = !!document.fullscreenElement;
      if (isFullscreenReader !== isNativeFs) {
        applyFullscreenReader(isNativeFs);
        setTimeout(() => fitPdfWidth(), 150);
      }
    });

    // AI 對話事件
    document.getElementById("chat-form")?.addEventListener("submit", handleChatSubmit);
    document.getElementById("clear-chat-btn")?.addEventListener("click", () => {
      if (confirm("確定要清除所有對話紀錄嗎？")) {
        state.chatMessages = [...getDefaultChat()];
        saveChat();
        renderChat();
        showToast("對話已清除");
      }
    });
  }

  // ==========================================
  // 10. 系統啟動 (Boot)
  // ==========================================
  function boot() {
    try {
      initStorage();
    } catch (err) {
      console.error("initStorage 執行異常:", err);
    }

    try {
      renderMaterials();
    } catch (err) {
      console.error("renderMaterials 執行異常:", err);
    }

    try {
      bindEvents();
    } catch (err) {
      console.error("bindEvents 執行異常:", err);
    }

    safeCreateIcons();

    // 確保當所有遠端 CDN 資源 (Lucide / KaTeX / PDF.js) 載入完畢後再次補調圖示
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
      window.addEventListener("load", () => {
        safeCreateIcons();
      });
    }

    console.log("🚀 LearnFlow 三大模組 + 本機檔案上傳 + AI 檢索整合啟動完成！");
  }

  // 公開一鍵恢復預設教材 API
  if (typeof window !== "undefined") {
    window.resetDefaultMaterials = function () {
      state.materials = [...getDefaultMaterials()];
      saveMaterials();
      renderMaterials();
      safeCreateIcons();
      showToast("已成功重新載入預設教材範例！");
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
