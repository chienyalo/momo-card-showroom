# 建立 Mock Product Service Layer

## Why

首頁商品列表、商品細節頁與後續 Pinia store 都需要穩定的商品資料來源。

目前專案已完成 `ProductCard` schema，但尚未建立商品資料存取邊界。需要先以 mock products 與 service layer 隔離資料來源，讓 component 與 store 不直接讀取 mock array，同時保留未來替換 API client 的彈性。

## What

- 建立 `src/services/mockProductService.ts`。
- 使用符合 `ProductCard` schema 的 mock products 陣列。
- 實作 `getProducts()`，以 Promise 回傳商品列表。
- 實作 `getProductById(id)`，以 Promise 回傳單一商品或明確的找不到結果。
- 維持 axios-like async service function 介面，方便後續替換真實 API client。
- 補 Vitest，覆蓋商品列表、找得到商品、找不到商品與不依賴 momo production API 的行為。

## Non-Goals

- 不呼叫任何真實 momo API。
- 不爬取或依賴 momo production service。
- 不實作 Pinia store。
- 不實作 `ProductCard.vue`。
- 不實作首頁商品列表 UI。
- 不實作商品細節頁資料載入流程。
