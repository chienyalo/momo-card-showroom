# 建立 momo-style ProductCard 元件

## Why

專案已具備商品 schema、mock service、Pinia store 與基本路由，但商品 UI 仍散落在頁面 placeholder 中，尚未有可重用的商品卡元件。

需要建立 `ProductCard.vue` 作為後續首頁商品列表與商品細節 preview 的共同展示元件。此元件應呈現接近 momo 商品卡的視覺語彙，例如白底卡片、紅色價格、促銷 badge、固定比例商品圖與 CTA button，但不得使用 momo 專有圖檔、素材或 production service。

## What

- 建立 `src/components/ProductCard.vue`。
- 使用 `<script setup lang="ts">` 與 typed props。
- props 接收 `product: ProductCard` 與可選 `mode: 'list' | 'detail'`。
- 以既有 `ProductCard` schema 與 helper 呈現商品資訊。
- 視覺需包含：
  - 白底卡片
  - 固定比例商品圖
  - momo-like 紅色價格
  - 原價刪除線
  - 促銷 badge
  - 商品名稱兩行截斷
  - CTA button
- 長商品名稱與缺省資料不得破壞版面。
- 不使用 momo 專有圖檔或素材。

## Non-Goals

- 不實作首頁完整商品列表；第 7 步處理。
- 不實作商品細節完整 preview 與編輯流程；第 8 步處理。
- 不實作 `ProductEditorPanel.vue`；第 9 步處理。
- 不新增真實 momo API、production domain request 或 momo 專有素材。
- 不在此 change 中重構 Pinia store 或 mock service。
