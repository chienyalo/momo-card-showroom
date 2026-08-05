---
name: openspec-reviewed-workflow-codex
description: 執行帶 gate 的 OpenSpec 完整流程：proposal/design/tasks → artifact review → apply → code review → archive。每個階段完成後都必須停下，等使用者明確說「繼續」再進下一階段。會建立 workflow checklist 與 review 檔，並且每次啟動都先檢查專案層 workflow skill 與 openspec/config.yaml 規則。
metadata:
  short-description: Gated OpenSpec workflow with required reviews
---

這個 skill 是 OpenSpec 的流程殼，負責三件事：

1. 追蹤目前跑到哪一階段
2. 強制在 artifact review / code review 產出實體 review 檔
3. 每一階段做完就停，不能自動往下跑

如果專案裡已經有更專用的 workflow skill，本 skill 只負責 state 與 gate，流程細節要讓專案 skill 優先。

## 何時使用

當使用者明確要：
- 跑一個「先 proposal，再 review，再 implementation，再 review，再 archive」的 OpenSpec 流程
- 要求每個階段都停下來等確認
- 要求 review 結果落地成檔案

如果使用者只是要單獨 propose、apply、archive，直接用對應的 OpenSpec skill 即可，不必啟動本 skill。

## 依賴 skill

這個 skill 會搭配下列 skill 的既有流程：
- `openspec-propose`
- `openspec-apply-change`
- `openspec-archive-change`

本 skill 不重寫它們的內部邏輯，只負責：
- 選 stage
- 建 checklist
- 寫 review 檔
- 硬停等待下一次使用者指令

啟動各 stage 時，**先讀對應 skill 的 `SKILL.md` 再依其步驟執行**，不要自行猜測它的內部流程。

## 狀態檔

- Checklist：`openspec/changes/<change-name>/workflow-checklist.md`
- Reviews：`openspec/changes/<change-name>/reviews/review-YYYYMMDD-HHmm-<stage>.md`
  - `stage` 只允許 `artifact` 或 `code`
  - 時戳格式必須是本機時間 `YYYYMMDD-HHmm`

## Checklist 格式

```md
# Workflow Checklist — <change-name>

**Created:** YYYY-MM-DD HH:mm
**Last Update:** YYYY-MM-DD HH:mm
**Current Stage:** N / 6

## Checklist
- [ ] 1. proposal/design/tasks 建立
- [ ] 2. artifact review 完成
- [ ] 3. apply 開始
- [ ] 4. apply 完成
- [ ] 5. code review 完成
- [ ] 6. archive

## Reviews
- (尚未產出)

## Log
- YYYY-MM-DD HH:mm — Stage N 完成
```

## 執行規則

### Stage 0：每次都先檢查專案層規則

每次被呼叫時，先做這些檢查，不能跳過：

1. 掃描專案層 skill：
   - `.agents/skills/*/SKILL.md`
   - `.cursor/skills/*/SKILL.md`
   - `.claude/skills/*/SKILL.md`
2. 篩出名稱或 description 含 `openspec`、`workflow`、`proposal`、`spec-driven` 的 skill
3. 若找到專案專用 workflow skill，先讀它，再讀它引用的必要 references
4. 若 skill 指到 `AGENT.md`、`AGENTS.md`、`CLAUDE.md` 等真相來源，這些也要讀
5. 讀 `openspec/config.yaml`（若存在）
6. 用一句短摘要告知使用者：
   - 採用哪個專案 skill，或未發現專案 skill
   - 真相來源檔案
   - `openspec/config.yaml` 有沒有額外硬規則

規則衝突時的優先順序：
1. 專案層真相來源
2. 專案層 workflow skill
3. `openspec/config.yaml`
4. 本 skill 內建預設

### 啟動時如何判斷目前 stage

1. 掃描 `openspec/changes/*/workflow-checklist.md`
2. 如果沒有 checklist：
   - 代表流程還沒啟動
   - 若使用者明確要開始新流程，就進 Stage 1
   - 否則先用一句簡短問題確認要不要開新 change
3. 如果只有一個 checklist：
   - 讀檔，找第一個未勾選的項目，這就是目前 stage
4. 如果有多個 checklist：
   - 不要猜，先列出供使用者選
   - 選項每行一個 change，格式：`<change-name> — Stage N/6（<當前 stage 名稱>）`
   - 用一句簡短問題請使用者指定要處理哪個
5. 如果六格都勾完：
   - 告知流程已結束，不再執行

### Stage 1：建立 proposal / design / tasks

1. 確認 change 名稱與要做的內容
2. 讀 `openspec-propose/SKILL.md` 並依其步驟建立 proposal/design/tasks
3. 建立 `workflow-checklist.md`
4. 建立空的 `reviews/` 目錄
5. 勾第 1 項並更新 `Last Update`、`Current Stage`、`Log`
6. 停下，等待使用者說「繼續」

完成訊息應包含：
- change 名稱
- Stage 1 已完成
- 下一步是 Stage 2 artifact review

### Stage 2：artifact review

預設由目前這個 assistant 直接執行 review。

只有在使用者明確要求子 agent 或委派 review 時，才可以改由相容的 review-only subagent 執行；否則不要為了 review 自動派工。

步驟：
1. 產生時戳與 review 路徑：
   - `openspec/changes/<name>/reviews/review-<timestamp>-artifact.md`
