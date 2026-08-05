import type { EditedProducts, ProductDraft } from '@/stores/productStore'

export const PRODUCT_EDITS_STORAGE_KEY = 'momo-card-showroom:product-edits'

const textFields = new Set(['title', 'imageUrl', 'discountBadge', 'promotionText', 'ctaLabel'])
const numberFields = new Set(['price', 'originalPrice', 'rating', 'soldCount'])

function sanitizeDraft(value: unknown): ProductDraft {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  const draft: ProductDraft = {}

  for (const [field, fieldValue] of Object.entries(value)) {
    if (textFields.has(field) && typeof fieldValue === 'string') {
      draft[field as keyof ProductDraft] = fieldValue
      continue
    }

    if (numberFields.has(field) && typeof fieldValue === 'number' && Number.isFinite(fieldValue)) {
      if (field === 'rating' && (fieldValue < 0 || fieldValue > 5)) {
        continue
      }

      draft[field as keyof ProductDraft] = field === 'soldCount'
        ? Math.max(0, Math.floor(fieldValue))
        : Math.max(0, fieldValue)
    }
  }

  return draft
}

function sanitizeEditedProducts(value: unknown): EditedProducts {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([id]) => Boolean(id))
      .map(([id, draft]) => [id, sanitizeDraft(draft)])
      .filter(([, draft]) => Object.keys(draft).length > 0),
  )
}

export function loadProductEdits(): EditedProducts {
  try {
    const serializedDrafts = globalThis.localStorage?.getItem(PRODUCT_EDITS_STORAGE_KEY)

    if (!serializedDrafts) {
      return {}
    }

    return sanitizeEditedProducts(JSON.parse(serializedDrafts))
  } catch {
    return {}
  }
}

export function saveProductEdits(edits: EditedProducts): void {
  try {
    globalThis.localStorage?.setItem(
      PRODUCT_EDITS_STORAGE_KEY,
      JSON.stringify(sanitizeEditedProducts(edits)),
    )
  } catch {
    // Storage may be unavailable or full; the in-memory store remains usable.
  }
}

export function clearProductEdit(id: string): void {
  const remainingDrafts = loadProductEdits()
  delete remainingDrafts[id]
  saveProductEdits(remainingDrafts)
}
