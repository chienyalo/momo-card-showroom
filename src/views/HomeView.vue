<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import type { ProductCard as ProductCardType } from '@/types/productCard'

const router = useRouter()
const productStore = useProductStore()

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.loadProducts()
  }
})

const demoProduct = computed(() => productStore.displayProducts[0] ?? null)

function openProduct(product: ProductCardType) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-h5 font-weight-bold">Merchant Card Showroom</h1>
    <p class="mt-2 text-body-2 text-medium-emphasis">
      商品卡列表會在後續 OpenSpec change 中接上 mock service。
    </p>

    <div v-if="demoProduct" class="mt-6 home-view__demo-card">
      <ProductCard :product="demoProduct" mode="list" @cta-click="openProduct" />
    </div>
  </v-container>
</template>

<style scoped>
.home-view__demo-card {
  width: min(100%, 320px);
}
</style>
