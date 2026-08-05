# 建立專案最終驗證流程

## Why

專案功能、文件與 persistence 已完成，但需要一個明確的最終驗證 change，統一確認測試、production build 與核心使用者流程符合 `docs/PLAN.md`。驗證也必須確認 app 不會呼叫真實 momo production domain。

## What

- 執行並記錄 `npm run test` 與 `npm run build` 結果。
- 驗證 `/` 商品列表、`/product/:id` 商品細節與 invalid `id` fallback。
- 驗證編輯欄位會即時更新 preview，重新整理後 draft 仍由 `localStorage` 還原。
- 驗證 reset 能移除商品的 persisted draft。
- 檢查開發流程沒有發出 momo production domain request。
- 將驗證結果整理成可供評審與後續維護使用的紀錄。

## Non-Goals

- 不新增產品功能、路由、schema 或 API。
- 不串接真實 momo API 或 production service。
- 不引入新的 E2E framework 或第三方測試服務。
- 不修改既有 UI 行為，除非驗證發現阻擋核心流程的缺陷。
