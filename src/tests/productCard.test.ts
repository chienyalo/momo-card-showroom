import { describe, expect, it } from 'vitest'

import {
  calculateDiscountRate,
  formatPrice,
  normalizeProductCard,
  type ProductCard,
} from '@/types/productCard'

describe('ProductCard schema helpers', () => {
  it('formats prices as stable Taiwan dollar display strings', () => {
    expect(formatPrice(1280)).toBe('NT$1,280')
    expect(formatPrice(999.8)).toBe('NT$1,000')
  })

  it('falls back for missing or invalid prices', () => {
    expect(formatPrice()).toBe('NT$0')
    expect(formatPrice(null)).toBe('NT$0')
    expect(formatPrice(-100)).toBe('NT$0')
    expect(formatPrice(Number.NaN)).toBe('NT$0')
  })

  it('calculates percentage discounts when original price is higher', () => {
    expect(calculateDiscountRate(800, 1000)).toBe(20)
    expect(calculateDiscountRate(699, 999)).toBe(30)
  })

  it('returns null when discount inputs cannot represent a discount', () => {
    expect(calculateDiscountRate(1000, 1000)).toBeNull()
    expect(calculateDiscountRate(1200, 1000)).toBeNull()
    expect(calculateDiscountRate(800, 0)).toBeNull()
    expect(calculateDiscountRate(undefined, 1000)).toBeNull()
    expect(calculateDiscountRate(800, undefined)).toBeNull()
  })

  it('normalizes missing product card fields with stable defaults', () => {
    expect(normalizeProductCard()).toEqual<ProductCard>({
      id: '',
      title: '未命名商品',
      imageUrl: '',
      price: 0,
      originalPrice: 0,
      discountBadge: '',
      promotionText: '',
      rating: 0,
      soldCount: 0,
      ctaLabel: '查看商品',
    })
  })

  it('normalizes invalid numeric fields without mutating valid text fields', () => {
    expect(
      normalizeProductCard({
        id: 'p-1',
        title: '  24h 到貨商品  ',
        imageUrl: 'https://example.com/product.jpg',
        price: -10,
        originalPrice: Number.NaN,
        rating: 9,
        soldCount: 12.8,
        ctaLabel: '  ',
      }),
    ).toEqual<ProductCard>({
      id: 'p-1',
      title: '24h 到貨商品',
      imageUrl: 'https://example.com/product.jpg',
      price: 0,
      originalPrice: 0,
      discountBadge: '',
      promotionText: '',
      rating: 5,
      soldCount: 12,
      ctaLabel: '查看商品',
    })
  })

  it('falls back when optional text fields are explicitly undefined', () => {
    expect(
      normalizeProductCard({
        id: undefined,
        imageUrl: undefined,
        discountBadge: undefined,
        promotionText: undefined,
      }),
    ).toMatchObject({
      id: '',
      imageUrl: '',
      discountBadge: '',
      promotionText: '',
    })
  })
})
