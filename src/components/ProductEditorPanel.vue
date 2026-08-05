<script setup lang="ts">
import type { ProductCard } from '@/types/productCard'

defineProps<{
  product: ProductCard
}>()
</script>

<template>
  <v-sheet class="product-editor-panel" rounded="lg">
    <div class="product-editor-panel__header">
      <div>
        <p class="product-editor-panel__eyebrow">Editor Panel</p>
        <h2 class="product-editor-panel__title">商品編輯面板</h2>
      </div>
      <v-chip color="primary" variant="tonal" size="small">
        Step 9
      </v-chip>
    </div>

    <p class="mt-3 text-body-2 text-medium-emphasis">
      完整欄位編輯會在第 9 步接上。此區塊已綁定同一份商品狀態，後續可直接延伸為表單控制。
    </p>

    <v-divider class="my-4" />

    <dl class="product-editor-panel__meta">
      <div>
        <dt>商品 ID</dt>
        <dd>{{ product.id }}</dd>
      </div>
      <div>
        <dt>目前標題</dt>
        <dd>{{ product.title }}</dd>
      </div>
      <div>
        <dt>CTA</dt>
        <dd>{{ product.ctaLabel }}</dd>
      </div>
    </dl>
  </v-sheet>
</template>

<style scoped>
.product-editor-panel {
  padding: 20px;
  background: #fff;
  border: 1px solid #eceff3;
}

.product-editor-panel__header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.product-editor-panel__eyebrow {
  margin: 0 0 4px;
  color: #d70018;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1.2;
}

.product-editor-panel__title {
  margin: 0;
  color: #20242a;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0;
}

.product-editor-panel__meta {
  display: grid;
  gap: 12px;
  margin: 0;
}

.product-editor-panel__meta div {
  display: grid;
  gap: 4px;
}

.product-editor-panel__meta dt {
  color: #6b7280;
  font-size: 0.78rem;
  font-weight: 700;
}

.product-editor-panel__meta dd {
  margin: 0;
  overflow-wrap: anywhere;
  color: #20242a;
  font-size: 0.92rem;
  line-height: 1.4;
}
</style>
