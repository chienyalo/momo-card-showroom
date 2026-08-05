# Tasks

- [x] 檢查目前 git worktree 與 active OpenSpec change，確認驗證範圍乾淨。
- [x] 執行 `npm run test`，確認既有 Vitest 全部通過。
- [x] 執行 `npm run build`，確認 TypeScript 與 production build 成功。
- [x] 啟動 Vite dev server，取得可供 smoke check 使用的本地 URL。
- [x] 驗證 `/` 可顯示 mock 商品列表。
- [x] 驗證點擊商品卡可進入 `/product/:id`。
- [x] 驗證編輯欄位會即時更新 ProductCard preview。
- [x] 驗證重新整理後 `localStorage` draft 仍可 hydrate。
- [x] 驗證 reset 會還原商品並清除該商品 persisted draft。
- [x] 驗證 invalid product id 顯示 fallback，且沒有 crash 或 redirect loop。
- [x] 檢查 Network 請求，確認沒有 momo production domain request。
- [x] 整理驗證證據並在 workflow checklist 記錄結果。
