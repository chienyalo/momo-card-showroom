export interface ProductCard {
  id: string
  title: string
  imageUrl: string
  price: number
  originalPrice: number
  discountBadge: string
  promotionText: string
  rating: number
  soldCount: number
  ctaLabel: string
}

export type ProductCardInput = Partial<ProductCard>

export const DEFAULT_PRODUCT_CARD: ProductCard = {
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
}

function toSafeMoneyValue(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0
}

function toSafeCountValue(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0
}

function toSafeRatingValue(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0
  }

  return Math.min(Math.max(value, 0), 5)
}

function toSafeTextValue(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function formatPrice(price?: number | null): string {
  const safePrice = toSafeMoneyValue(price)

  return `NT$${new Intl.NumberFormat('zh-TW', {
    maximumFractionDigits: 0,
  }).format(safePrice)}`
}

export function calculateDiscountRate(
  price?: number | null,
  originalPrice?: number | null,
): number | null {
  const safePrice = toSafeMoneyValue(price)
  const safeOriginalPrice = toSafeMoneyValue(originalPrice)

  if (safePrice === 0 || safeOriginalPrice === 0 || safePrice >= safeOriginalPrice) {
    return null
  }

  return Math.round((1 - safePrice / safeOriginalPrice) * 100)
}

export function normalizeProductCard(input: ProductCardInput = {}): ProductCard {
  return {
    ...DEFAULT_PRODUCT_CARD,
    ...input,
    price: toSafeMoneyValue(input.price),
    originalPrice: toSafeMoneyValue(input.originalPrice),
    rating: toSafeRatingValue(input.rating),
    soldCount: toSafeCountValue(input.soldCount),
    id: toSafeTextValue(input.id, DEFAULT_PRODUCT_CARD.id),
    title: toSafeTextValue(input.title, DEFAULT_PRODUCT_CARD.title),
    imageUrl: toSafeTextValue(input.imageUrl, DEFAULT_PRODUCT_CARD.imageUrl),
    discountBadge: toSafeTextValue(input.discountBadge, DEFAULT_PRODUCT_CARD.discountBadge),
    promotionText: toSafeTextValue(input.promotionText, DEFAULT_PRODUCT_CARD.promotionText),
    ctaLabel: toSafeTextValue(input.ctaLabel, DEFAULT_PRODUCT_CARD.ctaLabel),
  }
}
