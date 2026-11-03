/**
 * LearnFlow - 預載原始學習資料與範例筆記
 * 遵守 AGENTS.md 所規範的 Schema 結構
 */

// 1. 預載原始學習資料 (Materials)
var DEFAULT_MATERIALS = [
  {
    id: "mat-prompt-engineering",
    title: "AI 提示工程核心心法：從指令到精準輸出",
    category: "AI 核心",
    source: "Prompt Engineering Guide 精選整理",
    tags: ["Prompt", "AI", "LLM", "CoT"],
    summary: "掌握與大型語言模型 (LLM) 溝通的三大黃金法則：角色設定、Few-Shot 範例與思維鏈 (Chain-of-Thought)。",
    content: `## 為什麼需要提示工程？

大型語言模型本質上是機率文字補全機器。給予模糊的輸入，模型只能產出大眾化的平庸答案；而結構化的提示工程則是透過**明確的限制條件**、**上下文背景**與**示範範例**，引導模型精準給出我們需要的解答。

---

### 三大黃金提示法則

1. **角色與情境設定 (Role & Context)**
   - 告訴 AI 它是誰，面對的受眾是誰。
   - *範例*：「你是一位資深的技術導師，請為剛入門的新手解釋什麼是演算法。」

2. **少量樣本示範 (Few-Shot Prompting)**
   - 在要求輸出之前，先提供 1~2 組「輸入 ➔ 理想輸出」的範例，模型會自適應你偏好的格式與語氣。

3. **思維鏈推理 (Chain-of-Thought, CoT)**
   - 加入關鍵句：「**請一步一步思考 (Think step by step)**」。
   - 強迫模型展開中間推導步驟，能大幅降低邏輯錯誤與幻覺。
`
  },
  {
    id: "mat-js-async",
    title: "JavaScript 非同步全攻略：Promise 到 async/await",
    category: "程式開發",
    source: "MDN Web Docs 核心概念提煉",
    tags: ["JavaScript", "Async", "前端開發", "Web"],
    summary: "理解單執行緒環境下的事件循環 (Event Loop) 與非同步架構，擺脫 Callback 地獄，寫出易讀維護的代碼。",
    content: `## 單執行緒與非同步的本質

JavaScript 是一門**單執行緒**語言，一次只能做一件事。當需要發送網路請求或讀取資料時，若直接同步等待，整個瀏覽器網頁將會卡死無法點擊。

為了解決這個問題，JavaScript 透過 **Event Loop（事件循環）** 實踐了非阻塞 I/O。

---

### 現代語法：async / await

\`\`\`javascript
async function loadUserData(userId) {
  try {
    const response = await fetch(\`/api/user/\${userId}\`);
    if (!response.ok) throw new Error("網路連線異常");
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("載入失敗：", error);
  }
}
\`\`\`

**核心要點**：
- \`async\` 宣告函式會回傳一個 Promise。
- \`await\` 必須在 async 函式內部使用，會暫停該函式執行，等待 Promise 完成並取回結果。
`
  },
  {
    id: "mat-spaced-repetition",
    title: "高效學習科學：間隔重複與主動回想記憶法",
    category: "學習心法",
    source: "Make It Stick 認知心理學專書",
    tags: ["學習法", "記憶", "Active Recall", "思維"],
    summary: "破解艾賓浩斯遺忘曲線！打破「反覆重讀」的熟悉感假象，用自我測驗與主動提取打造長期記憶。",
    content: `## 為什麼『重複重讀課本』效果最差？

認知心理學研究證實，反覆重讀課本或講義會造成**「熟悉感假象（Fluency Illusion）」**——你以為自己已經懂了，但實際上只是大腦認得那些字，考試或要用時卻提取不出來。

---

### 兩大學習利器

1. **主動提取 (Active Recall)**：
   - 讀完一段後蓋上講義，拿出一張紙默寫或在心裡解釋剛才學到的 3 個重點。
   - 每次提取記憶，都會強化大腦神經突觸間的連結。

2. **間隔重複 (Spaced Repetition)**：
   - 在「即將忘記的臨界點」安排複習，鞏固效果最佳。
   - 週期建議：學完當天 ➔ 第 2 天 ➔ 第 4 天 ➔ 第 7 天 ➔ 第 14 天。
`
  },
  {
    id: "mat-calculus-core",
    title: "微積分核心教材：極限、微分與微積分基本定理",
    category: "學習資料",
    source: "微積分精要講義",
    tags: ["微積分", "數學", "極限", "導數"],
    summary: "從極限幾何概念切入，掌握割線斜率趨近切線斜率的過程，貫通微分與積分的互逆關聯。",
    content: `## 微積分的核心概念：掌握變化的數學

微積分是現代科學與工程技術的共通語言，主要探討「瞬間變化率」與「累積總量」。

---

### 1. 導數的幾何意義
函數 $f(x)$ 在 $x = x_0$ 處的導數代表切線斜率：
$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$

常見微分規則：
- 冪次法則：$\\frac{d}{dx} x^n = n x^{n-1}$
- 連鎖律 (Chain Rule)：$\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)$

---

### 2. 微積分基本定理 (Fundamental Theorem of Calculus)
若 $f(x)$ 在 $[a, b]$ 上連續，且 $F'(x) = f(x)$，則：
$$\\int_a^b f(x) \\, dx = F(b) - F(a)$$

此定理揭示了「求斜率（微分）」與「求面積（積分）」互為逆運算！
`
  },
  {
    id: "mat-linear-algebra-core",
    title: "線性代數直觀指南：向量空間與矩陣幾何變換",
    category: "學習資料",
    source: "線性代數幾何觀",
    tags: ["線性代數", "矩陣", "特徵值", "數學"],
    summary: "理解矩陣作為空間線性變換的幾何本質，掌握行列式、特徵值與特徵向量的物理意義。",
    content: `## 線性代數：空間的幾何變換

### 1. 矩陣的本質
矩陣不僅僅是排成方陣的數字，在幾何上它代表了**基底向量的移動**。
若矩陣 $A$ 將基準座標軸 $\\hat{i}, \\hat{j}$ 分別映射到新向量，則空間中任意向量都會按比例經歷線性縮放或旋轉。

---

### 2. 特徵值與特徵向量 (Eigenvalues & Eigenvectors)
當矩陣 $A$ 作用於向量 $\\mathbf{v}$ 時，若向量方向不改變，僅產生長度縮放，則稱：
$$A\\mathbf{v} = \\lambda \\mathbf{v}$$
- $\\mathbf{v}$ 為**特徵向量**
- $\\lambda$ 為對應的**特徵值**

特徵分解在資料降維 (PCA)、電腦視覺與 PageRank 演算法中扮演最關鍵核心角色！
`
  },
  {
    id: "mat-discrete-math-core",
    title: "離散數學基礎：邏輯、集合、圖論與演算法思維",
    category: "學習資料",
    source: "資工離散核心手冊",
    tags: ["離散數學", "圖論", "邏輯", "資工"],
    summary: "電腦科學的數學基石。涵蓋命題邏輯、遞迴關係、二元樹與圖論最短路徑觀念。",
    content: `## 離散數學：電腦科學的靈魂

離散數學處理非連續結構，是演算法分析、資料結構與密碼學的基石。

---

### 1. 歐拉平面圖定理 (Euler's Planar Graph Formula)
對於任何連通的平面圖（無交叉邊）：
$$V - E + F = 2$$
其中 $V$ 為頂點數、$E$ 為邊數、$F$ 為面數。

---

### 2. 鴿籠原理 (Pigeonhole Principle)
若有 $n$ 個籠子與 $n + 1$ 隻鴿子，則至少有一個籠子裡有 2 隻或更多鴿子。
此原理常被用於雜湊碰撞 (Hash Collision) 與密碼學分析。
`
  }
];

