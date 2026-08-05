<template>
  <v-container class="py-8">
    <h1 class="text-h5 font-weight-bold">Merchant Card Showroom</h1>
    <p class="mt-2 text-body-2 text-medium-emphasis">
      商品卡列表會在後續 OpenSpec change 中接上 mock service。
    </p>

    <v-btn
      class="mt-6"
      color="primary"
      :to="{ name: 'product-detail', params: { id: 'mock-air-fryer-001' } }"
    >
      查看示範商品
    </v-btn>
  </v-container>
</template>
