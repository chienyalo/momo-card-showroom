<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { formatPrice } from '@/types/productCard'
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
</script>

<template>
  <v-container class="py-8">
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
      <h1 class="mt-4 text-h5 font-weight-bold">{{ product.title }}</h1>
      <p class="mt-2 text-body-2 text-medium-emphasis">
        商品 ID：{{ product.id }}
      </p>
      <p class="mt-4 text-h6 font-weight-bold">
        {{ formatPrice(product.price) }}
      </p>
      <p class="mt-1 text-body-2 text-medium-emphasis">
        原價 {{ formatPrice(product.originalPrice) }}
      </p>
    </template>

    <template v-else>
      <h1 class="mt-4 text-h5 font-weight-bold">找不到商品</h1>
      <p class="mt-2 text-body-2 text-medium-emphasis">
        商品 ID「{{ id }}」不存在，請返回首頁重新選擇。
      </p>
    </template>
  </v-container>
</template>
