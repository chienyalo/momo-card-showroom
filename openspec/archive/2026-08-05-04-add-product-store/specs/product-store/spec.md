# product-store Specification

## ADDED Requirements

### Requirement: 商品狀態必須集中由 Pinia Store 管理

專案 MUST 建立 `src/stores/productStore.ts`，並使用 Pinia Setup Store 集中管理商品列表、載入狀態、錯誤狀態與商品編輯 draft。

#### Scenario: Store 初始化

- GIVEN Pinia 已註冊於 Vue app
- WHEN 開發者匯入 product store
- THEN `useProductStore` SHOULD 可從 `src/stores/productStore.ts` 匯入
- AND store SHOULD 使用 Setup Store pattern
- AND store SHOULD 提供 `products`
- AND store SHOULD 提供 `isLoading`
- AND store SHOULD 提供 `error`
- AND store SHOULD 提供 `editedProducts`

### Requirement: Store 必須透過 mock service 載入商品

Product store MUST 透過 mock product service 載入商品資料，而不是在 store 中重複定義商品 mock array。

#### Scenario: 載入商品列表

- GIVEN mock product service 已建立
- WHEN 開發者呼叫 `loadProducts()`
- THEN store SHOULD 透過 service layer 取得商品
- AND `products` SHOULD 更新為載入結果
- AND `isLoading` SHOULD 在載入流程中反映 loading 狀態
- AND `error` SHOULD 在載入成功後清空

#### Scenario: 載入商品失敗

- GIVEN mock product service 載入失敗
- WHEN 開發者呼叫 `loadProducts()`
- THEN `error` SHOULD 記錄可理解的錯誤狀態
- AND `isLoading` SHOULD 在流程結束後回到 false

### Requirement: 顯示資料必須合併 base data 與 edited data

Product store MUST 以 mock base data 與 local edited draft 合併產生顯示用商品資料，且 MUST NOT mutate mock base data。

#### Scenario: 更新商品 draft

- GIVEN store 已載入 base products
- WHEN 開發者呼叫 `updateProductDraft(id, draft)`
- THEN `editedProducts` SHOULD 記錄指定商品 draft
- AND 顯示用商品資料 SHOULD 反映 base product 與 draft 的合併結果
- AND `products` 中的 base product SHOULD NOT 被直接修改

#### Scenario: 查找合併後商品

- GIVEN store 已載入 base products 並存在指定商品 draft
- WHEN 開發者呼叫 `findProductById(id)`
- THEN store SHOULD 回傳合併後的 `ProductCard`

#### Scenario: 清除商品 draft

- GIVEN 指定商品已有 edited draft
- WHEN 開發者呼叫 `resetProductDraft(id)`
- THEN `editedProducts` SHOULD 移除指定商品 draft
- AND 顯示用商品資料 SHOULD 回到 mock base data

### Requirement: Store 必須提供 storage hydrate/save actions

Product store MUST 提供 hydrate 與 save actions，讓 edited draft 可被保存與還原。

#### Scenario: Hydrate edited products

- GIVEN storage 中存在已保存的 edited product drafts
- WHEN 開發者呼叫 `hydrateFromStorage()`
- THEN store SHOULD 更新 `editedProducts`
- AND 後續顯示資料 SHOULD 套用 hydrated drafts

#### Scenario: Save edited products

- GIVEN store 中存在 edited product drafts
- WHEN 開發者呼叫 `saveToStorage()`
- THEN edited drafts SHOULD 被保存到 storage

### Requirement: Product store 必須有 Vitest 覆蓋

專案 MUST 使用 Vitest 覆蓋 product store 的主要流程。

#### Scenario: Store actions 測試

- GIVEN product store 已建立
- WHEN 開發者執行 `npm run test`
- THEN 測試 SHOULD 覆蓋 `loadProducts()`
- AND 測試 SHOULD 覆蓋 loading 與 error state
- AND 測試 SHOULD 覆蓋 `updateProductDraft()`
- AND 測試 SHOULD 覆蓋 `resetProductDraft()`
- AND 測試 SHOULD 覆蓋 `hydrateFromStorage()` 與 `saveToStorage()`
