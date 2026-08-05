# localStorage Persistence Design

## Context

Pinia `productStore` 是編輯狀態的唯一來源，`editedProducts` 以商品 id 對應 `ProductDraft`。第 10 步把 storage I/O 移到 `src/utils/persistence.ts`，讓 store 保留狀態協調責任，utility 負責瀏覽器儲存格式與錯誤保護。

## Persistence API

`src/utils/persistence.ts` SHOULD 匯出：

- `PRODUCT_EDITS_STORAGE_KEY`：固定為 `momo-card-showroom:product-edits`。
- `loadProductEdits()`：回傳 `EditedProducts`；沒有資料、JSON 無效、格式不是 object 或 storage 讀取失敗時回傳空 object。
- `saveProductEdits(edits)`：將 drafts 序列化並保存；storage 不可用或寫入失敗時不得讓 app crash。
- `clearProductEdit(id)`：只移除指定商品 draft，保留其他商品資料；清除後保存剩餘 drafts。

utility SHOULD 使用 `globalThis.localStorage`，避免直接依賴 browser global，方便 Vitest mock 與未來替換 storage adapter。

## Data Boundary

Persistence 只保存 `EditedProducts` draft，不保存 mock base products。載入後由 store 的 `displayProducts` computed 將 draft merge 回 base data。

```text
localStorage JSON
  -> loadProductEdits()
  -> productStore.editedProducts
  -> displayProducts merge
  -> ProductCard / ProductEditorPanel
```

`saveToStorage()` SHOULD 委派 `saveProductEdits(editedProducts)`；`hydrateFromStorage()` SHOULD 委派 `loadProductEdits()`。`resetProductDraft(id)` 若要持久化清除結果，應委派 `clearProductEdit(id)` 或在 action 後保存完整 drafts，避免 storage 保留已 reset 的資料。

## Initialization

App/store 初始化時 SHOULD 執行一次 hydrate，且 hydrate 不應阻塞 mock product service 的載入。若 storage 沒有資料或資料損壞，store 應以空 drafts 正常啟動。

## Error Handling

- `JSON.parse` 失敗時回傳空 drafts。
- 讀取、寫入或 remove 觸發 `Storage` exception 時回傳安全結果，不得讓 Vue app crash。
- 非 object、array 或含有不符合 draft shape 的資料應忽略或降級為空 drafts。
- utility 不應將錯誤訊息直接顯示在商品卡 UI；必要時由 store 保留可觀測的非阻塞錯誤策略。

## Verification

- utility tests 驗證空 storage、正常 JSON、壞 JSON、錯誤 storage、save 與 clear。
- store tests 驗證 hydrate/save 仍套用同一份 `editedProducts`。
- `npm run test` 與 `npm run build` 必須通過。
- 手動修改商品後重新整理頁面，商品 preview 與 editor 欄位仍保留 draft。
