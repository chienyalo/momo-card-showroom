# 建立 ProductCard Schema

## Why

後續 `ProductCard.vue`、mock service、Pinia store、商品細節編輯與 sample usage 都會共用商品卡資料結構。

需要先建立集中式 `ProductCard` schema 與純邏輯格式化 helper，避免欄位定義散落在 component、store 或 service 中，並讓後續功能可以用 TypeScript 與 Vitest 驗證資料契約。

## What

- 建立 `src/types/productCard.ts`。
- 定義 `ProductCard` interface。
- 欄位包含 `id`、`title`、`imageUrl`、`price`、`originalPrice`、`discountBadge`、`promotionText`、`rating`、`soldCount`、`ctaLabel`。
- 建立商品卡格式化 helper，例如 `formatPrice()`、`calculateDiscountRate()`。
- 補 Vitest，覆蓋價格格式、折扣計算與缺省欄位處理。

## Non-Goals

- 不實作 `ProductCard.vue` 視覺元件。
- 不建立 mock product data 或 service layer。
- 不實作 Pinia store。
- 不實作首頁列表或商品細節頁。
- 不處理 `localStorage` persistence。
- 不呼叫任何真實 momo API。
