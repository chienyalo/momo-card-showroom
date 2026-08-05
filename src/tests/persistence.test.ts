import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  clearProductEdit,
  loadProductEdits,
  PRODUCT_EDITS_STORAGE_KEY,
  saveProductEdits,
} from '@/utils/persistence'
import type { EditedProducts } from '@/stores/productStore'

describe('persistence utility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads and sanitizes persisted product drafts', () => {
    localStorage.setItem(
      PRODUCT_EDITS_STORAGE_KEY,
      JSON.stringify({
        'product-1': {
          title: '已保存商品',
          price: 899,
          rating: 4.8,
          soldCount: 12.9,
          ignoredField: '不要載入',
        },
      }),
    )

    expect(loadProductEdits()).toEqual<EditedProducts>({
      'product-1': {
        title: '已保存商品',
        price: 899,
        rating: 4.8,
        soldCount: 12,
      },
    })
  })

  it('returns empty drafts for missing or malformed storage data', () => {
    expect(loadProductEdits()).toEqual({})

    localStorage.setItem(PRODUCT_EDITS_STORAGE_KEY, '{bad json')
    expect(loadProductEdits()).toEqual({})

    localStorage.setItem(PRODUCT_EDITS_STORAGE_KEY, JSON.stringify([]))
    expect(loadProductEdits()).toEqual({})
  })

  it('does not throw when storage read or write fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage read failed')
    })
    expect(loadProductEdits()).toEqual({})

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage write failed')
    })
    expect(() => saveProductEdits({ 'product-1': { title: '暫存商品' } })).not.toThrow()
  })

  it('saves drafts without base product data', () => {
    saveProductEdits({
      'product-1': {
        title: '已編輯商品',
        price: 799,
      },
    })

    expect(JSON.parse(localStorage.getItem(PRODUCT_EDITS_STORAGE_KEY) ?? '{}')).toEqual({
      'product-1': {
        title: '已編輯商品',
        price: 799,
      },
    })
  })

  it('clears one product draft and keeps other drafts', () => {
    saveProductEdits({
      'product-1': { title: '商品一' },
      'product-2': { title: '商品二' },
    })

    clearProductEdit('product-1')

    expect(loadProductEdits()).toEqual<EditedProducts>({
      'product-2': { title: '商品二' },
    })
  })
})
