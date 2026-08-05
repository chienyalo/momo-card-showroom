# Tasks

- [x] 更新 `src/views/HomeView.vue`。
- [x] 在 mount 時透過 `useProductStore()` 呼叫 `loadProducts()`。
- [x] 使用 `productStore.displayProducts` 作為首頁商品列表資料。
- [x] 使用 Vuetify grid 顯示多張 `ProductCard`。
- [x] 每張商品卡使用 `mode="list"`。
- [x] 商品卡 CTA 或卡片互動導向 `{ name: 'product-detail', params: { id } }`。
- [x] 加上首頁 header 與簡單 search bar 視覺。
- [x] 確保 search bar 不發出真實查詢。
- [x] 實作 loading 狀態。
- [x] 實作 empty 狀態。
- [x] 實作 error 狀態與 retry 入口。
- [x] 確保首頁不直接呼叫 mock service 或讀 mock data 陣列。
- [x] 確保不使用 momo 專有圖檔、素材或 production domain。
- [x] 手動驗證 `/` 可顯示多張商品卡。
- [x] 手動驗證點擊商品卡可導向正確 `/product/:id`。
- [x] 執行 `npm run build` 驗證首頁列表可打包。
