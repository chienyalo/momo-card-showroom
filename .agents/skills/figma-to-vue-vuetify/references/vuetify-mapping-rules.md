# Vuetify Mapping Rules

先找 Vuetify 對應，再決定是否需要自訂包裝元件。

## Common mappings

- Button -> `v-btn`
- Input -> `v-text-field` / `v-textarea` / `v-select`
- Checkbox / Radio / Switch -> `v-checkbox` / `v-radio` / `v-switch`
- Card -> `v-card`
- Dialog / Modal -> `v-dialog`
- Tabs -> `v-tabs`
- Chip / Tag -> `v-chip`
- Avatar -> `v-avatar`
- List -> `v-list`
- Table -> `v-table` 或 `v-data-table`
- Accordion / FAQ -> `v-expansion-panels`
- App header -> `v-app-bar`
- Navigation drawer -> `v-navigation-drawer`
- Grid layout -> `v-container` + `v-row` + `v-col`

## Wrapper rules

- 若 Figma 元件只是 Vuetify 元件的視覺變體，建立 wrapper component
- 若只是單頁使用的小區塊，不必過度抽象
- 若同樣卡片重複 2 次以上，抽成共用 component
- 若只是 spacing wrapper，不獨立成 component

## Styling rules

- 先用 Vuetify props、theme、utility class
- 再用 scoped CSS 或共用樣式補不足
- 避免把大量設計 token 寫死在單一 `.vue` 檔內
- 若品牌色、圓角、陰影可放進 theme，優先進 theme，不要散落在各元件

## Anti-patterns

- 把 Vuetify 當成只有樣式庫，卻重寫按鈕、表單、卡片、對話框
- 不用 layout system，整頁只靠手寫 flex 與 magic number
- 為了貼近設計稿，完全繞過 Vuetify 的 state、spacing、density 與 variant 能力
