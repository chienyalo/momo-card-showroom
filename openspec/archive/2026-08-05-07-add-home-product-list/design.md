# Home Product List Design

## Context

第 7 步負責把首頁從單張示範卡提升為可瀏覽的商品列表。資料來源仍維持 mock service 經由 Pinia store 載入，首頁只負責組合 UI、狀態呈現與導覽。

此 change SHOULD 延續既有：

- `src/stores/productStore.ts` 的 `loadProducts()`、`displayProducts`、`isLoading`、`error`。
- `src/components/ProductCard.vue` 的 `product` props、`mode: 'list'` 與 `cta-click` event。
- `src/router/index.ts` 的 `product-detail` route。
- Vuetify grid system。

## Page Responsibilities

`HomeView.vue` SHOULD：

- 在 mount 時載入商品資料。
- 使用 `productStore.displayProducts` 作為列表顯示資料。
- 根據 `productStore.isLoading` 顯示 loading 狀態。
- 根據 `productStore.error` 顯示 error 狀態與 retry 入口。
- 在資料載入成功但列表為空時顯示 empty 狀態。
- 將商品卡互動導向 `product-detail` route。

`HomeView.vue` SHOULD NOT：

- 直接呼叫 mock service。
- 直接讀取 mock data 陣列。
- 在 search bar 輸入時發出真實查詢。
- 修改 mock base data。

## Layout

首頁 SHOULD 使用完整但克制的 showroom layout：

- 頂部 header 顯示頁面名稱與簡短副標。
- search bar 為視覺展示，可使用 disabled 或 read-only 標示非互動搜尋。
- 商品列表使用 Vuetify `v-row` / `v-col` 或等價 grid。
- mobile 顯示單欄或雙欄，desktop 顯示多欄。
- 每張商品使用 `ProductCard` list mode。

卡片互動 MAY 由：

- `ProductCard` 的 `cta-click` event 觸發 router navigation。
- 或父層包裝 clickable container，但不得讓 `ProductCard` 直接依賴 router。

## State Handling

首頁 SHOULD 提供下列狀態：

- Loading：資料載入中顯示 progress 或 skeleton。
- Error：顯示錯誤訊息與 retry button。
- Empty：顯示目前沒有商品的基本訊息。
- Loaded：顯示商品 grid。

若 store 已有商品資料，首頁 MAY 避免重複呼叫 `loadProducts()`，但 retry SHOULD 可重新觸發載入。

## Verification

驗證 SHOULD 包含：

- `npm run build` 可通過。
- `/` 可顯示多張商品卡。
- 商品卡 CTA 或卡片互動可導向正確 `/product/:id`。
- loading、empty、error 狀態有基本畫面或可透過程式路徑驗證。
- search bar 不發出真實查詢。
- 不產生 momo production domain request。

## Risks

- 若首頁直接讀 service，會繞過 Pinia 狀態集中管理。
- 若 ProductCard 直接耦合 router，後續細節 preview 與編輯預覽重用性會下降。
- 若 search bar 被做成真搜尋，會超出第 7 步範圍並引入未定義資料流程。
- 若沒有 empty/error 狀態，mock service 或未來資料替換失敗時會缺少基本 fallback。

## Decisions

- 首頁資料流由 Pinia store 管理。
- 首頁負責 route navigation，`ProductCard` 維持 presentational。
- search bar 僅為視覺展示，不實作查詢。
- 本 change 只處理首頁列表，不處理細節頁編輯。
