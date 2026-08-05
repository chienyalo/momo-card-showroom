# router-flow Specification

## Requirements

### Requirement: 專案必須定義核心頁面 routes

專案 MUST 在 Vue Router 中定義首頁與商品細節頁 routes。

#### Scenario: 首頁 route

- GIVEN Vue Router 已註冊於 app
- WHEN 使用者進入 `/`
- THEN router SHOULD render `HomeView.vue`
- AND 頁面 SHOULD 作為商品列表入口

#### Scenario: 商品細節 route

- GIVEN Vue Router 已註冊於 app
- WHEN 使用者進入 `/product/:id`
- THEN router SHOULD render `ProductDetailView.vue`
- AND route SHOULD 提供 `id` param 給商品細節頁

### Requirement: Router 不得承擔複雜商品資料載入

Router MUST NOT 在 navigation guard 中執行複雜 async 商品資料載入；商品資料載入 SHOULD 交由 view 或 store 處理。

#### Scenario: Route navigation

- GIVEN 使用者在 `/` 與 `/product/:id` 之間導覽
- WHEN route navigation 發生
- THEN router SHOULD 只負責 route mapping 與基本 param 傳遞
- AND 商品資料載入 SHOULD 由 view/store 處理
- AND navigation guard SHOULD NOT 呼叫商品 service 或 store action 進行複雜 async 載入

### Requirement: 商品細節頁必須安全處理 invalid id

商品細節流程 MUST 在 route param 對應不到商品時提供 fallback，且 MUST NOT crash 或造成 redirect loop。

#### Scenario: Invalid product id

- GIVEN 使用者進入不存在商品的 `/product/:id`
- WHEN 商品細節頁查找不到商品
- THEN 頁面 SHOULD 顯示可理解 fallback 或返回首頁入口
- AND app MUST NOT crash
- AND router MUST NOT 造成無限 redirect

### Requirement: Route param 變更時資料必須更新

商品細節頁 MUST 在同一路由不同 `id` param 之間切換時更新顯示資料。

#### Scenario: Same route different product id

- GIVEN 使用者已在 `/product/:id`
- WHEN route param 從一個商品 ID 變更為另一個商品 ID
- THEN 商品細節頁 SHOULD 根據新的 `id` 更新資料
- AND 頁面 SHOULD NOT 保留上一個商品的 stale data

### Requirement: Router 流程必須可驗證

Router change MUST 可透過 build 與手動流程驗證。

#### Scenario: Build verification

- GIVEN router 設定已更新
- WHEN 開發者執行 `npm run build`
- THEN production build SHOULD 成功完成

#### Scenario: Manual navigation verification

- GIVEN app 可在瀏覽器執行
- WHEN 開發者手動驗證核心路由
- THEN `/` SHOULD 可進入首頁
- AND `/product/:id` SHOULD 可進入商品細節頁
- AND 首頁商品入口 SHOULD 可導向正確 `/product/:id`
