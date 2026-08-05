# product-editor-panel Specification

## ADDED Requirements

### Requirement: ProductEditorPanel 必須顯示可編輯商品欄位

`ProductEditorPanel.vue` MUST 使用 typed `product` prop，並以 Vuetify form controls 顯示商品卡可編輯欄位。

#### Scenario: 顯示目前商品資料

- GIVEN 商品細節頁取得有效的 `ProductCard`
- WHEN `ProductEditorPanel.vue` render
- THEN 面板 MUST 顯示商品名稱、圖片 URL、售價、原價、折扣 badge、促銷文案、評價、銷量與 CTA 欄位
- AND 各欄位 MUST 顯示目前商品的值
- AND 欄位 MUST 具備可理解的 label

### Requirement: 欄位輸入必須更新 Pinia draft

面板 MUST 透過 `productStore.updateProductDraft()` 更新編輯內容，不得直接修改 mock base data 或 prop。

#### Scenario: 更新商品名稱

- GIVEN 使用者在商品名稱欄位輸入新值
- WHEN 欄位觸發更新
- THEN 面板 MUST 以目前商品 `id` 呼叫 `updateProductDraft()`
- AND update patch MUST 只包含被修改的 `title`
- AND mock base data MUST 保持不變

#### Scenario: 更新數值欄位

- GIVEN 使用者修改售價、原價、評價或銷量
- WHEN 欄位觸發更新
- THEN draft MUST 儲存為對應的 number value
- AND 商品 preview SHOULD 使用更新後的數值重新 render

### Requirement: 商品 preview 必須即時反映 draft

商品細節頁中的 `ProductCard` preview MUST 與 editor 使用同一份 store display state。

#### Scenario: 編輯後立即更新 preview

- GIVEN 使用者已開啟有效商品的細節頁
- WHEN 使用者修改任一商品卡欄位
- THEN `ProductCard` preview SHOULD 在不重新整理頁面的情況下顯示新值
- AND preview MUST NOT 讀取另一份獨立的商品資料副本

### Requirement: 面板必須提供 reset

`ProductEditorPanel.vue` MUST 提供 reset 操作，讓目前商品的 draft 回到 mock base data。

#### Scenario: 還原目前商品

- GIVEN 目前商品已有未保存的 draft 修改
- WHEN 使用者啟動 reset
- THEN 面板 MUST 呼叫 `productStore.resetProductDraft(product.id)`
- AND 欄位 SHOULD 回到 mock default 值
- AND `ProductCard` preview SHOULD 同步回復

### Requirement: 表單必須限制不合理輸入

面板 MUST 對必要文字與數值欄位提供基本驗證或輸入限制。

#### Scenario: 無效數值輸入

- GIVEN 使用者輸入負價格、負銷量或超出評價範圍的值
- WHEN 表單驗證執行
- THEN 欄位 MUST 顯示驗證失敗或拒絕不合理值
- AND 不得將不合理值寫入商品 draft

### Requirement: 面板必須保持低耦合

`ProductEditorPanel.vue` MUST 將資料狀態管理留在 Pinia store，並不得直接依賴 mock service、router 或 localStorage。

#### Scenario: 元件依賴邊界

- GIVEN 開發者檢查 `ProductEditorPanel.vue` 的 imports 與事件流程
- THEN 元件 SHOULD 只依賴商品型別、Pinia product store 與必要的 UI 元件
- AND localStorage persistence SHOULD 留給後續步驟處理

### Requirement: ProductEditorPanel 必須可測試與可建置

此 change MUST 可透過自動化測試、production build 與手動流程驗證。

#### Scenario: 元件測試

- GIVEN `ProductEditorPanel` 測試使用 mock product 與 store
- WHEN 測試執行
- THEN 測試 MUST 覆蓋欄位初始值、至少一個文字欄位更新、至少一個數值欄位更新與 reset

#### Scenario: Build verification

- GIVEN 編輯面板已整合至商品細節頁
- WHEN 開發者執行 `npm run test` 與 `npm run build`
- THEN 測試與 production build SHOULD 成功完成
