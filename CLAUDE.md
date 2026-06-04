# CLAUDE.md

此檔案提供 Claude Code 在這個專案中的開發指引。

## 指令

```bash
npm run dev          # 啟動開發伺服器（Vite）
npm run build        # 型別檢查（vue-tsc）+ 正式環境建置
npm run build:pages  # 不做型別檢查，直接建置（用於 GitHub Pages）
npm run preview      # 本地預覽正式建置結果
npm run deploy       # 建置 + 部署到 GitHub Pages（透過 gh-pages）
```

未設定測試或 lint 指令。

## 架構

這是一個 Vue 3 咖啡廳電商應用，分為**前台（客戶端）**和**後台（管理介面）**，資料來源為六角學院外部 API（`.env` 中的 `VITE_API_URL` + `VITE_API_PATH`）。

**技術棧：** Vue 3（Composition API / `<script setup>`）· TypeScript（strict）· Vite · Vue Router 4（hash history）· Pinia · Tailwind CSS 4 + DaisyUI 5 · Axios · Vee-Validate 4 + Yup

### 關鍵檔案

| Path | Role |
|------|------|
| `src/main.ts` | 應用程式入口 — 註冊 Pinia、Router、全域 Loading 元件 |
| `src/router/index.ts` | 路由設定 + 導航守衛（購物車為空時離開結帳頁；401 時自動登出） |
| `src/utils/api.ts` | Axios instance — 請求攔截器（注入 localStorage 的 `hexToken`）+ 回應攔截器（401 自動登出） |
| `src/stores/cart.ts` | Pinia 購物車 store（Composition API 風格）— 購物車資料、總計、優惠券狀態、loading 旗標 |
| `src/utils/format.ts` | 金額、日期、商品清單的格式化工具函式 |
| `src/assets/styles/all.css` | CSS 入口 — 引入 Tailwind、DaisyUI、變數、基礎樣式、元件樣式 |

### 路由結構

- **前台** (`/`, `/menu`, `/product/:productId`, `/checkout`) — 懶加載；結帳頁有守衛：購物車為空時導回首頁
- **後台** (`/login`, `/admin/products`, `/admin/orders`, `/admin/coupons`) — `requiresAuth: true` meta；驗證 token 存在 localStorage 的 `hexToken`

### 元件目錄結構

```
src/
├── pages/client/       # ClientLayout.vue 包覆所有前台頁面
├── pages/admin/        # AdminLayout.vue 包覆所有後台頁面
├── components/client/  # 前台專用元件
├── components/admin/   # 後台 Modal、分頁、優惠券/訂單子元件
└── composables/        # Vue 3 composables
```

### Vite base 路徑

`vite.config.ts` 根據環境條件設定 `base` — 開發環境用 `/`，正式環境用 repo 子路徑（GitHub Pages）。避免在 assets 中寫死絕對路徑。

---

## 實作進度

### 功能：Store Locator（門市據點查詢）✅ 已完成

Branch: `feature/store_Locator`

#### 完成檔案一覽

| File | Notes |
|------|-------|
| `src/types/stores.ts` | `Store` interface: `{ id, name, address, phone, lat, lng, hours }` |
| `src/data/stores.ts` | 3 筆模擬門市資料（台北101、西門、台中勤美） |
| `src/composables/useGoogleMap.ts` | `initMap` + `panTo` + InfoWindow（共用 instance）+ `onUnmounted` cleanup |
| `src/components/client/mapView/StoreMapView.vue` | 地圖容器；`onMounted` 呼叫 `initMap`；`defineExpose({ panTo })` |
| `src/components/client/StoreCard.vue` | 門市卡片元件；點擊 emit `select` 事件 |
| `src/pages/client/mapView/StoreLocator.vue` | 嵌入 `Home.vue`；sidebar + template ref + panTo 串接；`lg:flex` 響應式排版 |
| `src/pages/client/Home.vue` | 加入 `<StoreLocator id="stores" />` |
| `src/components/ClientNavbar.vue` | 桌機 + 手機版加入「門市資訊」連結（`to="/#stores"` 滑動） |

#### 關鍵技術決策

- **Google Maps loader**: `@googlemaps/js-api-loader` v2 — 使用 `setOptions()` + `importLibrary()`（不用 `new Loader()` class）
- **Marker class**: 使用 legacy `google.maps.Marker`（非 `AdvancedMarkerElement`）— AdvancedMarkerElement 在此專案靜默失敗
- **InfoWindow**: 每個地圖建一個共用 instance（放在 for 迴圈外），避免多個視窗同時開啟
- **`panTo` 架構**: composable 在 `StoreMapView.vue` 內；父層 `StoreLocator.vue` 透過 template ref + `defineExpose` 呼叫
- **導航方式**: Navbar 連結用 `/#stores`（首頁 hash 滑動），非獨立路由頁面
- **InfoWindow 樣式**: `:deep()` 覆蓋 `.gm-style-iw-c` 等 Google Maps 預設 class（Tailwind 無法穿透）

#### .env 環境變數

```
VITE_GOOGLE_MAPS_KEY=...        # Google Maps JavaScript API key
VITE_GOOGLE_MAPS_MAP_ID=...     # Map ID created in Google Cloud Console → Map Management
```

**注意**：Vite 在啟動時讀取 `.env`，修改後需重新執行 `npm run dev` 才會生效。
