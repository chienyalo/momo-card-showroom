# momo Card Showroom

一個以 Vue 3、TypeScript、Vuetify 與 Pinia 建立的 Merchant Card Showroom。專案展示可重用的 momo-style 商品卡、商品細節編輯、mock data service，以及瀏覽器端 draft persistence。

## 功能

- 首頁商品列表與商品卡 grid。
- `/product/:id` 商品細節頁。
- `ProductCard.vue` 支援 list/detail 兩種呈現模式。
- `ProductEditorPanel.vue` 可編輯商品卡欄位，preview 即時更新。
- 編輯 draft 使用 `localStorage` 保存，重新整理後可還原。
- invalid product id 顯示 fallback，不造成 redirect loop。

## 技術棧與需求

- Node.js 18+。
- Vue 3、TypeScript、Vite。
- Vuetify、Pinia、Vue Router。
- Vitest、Vue Test Utils、jsdom。
- axios 僅保留在 mock service architecture 的依賴範圍，不呼叫遠端 API。

## 開始使用

```bash
npm install
npm run dev
```

常用指令：

```bash
npm run test   # 執行 Vitest
npm run build  # 執行 vue-tsc 並建立 production bundle
npm run preview
```

## 路由與流程

| 路由 | 用途 |
| --- | --- |
| `/` | 載入 mock products，顯示商品列表與 ProductCard list mode。 |
| `/product/:id` | 根據 route id 顯示 ProductCard detail preview 與 ProductEditorPanel。 |

基本流程：

1. 進入 `/` 後由 `HomeView` 呼叫 `productStore.loadProducts()`。
2. 點擊商品卡後導向 `/product/:id`。
3. `ProductDetailView` 從 Pinia store 查找商品，並傳給 preview 與 editor。
4. 修改 editor 欄位後，draft 更新至 store，ProductCard 即時反映。
5. draft 由 persistence utility 保存到 `localStorage`。
6. 若 route id 不存在，細節頁顯示「找不到商品」與返回首頁入口。

## 架構與資料流

```text
mockProductService -> productStore -> HomeView / ProductDetailView
                                      -> ProductCard
                                      -> ProductEditorPanel
                                      -> persistence utility -> localStorage
```

- `src/services/mockProductService.ts`：提供 mock 商品資料與 async service boundary。
- `src/types/productCard.ts`：定義 `ProductCard` schema、default 與格式化 helper。
- `src/stores/productStore.ts`：集中管理 base products、edited drafts、載入、查找與 reset。
- `src/views/HomeView.vue`：負責列表頁載入、loading/empty/error state 與 route 導向。
- `src/views/ProductDetailView.vue`：負責 route id 查找、preview/editor 組合與 invalid fallback。
- `src/components/ProductCard.vue`：只負責商品卡呈現與 `cta-click` event，不直接讀取 service、store 或 storage。
- `src/components/ProductEditorPanel.vue`：使用 Pinia draft actions 提供商品欄位編輯。
- `src/utils/persistence.ts`：負責 localStorage key、draft sanitize、load、save 與單一商品清除。

商品 base data 與 edited draft 分開保存。`ProductCard` 顯示的是 store merge 後的 display product；mock base data 不會被 editor 直接覆寫。

## ProductCard Schema

`ProductCard` props 使用以下欄位：

| 欄位 | Type | 用途 |
| --- | --- | --- |
| `id` | `string` | 商品識別碼。 |
| `title` | `string` | 商品名稱。 |
| `imageUrl` | `string` | 商品圖片 URL。 |
| `price` | `number` | 目前售價。 |
| `originalPrice` | `number` | 原價，用於刪除線與折扣顯示。 |
| `discountBadge` | `string` | 折扣或促銷 badge。 |
| `promotionText` | `string` | 促銷文案。 |
| `rating` | `number` | 商品評價。 |
| `soldCount` | `number` | 銷量。 |
| `ctaLabel` | `string` | CTA 按鈕文案。 |

## ProductCard Sample Usage

列表情境可省略 `mode`，預設為 `list`：

```vue
<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import type { ProductCard as ProductCardData } from '@/types/productCard'

defineProps<{
  product: ProductCardData
}>()
</script>

<template>
  <ProductCard :product="product" />
</template>
```

商品細節頁使用 `detail` mode：

```vue
<ProductCard :product="product" mode="detail" />
```

`ProductCard` 本身不讀取 mock service、router 或 localStorage；資料取得、路由與保存由外層 view/store 負責。

## 資料與設計限制

- 所有商品資料皆為 mock data。
- 不呼叫真實 momo API、不依賴 momo production service。
- 不使用 momo 專有圖檔、商標素材或 production domain。
- `localStorage` key 為 `momo-card-showroom:product-edits`，只保存 edited drafts。
- storage JSON 損壞或 storage API 發生 exception 時，app 會使用安全 fallback 繼續運作。

## Tradeoffs

本作品優先完成一種可展示、可重用且具備編輯與保存流程的高品質商品卡，而不是同時建立多種不完整 variants。使用 mock service 保留未來替換後端 API 的結構彈性，但不在本專案引入遠端整合風險。

後續可演進方向：

- 加入更多 schema-driven 商品卡 variants。
- 加入 persisted schema migration 與更嚴謹的 draft validation。
- 將商品卡抽成 Web Component，供外部 HTML 使用。
- 加入 Storybook、visual regression tests 或專用 card playground。
- 以正式 API adapter 替換 mock service，並保留目前 store/component 邊界。
