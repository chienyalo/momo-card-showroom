# 建立商品細節與編輯整合頁

## Why

專案已具備首頁商品列表、`/product/:id` route、`ProductCard.vue`、Pinia 商品 store 與 mock 商品資料，但商品細節頁目前仍只是基本 preview，尚未成為可說明元件重用與後續編輯流程的完整頁面。

需要將 `/product/:id` 建立為商品卡展示與編輯流程的主要工作區：根據 route param 取得商品、顯示 `ProductCard.vue` preview、提供編輯面板位置、處理 invalid `id` fallback，並展示簡短 schema / sample usage，讓評審能理解商品卡如何被重用與後續如何擴充。

## What

- 更新 `src/views/ProductDetailView.vue`。
- 根據 route param `id` 從 Pinia store 取得商品。
- 顯示 `ProductCard.vue` preview。
- 顯示右側或下方的 `ProductEditorPanel` 整合區。
- invalid `id` 顯示「找不到商品」與返回首頁入口。
- 顯示簡短 schema / sample usage 區塊。
- 確保 route param 變更時，細節頁資料與 preview 更新。
- 確保 preview 與編輯整合區指向同一份商品狀態。

## Non-Goals

- 不實作完整 `ProductEditorPanel.vue` 表單欄位；第 9 步處理。
- 不實作 localStorage persistence utility；第 10 步處理。
- 不呼叫真實 momo API。
- 不使用 momo 專有圖檔、素材或 production service。
- 不新增真搜尋、篩選、排序或遠端查詢。
- 不重構 `ProductCard.vue` 核心 API，除非為細節頁整合修正明顯缺口。
