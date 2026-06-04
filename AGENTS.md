# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 指令

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Type-check (vue-tsc) + production build
npm run build:pages  # Build without type-check (for GitHub Pages)
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to GitHub Pages via gh-pages
```

No test or lint scripts are configured.

## 架構

This is a Vue 3 coffee shop e-commerce app split into a **client storefront** and **admin dashboard**, backed by the Hex School external API (`VITE_API_URL` + `VITE_API_PATH` in `.env`).

**Tech stack:** Vue 3 (Composition API / `<script setup>`) · TypeScript (strict) · Vite · Vue Router 4 (hash history) · Pinia · Tailwind CSS 4 + DaisyUI 5 · Axios · Vee-Validate 4 + Yup

### 關鍵檔案

| Path | Role |
|------|------|
| `src/main.ts` | App entry — registers Pinia, Router, global Loading components |
| `src/router/index.ts` | Routes + navigation guards (empty cart → redirect from checkout; 401 → logout) |
| `src/utils/api.ts` | Axios instance with request interceptor (injects `hexToken` from localStorage) and response interceptor (auto-logout on 401) |
| `src/stores/cart.ts` | Pinia cart store (Composition API style) — cart data, totals, coupon state, loading flags |
| `src/utils/format.ts` | Currency, date, and product list formatters |
| `src/assets/styles/all.css` | CSS entry point — imports Tailwind, DaisyUI, variables, base, components |

### 路由結構

- **Client** (`/`, `/menu`, `/product/:productId`, `/checkout`) — lazy-loaded, guarded: checkout requires non-empty cart
- **Admin** (`/login`, `/admin/products`, `/admin/orders`, `/admin/coupons`) — `requiresAuth: true` meta; auth token stored as `hexToken` in localStorage

### 元件目錄結構

```
src/
├── pages/client/     # ClientLayout.vue wraps all storefront pages
├── pages/admin/      # AdminLayout.vue wraps all admin pages
├── components/client/  # Storefront-specific components
├── components/admin/   # Admin modals, pagination, coupon/order sub-components
└── composables/      # Vue 3 composables (currently empty)
```

### Vite base 路徑

`vite.config.ts` sets `base` conditionally — uses `/` in dev and the repo sub-path in production for GitHub Pages. Avoid hard-coding absolute paths in assets.

---

## 實作進度

### 功能：Store Locator（門市據點查詢）

Branch: `feature/store_Locator`

#### ✅ 已完成

| File | Status | Notes |
|------|--------|-------|
| `src/types/stores.ts` | Done | `Store` interface: `{ id, name, address, phone, lat, lng, hours }` |
| `src/data/stores.ts` | Done | 3 mock stores with real Taiwan coordinates (台北101、西門、台中勤美) |
| `src/composables/useGoogleMap.ts` | Partial | `initMap(el, stores)` + `panTo(store)` done; **InfoWindow 和 onUnmounted cleanup 尚未加入** |
| `src/components/client/mapView/StoreMapView.vue` | Done | Map DOM container; calls `initMap` in `onMounted`; exposes `panTo` via `defineExpose` |
| `src/pages/client/mapView/StoreLocator.vue` | Partial | Page renders map title + `<StoreMapView>` only; **no sidebar, no disclaimer banner, no template ref wiring, not yet in router** |

#### 🔲 待辦事項（依序）

1. **InfoWindow on marker click** — add to `useGoogleMap.ts` inside `initMap`
   - `const { Map, InfoWindow } = await importLibrary("maps")` — add `InfoWindow` to existing destructure
   - Create ONE shared `infoWindow` instance outside the `for` loop
   - `marker.addListener("click", () => { infoWindow.setContent(...); infoWindow.open({ anchor: marker, map }) })`
   - Content should include: store name, address, phone, hours, and navigation button

2. **Navigation button inside InfoWindow** — link format:
   ```
   https://www.google.com/maps/dir/?api=1&destination={store.lat},{store.lng}
   ```

3. **Store list sidebar** — create `src/components/client/StoreCard.vue`
   - Displays store name, address, phone, hours
   - Click on card → parent calls `mapRef.value?.panTo(store)` via template ref

4. **Wire `StoreCard` list + `StoreMapView` in `StoreLocator.vue`**
   - Add `ref` on `<StoreMapView>` to access exposed `panTo`
   - Render `<StoreCard>` list in a sidebar; on card click call `mapRef.value?.panTo(store)`
   - Layout: mobile stacked (default), desktop side-by-side (`lg:flex`)

5. **Add disclaimer banner** in `StoreLocator.vue`
   - Text: 「本網站為作品集展示，店鋪資訊為模擬資料」
   - Should be clearly visible above the map (DaisyUI `alert-warning` / yellow style)

6. **Add `/stores` route** to `src/router/index.ts`
   ```typescript
   { path: "stores", name: "StoreLocator", component: () => import("../pages/client/mapView/StoreLocator.vue") }
   ```
   Add as a child of the client layout route (currently missing from router entirely).

7. **Add nav link** to `src/components/ClientNavbar.vue`
   - Both desktop `navbar-center` ul and mobile dropdown ul need a new `<RouterLink to="/stores">` entry

8. **Cleanup on unmount** — add to `useGoogleMap.ts`:
   ```typescript
   onUnmounted(() => {
     markers.forEach(m => m.setMap(null))
   })
   ```
   `onUnmounted` import is currently absent — add it to the `import { ref } from "vue"` line.

#### 關鍵技術決策

- **Google Maps loader**: `@googlemaps/js-api-loader` v2 — uses `setOptions()` + `importLibrary()` (no `new Loader()` class)
- **Marker class**: Using **legacy `google.maps.Marker`** (not `AdvancedMarkerElement`) — `AdvancedMarkerElement` silently failed to render even with a valid Map ID; legacy Marker works reliably
- **InfoWindow**: One shared instance per map (not one per marker) — prevents multiple windows open simultaneously
- **`panTo` architecture**: `useGoogleMap()` lives in the child `StoreMapView.vue`; parent `StoreLocator.vue` calls `panTo` via `templateRef.value.panTo(store)` after `defineExpose({ panTo })`
- **File location**: New files are in `mapView/` subdirectories (`components/client/mapView/`, `pages/client/mapView/`) — note this deviates from other client pages which sit flat in `pages/client/`

#### UI 命名決策

- **Navbar 連結文字**: 「找到我們」— 親切風格，符合 Mochi Café 品牌調性
- **頁面標題 / 功能名稱**: 「門市據點」
- **路由 name**: `StoreLocator`（維持英文，與現有路由命名一致）

#### .env 環境變數（已加入）

```
VITE_GOOGLE_MAPS_KEY=...        # Google Maps JavaScript API key
VITE_GOOGLE_MAPS_MAP_ID=...     # Map ID created in Google Cloud Console → Map Management
```

**Important**: Vite reads `.env` at startup — restart `npm run dev` after any `.env` changes.
