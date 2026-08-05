# 設計說明：Vue 專案初始化骨架

## 技術選型

- `Vue 3`：使用 Composition API 與 `<script setup lang="ts">`。
- `Vite`：作為 dev server 與 production build 工具。
- `TypeScript`：提供 schema、store、service、component props 的型別基礎。
- `Vuetify`：負責基礎 UI layout、card、form、button。
- `Pinia`：負責後續商品資料與編輯狀態管理。
- `Vue Router`：負責 `/` 與 `/product/:id` 的路由基礎。
- `axios`：僅作為 mock service layer 的 API client 抽象，不連 momo。
- `Vitest`：負責 unit test。

## 目錄規劃

```txt
src/
  components/
  views/
  stores/
  services/
  router/
  types/
  utils/
  tests/
  plugins/
```

## 設計決策

- `src/router/` 集中管理 route definitions。
- `src/stores/` 集中管理 Pinia stores。
- `src/services/` 隔離資料存取，避免 component 直接接觸資料來源。
- `src/types/` 集中管理 domain schema。
- `src/utils/` 放純函式與 persistence helper。
- `src/plugins/` 放 `Vuetify` 等 app plugin 初始化。
- 初始化階段只建立 placeholder route，正式頁面內容交由後續 specs 實作。

## 風險與限制

- 初始化階段不應過早實作商品卡邏輯。
- `axios` 不可直接呼叫 momo production domain。
- 若依賴安裝失敗，需先回報環境或網路問題，不應改用非規劃技術堆疊。
