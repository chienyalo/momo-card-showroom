# 建立 ProductEditorPanel 商品編輯面板

## Why

第 8 步已完成商品細節頁、`ProductCard` preview 與 editor integration shell，但目前尚無法實際修改商品卡內容。需要建立一個低耦合的 `ProductEditorPanel.vue`，讓使用者在商品細節頁編輯商品欄位，並透過 Pinia draft state 即時反映到 preview。

## What

- 建立 `src/components/ProductEditorPanel.vue`。
- 使用 Vuetify form controls 編輯商品卡欄位。
- 透過 `productStore.updateProductDraft()` 更新 draft，不直接修改 mock base data。
- 提供 reset 操作，透過 `productStore.resetProductDraft()` 還原目前商品。
- 確保欄位變更後 `ProductCard` preview 即時更新。
- 補上元件測試，驗證欄位渲染、更新事件與 reset 行為。

## Non-Goals

- 不建立或改寫第 10 步的 `localStorage` persistence utility。
- 不呼叫真實 momo API 或遠端商品服務。
- 不新增商品、刪除商品、搜尋、排序或批次編輯功能。
- 不重構 `ProductCard` 的既有 props API。
