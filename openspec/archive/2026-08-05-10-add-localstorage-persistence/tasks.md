# Tasks

- [x] 建立 `src/utils/persistence.ts` 與固定 storage key。
- [x] 實作 `loadProductEdits()`，處理空資料、壞 JSON、錯誤格式與 storage exception。
- [x] 實作 `saveProductEdits()`，保存 `EditedProducts` 且不保存 mock base products。
- [x] 實作 `clearProductEdit(id)`，只清除指定商品 draft 並保留其他 draft。
- [x] 更新 `src/stores/productStore.ts`，改由 persistence utility 負責 hydrate/save storage I/O。
- [x] 確保 store/app 初始化時 hydrate，且不阻塞商品 mock service 載入。
- [x] 確保 reset 商品後 storage 不再保留該商品的 draft。
- [x] 補 persistence utility Vitest，覆蓋正常、空資料、壞 JSON、錯誤 storage、save 與 clear。
- [x] 更新既有 product store tests，確認 utility integration 與 draft merge 行為。
- [x] 執行 `npm run test`。
- [x] 執行 `npm run build`。
- [x] 以 persistence round-trip tests 與本地 dev route smoke check 驗證修改商品、重新整理後 draft 保留，以及清除單一商品 draft。
