# ProductCard Schema Design

## Context

`ProductCard` 是專案中商品卡 UI、mock service、store draft、editor panel 與文件 sample usage 的共同資料契約。

此 change 只處理 schema 與純邏輯 helper，不引入 UI 或資料來源，讓後續步驟可以在穩定型別上開發。

## Data Model

`ProductCard` SHOULD 以 `src/types/productCard.ts` 匯出，欄位語意如下：

- `id`：商品唯一識別字，用於 route、store 查找與 draft 合併。
- `title`：商品名稱。
- `imageUrl`：商品圖片 URL。
- `price`：目前售價，使用 number 儲存原始數值。
- `originalPrice`：原價，可用於折扣計算與刪除線顯示。
- `discountBadge`：折扣或活動 badge 文案。
- `promotionText`：促銷文案。
- `rating`：評價數值。
- `soldCount`：銷量數值。
- `ctaLabel`：CTA button 文案。

## Helper Behavior

- `formatPrice()` SHOULD 接收 number，回傳適合 UI 顯示的新台幣價格字串。
- `calculateDiscountRate()` SHOULD 接收售價與原價，回傳可顯示或可判斷的折扣結果。
- helper SHOULD 對缺省或無效輸入有明確 fallback，不讓 UI 或測試流程 crash。

## Testing Strategy

Vitest SHOULD 優先測純邏輯：

- 價格格式化包含整數、千分位與缺省行為。
- 折扣計算包含正常折扣、無原價、售價大於或等於原價。
- 缺省欄位處理能產生穩定輸出。

## Risks

- 若 schema 欄位過早設為全部必填，mock data 與 editor draft 可能需要大量重複預設值。
- 若 helper 輸出格式與 UI 強耦合，後續 `ProductCard.vue` 會較難替換呈現方式。

## Decisions

- schema 與 helper 放在 `src/types/productCard.ts`，作為第 2 步的集中入口。
- helper 保持純函式，避免依賴 browser API、store 或 component。
- 不在本 change 決定 momo-style 卡片視覺細節，視覺需求留到第 6 步。
