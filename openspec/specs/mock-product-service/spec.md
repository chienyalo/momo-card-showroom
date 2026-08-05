# mock-product-service Specification

## Requirements

### Requirement: 商品資料必須由 mock service layer 提供

專案 MUST 透過 `src/services/mockProductService.ts` 提供商品資料存取介面，component 與後續 store SHOULD 透過 service function 取得商品資料。

#### Scenario: 開發者取得商品列表

- GIVEN mock product service 已建立
- WHEN 開發者需要商品列表
- THEN `getProducts()` SHOULD 可從 `src/services/mockProductService.ts` 匯入
- AND `getProducts()` SHOULD 回傳 `Promise<ProductCard[]>`
- AND 回傳商品 SHOULD 符合 `ProductCard` schema

#### Scenario: Component 不直接讀取 mock array

- GIVEN component 或 store 需要商品資料
- WHEN 開發者實作資料載入流程
- THEN component SHOULD NOT 直接 import 內部 mock products array
- AND 資料存取 SHOULD 經由 mock product service function

### Requirement: 商品查找必須有明確找不到結果

專案 MUST 提供根據商品 ID 查找單一商品的 service function，且找不到商品時 MUST 有明確回傳結果。

#### Scenario: 根據有效 ID 找到商品

- GIVEN mock products 中存在指定商品
- WHEN 開發者呼叫 `getProductById(id)`
- THEN service SHOULD 回傳對應 `ProductCard`

#### Scenario: 根據無效 ID 找不到商品

- GIVEN mock products 中不存在指定商品
- WHEN 開發者呼叫 `getProductById(id)`
- THEN service SHOULD 回傳 `null` 或等價的明確找不到結果
- AND service SHOULD NOT 以 runtime error 表示一般查無資料

### Requirement: Mock service 必須保留未來 API 替換彈性

專案 MUST 讓 mock service function 維持 async / Promise 介面，模擬未來 axios-like API client 行為。

#### Scenario: Service function 使用 async boundary

- GIVEN 商品資料目前來自本地 mock data
- WHEN 開發者呼叫 `getProducts()` 或 `getProductById(id)`
- THEN service function SHOULD 回傳 Promise
- AND 呼叫端 SHOULD 可用 async/await 處理結果

### Requirement: Mock service 不得依賴 momo production service

Mock product service MUST NOT 呼叫真實 momo API、爬取 momo production service，或使用 momo production domain 作為資料來源。

#### Scenario: 取得 mock 商品資料

- GIVEN mock product service 被測試或執行
- WHEN 開發者呼叫 service function
- THEN service MUST NOT 發出 momo production domain request
- AND mock products MUST NOT 依賴 momo production domain
- AND 測試 SHOULD 驗證 service 不依賴真實 momo API

### Requirement: Mock product service 必須有 Vitest 覆蓋

專案 MUST 使用 Vitest 覆蓋 mock product service 的核心行為。

#### Scenario: Mock service 測試

- GIVEN mock product service 已建立
- WHEN 開發者執行 `npm run test`
- THEN 測試 SHOULD 覆蓋 `getProducts()` 回傳列表
- AND 測試 SHOULD 覆蓋 `getProductById()` 找得到商品
- AND 測試 SHOULD 覆蓋 `getProductById()` 找不到商品
- AND 測試 SHOULD 覆蓋 service 不依賴 momo production API
