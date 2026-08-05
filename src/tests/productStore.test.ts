import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getProducts } from '@/services/mockProductService'
import { useProductStore, type EditedProducts } from '@/stores/productStore'
import { normalizeProductCard, type ProductCard } from '@/types/productCard'

vi.mock('@/services/mockProductService', () => ({
  getProducts: vi.fn(),
}))

const mockedGetProducts = vi.mocked(getProducts)
const storageKey = 'momo-card-showroom:product-edits'

const baseProducts: ProductCard[] = [
  normalizeProductCard({
    id: 'store-product-1',
    title: 'Base 商品一',
    imageUrl: 'https://picsum.photos/seed/store-product-1/640/640',
    price: 1000,
    originalPrice: 1200,
    discountBadge: '原始 badge',
    promotionText: '原始促銷',
    rating: 4.4,
    soldCount: 100,
    ctaLabel: '查看商品',
  }),
  normalizeProductCard({
    id: 'store-product-2',
    title: 'Base 商品二',
    imageUrl: 'https://picsum.photos/seed/store-product-2/640/640',
    price: 2000,
    originalPrice: 2500,
    discountBadge: '第二件優惠',
    promotionText: '限時免運',
    rating: 4.7,
    soldCount: 250,
    ctaLabel: '立即查看',
  }),
]

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
  })

  return {
    promise,
    resolve,
    reject,
  }
}

describe('productStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    mockedGetProducts.mockReset()
    mockedGetProducts.mockResolvedValue(baseProducts.map((product) => ({ ...product })))
  })

  it('loads products from mock service', async () => {
    const store = useProductStore()

    await store.loadProducts()

    expect(mockedGetProducts).toHaveBeenCalledOnce()
    expect(store.products).toEqual(baseProducts)
    expect(store.displayProducts).toEqual(baseProducts)
    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('tracks loading state and records load errors', async () => {
    const deferred = createDeferred<ProductCard[]>()
    mockedGetProducts.mockReturnValueOnce(deferred.promise)
    const store = useProductStore()

    const loadingPromise = store.loadProducts()

    expect(store.isLoading).toBe(true)

    deferred.reject(new Error('service unavailable'))
    await loadingPromise

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('service unavailable')
    expect(store.products).toEqual([])
  })

  it('merges product drafts into display data without mutating base products', async () => {
    const store = useProductStore()
    await store.loadProducts()

    store.updateProductDraft('store-product-1', {
      title: 'Edited 商品一',
      price: 899,
      promotionText: '草稿促銷',
    })

    expect(store.editedProducts['store-product-1']).toMatchObject({
      title: 'Edited 商品一',
      price: 899,
      promotionText: '草稿促銷',
    })
    expect(store.findProductById('store-product-1')).toMatchObject({
      id: 'store-product-1',
      title: 'Edited 商品一',
      price: 899,
      promotionText: '草稿促銷',
    })
    expect(store.products[0]).toEqual(baseProducts[0])
  })

  it('does not create drafts for unknown products', async () => {
    const store = useProductStore()
    await store.loadProducts()

    store.updateProductDraft('missing-product', {
      title: 'Should not exist',
    })

    expect(store.editedProducts).toEqual({})
    expect(store.findProductById('missing-product')).toBeNull()
  })

  it('resets a product draft back to base data', async () => {
    const store = useProductStore()
    await store.loadProducts()

    store.updateProductDraft('store-product-1', {
      title: 'Edited 商品一',
    })
    store.resetProductDraft('store-product-1')

    expect(store.editedProducts['store-product-1']).toBeUndefined()
    expect(store.findProductById('store-product-1')).toEqual(baseProducts[0])
  })

  it('hydrates edited products from storage and applies them to display data', async () => {
    const savedDrafts: EditedProducts = {
      'store-product-2': {
        title: 'Hydrated 商品二',
        ctaLabel: '已保存 CTA',
      },
    }
    localStorage.setItem(storageKey, JSON.stringify(savedDrafts))

    const store = useProductStore()
    await store.loadProducts()
    store.hydrateFromStorage()

    expect(store.editedProducts).toEqual(savedDrafts)
    expect(store.findProductById('store-product-2')).toMatchObject({
      id: 'store-product-2',
      title: 'Hydrated 商品二',
      ctaLabel: '已保存 CTA',
    })
  })

  it('saves edited products to storage', async () => {
    const store = useProductStore()
    await store.loadProducts()

    store.updateProductDraft('store-product-1', {
      title: 'Saved 商品一',
    })
    store.saveToStorage()

    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toEqual({
      'store-product-1': {
        title: 'Saved 商品一',
      },
    })
  })
})
