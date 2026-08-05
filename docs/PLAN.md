# Merchant Card Showroom 開發計畫

## 專案方向

本專案選擇題目 B：Merchant Card Showroom。

兩小時內的目標是做出小而完整、可展示工程判斷的前端作品。重點放在 momo 風格商品卡、可重用元件、瀏覽器端編輯、狀態保存，以及清楚的架構文件。

## 路由規劃

### `/`

- 顯示 momo 風格商品卡列表。
- 僅使用 mock product data。
- 點擊商品卡後導向商品細節頁。
- 展示商品卡元件在列表情境下的重用方式。

### `/product/:id`

- 顯示單一選取商品卡。
- 提供商品卡細節調整介面。
- 調整欄位後即時更新 preview。
- 使用 `localStorage` 保存使用者編輯結果。
- 顯示該商品卡的 schema 或 sample usage 說明。

## 功能規劃

- 首頁商品卡列表。
- 單一商品卡細節頁。
- 可重用的 momo 風格商品卡元件。
- 商品卡欄位可編輯：
  - 商品名稱
  - 商品圖片 URL
  - 售價
  - 原價
  - 折扣 badge
  - 促銷文案
  - 評價或銷量
  - CTA 按鈕文案
- 使用 `localStorage` 做 browser-side persistence。
- 提供商品卡重用方式的 sample usage 文件。

## 技術選型

- Vue 3：使用 Composition API 與 `<script setup lang="ts">`，負責主要 UI 與 component composition。
- Vuetify：負責 layout、表單、按鈕、卡片容器等基礎 UI，加速兩小時內交付。
- Vite：作為開發伺服器與 production build 工具，使用 `vite.config.ts` 維持 TypeScript 設定一致性。
- Pinia：集中管理商品卡列表、目前選取商品、編輯狀態與 `localStorage` hydrate/save 流程。
- axios：僅用於 mock service layer，模擬未來 API client 介面，不呼叫真實 momo API。
- Vue Router：提供 `/` 與 `/product/:id` 兩個頁面流程，對應列表展示與單一卡片細節。
- TypeScript：定義 `ProductCard` schema、store state、service response 與 component props。
- Vitest：作為 Vite-native unit test framework，優先測試純邏輯、store actions、mock service 與 persistence utility。

## 實作規劃

- 使用 Vue 3、Vite、Vuetify、Pinia、Vue Router、TypeScript、axios。
- axios 僅放在 mock service layer 後方，保留未來替換後端的彈性。
- 不呼叫真實 momo API。
- 不爬取或依賴 momo production service。
- 定義 typed `ProductCard` schema。
- 使用 Pinia 集中管理商品資料與目前選取商品。
- App 初始化時從 `localStorage` hydrate 已保存的編輯結果。
- 將商品卡 UI 隔離在 `ProductCard.vue`。
- 將編輯面板邏輯隔離在 `ProductEditorPanel.vue`。
- 將 mock data 與資料存取行為隔離在 `mockProductService.ts`。

## 視覺方向

- 盡量貼近 momo 商品卡常見視覺模式：
  - 白底卡片
  - 商品圖為主要視覺
  - 紅色價格強調
  - 折扣與促銷 badge
  - 密集但清楚的商品資訊
  - 緊湊的電商列表排版
  - 明確的 CTA 按鈕
- 不使用 momo 專有素材。
- 使用 mock 圖片與 mock data。

## 測試 / 驗證規劃

- 驗證 `/` 可以正常顯示商品卡列表。
- 驗證點擊商品卡後可以導向 `/product/:id`。
- 驗證不存在的商品 ID 會顯示 fallback 狀態或返回入口。
- 驗證編輯面板修改欄位後，商品卡 preview 會即時更新。
- 驗證重新整理頁面後，`localStorage` 仍保留使用者編輯結果。
- 驗證沒有發出真實 momo network request。
- 使用 Vitest 驗證 `ProductCard` schema helper、Pinia store actions、mock service 與 `localStorage` persistence utility。
- 驗證 `npm run build` 可以成功完成。
- 驗證 README 清楚說明啟動方式、架構、tradeoff 與後續擴充方向。

## 取捨說明

- 優先做好一種高品質 momo-style 商品卡，而不是做很多不完整 variants。
- 使用 mock service architecture 展示未來替換後端的可能性，但不進行真實 API 整合。
- 路由維持最小可用範圍，以確保實作品質。
- 使用 Vuetify 加速 layout 與表單開發，再用自訂 CSS 補足 momo-like 視覺細節。

## 後續演進方向

- 增加多種商品卡 variants。
- 加入 schema-driven plugin registration。
- 加入 visual regression tests。
- 輸出 Web Component build，讓商品卡可被外部 HTML 直接載入。
- 加入 Storybook 或專用 card playground。
- 針對 persisted schema migration 加入更嚴謹的 state consistency 檢查。
