import { normalizeProductCard, type ProductCard } from '@/types/productCard'

const mockProducts: ProductCard[] = [
  normalizeProductCard({
    id: 'mock-air-fryer-001',
    title: '智能氣炸鍋 5L 可視化大容量料理鍋',
    imageUrl: 'https://picsum.photos/seed/mock-air-fryer-001/640/640',
    price: 2680,
    originalPrice: 3990,
    discountBadge: '限時 67 折',
    promotionText: '滿額登記送料理配件組',
    rating: 4.7,
    soldCount: 1280,
    ctaLabel: '立即查看',
  }),
  normalizeProductCard({
    id: 'mock-vacuum-002',
    title: '輕量無線吸塵器 強勁吸力多刷頭組',
    imageUrl: 'https://picsum.photos/seed/mock-vacuum-002/640/640',
    price: 4990,
    originalPrice: 6990,
    discountBadge: '現折 2,000',
    promotionText: '加碼贈 HEPA 濾芯',
    rating: 4.5,
    soldCount: 842,
    ctaLabel: '看更多',
  }),
  normalizeProductCard({
    id: 'mock-headphone-003',
    title: '主動降噪藍牙耳機 長效續航通勤款',
    imageUrl: 'https://picsum.photos/seed/mock-headphone-003/640/640',
    price: 1890,
    originalPrice: 2490,
    discountBadge: '熱銷補貨',
    promotionText: '今日下單享免運',
    rating: 4.8,
    soldCount: 2150,
    ctaLabel: '加入購物車',
  }),
  normalizeProductCard({
    id: 'mock-coffee-004',
    title: '義式膠囊咖啡機 小型家用快速萃取',
    imageUrl: 'https://picsum.photos/seed/mock-coffee-004/640/640',
    price: 3290,
    originalPrice: 4590,
    discountBadge: '買就送膠囊',
    promotionText: '指定銀行再享回饋',
    rating: 4.6,
    soldCount: 673,
    ctaLabel: '搶購優惠',
  }),
]

export async function getProducts(): Promise<ProductCard[]> {
  return mockProducts.map((product) => ({ ...product }))
}

export async function getProductById(id: string): Promise<ProductCard | null> {
  const product = mockProducts.find((item) => item.id === id)

  return product ? { ...product } : null
}
