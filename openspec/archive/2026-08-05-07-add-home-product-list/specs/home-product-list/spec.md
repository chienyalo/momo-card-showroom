# home-product-list Specification

## ADDED Requirements

### Requirement: 首頁必須載入並顯示商品列表

首頁 `/` MUST 透過 Pinia 商品 store 載入 mock 商品資料，並以商品卡列表呈現。

#### Scenario: 首頁載入商品

- GIVEN 使用者進入 `/`
- WHEN `HomeView.vue` mount
- THEN 首頁 SHOULD 透過 `useProductStore()` 呼叫 `loadProducts()`
- AND 首頁 SHOULD 使用 `displayProducts` 作為顯示資料
- AND 首頁 MUST NOT 直接讀取 mock data 陣列

#### Scenario: 商品列表顯示

- GIVEN 商品資料已載入且列表非空
- WHEN 首頁 render
- THEN 首頁 SHOULD 使用 Vuetify grid 顯示多張商品卡
- AND 每張商品 SHOULD 使用 `ProductCard.vue`
- AND `ProductCard` SHOULD 使用 `mode="list"`

### Requirement: 首頁商品卡必須可導向商品細節頁

首頁商品卡 MUST 提供可理解的互動，讓使用者可進入對應商品的 `/product/:id`。

#### Scenario: 點擊商品卡 CTA

- GIVEN 首頁已顯示商品卡
- WHEN 使用者點擊商品卡 CTA 或卡片互動區
- THEN app SHOULD 導向 `{ name: 'product-detail', params: { id: product.id } }`
- AND URL SHOULD 對應 `/product/:id`

#### Scenario: 導覽責任留在首頁

- GIVEN 首頁使用 `ProductCard.vue`
- WHEN 商品卡互動觸發導覽
- THEN route navigation SHOULD 由 `HomeView.vue` 或父層負責
- AND `ProductCard.vue` SHOULD NOT 直接依賴 router

### Requirement: 首頁必須提供基本狀態畫面

首頁 MUST 針對 loading、empty 與 error 狀態提供基本畫面，避免列表資料尚未準備好時畫面不完整。

#### Scenario: Loading state

- GIVEN 商品資料正在載入
- WHEN `productStore.isLoading` 為 true
- THEN 首頁 SHOULD 顯示 loading indicator、skeleton 或等價狀態

#### Scenario: Empty state

- GIVEN 商品資料載入完成
- AND `displayProducts` 為空
- WHEN 首頁 render
- THEN 首頁 SHOULD 顯示空資料狀態
- AND app MUST NOT crash

#### Scenario: Error state

- GIVEN 商品資料載入失敗
- WHEN `productStore.error` 有錯誤訊息
- THEN 首頁 SHOULD 顯示錯誤狀態
- AND 首頁 SHOULD 提供 retry 入口重新呼叫 `loadProducts()`

### Requirement: 首頁必須提供展示用 header 與 search bar

首頁 SHOULD 提供簡單 header 與 search bar 視覺，作為商品列表 showroom 的入口，但 MUST NOT 實作真搜尋或發出真實查詢。

#### Scenario: Header and search visual

- GIVEN 使用者進入首頁
- WHEN 首頁 render
- THEN 頁面 SHOULD 顯示 header
- AND 頁面 SHOULD 顯示 search bar 視覺

#### Scenario: Search bar 不查詢

- GIVEN 首頁顯示 search bar
- WHEN 使用者看到或操作 search bar
- THEN search bar MUST NOT 呼叫真實 momo API
- AND search bar SHOULD NOT 觸發遠端查詢
- AND search bar MAY 以 disabled、read-only 或 placeholder 形式呈現

### Requirement: 首頁列表變更必須可驗證

首頁列表 change MUST 可透過 build 與手動流程驗證。

#### Scenario: Build verification

- GIVEN 首頁列表已實作
- WHEN 開發者執行 `npm run build`
- THEN production build SHOULD 成功完成

#### Scenario: Manual navigation verification

- GIVEN app 可在瀏覽器執行
- WHEN 開發者手動驗證首頁列表
- THEN `/` SHOULD 可顯示多張商品卡
- AND 點擊商品卡 SHOULD 可導向正確 `/product/:id`
- AND 畫面 SHOULD 不依賴 momo production domain
