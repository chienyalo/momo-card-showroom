# 建立 Router 頁面流程

## Why

專案已具備 Vue app shell、商品 schema、mock service 與 Pinia store，但頁面路由仍需要明確規格化。

需要建立 `/` 與 `/product/:id` 的核心導覽流程，讓後續首頁商品列表、商品細節頁與編輯流程有穩定入口。同時必須避免在 router guard 內加入複雜 async 資料載入，讓資料流程維持在 view/store 中，並避免 invalid route param 造成 crash 或 redirect loop。

## What

- 建立或更新 `src/router/index.ts`。
- 設定兩個 route：
  - `/` -> `HomeView.vue`
  - `/product/:id` -> `ProductDetailView.vue`
- 不在 navigation guard 中做複雜 async 商品資料載入。
- 商品細節頁需處理 invalid `id` fallback，不造成 crash 或無限 redirect。
- route param 變更時，細節頁資料需正確更新。
- 手動驗證首頁可導向 `/product/:id`。

## Non-Goals

- 不實作完整首頁商品列表 UI；第 7 步處理。
- 不實作完整商品細節與編輯 UI；第 8 步處理。
- 不實作 `ProductCard.vue`；第 6 步處理。
- 不在 router guard 中做商品資料載入。
- 不呼叫任何真實 momo API。
