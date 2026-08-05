# Tasks

- [x] 更新 `src/views/ProductDetailView.vue`。
- [x] 根據 route param/props `id` 從 Pinia store 查找商品。
- [x] 若 store 尚未載入商品，呼叫 `loadProducts()`。
- [x] 使用 `ProductCard.vue` 以 `mode="detail"` 顯示商品 preview。
- [x] 建立 editor integration area，作為第 9 步 `ProductEditorPanel.vue` 的落點。
- [x] 確保 preview 與 editor integration area 使用同一份商品狀態。
- [x] invalid `id` 顯示「找不到商品」與返回首頁入口。
- [x] 確保 invalid `id` 不造成 crash 或 redirect loop。
- [x] 確保同一路由不同 `id` param 切換時，preview 與 editor integration area 更新。
- [x] 顯示簡短 schema / sample usage 區塊。
- [x] 確保細節頁不直接呼叫 mock service 或讀 mock data 陣列。
- [x] 確保不使用 momo 專有圖檔、素材或 production domain。
- [x] 手動驗證正確商品 ID 可看到 preview 與 editor integration area。
- [x] 手動驗證 invalid `id` 有 fallback。
- [x] 執行 `npm run build` 驗證商品細節頁可打包。
