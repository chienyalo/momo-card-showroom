# product-card-component Specification

## ADDED Requirements

### Requirement: 專案必須提供可重用的 ProductCard 元件

專案 MUST 建立 `ProductCard.vue`，用於展示 `ProductCard` schema 的商品資訊，並可在列表與細節 preview 場景重用。

#### Scenario: 以商品資料渲染卡片

- GIVEN 父層提供符合 `ProductCard` schema 的商品資料
- WHEN `ProductCard.vue` render
- THEN 元件 SHOULD 顯示商品圖片、商品名稱、售價、原價、促銷資訊與 CTA
- AND 商品資料 SHOULD 由 typed props 傳入

#### Scenario: 元件可在不同頁面重用

- GIVEN 父層在首頁列表或商品細節頁使用 `ProductCard.vue`
- WHEN 父層傳入 `mode: 'list'` 或 `mode: 'detail'`
- THEN 元件 SHOULD 依 mode 呈現適合該場景的卡片密度或尺寸
- AND 元件 SHOULD NOT 直接依賴 store、service、router 或 localStorage

### Requirement: ProductCard 必須符合 momo-like 商品卡視覺

`ProductCard.vue` MUST 呈現接近 momo 商品卡的展示語彙，但 MUST NOT 使用 momo 專有圖檔、素材或 production service。

#### Scenario: 商品卡視覺元素

- GIVEN 商品資料包含圖片、價格、原價、badge 與促銷文案
- WHEN 元件 render
- THEN 卡片 SHOULD 使用白底
- AND 商品圖 SHOULD 有固定比例
- AND 售價 SHOULD 使用紅色視覺重點
- AND 原價 SHOULD 使用刪除線
- AND 促銷 badge SHOULD 可見
- AND CTA button SHOULD 可見

#### Scenario: 不使用 momo 專有素材

- GIVEN 元件需要呈現 momo-like 視覺
- WHEN 開發者檢查元件與資源引用
- THEN 元件 MUST NOT 引用 momo production domain
- AND 元件 MUST NOT 使用 momo 專有圖檔或素材

### Requirement: ProductCard 必須安全處理文字與缺省資料

`ProductCard.vue` MUST 在長商品名稱、缺省促銷資料或不完整欄位下維持可用版面。

#### Scenario: 長商品名稱

- GIVEN 商品名稱超過兩行顯示長度
- WHEN 元件 render
- THEN 商品名稱 SHOULD 被限制為兩行截斷
- AND 卡片 layout MUST NOT 被撐破

#### Scenario: 缺省促銷資料

- GIVEN 商品資料的 `discountBadge` 或 `promotionText` 為空字串
- WHEN 元件 render
- THEN 元件 SHOULD 安全隱藏或保留穩定間距
- AND app MUST NOT crash

### Requirement: ProductCard 必須使用既有商品 schema 與 helper

`ProductCard.vue` SHOULD 使用既有 `ProductCard` type 與價格/折扣 helper，避免格式化邏輯散落在元件外。

#### Scenario: 價格格式化

- GIVEN 商品資料包含 `price` 與 `originalPrice`
- WHEN 元件 render 價格
- THEN 售價與原價 SHOULD 透過既有 `formatPrice()` 呈現

#### Scenario: 折扣顯示

- GIVEN 商品資料未提供明確 `discountBadge` 但價格可計算折扣
- WHEN 元件需要顯示折扣資訊
- THEN 元件 MAY 使用既有 `calculateDiscountRate()` 產生折扣顯示

### Requirement: ProductCard 變更必須可驗證

ProductCard change MUST 可透過 build 與手動視覺流程驗證。

#### Scenario: Build verification

- GIVEN `ProductCard.vue` 已建立
- WHEN 開發者執行 `npm run build`
- THEN production build SHOULD 成功完成

#### Scenario: Manual visual verification

- GIVEN app 可在瀏覽器執行
- WHEN 開發者手動檢查 list mode 與 detail mode
- THEN 卡片 SHOULD 可完整呈現商品資訊
- AND 長商品名稱 SHOULD 不破壞版面
- AND 畫面 SHOULD 不依賴 momo production domain
