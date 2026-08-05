# 建立專案文件與 ProductCard Sample Usage

## Why

專案已完成商品卡 schema、mock service、Pinia store、首頁列表、商品細節編輯與 localStorage persistence，但目前沒有 `README.md`。評審或接手開發者無法快速理解如何啟動、路由如何運作、資料如何流動，以及 `ProductCard` 如何被重用。

## What

- 建立根目錄 `README.md`。
- 說明安裝、啟動、測試與 production build 指令。
- 說明 `/` 與 `/product/:id` 路由及核心使用流程。
- 說明 `ProductCard` props schema 與 list/detail sample usage。
- 說明 mock service、Pinia store、editor 與 localStorage 的資料流。
- 說明不串真實 momo API、只使用 mock data 的限制。
- 說明只聚焦一種高品質商品卡的 tradeoff 與後續演進方向。

## Non-Goals

- 不新增產品功能、路由或 API。
- 不修改 `ProductCard`、store、service 或 persistence 行為。
- 不使用 momo 專有素材或 production domain。
- 不建立完整 Storybook、架構網站或額外文件站。
