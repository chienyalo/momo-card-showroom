# ProductCard Component Design

## Context

第 6 步負責建立可重用的商品卡展示元件。此元件會被第 7 步首頁商品列表與第 8 步商品細節 preview 使用，因此應保持 presentational、低耦合，資料由 props 提供，不直接讀取 store 或 service。

此 change SHOULD 延續既有：

- `src/types/productCard.ts` 的 `ProductCard` schema。
- `formatPrice()` 與 `calculateDiscountRate()` helper。
- Vuetify component 與 utility class。
- Vue 3 `<script setup lang="ts">` pattern。

## Component API

`src/components/ProductCard.vue` SHOULD 定義 typed props：

- `product: ProductCard`
- `mode?: 'list' | 'detail'`

`mode` SHOULD 影響卡片密度或尺寸：

- `list`：適合 grid/list 中多張卡片並排。
- `detail`：適合商品細節頁 preview，圖片與文字可更完整。

元件 SHOULD 保持展示責任，不直接呼叫 store、service、router 或 localStorage。

如需 CTA 互動，元件 MAY emit `cta-click` 或讓父層包裝 route link；但 routing decision SHOULD 留給父層。

## Visual Structure

卡片 SHOULD 具備穩定 layout：

- 白底、淺邊框或低強度陰影。
- 商品圖片使用固定 aspect ratio，避免圖片載入前後造成 layout shift。
- 商品名稱使用兩行截斷，避免長文字撐破卡片。
- 價格使用接近 momo 商品卡的紅色視覺重點。
- 原價使用刪除線與較低視覺權重。
- 促銷 badge 與 promotion text 應在缺省或空字串時安全隱藏。
- CTA button 應維持清楚可點擊狀態。

## Data Formatting

元件 SHOULD 使用既有 helper：

- `formatPrice(product.price)`
- `formatPrice(product.originalPrice)`
- `calculateDiscountRate(product.price, product.originalPrice)`

若 `discountBadge` 已由資料提供，畫面 SHOULD 優先顯示資料值；若未提供且可計算折扣，MAY 顯示計算後折扣。

## Accessibility And Resilience

商品圖片 SHOULD 使用商品名稱作為 `alt`，或在名稱缺省時提供安全 fallback。

元件 MUST NOT 使用 `v-html` 呈現商品資料，避免未來資料來源替換時引入 XSS 風險。

缺省資料、過長商品名稱、過大價格或圖片 URL 失效時，元件 SHOULD 不 crash 且不破壞主要版面。

## Verification

驗證 SHOULD 包含：

- `npm run build` 可通過。
- 手動檢查 list mode 與 detail mode 的顯示。
- 手動檢查長商品名稱兩行截斷。
- 手動確認沒有 momo production domain request 或 momo 專有素材。

## Risks

- 若元件直接依賴 store 或 router，後續首頁與細節頁會難以重用。
- 若圖片未固定比例，商品列表可能因圖片載入造成跳動。
- 若商品名稱不截斷，長文字會破壞 grid 版面。
- 若過早實作完整列表或細節頁，會與第 7、8 步範圍重疊。

## Decisions

- `ProductCard.vue` 為 presentational component。
- 資料透過 typed props 傳入。
- `mode` 只負責展示變體，不承擔資料流程。
- momo-like 視覺只使用自訂 CSS 與 mock 圖片，不使用 momo 專有素材。
