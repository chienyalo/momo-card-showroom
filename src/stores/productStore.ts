import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { getProducts } from '@/services/mockProductService'
import { normalizeProductCard, type ProductCard } from '@/types/productCard'

const PRODUCT_EDITS_STORAGE_KEY = 'momo-card-showroom:product-edits'

export type ProductDraft = Partial<Omit<ProductCard, 'id'>>
export type EditedProducts = Record<string, ProductDraft>

function isEditedProducts(value: unknown): value is EditedProducts {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function cloneDrafts(drafts: EditedProducts): EditedProducts {
  return Object.fromEntries(
    Object.entries(drafts).map(([id, draft]) => [
      id,
      {
        ...draft,
      },
    ]),
  )
}

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductCard[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const editedProducts = ref<EditedProducts>({})

  const displayProducts = computed<ProductCard[]>(() =>
    products.value.map((product) =>
      normalizeProductCard({
        ...product,
        ...editedProducts.value[product.id],
        id: product.id,
      }),
    ),
  )

  async function loadProducts() {
    isLoading.value = true
    error.value = null

    try {
      products.value = await getProducts()
    } catch (unknownError) {
      error.value =
        unknownError instanceof Error ? unknownError.message : '商品資料載入失敗'
    } finally {
      isLoading.value = false
    }
  }

  function findProductById(id: string): ProductCard | null {
    return displayProducts.value.find((product) => product.id === id) ?? null
  }

  function updateProductDraft(id: string, draft: ProductDraft) {
    if (!products.value.some((product) => product.id === id)) {
      return
    }

    editedProducts.value = {
      ...editedProducts.value,
      [id]: {
        ...editedProducts.value[id],
        ...draft,
      },
    }
  }

  function resetProductDraft(id: string) {
    const { [id]: _removedDraft, ...remainingDrafts } = editedProducts.value

    editedProducts.value = remainingDrafts
  }

  function hydrateFromStorage() {
    const serializedDrafts = globalThis.localStorage?.getItem(PRODUCT_EDITS_STORAGE_KEY)

    if (!serializedDrafts) {
      editedProducts.value = {}
      return
    }

    const parsedDrafts: unknown = JSON.parse(serializedDrafts)

    editedProducts.value = isEditedProducts(parsedDrafts)
      ? cloneDrafts(parsedDrafts)
      : {}
  }

  function saveToStorage() {
    globalThis.localStorage?.setItem(
      PRODUCT_EDITS_STORAGE_KEY,
      JSON.stringify(editedProducts.value),
    )
  }

  return {
    products,
    isLoading,
    error,
    editedProducts,
    displayProducts,
    loadProducts,
    findProductById,
    updateProductDraft,
    resetProductDraft,
    hydrateFromStorage,
    saveToStorage,
  }
})
