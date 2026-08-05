import { describe, expect, it } from 'vitest'

import { getProductById, getProducts } from '@/services/mockProductService'
import type { ProductCard } from '@/types/productCard'

const MOMO_PRODUCTION_DOMAIN_PATTERN = /momo(shop)?\.com\.tw/i

function expectProductCardSchema(product: ProductCard) {
  expect(product).toEqual({
    id: expect.any(String),
    title: expect.any(String),
    imageUrl: expect.any(String),
    price: expect.any(Number),
    originalPrice: expect.any(Number),
    discountBadge: expect.any(String),
    promotionText: expect.any(String),
    rating: expect.any(Number),
    soldCount: expect.any(Number),
    ctaLabel: expect.any(String),
  })
}

describe('mockProductService', () => {
  it('returns product list through an async service boundary', async () => {
    const productsPromise = getProducts()

    expect(productsPromise).toBeInstanceOf(Promise)

    const products = await productsPromise

    expect(products.length).toBeGreaterThan(0)
    products.forEach(expectProductCardSchema)
  })

  it('returns a matching product by id', async () => {
    const [firstProduct] = await getProducts()
    const product = await getProductById(firstProduct.id)

    expect(product).toEqual(firstProduct)
  })

  it('returns null when a product id does not exist', async () => {
    await expect(getProductById('not-found-product-id')).resolves.toBeNull()
  })

  it('does not expose internal mock product references', async () => {
    const [product] = await getProducts()

    product.title = 'mutated by test'

    const productAgain = await getProductById(product.id)

    expect(productAgain?.title).not.toBe('mutated by test')
  })

  it('does not depend on momo production domains', async () => {
    const products = await getProducts()
    const serializedProducts = JSON.stringify(products)

    expect(serializedProducts).not.toMatch(MOMO_PRODUCTION_DOMAIN_PATTERN)
    products.forEach((product) => {
      expect(product.imageUrl).not.toMatch(MOMO_PRODUCTION_DOMAIN_PATTERN)
    })
  })
})
