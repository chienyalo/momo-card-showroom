# product-card-schema Specification

## Requirements

### Requirement: 商品卡資料結構必須集中定義

專案 MUST 在 `src/types/productCard.ts` 集中定義商品卡資料結構，供 component、service、store 與文件 sample usage 共用。

#### Scenario: 開發者引用商品卡型別

- GIVEN 開發者要實作商品卡 component、mock service 或 store
- WHEN 開發者需要商品卡資料型別
- THEN `ProductCard` SHOULD 可從 `src/types/productCard.ts` 匯入
- AND 欄位定義 SHOULD 不需要在 component、service 或 store 中重複宣告

#### Scenario: 商品卡型別包含必要展示欄位

- GIVEN `ProductCard` interface 已定義
- WHEN 開發者檢查 schema 欄位
- THEN schema SHOULD 包含 `id`
- AND schema SHOULD 包含 `title`
- AND schema SHOULD 包含 `imageUrl`
- AND schema SHOULD 包含 `price`
- AND schema SHOULD 包含 `originalPrice`
- AND schema SHOULD 包含 `discountBadge`
- AND schema SHOULD 包含 `promotionText`
- AND schema SHOULD 包含 `rating`
- AND schema SHOULD 包含 `soldCount`
- AND schema SHOULD 包含 `ctaLabel`

### Requirement: 商品卡 helper 必須提供穩定輸出

專案 MUST 提供純函式 helper 處理商品卡價格格式與折扣計算，且 helper MUST 對缺省或無效輸入有明確 fallback。

#### Scenario: 價格格式化

- GIVEN `formatPrice()` 收到有效價格數值
- WHEN helper 格式化價格
- THEN helper SHOULD 回傳適合商品卡 UI 顯示的新台幣價格字串
- AND 輸出 SHOULD 保持穩定且可被 Vitest 驗證

#### Scenario: 折扣計算

- GIVEN `calculateDiscountRate()` 收到售價與原價
- WHEN 原價大於售價
- THEN helper SHOULD 回傳可表示折扣程度的結果

#### Scenario: 缺省或無效輸入 fallback

- GIVEN helper 收到缺省、零值或不合理價格資料
- WHEN helper 計算顯示用結果
- THEN helper MUST NOT throw runtime error
- AND helper SHOULD 回傳明確 fallback 結果

### Requirement: Schema helper 必須有 Vitest 覆蓋

專案 MUST 使用 Vitest 覆蓋商品卡 schema helper 的核心行為。

#### Scenario: Schema helper 測試

- GIVEN schema helper 已建立
- WHEN 開發者執行 `npm run test`
- THEN 測試 SHOULD 覆蓋價格格式化
- AND 測試 SHOULD 覆蓋折扣計算
- AND 測試 SHOULD 覆蓋缺省欄位或無效輸入處理
