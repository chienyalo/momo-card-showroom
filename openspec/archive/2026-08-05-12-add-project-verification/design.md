# Project Verification Design

## Verification Layers

驗證分成三層，依成本由低至高執行：

1. **Automated tests**：執行既有 Vitest，確認 schema helper、mock service、store、persistence 與元件測試。
2. **Production build**：執行 `npm run build`，確認 TypeScript 與 Vite production bundle 可產生。
3. **Runtime smoke check**：啟動 Vite dev server，驗證首頁、有效商品頁、invalid id fallback、編輯同步與 reload persistence。

## Runtime Scenarios

| 情境 | 驗證結果 |
| --- | --- |
| 開啟 `/` | 可看到 mock 商品列表 |
| 點擊商品卡 | 導向 `/product/:id` |
| 編輯商品名稱或價格 | preview 即時反映修改 |
| 重新整理商品頁 | 編輯 draft 仍存在 |
| 按 reset | preview 還原且 draft 被清除 |
| 開啟 `/product/not-found` | 顯示找不到商品 fallback，不 crash、不 loop |
| 檢查 Network | 無 momo production domain request |

## Evidence

驗證結果以 command output、測試摘要與 smoke check 記錄為證據。若發現問題，先修正直接阻擋驗收的缺陷，再重新執行受影響的驗證層；不在本 change 擴張功能範圍。

## Constraints

- 使用現有 `npm` scripts 與測試環境。
- 不依賴真實商品服務、帳號或外部資料。
- `localStorage` 驗證使用瀏覽器 runtime；unit test 維持既有 mock storage。
