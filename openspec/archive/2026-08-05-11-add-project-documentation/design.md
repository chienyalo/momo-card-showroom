# Project Documentation Design

## Documentation Audience

`README.md` SHOULD 同時服務兩種讀者：

- 評審：需要在短時間內啟動並理解核心展示流程。
- 開發者：需要知道檔案責任、資料流、欄位 schema 與後續擴充邊界。

## README Structure

README SHOULD 依下列順序組織，讓最常用資訊容易掃描：

1. 專案定位與功能摘要。
2. 技術棧與環境需求。
3. 安裝、`npm run dev`、`npm run test`、`npm run build`。
4. 使用流程與路由表。
5. 架構與資料流。
6. `ProductCard` schema 與 sample usage。
7. persistence 行為與 mock data 限制。
8. 設計 tradeoff、測試與後續演進方向。

## ProductCard Sample

文件應包含可直接閱讀的 TypeScript/Vue 範例，至少說明：

- `product` prop 使用 `ProductCard` schema。
- 列表使用 `mode="list"` 或省略 mode。
- 細節頁使用 `mode="detail"`。
- component 不直接依賴 mock service、router 或 localStorage。

範例應與目前實際 component API 一致，不應捏造尚未存在的 props 或 events。

## Data Flow Description

README SHOULD 使用簡短文字或流程圖式區塊說明：

```text
mockProductService -> productStore -> HomeView / ProductDetailView
                                      -> ProductCard
                                      -> ProductEditorPanel
                                      -> persistence utility -> localStorage
```

文件需清楚標示 mock base data 與 edited draft 分離，並說明 reload 後由 store hydrate drafts。

## Decisions

- 以單一 `README.md` 作為主要入口，避免第 11 步引入額外文件維護成本。
- sample usage 與 schema 以目前程式碼為準，文件不承諾未實作功能。
- tradeoff 明確說明只完成一種高品質商品卡、不串真 API，以及 mock service 保留未來替換彈性的原因。
