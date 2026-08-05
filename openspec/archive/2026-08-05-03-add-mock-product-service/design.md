# Mock Product Service Layer Design

## Context

第 3 步負責建立商品資料存取邊界，讓後續 store 與 view 只透過 service function 取得商品資料。

此 change 應延續既有 `ProductCard` schema，並避免任何 production API、爬蟲或 momo domain 依賴。

## Service Shape

`src/services/mockProductService.ts` SHOULD 匯出下列 service function：

- `getProducts()`：回傳 `Promise<ProductCard[]>`。
- `getProductById(id)`：回傳 `Promise<ProductCard | null>` 或等價的明確找不到結果。

service function SHOULD 保持 async / Promise 介面，即使資料目前來自本地 mock array，也要方便後續替換成 axios client。

## Mock Data

mock products SHOULD：

- 使用 `ProductCard` 型別。
- 提供多筆商品資料，足以支援後續列表頁與細節頁測試。
- 使用 mock 圖片 URL 或通用 placeholder 圖片，不使用 momo 專有素材。
- 不包含 momo production domain。
- 不從 component 直接匯出給 UI 使用。

## Lookup Behavior

`getProductById(id)` SHOULD：

- 根據 `ProductCard.id` 查找商品。
- 找到時回傳對應商品。
- 找不到時回傳明確 fallback，例如 `null`。
- 不 throw runtime error 作為一般找不到商品的控制流程。

## Testing Strategy

Vitest SHOULD 覆蓋：

- `getProducts()` 回傳陣列且含有符合 `ProductCard` schema 的商品。
- `getProductById(id)` 在有效 ID 時回傳商品。
- `getProductById(id)` 在不存在 ID 時回傳明確找不到結果。
- service 不依賴 momo production domain 或真實 momo API。

## Risks

- 若 mock data 被 component 直接 import，後續替換 API 時會擴大修改範圍。
- 若 `getProductById()` 找不到商品時 throw error，後續 route fallback 會更難區分「查無資料」與「系統錯誤」。
- 若 mock 圖片使用特定品牌或 production domain，會違反專案限制。

## Decisions

- mock data 與查找邏輯集中在 `src/services/mockProductService.ts`。
- 一般查無商品以 `null` 表示。
- 測試以 service public function 為主，不測內部 mock array 實作細節。
