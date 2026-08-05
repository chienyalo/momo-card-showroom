# Tasks

- [x] 建立 `src/components/ProductCard.vue`。
- [x] 使用 `<script setup lang="ts">`。
- [x] 定義 typed props：`product: ProductCard`。
- [x] 定義可選 `mode: 'list' | 'detail'`，並提供安全預設值。
- [x] 使用既有 `formatPrice()` 呈現售價與原價。
- [x] 視需要使用既有 `calculateDiscountRate()` 補足折扣顯示。
- [x] 實作白底卡片、固定比例商品圖、紅色價格、原價刪除線、促銷 badge、商品名稱兩行截斷與 CTA button。
- [x] 確保空字串或缺省促銷資料不破壞版面。
- [x] 確保長商品名稱不撐破卡片。
- [x] 確保元件不直接呼叫 store、service、router 或 localStorage。
- [x] 確保不使用 momo 專有圖檔、素材或 production domain。
- [x] 手動驗證 list mode 與 detail mode 顯示可用。
- [x] 執行 `npm run build` 驗證元件可打包。
