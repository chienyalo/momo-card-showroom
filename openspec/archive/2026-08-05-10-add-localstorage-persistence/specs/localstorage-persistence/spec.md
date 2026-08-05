# localstorage-persistence Specification

## ADDED Requirements

### Requirement: Persistence utility 必須集中管理 storage I/O

系統 MUST 建立 `src/utils/persistence.ts`，集中處理商品編輯 drafts 的 localStorage 存取。

#### Scenario: 固定 storage key

- GIVEN app 需要保存商品編輯資料
- WHEN persistence utility 存取 localStorage
- THEN MUST 使用 `momo-card-showroom:product-edits`
- AND storage key MUST 由 utility export，避免 key 字串散落在 store 與 component

### Requirement: Utility 必須能安全讀取商品 drafts

`loadProductEdits()` MUST 回傳 typed `EditedProducts` 或安全的空 object。

#### Scenario: 讀取正常 JSON

- GIVEN localStorage 有合法的商品 drafts JSON object
- WHEN 呼叫 `loadProductEdits()`
- THEN MUST 回傳對應的 drafts
- AND 不得修改 mock base products

#### Scenario: storage 沒有資料

- GIVEN localStorage 沒有 persistence key
- WHEN 呼叫 `loadProductEdits()`
- THEN MUST 回傳空 object
- AND app MUST 正常啟動

#### Scenario: JSON 或 storage 讀取失敗

- GIVEN localStorage 內容不是合法 JSON、不是 object，或讀取拋出 exception
- WHEN 呼叫 `loadProductEdits()`
- THEN MUST 回傳空 object 或安全 fallback
- AND app MUST NOT crash

### Requirement: Utility 必須能保存商品 drafts

`saveProductEdits(edits)` MUST 只保存 `EditedProducts`，不得把 mock base products 寫入 localStorage。

#### Scenario: 保存編輯結果

- GIVEN store 有一筆或多筆商品 drafts
- WHEN 呼叫 `saveProductEdits(edits)`
- THEN localStorage MUST 保存可被重新載入的 JSON
- AND 保存內容 MUST 只包含商品 id 對應的 draft 欄位

#### Scenario: storage 寫入失敗

- GIVEN localStorage `setItem` 拋出 exception
- WHEN 呼叫 `saveProductEdits(edits)`
- THEN utility MUST 吞掉或安全處理 exception
- AND app MUST NOT crash

### Requirement: Utility 必須支援清除單一商品 draft

`clearProductEdit(id)` MUST 只清除指定商品的 persisted draft。

#### Scenario: 清除指定商品

- GIVEN storage 有商品 A 與商品 B 的 drafts
- WHEN 呼叫 `clearProductEdit(productAId)`
- THEN 商品 A draft MUST 被移除
- AND 商品 B draft MUST 保留

### Requirement: Store 必須整合 persistence utility

`productStore` MUST 委派 persistence utility 處理 hydrate、save 與 reset 後的保存狀態。

#### Scenario: App/store 初始化 hydrate

- GIVEN localStorage 有已保存的商品 draft
- WHEN Pinia product store 初始化
- THEN store MUST hydrate `editedProducts`
- AND `displayProducts` MUST merge base products 與 hydrated drafts
- AND hydrate MUST NOT 阻塞 mock product service 載入

#### Scenario: Reset 後不殘留 draft

- GIVEN 商品 draft 已保存且使用者執行 reset
- WHEN reset action 完成
- THEN store state MUST 移除該商品 draft
- AND localStorage MUST 不再保留該商品 draft

### Requirement: Persistence change 必須可測試與可建置

localStorage persistence change MUST 具備自動化與手動驗證。

#### Scenario: Automated verification

- GIVEN persistence utility 與 store integration 已完成
- WHEN 執行 `npm run test` 與 `npm run build`
- THEN tests 與 production build SHOULD 成功完成
- AND tests MUST 覆蓋正常讀取、保存、清除、壞 JSON 與 storage exception fallback

#### Scenario: Reload verification

- GIVEN 使用者在商品細節頁修改商品欄位並完成保存
- WHEN 使用者重新整理頁面
- THEN editor 與 `ProductCard` preview SHOULD 顯示保存後的 draft
