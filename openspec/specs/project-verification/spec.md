# project-verification Specification

## Requirements

### Requirement: 專案必須通過 automated verification

專案 MUST 通過既有 `npm run test` 與 `npm run build` scripts，作為最終驗證的必要條件。

#### Scenario: 測試與 production build

- GIVEN 專案依賴已安裝
- WHEN 開發者執行 `npm run test` 與 `npm run build`
- THEN Vitest MUST 成功完成
- AND TypeScript check 與 Vite production build MUST 成功完成

### Requirement: 核心商品流程必須可被驗證

專案 MUST 支援從首頁瀏覽商品、進入細節頁、編輯 preview 與處理 invalid product id 的 smoke check。

#### Scenario: 商品瀏覽與編輯

- GIVEN 開發者啟動 Vite dev server
- WHEN 開啟 `/`
- THEN 頁面 MUST 顯示 mock 商品列表
- WHEN 使用者點擊商品卡
- THEN app MUST 導向對應的 `/product/:id`
- WHEN 使用者在 editor 修改商品欄位
- THEN ProductCard preview MUST 即時反映修改

#### Scenario: Invalid product id fallback

- GIVEN 使用者開啟不存在的 product id
- WHEN app 載入 `/product/not-found`
- THEN app MUST 顯示可理解的找不到商品 fallback
- AND app MUST NOT crash 或形成 redirect loop

### Requirement: 商品編輯結果必須可持久化驗證

商品 draft MUST 能在重新整理後還原，且 reset MUST 清除對應的 persisted draft。

#### Scenario: Reload 與 reset

- GIVEN 使用者已修改商品欄位並完成保存至 localStorage
- WHEN 使用者重新整理商品細節頁
- THEN ProductCard preview 與 editor MUST 顯示修改後的 draft
- WHEN 使用者按下 reset
- THEN 商品 MUST 還原 mock base data
- AND 該商品 draft MUST 從 localStorage 移除

### Requirement: 專案不得發出真實 momo request

最終 runtime 驗證 MUST 確認 app 不呼叫 momo production domain 或真實 momo API。

#### Scenario: Network request scope

- GIVEN 開發者執行首頁、細節頁與編輯流程
- WHEN 開發者檢查 browser Network requests
- THEN MUST 不存在指向 momo production domain 的 request
- AND 商品資料 MUST 仍由 mock service 提供
