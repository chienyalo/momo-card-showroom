# 建立 Product Pinia Store

## Why

專案已具備 `ProductCard` schema 與 mock product service，但商品狀態尚未集中管理。

後續首頁列表、商品細節頁、編輯面板與 `localStorage` persistence 都需要共用同一份商品狀態。需要建立 Pinia Setup Store，集中處理商品載入、查找、draft 更新、reset，以及 storage hydrate/save 流程，避免狀態邏輯散落在 view 或 component 中。

## What

- 建立 `src/stores/productStore.ts`。
- 使用 Pinia Setup Store。
- state 包含 `products`、`isLoading`、`error`、`editedProducts`。
- actions 包含 `loadProducts()`、`findProductById()`、`updateProductDraft()`、`resetProductDraft()`、`hydrateFromStorage()`、`saveToStorage()`。
- 商品顯示資料以 mock base data 與 local edited data merge。
- 確保編輯資料不覆蓋 mock base data。
- 補 Vitest，覆蓋載入商品、更新 draft、reset、hydrate/save 與 merge 行為。

## Non-Goals

- 不實作 `localStorage` utility 抽象檔案；第 10 步會處理 persistence utility。
- 不實作 `ProductEditorPanel.vue`。
- 不實作首頁商品列表 UI。
- 不實作商品細節頁 UI。
- 不呼叫任何真實 momo API。
- 不爬取或依賴 momo production service。
