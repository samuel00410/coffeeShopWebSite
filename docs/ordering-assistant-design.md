# 點餐助理（Ordering Assistant）設計藍圖

## 功能概述

右下角浮動按鈕觸發的對話式商品推薦功能。透過 3 個引導問題，根據使用者喜好從 API 商品中篩選並推薦 2–3 件商品，最終呈現在聊天視窗內，可直接加入購物車。

---

## 對話流程

```
助理：你今天想喝的還是吃的？
│
├─ 【喝的】
│   助理：你喜歡咖啡還是茶？
│   ├─ 【咖啡】
│   │   助理：你偏好濃郁還是清爽？
│   │   ├─ 【濃郁】→ 推薦：咖啡分類，關鍵字「濃郁/香醇/厚實」
│   │   └─ 【清爽】→ 推薦：咖啡分類，關鍵字「清爽/冰/輕盈」
│   └─ 【茶】
│       助理：你偏好濃郁還是清爽？
│       ├─ 【濃郁】→ 推薦：茶飲分類，關鍵字「濃/厚/香」
│       └─ 【清爽】→ 推薦：茶飲分類，關鍵字「清爽/氣泡/輕」
│
└─ 【吃的】
    助理：你喜歡巧克力系還是清淡口味？
    ├─ 【巧克力系】
    │   助理：口感偏紮實還是酥脆？
    │   ├─ 【紮實】→ 推薦：甜點分類，關鍵字「巧克力/可可/濕潤」
    │   └─ 【酥脆】→ 推薦：甜點分類，關鍵字「巧克力/脆/餅乾」
    └─ 【清淡口味】
        助理：口感偏紮實還是酥脆？
        ├─ 【紮實】→ 推薦：甜點分類，關鍵字「奶油/紮實/千層」
        └─ 【酥脆】→ 推薦：甜點分類，關鍵字「酥/脆/餅」
```

---

## Composable 架構

### `src/composables/useChat.ts` — 單例（module-level state）

State 宣告在 `export function` **外部**，關閉視窗再打開對話紀錄仍保留。

```
暴露的 state：
  messages     Message[]     完整對話紀錄（助理 / 使用者 / 推薦結果）
  currentStep  string        目前所在步驟 id
  answers      Answers       累積的使用者答案 { drink, type, flavor }
  isComplete   boolean       對話是否已結束並進入推薦

暴露的方法：
  sendAnswer(value: string)  使用者選擇某個選項
  reset()                    重置對話回初始狀態
```

**為什麼是單例：** 浮動視窗可被關閉再打開，若 state 在 function 內每次呼叫都重置，對話體驗會斷裂。詳見 [ADR 0001](./adr/0001-useChat-module-level-state.md)。

---

### `src/composables/useProductRecommender.ts` — per-instance

State 宣告在 `export function` **內部**，只在對話完成時呼叫一次。

```
暴露的 state：
  products   Product[]   篩選後的推薦商品（2–3 件）
  isLoading  boolean     fetch 進行中
  error      string | null

暴露的方法：
  recommend(answers: Answers)  根據 answers 呼叫 API 並過濾商品
```

**篩選邏輯：**
1. 呼叫 `/products/all` 取得全部商品
2. 先以 `answers.drink`（喝/吃）決定分類（`咖啡` / `茶飲` / `甜點`）
3. 再以後續答案對應的關鍵字比對 `content` + `description` 欄位
4. 從符合的商品中隨機取 2–3 件

---

## 元件結構

```
src/components/client/
└─ orderingAssistant/
   ├─ OrderingAssistant.vue   浮動按鈕 + 聊天視窗容器，使用兩個 composable
   ├─ ChatBubble.vue          單一訊息氣泡（assistant 靠左 / user 靠右）
   ├─ OptionButtons.vue       選項按鈕群組，點擊後 emit 給父層
   └─ RecommendCard.vue       推薦商品卡片（圖片 / 名稱 / 價格 / 加入購物車）
```

---

## UI 規格

| 項目 | 說明 |
|------|------|
| 觸發方式 | 右下角固定浮動按鈕（咖啡杯圖示） |
| 視窗尺寸 | 寬 360px，高 480px，右下角對齊 |
| 訊息方向 | 助理訊息靠左，使用者選擇靠右 |
| 選項形式 | 可點擊按鈕，選擇後變為已選樣式並禁用 |
| 推薦結果 | 對話結束後，助理說一句話 + 商品卡片清單 |
| 重置 | 視窗底部有「重新開始」按鈕 |

---

## 你會練到的 Composable 概念

| 概念 | 在哪裡體現 |
|------|-----------|
| module-level state（單例） | `useChat.ts` — state 在 function 外 |
| 跨元件共享狀態 | 任何地方呼叫 `useChat()` 都拿到同一份資料 |
| async loading / error / data 三態 | `useProductRecommender.ts` |
| composable 組合 | `OrderingAssistant.vue` 同時使用兩個 composable |
