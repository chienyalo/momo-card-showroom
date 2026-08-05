# project-documentation Specification

## Requirements

### Requirement: 專案必須提供可啟動的 README

專案 MUST 在根目錄提供 `README.md`，讓評審或開發者能依文件啟動並驗證 app。

#### Scenario: 快速啟動

- GIVEN 開發者取得專案並已安裝 Node.js 與 npm
- WHEN 開發者依 README 執行安裝與啟動指令
- THEN 開發者 SHOULD 能啟動 Vite dev server
- AND README MUST 提供 `npm run dev`、`npm run test` 與 `npm run build` 指令

### Requirement: README 必須說明路由與核心流程

README MUST 說明首頁與商品細節頁的路由、用途及主要使用流程。

#### Scenario: 路由說明

- GIVEN 讀者查看 README 的使用流程
- THEN 文件 MUST 說明 `/` 顯示商品列表
- AND 文件 MUST 說明 `/product/:id` 顯示商品 preview 與編輯面板
- AND 文件 MUST 說明 invalid product id 的 fallback 行為

### Requirement: README 必須說明架構與資料流

README MUST 說明 mock service、Pinia store、views、components 與 persistence utility 的責任邊界。

#### Scenario: 理解資料流

- GIVEN 開發者閱讀架構章節
- THEN 文件 MUST 說明 mock base data 由 mock service 提供
- AND 文件 MUST 說明商品狀態由 Pinia store 集中管理
- AND 文件 MUST 說明 `ProductCard` 與 `ProductEditorPanel` 的資料來源
- AND 文件 MUST 說明 edited drafts 透過 persistence utility 保存至 localStorage

### Requirement: README 必須提供 ProductCard schema 與 sample usage

README MUST 提供與目前 source API 一致的 `ProductCard` props schema 與 sample usage。

#### Scenario: 列表與細節重用

- GIVEN 讀者需要重用 `ProductCard.vue`
- WHEN 讀者查看 sample usage
- THEN 文件 MUST 說明 `product` prop 使用 `ProductCard`
- AND 文件 MUST 提供 list mode 的使用範例
- AND 文件 MUST 提供 `mode="detail"` 的使用範例
- AND 範例 MUST 不捏造不存在的 props、events 或 API

### Requirement: README 必須揭露 mock data 與設計取捨

README MUST 清楚揭露資料來源限制、素材限制、tradeoff 與後續演進方向。

#### Scenario: 評審理解範圍

- GIVEN 評審閱讀專案限制與 tradeoff
- THEN 文件 MUST 說明不呼叫真實 momo API 或 production domain
- AND 文件 MUST 說明商品資料使用 mock data
- AND 文件 MUST 說明只聚焦一種高品質商品卡的取捨
- AND 文件 MUST 列出合理的後續演進方向

### Requirement: 文件 change 必須不引入功能回歸

文件 change MUST 維持現有功能並可通過既有驗證。

#### Scenario: Test and build verification

- GIVEN README 已建立
- WHEN 開發者執行 `npm run test` 與 `npm run build`
- THEN tests 與 production build SHOULD 成功完成
- AND README change MUST NOT 修改既有 route、store、service 或 component 行為
