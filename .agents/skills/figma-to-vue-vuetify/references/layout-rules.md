# Layout Rules

## Layout priority

1. 先確認 Figma 是否使用 Auto Layout、constraints、stacking 規則
2. 再決定 Vuetify layout 如何映射
3. 先做大區塊，再做區塊內部細節

## Preferred layout approach

- 頁面骨架優先用 `v-container`
- 多欄區塊優先用 `v-row` + `v-col`
- 區塊內小型對齊可用 flex，但不要整頁都靠自寫 flex 撐起來
- 響應式斷點優先用 Vuetify breakpoint 系統

## Responsive rules

- 先定義桌機、平板、手機在資訊層級上的變化，不只縮放寬度
- 若 Figma 只有桌機稿，需主動推斷手機版重排策略
- 若 CTA、表單、卡片在手機上會過擠，優先改為垂直堆疊
- 文字不要為了硬對齊而壓縮到可讀性下降

## Spacing rules

- 優先建立一致的 spacing scale
- 相同層級區塊使用一致間距
- 避免同頁面出現大量只差 2px 到 4px 的無意義 spacing 差異

## Validation

- 檢查頁面主要區塊是否有一致的左右邊界
- 檢查卡片、表單、列表在小螢幕是否溢出
- 檢查標題、內文、按鈕之間的垂直節奏是否一致
