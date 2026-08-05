# product-detail-edit-flow Specification

## Requirements

### Requirement: 商品細節頁必須根據 route id 顯示商品

商品細節頁 `/product/:id` MUST 根據 route param 對應的商品資料顯示商品內容。

#### Scenario: 正確商品 id

- GIVEN 使用者進入存在商品的 `/product/:id`
- WHEN `ProductDetailView.vue` render
- THEN 頁面 SHOULD 從 Pinia store 查找對應商品
- AND 頁面 SHOULD 顯示該商品的基本資訊
- AND 頁面 MUST NOT 直接讀取 mock data 陣列

#### Scenario: store 尚未載入

- GIVEN 使用者直接進入 `/product/:id`
- AND Pinia store 尚未載入商品資料
- WHEN `ProductDetailView.vue` mount
- THEN 頁面 SHOULD 呼叫 store `loadProducts()`
- AND 資料載入責任 SHOULD 留在 view/store
- AND router guard MUST NOT 執行複雜商品資料載入

### Requirement: 商品細節頁必須顯示 ProductCard preview

商品細節頁 MUST 使用 `ProductCard.vue` 顯示商品 preview，讓商品卡元件重用方式可被理解。

#### Scenario: 顯示 detail preview

- GIVEN 商品資料已找到
- WHEN 商品細節頁 render
- THEN 頁面 SHOULD 顯示 `ProductCard.vue`
- AND `ProductCard` SHOULD 使用 `mode="detail"`
- AND preview SHOULD 使用 store 中的顯示商品資料

### Requirement: 商品細節頁必須提供編輯整合區

商品細節頁 MUST 提供 editor integration area，作為第 9 步 `ProductEditorPanel.vue` 的落點，並確保它與 preview 指向同一份商品狀態。

#### Scenario: Editor integration area

- GIVEN 商品資料已找到
- WHEN 商品細節頁 render
- THEN 頁面 SHOULD 顯示 editor integration area
- AND editor integration area SHOULD 取得同一個商品或商品 id
- AND preview 與 editor integration area SHOULD 指向同一份商品狀態

#### Scenario: 不提前實作完整 editor controls

- GIVEN 第 9 步尚未實作完整 `ProductEditorPanel.vue`
- WHEN 第 8 步實作商品細節頁
- THEN editor integration area MAY 使用 placeholder 或輕量 shell
- AND 完整表單欄位 SHOULD 留到第 9 步實作

### Requirement: 商品細節頁必須安全處理 invalid id

商品細節頁 MUST 在 route param 對應不到商品時提供 fallback，且 MUST NOT crash 或造成 redirect loop。

#### Scenario: Invalid product id

- GIVEN 使用者進入不存在商品的 `/product/:id`
- WHEN 商品細節頁查找不到商品
- THEN 頁面 SHOULD 顯示「找不到商品」或等價 fallback
- AND 頁面 SHOULD 提供返回首頁入口
- AND app MUST NOT crash
- AND router MUST NOT 造成無限 redirect

### Requirement: Route param 變更時細節頁資料必須更新

商品細節頁 MUST 在同一路由不同 `id` param 之間切換時更新 preview 與 editor integration area。

#### Scenario: Same route different product id

- GIVEN 使用者已在 `/product/:id`
- WHEN route param 從一個商品 ID 變更為另一個商品 ID
- THEN ProductCard preview SHOULD 根據新的 `id` 更新
- AND editor integration area SHOULD 根據新的 `id` 更新
- AND 頁面 SHOULD NOT 保留上一個商品的 stale data

### Requirement: 商品細節頁必須提供 schema / sample usage 區塊

商品細節頁 SHOULD 顯示簡短 schema / sample usage，協助理解 `ProductCard` 的重用方式。

#### Scenario: 顯示 sample usage

- GIVEN 使用者進入存在商品的細節頁
- WHEN 頁面 render
- THEN 頁面 SHOULD 顯示 `ProductCard` props 或 sample usage
- AND sample usage SHOULD 說明 `product` 與 `mode="detail"` 的使用方式

### Requirement: 商品細節頁變更必須可驗證

商品細節頁 change MUST 可透過 build 與手動流程驗證。

#### Scenario: Build verification

- GIVEN 商品細節頁已更新
- WHEN 開發者執行 `npm run build`
- THEN production build SHOULD 成功完成

#### Scenario: Manual detail verification

- GIVEN app 可在瀏覽器執行
- WHEN 開發者手動驗證商品細節頁
- THEN 正確商品 ID SHOULD 顯示 preview 與 editor integration area
- AND invalid ID SHOULD 顯示 fallback
- AND 畫面 SHOULD 不依賴 momo production domain
