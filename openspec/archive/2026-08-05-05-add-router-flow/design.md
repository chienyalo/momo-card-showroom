# Router Flow Design

## Context

第 5 步負責建立頁面導覽骨架，串起首頁與商品細節頁。資料載入責任應留在 view/store，router 僅負責 route mapping 與基本參數傳遞。

此 change SHOULD 延續既有：

- `project-scaffold` 的 Vue Router plugin 註冊。
- `product-store` 的商品狀態與查找能力。
- Vue Router 4 routing pattern。

## Route Definitions

`src/router/index.ts` SHOULD 定義：

- `/` route，對應 `HomeView.vue`。
- `/product/:id` route，對應 `ProductDetailView.vue`。

`/product/:id` SHOULD 將 route param `id` 以 props 或等價方式提供給 view，使 view 可根據 param 讀取 store。

## Data Loading Boundary

Router SHOULD NOT 在 navigation guard 中執行複雜 async 商品資料載入。

資料載入 SHOULD 在 view 或 store 中處理：

- 首頁可在 view mount 時呼叫 store `loadProducts()`。
- 商品細節頁可根據 route param 或 prop 查找 store 中商品。
- route param 改變時，view SHOULD 更新顯示資料。

## Invalid ID Fallback

`/product/:id` 在 invalid id 時 SHOULD：

- 不 crash。
- 不造成 redirect loop。
- 顯示可理解 fallback，或提供返回首頁入口。

Router guard SHOULD NOT 透過反覆 redirect 處理一般查無商品。

## Manual Verification

手動驗證 SHOULD 包含：

- `/` 可進入首頁。
- `/product/:id` 可進入商品細節頁。
- 首頁商品入口可導向正確 `/product/:id`。
- invalid `id` 不造成 crash 或 redirect loop。
- 同一路由不同 `id` param 切換時，畫面資料正確更新。

## Risks

- 若資料載入放進 route guard，後續 store hydration、error handling 與 route param 變更會更難維護。
- 若 invalid id 以 redirect loop 處理，使用者可能被困在 navigation failure。
- 若細節頁只依賴 mount lifecycle，從 `/product/a` 切到 `/product/b` 可能顯示 stale data。

## Decisions

- route mapping 放在 `src/router/index.ts`。
- 商品資料載入交給 view/store，不放在 router guard。
- invalid id fallback 由 view 層處理。
- route param 變更由 view 監聽 prop/route param 或 computed lookup 處理。
