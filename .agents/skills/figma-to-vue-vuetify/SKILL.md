---
name: figma-to-vue-vuetify
description: 當使用者想透過 Figma MCP 把設計稿轉成 Vue + Vuetify 前端時使用。此 skill 會先分析 Figma 結構，拆成可重用元件、版面區塊與設計 token，再優先映射到 Vuetify 元件系統，最後補上必要的客製樣式與響應式調整。當使用者提到 Figma、MCP、Vue、Vuetify、切版、元件拆分、設計轉前端、響應式頁面時觸發。
---

# Figma To Vue Vuetify

當任務是把 Figma 設計稿轉成 Vue + Vuetify 程式碼時，使用這個 skill。

## Quick rules

- 先拆元件，再切版，不直接整頁產碼
- 先對應 Vuetify 元件，再補客製 CSS
- 優先遵守現有 repo 的 Vue、Vuetify、router、檔案結構與命名習慣
- 若 Figma node 名稱混亂，先語義化命名，再落成元件名稱
- 除非設計有明確需求，否則避免為了像素對齊而寫大量硬編碼樣式

## Workflow

1. 先確認 repo 使用的是 Vue 版本、Vuetify 版本、路由型態與既有共用元件。
2. 若有 Figma MCP，先讀設計節點、階層、文字、顏色、auto layout、spacing 與互動狀態。
3. 若沒有 Figma MCP，要求使用者提供畫面截圖、規格或節點資訊，再依同樣流程處理。
4. 在實作前先建立 `Component Inventory`，區分 `Primitive`、`Composite`、`Section`、`Page`。
5. 先寫 `Layout Map`，標出整頁區塊、欄位關係、桌機與手機版差異。
6. 寫 `Vuetify Mapping Plan`，先決定哪些區塊直接用 Vuetify，哪些只需要包一層 wrapper component。
7. 抽出設計 token：色彩、字級、間距、圓角、陰影、狀態。
8. 先建立共用元件與區塊元件，再組裝頁面。
9. 最後才補 scoped CSS、theme override 或少量 utility class。
10. 驗證桌機與手機版面，以及 hover、active、disabled、focus 等狀態。

## Required output order

在實作前，先明確整理以下內容：

1. `Component Inventory`
2. `Layout Map`
3. `Vuetify Mapping Plan`
4. `Design Token Summary`
5. `File Plan`
6. `Implementation`

## Required references

- 元件拆分規則：讀 `references/component-splitting-rules.md`
- Vuetify 對應規則：讀 `references/vuetify-mapping-rules.md`
- 版面規則：讀 `references/layout-rules.md`
- 交付格式：讀 `references/output-contract.md`

## Implementation rules

- 優先使用 Vuetify 元件與 props，不先寫原生 HTML + CSS 重做一套
- 能用 `v-container`、`v-row`、`v-col` 解決的 layout，不要先寫自製 grid
- 能用 `v-card`、`v-btn`、`v-chip`、`v-dialog`、`v-text-field`、`v-tabs`、`v-list` 解決的區塊，不要重造基礎元件
- 自訂 CSS 只處理品牌化、細部間距、特殊視覺效果與 Figma 無法直接映射的部分
- 如果 repo 已有共用元件或 design token，優先沿用，不要平行再做一套
- 如果只是單頁一次性的小區塊，不必過度抽象
- 如果同樣卡片或區塊重複 2 次以上，優先抽成共用 component

## File conventions

- Vue 檔名使用語義化 PascalCase，例如 `HeroBanner.vue`
- 共用基礎元件放在現有 `components` 結構中；若 repo 無明確規則，可用 `components/base`、`components/sections`、`components/pages`
- 不要直接把 Figma node ID 或原始圖層名當成最終檔名

## Quality bar

- 程式碼需要可維護，不接受整頁單檔堆滿 template 與 CSS
- 響應式邏輯要清楚，不接受只對單一桌機尺寸切得像
- 若設計稿明顯不適合 1:1 對應 Vuetify，需先指出落差，再做最小必要客製化
