# Output Contract

在實作前，先輸出以下格式。若任一段缺失，先補齊再開始寫碼。

## Component Inventory

- 列出 `Primitive`、`Composite`、`Section`、`Page`
- 每個項目使用語義化名稱

## Layout Map

- 依畫面從上到下列出主要區塊
- 補充欄位結構、對齊方式、手機版重排重點

## Vuetify Mapping Plan

- 每個主要元件對應到哪個 Vuetify 元件
- 哪些需要 wrapper component
- 哪些需要客製樣式

## Design Token Summary

- Colors
- Typography scale
- Spacing scale
- Radius
- Shadow
- State

## File Plan

- 先列預計新增或修改的 `.vue`、theme、style 檔案
- 若是既有專案，標出沿用的共用元件

## Implementation

- 先做可重用元件
- 再做 section
- 最後組裝 page
- 完成後檢查 responsive 與互動狀態
