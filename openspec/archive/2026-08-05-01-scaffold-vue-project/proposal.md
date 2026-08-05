# 建立 Vue 專案初始化骨架

## Why

目前專案已有 `AGENTS.md` 與 `docs/PLAN.md`，但尚未建立可執行的前端應用程式。

需要先建立 Vue 3、Vite、TypeScript、Vuetify、Pinia、Vue Router、axios、Vitest 的基礎架構，作為後續商品卡、商品列表、商品細節頁、狀態管理、mock service 與測試的實作基礎。

## What

- 建立 Vue 3 + Vite + TypeScript 專案。
- 安裝並設定 `Vuetify`、`Pinia`、`Vue Router`、`axios`、`Vitest`。
- 建立基礎目錄：`components/`、`views/`、`stores/`、`services/`、`types/`、`utils/`、`tests/`。
- 設定 `vite.config.ts` alias，例如 `@ -> src`。
- 設定 `main.ts` 掛載 `Vuetify`、`Pinia`、`Vue Router`。
- 建立 npm scripts：`dev`、`build`、`preview`、`test`。

## Non-Goals

- 不實作 `ProductCard.vue`。
- 不建立 `ProductCard` schema。
- 不實作 mock product data。
- 不實作 `/` 或 `/product/:id` 的正式畫面。
- 不實作 `localStorage` persistence。
- 不呼叫任何真實 momo API。
