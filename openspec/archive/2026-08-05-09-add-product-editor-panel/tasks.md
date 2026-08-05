# Tasks

- [x] 建立 `src/components/ProductEditorPanel.vue`，接收 typed `product` prop。
- [x] 使用 Vuetify controls 顯示商品名稱、圖片 URL、售價、原價、折扣 badge、促銷文案、評價、銷量與 CTA 欄位。
- [x] 將欄位輸入透過 `productStore.updateProductDraft()` 更新，不直接修改 mock base data。
- [x] 加入商品名稱、價格、評價與銷量的基本驗證與合理輸入限制。
- [x] 加入 reset 按鈕，呼叫 `productStore.resetProductDraft()` 還原目前商品。
- [x] 確保 route param 或商品 prop 變更時面板欄位同步更新。
- [x] 補 `ProductEditorPanel` 元件測試，覆蓋初始欄位、更新 draft 與 reset。
- [x] 執行 `npm run test`。
- [x] 執行 `npm run build`。
- [x] 手動驗證編輯欄位後 `ProductCard` preview 即時更新。
