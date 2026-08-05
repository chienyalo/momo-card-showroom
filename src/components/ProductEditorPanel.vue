<script setup lang="ts">
import { computed } from 'vue'

import { useProductStore } from '@/stores/productStore'
import type { ProductCard } from '@/types/productCard'

const props = defineProps<{
  product: ProductCard
}>()

const productStore = useProductStore()

function updateTextField(field: keyof ProductCard, value: string) {
  if (field === 'title' && !value.trim()) {
    return
  }

  productStore.updateProductDraft(props.product.id, {
    [field]: value,
  })
}

function updateNumberField(field: 'price' | 'originalPrice' | 'rating' | 'soldCount', value: string | number) {
  const nextValue = Number(value)

  if (!Number.isFinite(nextValue) || nextValue < 0) {
    return
  }

  if (field === 'rating' && nextValue > 5) {
    return
  }

  productStore.updateProductDraft(props.product.id, {
    [field]: field === 'soldCount' ? Math.floor(nextValue) : nextValue,
  })
}

const title = computed({
  get: () => props.product.title,
  set: (value: string) => updateTextField('title', value),
})

const imageUrl = computed({
  get: () => props.product.imageUrl,
  set: (value: string) => updateTextField('imageUrl', value),
})

const price = computed({
  get: () => props.product.price,
  set: (value: string | number) => updateNumberField('price', value),
})

const originalPrice = computed({
  get: () => props.product.originalPrice,
  set: (value: string | number) => updateNumberField('originalPrice', value),
})

const discountBadge = computed({
  get: () => props.product.discountBadge,
  set: (value: string) => updateTextField('discountBadge', value),
})

const promotionText = computed({
  get: () => props.product.promotionText,
  set: (value: string) => updateTextField('promotionText', value),
})

const rating = computed({
  get: () => props.product.rating,
  set: (value: string | number) => updateNumberField('rating', value),
})

const soldCount = computed({
  get: () => props.product.soldCount,
  set: (value: string | number) => updateNumberField('soldCount', value),
})

const ctaLabel = computed({
  get: () => props.product.ctaLabel,
  set: (value: string) => updateTextField('ctaLabel', value),
})

function resetProduct() {
  productStore.resetProductDraft(props.product.id)
}
</script>

<template>
  <v-sheet class="product-editor-panel" rounded="lg">
    <div class="product-editor-panel__header">
      <div>
        <p class="product-editor-panel__eyebrow">Editor Panel</p>
        <h2 class="product-editor-panel__title">商品編輯面板</h2>
      </div>
      <v-btn
        variant="outlined"
        color="primary"
        size="small"
        prepend-icon="mdi-restore"
        @click="resetProduct"
      >
        還原預設
      </v-btn>
    </div>

    <p class="mt-3 text-body-2 text-medium-emphasis">
      編輯內容會即時同步至左側商品卡 preview。
    </p>

    <v-divider class="my-4" />

    <v-form class="product-editor-panel__form" @submit.prevent>
      <v-text-field
        v-model="title"
        label="商品名稱"
        variant="outlined"
        density="comfortable"
        :rules="[(value: string) => Boolean(value?.trim()) || '請輸入商品名稱']"
        required
      />

      <v-text-field
        v-model="imageUrl"
        label="圖片 URL"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-image-outline"
      />

      <div class="product-editor-panel__grid">
        <v-text-field
          v-model="price"
          label="售價"
          type="number"
          min="0"
          variant="outlined"
          density="comfortable"
          prefix="NT$"
        />
        <v-text-field
          v-model="originalPrice"
          label="原價"
          type="number"
          min="0"
          variant="outlined"
          density="comfortable"
          prefix="NT$"
        />
      </div>

      <div class="product-editor-panel__grid">
        <v-text-field
          v-model="discountBadge"
          label="折扣 badge"
          variant="outlined"
          density="comfortable"
        />
        <v-text-field
          v-model="promotionText"
          label="促銷文案"
          variant="outlined"
          density="comfortable"
        />
      </div>

      <div class="product-editor-panel__grid">
        <v-text-field
          v-model="rating"
          label="評價"
          type="number"
          min="0"
          max="5"
          step="0.1"
          variant="outlined"
          density="comfortable"
        />
        <v-text-field
          v-model="soldCount"
          label="銷量"
          type="number"
          min="0"
          step="1"
          variant="outlined"
          density="comfortable"
        />
      </div>

      <v-text-field
        v-model="ctaLabel"
        label="CTA 文案"
        variant="outlined"
        density="comfortable"
      />
    </v-form>
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

.product-editor-panel__form {
  display: grid;
  gap: 4px;
}

.product-editor-panel__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 600px) {
  .product-editor-panel__header {
    flex-direction: column;
  }

  .product-editor-panel__grid {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
