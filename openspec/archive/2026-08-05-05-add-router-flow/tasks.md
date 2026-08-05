# Tasks

- [x] 建立或更新 `src/router/index.ts`。
- [x] 設定 `/` route 對應 `HomeView.vue`。
- [x] 設定 `/product/:id` route 對應 `ProductDetailView.vue`。
- [x] 讓商品細節 route 可取得 `id` param，例如透過 route props。
- [x] 確保 router guard 不做複雜 async 商品資料載入。
- [x] 確保資料載入責任交給 view/store。
- [x] 確保 invalid `id` 由商品細節頁 fallback 處理。
- [x] 確保 invalid `id` 不造成 crash 或 redirect loop。
- [x] 確保 route param 變更時，商品細節頁資料可更新。
- [x] 手動驗證 `/` 可進入首頁。
- [x] 手動驗證 `/product/:id` 可進入商品細節頁。
- [x] 手動驗證首頁點商品可導向正確 `/product/:id`。
- [x] 執行 `npm run build` 驗證 router 設定可打包。
