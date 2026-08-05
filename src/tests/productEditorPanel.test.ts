import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import ProductEditorPanel from '@/components/ProductEditorPanel.vue'
import { useProductStore } from '@/stores/productStore'
import { normalizeProductCard, type ProductCard } from '@/types/productCard'

const product: ProductCard = normalizeProductCard({
  id: 'editor-product-1',
  title: '測試商品',
  imageUrl: 'https://example.com/product.jpg',
  price: 1299,
  originalPrice: 1599,
  discountBadge: '限時優惠',
  promotionText: '免運活動',
  rating: 4.5,
  soldCount: 120,
  ctaLabel: '立即查看',
})

type EditorPanelVm = {
  title: string
  price: number
  rating: number
  soldCount: number
}

const TextFieldStub = defineComponent({
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    modelValue: { type: [String, Number], default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('input', {
      'aria-label': props.label,
      value: props.modelValue,
      onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
    })
  },
})

const ButtonStub = defineComponent({
  emits: ['click'],
  setup(_, { emit, slots }) {
    return () => h('button', { type: 'button', onClick: () => emit('click') }, slots.default?.())
  },
})

const FormStub = defineComponent({
  setup(_, { slots }) {
    return () => h('form', slots.default?.())
  },
})

const SurfaceStub = defineComponent({
  setup(_, { slots }) {
    return () => h('section', slots.default?.())
  },
})

const DividerStub = defineComponent({
  setup() {
    return () => h('hr')
  },
})

describe('ProductEditorPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountPanel() {
    const store = useProductStore()
    store.products = [{ ...product }]

    const wrapper = mount(ProductEditorPanel, {
      props: {
        product: store.findProductById(product.id) as ProductCard,
      },
      global: {
        stubs: {
          'v-btn': ButtonStub,
          'v-divider': DividerStub,
          'v-form': FormStub,
          'v-sheet': SurfaceStub,
          'v-text-field': TextFieldStub,
        },
      },
    })

    return { store, wrapper, vm: wrapper.vm as unknown as EditorPanelVm }
  }

  it('renders the current product values in all editor controls', () => {
    const { wrapper } = mountPanel()

    expect(wrapper.find('input[aria-label="商品名稱"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="圖片 URL"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="售價"]').element).toHaveProperty('value', '1299')
    expect(wrapper.find('input[aria-label="原價"]').element).toHaveProperty('value', '1599')
    expect(wrapper.find('input[aria-label="評價"]').element).toHaveProperty('value', '4.5')
    expect(wrapper.find('input[aria-label="銷量"]').element).toHaveProperty('value', '120')
    expect(wrapper.find('input[aria-label="CTA 文案"]').exists()).toBe(true)
  })

  it('updates text and number drafts through the product store', () => {
    const { store, vm } = mountPanel()

    vm.title = '更新後商品'
    vm.price = 899

    expect(store.editedProducts[product.id]).toMatchObject({
      title: '更新後商品',
      price: 899,
    })
  })

  it('rejects invalid numeric values before writing a draft', () => {
    const { store, vm } = mountPanel()

    vm.rating = 6
    vm.soldCount = -1

    expect(store.editedProducts[product.id]).toBeUndefined()
  })

  it('resets the current product draft from the panel action', async () => {
    const { store, wrapper, vm } = mountPanel()

    vm.title = '暫時修改'
    await wrapper.find('button').trigger('click')

    expect(store.editedProducts[product.id]).toBeUndefined()
  })
})