2. 先看專案 workflow skill 是否有 review prompt 模板；有就優先用
3. 若沒有，使用以下檢查面向：
   - Proposal clarity：why 與 scope 是否清楚
   - Design soundness：有無風險假設、遺漏 edge cases
   - Task granularity：task 是否太大、太模糊、順序是否合理
   - Spec coverage：specs 裡的需求是否都有對應 task
   - Missing concerns：測試、migration、rollback、observability
4. 讀這些檔案：
   - `proposal.md`
   - `design.md`（若存在）
   - `tasks.md`
   - `specs/**/*.md`（若存在）
5. 把 review 寫成實體檔，格式如下：

```md
# Artifact Review — <change-name>
**Reviewer:** codex
**Date:** <timestamp>

## Summary
<ready to implement / needs revision / blocking issues>

## Findings
### Blocking
- ...
### Should Address
- ...
### Nice to Have
- ...

## Recommendation
<proceed / revise-first / abort>
```

6. 驗證 review 檔存在
7. 勾第 2 項，更新 `## Reviews`
8. 停下，等待使用者決定要繼續 apply 或先修 artifact

Review 寫作規則：
- 只能寫 review 檔，不可修改 proposal/design/tasks/source
- 每個 finding 一行，最多兩行；不要寫成長報告
- 沒有問題的區塊直接寫 `無`，不要硬湊內容

### Stage 3：apply 開始

1. 讀 `openspec-apply-change/SKILL.md` 並依其步驟開始實作
2. 這一階段只要求「implementation 已啟動」，不要求全部 tasks 完成
3. 執行一輪後勾第 3 項
4. 更新 checklist 後停下

完成訊息應包含：
- 目前完成幾個 task / 總 task 數
- 下一步是 Stage 4 把所有 tasks 做完

### Stage 4：apply 完成

1. 繼續依 `openspec-apply-change` 的流程處理剩餘 tasks
2. 結束後檢查 `tasks.md`
3. 若仍有未勾選的 task：
   - 不可勾第 4 項
   - 顯示剩餘 task，格式：
     ```
     ⏸ Stage 4 尚未完成：還有 K 個 task 未打勾
     待辦：
       - [ ] <task 描述>
       ...
     說「繼續 apply」再跑一輪
     ```
   - 停下，等使用者決定是否再跑一輪
4. 若全部 tasks 已勾：
   - 勾第 4 項
   - 更新 checklist
   - 停下，等待使用者進入 code review

### Stage 5：code review

預設由目前這個 assistant 直接執行 review。

只有在使用者明確要求子 agent 或委派 review 時，才可以改由相容的 review-only subagent 執行；否則不要自動派工。

步驟：
1. 產生時戳與 review 路徑：
   - `openspec/changes/<name>/reviews/review-<timestamp>-code.md`
2. 優先使用專案 workflow skill 提供的 code review 模板；沒有再用本預設
3. 讀：
   - `proposal.md`
   - `tasks.md`
   - `specs/**/*.md`（若存在）
   - 工作樹 diff（已提交就看 branch diff，未提交就看當前 diff）
   - 必要時看最近 commit 摘要
4. 檢查面向：
   - Spec compliance
   - Task fidelity
   - Scope creep
   - Correctness
   - Test coverage
   - Regression risk
   - Code quality（只指出明顯問題）
5. 把 review 寫成實體檔，格式如下：

```md
# Code Review — <change-name>
**Reviewer:** codex
**Date:** <timestamp>

## Summary
<ready to archive / needs fixes / blocking issues>

## Spec Compliance
- <requirement>: met / partial / missing — <evidence>

## Findings
### Blocking
- ...
### Should Fix
- ...
### Nice to Have
- ...

## Recommendation
<archive / fix-first / revert>
```

6. 驗證 review 檔存在
7. 勾第 5 項，更新 `## Reviews`
8. 停下，等待使用者決定 archive 或先修問題

Review 寫作規則：
- 只能寫 review 檔，不可順手改 source
- 每個 finding 一行，最多兩行；不要寫成長報告
- 沒有問題的區塊直接寫 `無`，不要硬湊內容
- 若沒有 diff 可檢查，要明講 review 依據不足

### Stage 6：archive

1. 讀 `openspec-archive-change/SKILL.md` 並依其步驟執行 archive
2. 成功後勾第 6 項
3. 顯示 archive 路徑
4. 宣告整個流程結束

## 全域 Guardrails

- 每次啟動都要先做 Stage 0
- 不可自動跳下一 stage
- 每次只勾剛完成的那一格
- Stage 2 與 Stage 5 必須產出實體 `.md` review 檔
- Stage 4 若 tasks 未全勾，不可標示完成
- 多個 active change 時不可擅自猜測
- 若 review 有 blocking issue，但使用者仍要求繼續，只需提醒一次風險，再照使用者決定執行
- 時戳一律用本機時間 `date +%Y%m%d-%H%M`

## 常見使用者語句對應

- 「開始新流程」/「從 propose 開始」：進 Stage 1
- 「繼續」/「下一步」：進目前 stage 的下一個
- 「現在在哪」/「狀態」：只顯示 checklist，不執行下一階段
- 「重做 review」：對當前 review stage 重新產生一份新時戳 review 檔
- 「修 review」：依最新 review findings 回頭修 artifact 或 code，但不切換 stage

## 相容性說明

這個 skill 以 Codex 的工作方式為準：
- review 預設由目前 assistant 執行，不假設特定 subagent 名稱存在
- 需要 propose / apply / archive 時，沿用同目錄中的 OpenSpec 相關 skill 流程
