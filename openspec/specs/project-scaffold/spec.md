# project-scaffold Specification

## Requirements

### Requirement: 專案必須建立 Vue app shell

專案 MUST 建立可執行的 `Vue 3 + Vite + TypeScript` app shell。

#### Scenario: 開發伺服器可啟動

- GIVEN 專案依賴已安裝
- WHEN 開發者執行 `npm run dev`
- THEN Vite dev server SHOULD 可以啟動
- AND Vue app SHOULD 可以被瀏覽器載入

#### Scenario: Production build 可執行

- GIVEN 專案依賴已安裝
- WHEN 開發者執行 `npm run build`
- THEN production build SHOULD 成功完成

### Requirement: 專案必須註冊核心 plugins

專案 MUST 註冊 `Vuetify`、`Pinia` 與 `Vue Router`。

#### Scenario: App 初始化

- GIVEN `src/main.ts` 被執行
- WHEN Vue app 被 mount
- THEN `Vuetify` SHOULD 可供 component 使用
- AND `Pinia` SHOULD 可供 store 使用
- AND `Vue Router` SHOULD 可處理 route navigation

### Requirement: 專案必須具備標準功能目錄

專案 MUST 建立支援後續功能的標準目錄結構。

#### Scenario: 後續功能開發

- GIVEN 開發者要新增商品卡、頁面、store、service、type、utility 或 test
- WHEN 開發者檢查 `src/`
- THEN 專案 SHOULD 已存在對應目錄

### Requirement: 專案初始化不得連接 momo production service

專案初始化 MUST NOT 呼叫任何真實 momo API 或依賴 momo production domain。

#### Scenario: App shell 載入

- GIVEN app shell 已建立
- WHEN app 被瀏覽器載入
- THEN app MUST NOT 發出任何 momo production domain request