// 2. 預載個人範例筆記 (Notes)
var DEFAULT_NOTES = [
  {
    id: "note-demo-1",
    materialId: "mat-prompt-engineering",
    materialTitle: "AI 提示工程核心心法：從指令到精準輸出",
    title: "💡 提示工程練習心得：CoT 對寫作業超有幫助",
    category: "AI 核心",
    tags: ["實作心得", "Prompt"],
    content: `今天試著在讓 AI 寫作業題目時加上「請一步一步思考」，生成的邏輯架構真的比原本直接要答案清楚太多了！
下次試著把角色設定成「嚴格的面試官」，看能不能幫自己模擬技術問答。`,
    createdAt: "2026/11/03"
  },
  {
    id: "note-demo-2",
    materialId: null,
    materialTitle: "",
    title: "📝 自學進度規劃與期許",
    category: "學習心法",
    tags: ["規劃", "隨筆"],
    content: `每天利用下班或課後 45 分鐘：
1. 讀一篇原始資料庫裡的文章。
2. 寫至少一則自己的理解筆記。
3. 用本系統的 AI 助手問問題做觀念測驗！`,
    createdAt: "2026/11/03"
  }
];

// 3. 初始 AI 歡迎訊息
var DEFAULT_CHAT_MESSAGES = [
  {
    id: "msg-welcome",
    sender: "ai",
    text: "哈囉！我是你的隨身 AI 學習助教 🤖\n\n我可以幫你：\n1. 摘要或解釋「原始資料庫」裡的任何概念\n2. 幫你把你寫的「學習筆記」梳理條理\n3. 針對你想複習的主題出測驗考考你！\n\n請問今天想聊聊或學習什麼呢？",
    time: "20:00"
  }
];

// 確保掛載於全局 window 物件，防止嚴格模式或跨檔案未定義錯誤
if (typeof window !== "undefined") {
  window.DEFAULT_MATERIALS = DEFAULT_MATERIALS;
  window.DEFAULT_NOTES = DEFAULT_NOTES;
  window.DEFAULT_CHAT_MESSAGES = DEFAULT_CHAT_MESSAGES;
}
