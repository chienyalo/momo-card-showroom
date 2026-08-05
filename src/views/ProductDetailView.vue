<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <v-container class="py-8">
    <v-btn variant="text" color="primary" :to="{ name: 'home' }">
      返回首頁
    </v-btn>

    <h1 class="mt-4 text-h5 font-weight-bold">商品細節</h1>
    <p class="mt-2 text-body-2 text-medium-emphasis">
      商品 ID：{{ id }}
    </p>
  </v-container>
</template>
