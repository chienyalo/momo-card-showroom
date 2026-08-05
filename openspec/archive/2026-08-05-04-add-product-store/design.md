# Product Pinia Store Design

## Context

第 4 步負責建立商品狀態中心，位於 service layer 與 view/component 之間。

Store SHOULD 使用既有：

- `ProductCard` schema。
- `mockProductService` 的 `getProducts()` 與 `getProductById(id)`。
- Pinia Setup Store。

## Store Shape

`src/stores/productStore.ts` SHOULD 匯出 Setup Store，例如 `useProductStore`。

State SHOULD 包含：

- `products`：mock base products，來自 service layer。
- `isLoading`：商品載入狀態。
- `error`：載入或 store action 失敗時的錯誤訊息。
- `editedProducts`：以 product ID 為 key 的 local draft patch。

Getters / computed state SHOULD 提供可顯示商品資料，例如：

- `displayProducts`：base products 與 `editedProducts` merge 後的列表。

## Actions

Store SHOULD 提供下列 actions：

- `loadProducts()`：透過 mock service 載入商品並更新 `products`、`isLoading`、`error`。
- `findProductById(id)`：優先從顯示資料查找指定商品。
- `updateProductDraft(id, draft)`：更新指定商品的 local edited draft。
- `resetProductDraft(id)`：清除指定商品的 edited draft，使顯示資料回到 mock base data。
- `hydrateFromStorage()`：從 storage hydrate `editedProducts`。
- `saveToStorage()`：保存 `editedProducts` 到 storage。

## Merge Behavior

顯示資料 MUST 由 mock base data 與 local edited data 合併而來。

Merge SHOULD：

- 不 mutate `products` 內的 mock base data。
- 以 product ID 對應 draft。
- draft 欄位覆蓋顯示資料，但不得刪除 base product 的必要 schema 欄位。
- 找不到 base product 的 draft SHOULD 不產生額外商品。

## Persistence Boundary

第 4 步可以直接實作最小 storage hydrate/save 行為，讓 store actions 可測。

正式 persistence utility、壞 JSON fallback 與 storage key 細節會在第 10 步擴充；本 change 應避免建立過度複雜的 persistence abstraction。

## Testing Strategy

Vitest SHOULD 覆蓋：

- `loadProducts()` 成功載入商品。
- `loadProducts()` loading 與 error 狀態。
- `updateProductDraft()` 不 mutate mock base data，且 display data 會合併 draft。
- `resetProductDraft()` 清除指定商品 draft。
- `hydrateFromStorage()` 可還原 edited products。
- `saveToStorage()` 可保存 edited products。

## Risks

- 若 store 直接修改 base products，reset 與後續 persistence 會失去可信的 mock default。
- 若 storage hydrate/save 與第 10 步 utility 強耦合，後續重構成本會升高。
- 若 view 直接呼叫 service 而跳過 store，商品狀態會分散。

## Decisions

- 使用 Pinia Setup Store。
- `editedProducts` 儲存 draft patch，不覆蓋 base products。
- `findProductById(id)` 從合併後顯示資料查找，讓後續 preview 可即時反映 draft。
- 第 4 步只做 store 需要的最小 storage action，第 10 步再整理成 persistence utility。
