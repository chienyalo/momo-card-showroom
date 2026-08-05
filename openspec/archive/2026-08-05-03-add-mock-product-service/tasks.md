# Tasks

- [x] 建立 `src/services/mockProductService.ts`。
- [x] 匯入並使用 `ProductCard` schema。
- [x] 建立符合 `ProductCard` schema 的 mock products 陣列。
- [x] 確認 mock products 不使用 momo production domain 或 momo 專有素材。
- [x] 實作 `getProducts()`，回傳 `Promise<ProductCard[]>`。
- [x] 實作 `getProductById(id)`，回傳 `Promise<ProductCard | null>` 或等價明確找不到結果。
- [x] 確保 component 不需要直接 import mock products。
- [x] 建立 Vitest 測試檔，覆蓋 mock product service。
- [x] 測試 `getProducts()` 回傳列表。
- [x] 測試 `getProductById()` 找得到商品的行為。
- [x] 測試 `getProductById()` 找不到商品的行為。
- [x] 測試 service 不依賴真實 momo API 或 momo production domain。
- [x] 執行 `npm run test` 驗證 service 測試通過。
