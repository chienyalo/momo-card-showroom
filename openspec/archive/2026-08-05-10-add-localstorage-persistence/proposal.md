# 建立 localStorage Persistence

## Why

目前 `productStore` 已有最小的 storage hydrate/save 行為，但 JSON 解析、storage key 與資料存取責任仍直接放在 store 內，且沒有獨立的單一商品清除 API。需要將瀏覽器端 persistence 抽離成可測試的 utility，讓編輯結果在重新整理後保留，同時在 storage 資料損壞或不可用時維持 app 可運作。

## What

- 建立 `src/utils/persistence.ts`。
- 集中定義 `momo-card-showroom:product-edits` storage key。
- 實作 `loadProductEdits()`、`saveProductEdits()`、`clearProductEdit(id)`。
- 將 `productStore` 的 hydrate/save actions 改由 utility 負責 storage I/O。
- 在 app/store 初始化流程 hydrate 已保存的商品 draft。
- 補 Vitest，覆蓋保存、讀取、單一商品清除、壞 JSON 與 storage 例外 fallback。

## Non-Goals

- 不改變 `ProductCard` schema 或商品 draft 的 UI 編輯流程。
- 不新增遠端 API、資料庫或跨裝置同步。
- 不加入 persistence schema migration；只保留清楚的資料邊界，供後續演進。
- 不處理 README、sample usage 或其他第 11 步文件工作。
