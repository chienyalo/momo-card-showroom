<script setup lang="ts">
import { computed } from 'vue'

import {
  calculateDiscountRate,
  formatPrice,
  type ProductCard,
} from '@/types/productCard'

const props = withDefaults(
  defineProps<{
    product: ProductCard
    mode?: 'list' | 'detail'
  }>(),
  {
    mode: 'list',
  },
)

const emit = defineEmits<{
  'cta-click': [product: ProductCard]
}>()

const isDetailMode = computed(() => props.mode === 'detail')
const imageAlt = computed(() => props.product.title || '商品圖片')
const priceText = computed(() => formatPrice(props.product.price))
const originalPriceText = computed(() => formatPrice(props.product.originalPrice))
const discountLabel = computed(() => {
  if (props.product.discountBadge) {
    return props.product.discountBadge
  }

  const discountRate = calculateDiscountRate(
    props.product.price,
    props.product.originalPrice,
  )

  return discountRate ? `${discountRate}% OFF` : ''
})
const hasOriginalPrice = computed(() => props.product.originalPrice > props.product.price)
const ratingText = computed(() => props.product.rating.toFixed(1))
const soldCountText = computed(() =>
  props.product.soldCount > 999
    ? `${Math.floor(props.product.soldCount / 1000)}k+`
    : props.product.soldCount.toString(),
)

function handleCtaClick() {
  emit('cta-click', props.product)
}
</script>

<template>
  <v-card
    class="product-card"
    :class="{ 'product-card--detail': isDetailMode }"
    elevation="0"
    rounded="lg"
  >
    <div class="product-card__image-frame">
      <v-img
        :src="product.imageUrl"
        :alt="imageAlt"
        aspect-ratio="1"
        cover
        class="product-card__image"
      >
        <template #error>
          <div class="product-card__image-fallback">
            <v-icon icon="mdi-image-off-outline" size="32" />
          </div>
        </template>
      </v-img>

      <span v-if="discountLabel" class="product-card__badge">
        {{ discountLabel }}
      </span>
    </div>

    <v-card-text class="product-card__body">
      <h2 class="product-card__title">
        {{ product.title }}
      </h2>

      <p v-if="product.promotionText" class="product-card__promotion">
        {{ product.promotionText }}
      </p>

      <div class="product-card__price-row">
        <span class="product-card__price">{{ priceText }}</span>
        <span v-if="hasOriginalPrice" class="product-card__original-price">
          {{ originalPriceText }}
        </span>
      </div>

      <div class="product-card__meta">
        <span>評價 {{ ratingText }}</span>
        <span>已售 {{ soldCountText }}</span>
      </div>

      <v-btn
        class="product-card__cta"
        color="primary"
        variant="flat"
        block
        @click="handleCtaClick"
      >
        {{ product.ctaLabel }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  height: 100%;
  background: #fff;
  border: 1px solid #eceff3;
  transition:
    border-color 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

.product-card:hover {
  border-color: #f6a1a8;
  box-shadow: 0 10px 24px rgba(40, 45, 55, 0.12);
  transform: translateY(-2px);
}

.product-card--detail {
  max-width: 420px;
}

.product-card__image-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #f7f8fa;
}

.product-card__image,
.product-card__image-fallback {
  width: 100%;
  height: 100%;
}

.product-card__image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b95a1;
  background: #f2f4f7;
}

.product-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: calc(100% - 20px);
  padding: 4px 8px;
  overflow: hidden;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #d70018;
  border-radius: 4px;
}

.product-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}

.product-card--detail .product-card__body {
  gap: 10px;
  padding: 16px;
}

.product-card__title {
  display: -webkit-box;
  min-height: 2.8em;
  overflow: hidden;
  color: #20242a;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-card--detail .product-card__title {
  font-size: 1.05rem;
}

.product-card__promotion {
  min-height: 1.3em;
  overflow: hidden;
  color: #9a3412;
  font-size: 0.82rem;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card__price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}

.product-card__price {
  color: #d70018;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.1;
}

.product-card--detail .product-card__price {
  font-size: 1.5rem;
}

.product-card__original-price {
  color: #8b95a1;
  font-size: 0.8rem;
  line-height: 1.2;
  text-decoration: line-through;
}

.product-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #5c6672;
  font-size: 0.78rem;
  line-height: 1.2;
}

.product-card__cta {
  margin-top: auto;
  min-height: 36px;
  font-weight: 700;
}

@media (max-width: 600px) {
  .product-card,
  .product-card--detail {
    max-width: none;
  }
}
</style>
