# 實作步驟規格

## 實作總順序

- 先建立基礎專案與資料模型，再做路由頁面。
- 先完成 `ProductCard.vue`，再接列表與細節頁。
- 先讓功能可跑，再補 `localStorage`、測試與 README。
- 不串 momo API；`axios` 只放在 mock service layer。

## 1. 專案初始化

### 實作項目

- 建立 Vue 3 + Vite + TypeScript 專案。
- 安裝 `Vuetify`、`Pinia`、`Vue Router`、`axios`、`Vitest`。
- 建立目錄：`components/`、`views/`、`stores/`、`services/`、`types/`、`utils/`、`tests/`。
- 設定 `vite.config.ts` alias，例如 `@ -> src`。
- 設定 `main.ts` 掛載 `Vuetify`、`Pinia`、`Vue Router`。

### 驗收標準

- 專案可以透過 `npm run dev` 啟動。
- 專案可以透過 `npm run build` 打包。
- `src/` 下具備後續功能需要的基礎目錄。
- `main.ts` 已完成核心 plugin 掛載。

## 2. ProductCard Schema

### 實作項目

- 建立 `src/types/productCard.ts`。
- 定義 `ProductCard` interface：`id`、`title`、`imageUrl`、`price`、`originalPrice`、`discountBadge`、`promotionText`、`rating`、`soldCount`、`ctaLabel`。
- 建立格式化 helper，例如 `formatPrice()`、`calculateDiscountRate()`。
- 補 Vitest：測 schema helper 的價格格式、折扣計算、缺省欄位處理。

### 驗收標準

- 商品卡資料結構集中定義，不散落在 component。
- helper 有清楚輸入與輸出。
- Vitest 覆蓋價格格式、折扣計算與缺省欄位行為。

## 3. Mock Data / Service Layer

### 實作項目

- 建立 `src/services/mockProductService.ts`。
- 使用 mock products 陣列，不從 momo 取得資料。
- 實作 `getProducts()`、`getProductById(id)`。
- 保留 axios-like 結構，例如 service function 回傳 Promise，方便未來替換 API。
- 補 Vitest：測 `getProducts()` 回傳列表、`getProductById()` 找得到與找不到的行為。

### 驗收標準

- 所有商品資料皆來自 mock data。
- component 不直接讀取 mock data，需透過 service 或 store。
- 找不到商品時需有明確回傳結果。
- 測試確認 service 不依賴真實 momo API。

## 4. Pinia Store

### 實作項目

- 建立 `src/stores/productStore.ts`。
- 使用 Setup Store。
- state 包含：`products`、`isLoading`、`error`、`editedProducts`。
- actions 包含：`loadProducts()`、`findProductById()`、`updateProductDraft()`、`resetProductDraft()`、`hydrateFromStorage()`、`saveToStorage()`。
- 商品顯示資料以 mock base data + local edited data merge。
- 補 Vitest：測載入商品、更新 draft、reset、storage hydrate/save。

### 驗收標準

- 商品狀態集中由 Pinia 管理。
- 編輯資料不覆蓋 mock base data。
- 顯示資料能正確合併 base data 與 edited data。
- store actions 有 Vitest 覆蓋主要流程。

## 5. Router

### 實作項目

- 建立 `src/router/index.ts`。
- 設定兩個 route：
  - `/` -> `HomeView.vue`
  - `/product/:id` -> `ProductDetailView.vue`
- 不在 guard 裡做複雜 async；資料載入交給 view/store。
- 細節頁處理 invalid `id` fallback，不做無限 redirect。
- 手動驗證：首頁點商品可進 `/product/:id`。

### 驗收標準

- `/` 可進入首頁商品列表。
- `/product/:id` 可進入單一商品細節頁。
- invalid `id` 不造成 crash 或 redirect loop。
- route param 變更時畫面資料正確更新。

## 6. momo-style ProductCard

### 實作項目

- 建立 `src/components/ProductCard.vue`。
- 使用 `<script setup lang="ts">` 與 typed props。
- props 接收 `ProductCard`、可選 `mode: 'list' | 'detail'`。
- 視覺重點：
  - 白底卡片
  - 商品圖固定比例
  - momo-like 紅色價格
  - 原價刪除線
  - 促銷 badge
  - 商品名稱兩行截斷
  - CTA button
