<script setup lang="ts">
import { computed, onMounted } from 'vue'

import ProductCard from '@/components/ProductCard.vue'
import ProductEditorPanel from '@/components/ProductEditorPanel.vue'
import { useProductStore } from '@/stores/productStore'

const props = defineProps<{
  id?: string
}>()

const productStore = useProductStore()

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.loadProducts()
  }
})

const product = computed(() =>
  props.id ? productStore.findProductById(props.id) : null,
)

const sampleUsage = '<ProductCard :product="product" mode="detail" />'
</script>

<template>
  <v-container class="product-detail-view py-8">
    <v-btn variant="text" color="primary" :to="{ name: 'home' }">
      返回首頁
    </v-btn>

    <template v-if="productStore.isLoading">
      <h1 class="mt-4 text-h5 font-weight-bold">商品載入中</h1>
      <p class="mt-2 text-body-2 text-medium-emphasis">
        正在讀取商品資料。
      </p>
    </template>

    <template v-else-if="product">
      <header class="product-detail-view__header mt-4">
        <div>
          <p class="product-detail-view__eyebrow">Product Detail</p>
          <h1 class="product-detail-view__title">商品細節與編輯整合</h1>
          <p class="product-detail-view__subtitle">
            商品 ID：{{ product.id }}
          </p>
        </div>
      </header>

      <section class="product-detail-view__workspace mt-6">
        <ProductCard :product="product" mode="detail" />
        <ProductEditorPanel :product="product" />
      </section>

      <v-sheet class="product-detail-view__usage mt-6" rounded="lg">
        <h2 class="text-h6 font-weight-bold">Schema / Sample Usage</h2>
        <p class="mt-2 text-body-2 text-medium-emphasis">
          `ProductCard` 透過 typed props 接收 `product`，並以 `mode="detail"` 呈現細節頁 preview。
        </p>
        <pre class="product-detail-view__code">{{ sampleUsage }}</pre>
      </v-sheet>
    </template>

    <template v-else>
      <v-sheet class="product-detail-view__fallback mt-6" rounded="lg">
        <v-icon icon="mdi-alert-circle-outline" size="40" />
        <h1 class="mt-3 text-h5 font-weight-bold">找不到商品</h1>
        <p class="mt-2 text-body-2 text-medium-emphasis">
          商品 ID「{{ id }}」不存在，請返回首頁重新選擇。
        </p>
        <v-btn class="mt-4" color="primary" :to="{ name: 'home' }">
          返回首頁
        </v-btn>
      </v-sheet>
    </template>
  </v-container>
</template>

<style scoped>
.product-detail-view {
  max-width: 1120px;
}

.product-detail-view__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.product-detail-view__eyebrow {
  margin: 0 0 6px;
  color: #d70018;
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.2;
}

.product-detail-view__title {
  margin: 0;
  color: #20242a;
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
}

.product-detail-view__subtitle {
  margin: 8px 0 0;
  color: #5c6672;
  font-size: 0.95rem;
  line-height: 1.5;
}

.product-detail-view__workspace {
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.product-detail-view__usage,
.product-detail-view__fallback {
  padding: 20px;
  background: #fff;
  border: 1px solid #eceff3;
}

.product-detail-view__fallback {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.product-detail-view__code {
  margin: 16px 0 0;
  padding: 12px;
  overflow-x: auto;
  color: #20242a;
  font-size: 0.85rem;
  line-height: 1.5;
  background: #f7f8fa;
  border-radius: 6px;
}

@media (max-width: 820px) {
  .product-detail-view__workspace {
    grid-template-columns: 1fr;
  }

  .product-detail-view__title {
    font-size: 1.4rem;
  }
}
</style>
