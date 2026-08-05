# 建立首頁商品列表

## Why

專案已具備 `ProductCard.vue`、Pinia 商品 store、mock service 與 `/` route，但首頁目前只顯示一張示範商品卡，尚未完成可瀏覽的商品列表體驗。

需要將首頁 `/` 建立為 Merchant Card Showroom 的主要入口：載入 mock 商品資料、以 Vuetify grid 呈現多張 `ProductCard`、提供可點擊的商品卡導向 `/product/:id`，並補上 loading、empty 與 error 狀態，讓後續商品細節與編輯流程有穩定入口。

## What

- 更新 `src/views/HomeView.vue`。
- mount 時呼叫 Pinia store `loadProducts()`。
- 使用 `ProductCard.vue` 以 Vuetify grid 顯示多張商品卡。
- 商品卡 CTA 或卡片互動需導向 `/product/:id`。
- 加上簡單 header 與 search bar 視覺，但不實作真搜尋。
- 呈現 loading、empty、error 基本狀態。
- 手動驗證 `/` 可顯示列表，商品卡可進入正確 `/product/:id`。

## Non-Goals

- 不實作真實搜尋、篩選、排序或遠端查詢。
- 不新增真實 momo API、production domain request 或 momo 專有素材。
- 不實作商品細節完整編輯流程；第 8 步處理。
- 不實作 `ProductEditorPanel.vue`；第 9 步處理。
- 不改寫 `ProductCard.vue` 的核心 component API，除非為列表整合修正明顯缺口。
- 不在此 change 中實作 localStorage persistence utility；第 10 步處理。