- 不使用 momo 專有圖檔或素材。

### 驗收標準

- `ProductCard.vue` 可在列表與細節頁重用。
- 卡片可透過 props 完整呈現商品資訊。
- 視覺接近 momo 商品卡，但不使用專有素材。
- 長商品名稱不破壞版面。

## 7. 首頁商品列表 `/`

### 實作項目

- 建立 `src/views/HomeView.vue`。
- mount 時呼叫 store `loadProducts()`。
- 使用 Vuetify grid 顯示商品卡。
- 商品卡點擊導向 `/product/:id`。
- 加上簡單 header / search bar 視覺，但不實作真搜尋。
- 驗證空資料、loading、基本列表顯示。

### 驗收標準

- 首頁可正常顯示多張商品卡。
- loading 與空資料狀態有基本畫面。
- 點擊商品卡可導向正確商品細節頁。
- search bar 僅作視覺展示，不發出真實查詢。

## 8. 商品細節與編輯 `/product/:id`

### 實作項目

- 建立 `src/views/ProductDetailView.vue`。
- 根據 route param 取得商品。
- 左側或上方顯示 `ProductCard.vue` preview。
- 右側顯示 `ProductEditorPanel.vue`。
- invalid `id` 顯示 fallback：「找不到商品」與返回首頁按鈕。
- 顯示簡短 schema / sample usage 區塊。

### 驗收標準

- 正確商品 ID 可看到商品卡 preview 與編輯面板。
- invalid `id` 有可理解的 fallback。
- 編輯面板與 preview 顯示同一份商品狀態。
- schema / sample usage 說明足以讓評審理解重用方式。

## 9. ProductEditorPanel

### 實作項目

- 建立 `src/components/ProductEditorPanel.vue`。
- 使用 Vuetify form controls。
- 編輯欄位：商品名稱、圖片 URL、售價、原價、折扣 badge、促銷文案、評價/銷量、CTA。
- 每次輸入呼叫 store `updateProductDraft()`。
- 提供 reset 按鈕，還原 mock default。
- Preview 必須即時更新。

### 驗收標準

- 編輯欄位可修改對應商品卡資料。
- 修改後 preview 即時更新。
- reset 可還原 mock default。
- 表單不直接修改 mock base data。

## 10. localStorage Persistence

### 實作項目

- 建立 `src/utils/persistence.ts`。
- 定義 storage key，例如 `momo-card-showroom:product-edits`。
- 實作 `loadProductEdits()`、`saveProductEdits()`、`clearProductEdit(id)`。
- 處理 JSON parse 失敗，避免 app crash。
- App/store 初始化時 hydrate。
- 補 Vitest：mock `localStorage`，測保存、讀取、壞資料 fallback。

### 驗收標準

- 編輯資料 reload 後仍保留。
- 壞掉的 `localStorage` JSON 不會讓 app crash。
- 可清除單一商品編輯資料。
- persistence utility 有 Vitest 覆蓋主要情境。

## 11. Sample Usage / 文件

### 實作項目

- 在 `README.md` 說明如何啟動、路由、資料流、元件重用方式。
- 在 README 或 `public/sample.html` 放 sample usage。
- 說明 `ProductCard` props schema。
- 說明 tradeoff：只做一種高品質卡片、不串真 API、用 mock service 保留替換彈性。

### 驗收標準

- README 可讓評審快速啟動專案。
- 文件清楚說明 `/` 與 `/product/:id`。
- 文件清楚說明 `ProductCard` 如何被重用。
- tradeoff 與後續演進方向明確。

## 12. 驗證與測試

### 實作項目

- 執行 `npm run test` 驗證 Vitest。
- 執行 `npm run build` 驗證 production build。
- 手動驗證：
  - `/` 正常列出商品
  - 點卡片進 `/product/:id`
  - 編輯欄位即時更新 preview
  - refresh 後 `localStorage` 保留
  - invalid `id` 有 fallback
  - DevTools Network 無 momo request

### 驗收標準

- `npm run test` 通過。
- `npm run build` 通過。
- 核心使用者流程手動驗證通過。
- 確認沒有任何 momo production domain request。
