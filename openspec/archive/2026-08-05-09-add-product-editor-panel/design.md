# ProductEditorPanel Design

## Context

商品細節頁已將同一份 Pinia 商品狀態傳給 preview 與 editor integration area。第 9 步只負責把 placeholder 擴充成可操作的編輯面板，資料保存仍留給後續 persistence step。

## Component Boundary

`ProductEditorPanel.vue` SHOULD：

- 接收 `product: ProductCard` prop，作為目前顯示的商品。
- 透過 `useProductStore()` 取得 draft 更新與 reset actions。
- 將表單輸入轉換為對應的 `ProductCardInput` 欄位。
- 讓表單欄位由同一份 `product` prop 反映目前 draft，避免維護第二份商品狀態。
- 對金額、評價與銷量提供基本數值限制。

`ProductEditorPanel.vue` SHOULD NOT：

- 直接匯入 mock products 陣列。
- 直接修改 `product` prop 或 mock base data。
- 直接操作 `localStorage`。
- 在元件內呼叫 router 或 mock service。

## Fields

面板應提供以下可辨識且有 label 的控制項：

- 商品名稱 `title`
- 圖片 URL `imageUrl`
- 售價 `price`
- 原價 `originalPrice`
- 折扣 badge `discountBadge`
- 促銷文案 `promotionText`
- 評價 `rating`
- 銷量 `soldCount`
- CTA 文案 `ctaLabel`

每個控制項的更新 SHOULD 呼叫 `productStore.updateProductDraft(product.id, patch)`。reset SHOULD 呼叫 `resetProductDraft(product.id)`，讓 preview 回到 mock base data。

## Reactive Flow

```text
Vuetify control
  -> ProductEditorPanel update handler
  -> productStore.updateProductDraft(product.id, patch)
  -> displayProducts computed merge
  -> ProductDetailView product computed
  -> ProductCard preview updates
```

路由切換到另一個商品時，面板 SHOULD 以新的 `product.id` 更新欄位值，不保留前一個商品的表單資料。

## Verification

- 元件測試確認所有欄位可由商品資料初始化。
- 元件測試確認輸入會更新正確的 draft 欄位。
- 元件測試確認 reset 會呼叫 store action。
- `npm run test` 與 `npm run build` 必須通過。
- 手動確認商品細節頁輸入欄位後 preview 即時更新。

## Decisions

- 使用 Pinia 作為唯一的編輯狀態來源，元件不建立平行商品副本。
- 本步驟只處理瀏覽器內即時編輯，跨 reload 保存延後至第 10 步。
- 先採用基本表單驗證，避免空標題、負價格或超出合理範圍的數值破壞商品卡呈現。
