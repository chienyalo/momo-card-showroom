<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import type { ProductCard as ProductCardType } from '@/types/productCard'

const router = useRouter()
const productStore = useProductStore()

async function loadProducts() {
  if (productStore.products.length === 0) {
    await productStore.loadProducts()
  }
}

onMounted(async () => {
  await loadProducts()
})

const products = computed(() => productStore.displayProducts)
const hasProducts = computed(() => products.value.length > 0)
const showEmptyState = computed(() =>
  !productStore.isLoading && !productStore.error && !hasProducts.value,
)

function openProduct(product: ProductCardType) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

async function retryLoadProducts() {
  await productStore.loadProducts()
}
</script>

<template>
  <v-container class="home-view py-8">
    <header class="home-view__header">
      <div>
        <p class="home-view__eyebrow">Merchant Card Showroom</p>
        <h1 class="home-view__title">momo-style 商品卡展示</h1>
        <p class="home-view__subtitle">
          使用 mock data 與可重用 ProductCard 呈現商品列表。
        </p>
      </div>

    </header>

    <v-alert
      v-if="productStore.error"
      class="mt-6"
      type="error"
      variant="tonal"
      :text="productStore.error"
    >
      <template #append>
        <v-btn variant="text" color="error" @click="retryLoadProducts">
          重新載入
        </v-btn>
      </template>
    </v-alert>

    <v-row v-else-if="productStore.isLoading" class="mt-6" dense>
      <v-col
        v-for="index in 4"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader type="image, article, button" />
      </v-col>
    </v-row>

    <v-sheet v-else-if="showEmptyState" class="home-view__empty mt-6" rounded="lg">
      <v-icon icon="mdi-package-variant-closed" size="36" />
      <h2 class="mt-3 text-h6 font-weight-bold">目前沒有商品</h2>
      <p class="mt-1 text-body-2 text-medium-emphasis">
        mock 商品資料載入完成，但列表是空的。
      </p>
    </v-sheet>

    <v-row v-else class="mt-6" dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard
          :product="product"
          mode="list"
          @cta-click="openProduct"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-view {
  max-width: 1180px;
}

.home-view__header {
  display: block;
}

.home-view__eyebrow {
  margin: 0 0 6px;
  color: #d70018;
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.2;
}

.home-view__title {
  margin: 0;
  color: #20242a;
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
}

.home-view__subtitle {
  max-width: 560px;
  margin: 8px 0 0;
  color: #5c6672;
  font-size: 0.95rem;
  line-height: 1.6;
}

.home-view__empty {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #5c6672;
  border: 1px dashed #d5dbe3;
}

@media (max-width: 760px) {
  .home-view__title {
    font-size: 1.45rem;
  }
}
</style>
