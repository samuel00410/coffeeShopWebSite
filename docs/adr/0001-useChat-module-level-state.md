# ADR 0001 — useChat.ts 使用模組層級 state（單例模式）

## 狀態
已採納

## 決策
`useChat.ts` 的所有響應式 state（`messages`、`currentStep`、`answers`）宣告在 `export function useChat()` **外部**，成為模組層級的單例，整個 app 共享同一份對話狀態。

## 理由
點餐助理的聊天視窗可被關閉再開啟（浮動按鈕切換）。若 state 宣告在 function 內部，每次呼叫 `useChat()` 都會產生新的 state，視窗重新打開後對話紀錄會消失。模組層級 state 確保對話紀錄在整個 session 中持續存在。

## 取捨
- **優點**：關閉再開啟視窗，對話不會中斷；任何元件都能讀取同一份對話狀態
- **缺點**：無法同時存在兩個獨立的點餐助理實例（但此功能只有一個，無此需求）
- **被放棄的選項**：state 放在 function 內（per-instance）— 每次開啟視窗都重置，但對話體驗斷裂
