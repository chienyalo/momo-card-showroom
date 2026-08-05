# Product Detail Edit Flow Design

## Context

第 8 步負責把商品細節頁建立為 preview + editing integration 的工作區。資料來源仍由 Pinia store 管理，頁面根據 route param 查找商品並顯示 fallback。完整 editor form controls 會在第 9 步補上。

此 change SHOULD 延續既有：

- `src/router/index.ts` 的 `/product/:id` 與 route props。
- `src/stores/productStore.ts` 的 `loadProducts()`、`findProductById()`、`displayProducts`。
- `src/components/ProductCard.vue` 的 `mode="detail"` preview。
- 第 7 步首頁商品列表導向商品細節頁的流程。

## Page Responsibilities

`ProductDetailView.vue` SHOULD：

- 根據 route prop 或 route param `id` 查找商品。
- 若 store 尚未載入商品，呼叫 `loadProducts()`。
- 使用 `ProductCard.vue` 以 detail mode 顯示 preview。
- 顯示編輯整合區，作為第 9 步 `ProductEditorPanel.vue` 的落點。
- 顯示 schema / sample usage 區塊，說明 `ProductCard` props 與重用方式。
- invalid `id` 時顯示 fallback 與返回首頁入口。

`ProductDetailView.vue` SHOULD NOT：

- 直接呼叫 mock service。
- 直接讀取 mock data 陣列。
- 在 router guard 中載入商品。
- 使用 redirect loop 處理 invalid id。
- 直接修改 mock base data。

## Editor Integration Boundary

第 8 步 SHOULD 建立 editor panel 的整合介面，但 SHOULD NOT 完成第 9 步的完整欄位編輯。

可接受的方式：

- 建立輕量 `ProductEditorPanel.vue` placeholder，接收 product/id 並顯示「編輯面板將於第 9 步完成」。
- 或在 `ProductDetailView.vue` 內建立清楚的 editor placeholder 區塊。

若建立 placeholder component，API SHOULD 預留第 9 步可沿用：

- `product: ProductCard`
- `productId` 或等價 id

Preview 與 editor integration area SHOULD 使用同一份 `productStore.findProductById(id)` 結果，避免兩邊顯示不同狀態。

## Layout

商品細節頁 SHOULD 使用 responsive layout：

- Desktop：左側或上方顯示 `ProductCard` preview，右側顯示 editor integration area。
- Mobile：preview 與 editor integration area 垂直堆疊。
- 頁面頂部提供返回首頁入口。
- invalid fallback 不應被包在 redirect 流程內。

## Route Param Reactivity

`ProductDetailView.vue` SHOULD 以 computed lookup 或 watch route param 的方式處理同一路由不同 `id` 的切換。

若從 `/product/a` 切到 `/product/b`：

- preview SHOULD 更新為新商品。
- editor integration area SHOULD 更新為新商品。
- 頁面 SHOULD NOT 保留上一個商品 stale data。

## Schema / Sample Usage

細節頁 SHOULD 顯示簡短 schema / sample usage，內容可包含：

- `ProductCard` props：`product`、`mode`。
- 基本使用範例：`<ProductCard :product="product" mode="detail" />`。
- 商品資料由 `ProductCard` schema 與 Pinia store 提供。

此區塊 SHOULD 簡短，不應取代第 11 步 README 文件。

## Verification

驗證 SHOULD 包含：

- `npm run build` 可通過。
- 正確商品 ID 可看到 preview 與 editor integration area。
- invalid id 顯示 fallback 並可返回首頁。
- 同一路由不同 `id` param 切換時 preview 與 editor integration area 更新。
- 不產生 momo production domain request。

## Risks

- 若第 8 步提前完成完整 editor form，會與第 9 步範圍重疊。
- 若細節頁直接呼叫 service，會破壞 store 集中資料流。
- 若 preview 與 editor integration area 取不同資料來源，後續即時編輯會產生狀態不一致。
- 若 invalid id 用 redirect 處理不當，可能造成 redirect loop。

## Decisions

- 商品資料由 Pinia store 提供。
- `ProductCard` preview 使用 detail mode。
- 第 8 步建立 editor integration area；第 9 步再實作完整 editor controls。
- invalid id fallback 由 view 層處理，不使用 redirect loop。
