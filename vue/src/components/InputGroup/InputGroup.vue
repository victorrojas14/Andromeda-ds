<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import './InputGroup.css'

/*
 * InputGroup — DS Andromeda (Figma: set "Input group" 13305:3395,
 * documentación 13305:2746). Un solo componente responsivo: en
 * desktop es [Categorías ▾][Buscar][botón primary] con dropdown de
 * categorías; en <768px adopta el diseño mobile (13305:3403) con
 * input Form-SM + botón SM y las categorías como chips horizontales
 * de scroll invisible arrastrable con el mouse.
 * v-model = texto de búsqueda; v-model:category = categoría.
 */

interface InputGroupProps {
  /** Label del segmento de categorías (Figma: "Categorías"). */
  categoryLabel?: string
  /** Categorías del dropdown (desktop) y chips (mobile). */
  categories?: string[]
  /** Placeholder del campo de texto (Figma: "Buscar"). */
  placeholder?: string
  /** Muestra el buscador interno del dropdown de categorías. */
  categorySearchable?: boolean
  categorySearchPlaceholder?: string
  noResultsText?: string
}

const props = withDefaults(defineProps<InputGroupProps>(), {
  categoryLabel: 'Categorías',
  categories: () => [],
  placeholder: 'Buscar',
  categorySearchable: true,
  categorySearchPlaceholder: 'Buscar',
  noResultsText: 'No se encontraron resultados',
})

const model = defineModel<string>({ default: '' })
const categoryModel = defineModel<string>('category', { default: '' })

const emit = defineEmits<{
  search: [value: string, category: string]
  categoryChange: [category: string]
}>()

const open = ref(false)
const panelQuery = ref('')
const rootRef = ref<HTMLElement | null>(null)
const chipsRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const drag = { active: false, moved: false, startX: 0, startScroll: 0 }

const COMBINING_MARKS = /[̀-ͯ]/g
const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(COMBINING_MARKS, '')

const filteredCategories = computed(() =>
  panelQuery.value
    ? props.categories.filter((c) =>
        normalize(c).includes(normalize(panelQuery.value)),
      )
    : props.categories,
)

const onPointerDownDoc = (e: PointerEvent) => {
  if (!rootRef.value?.contains(e.target as Node)) open.value = false
}
const onKeyDownDoc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('pointerdown', onPointerDownDoc)
    document.addEventListener('keydown', onKeyDownDoc)
  } else {
    document.removeEventListener('pointerdown', onPointerDownDoc)
    document.removeEventListener('keydown', onKeyDownDoc)
    panelQuery.value = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDownDoc)
  document.removeEventListener('keydown', onKeyDownDoc)
})

const selectCategory = (cat: string) => {
  categoryModel.value = cat
  emit('categoryChange', cat)
  open.value = false
}

const onSearch = () => {
  emit('search', model.value, categoryModel.value)
}

/* Scroll invisible arrastrable con el mouse (chips en mobile) */
const onChipsPointerDown = (e: PointerEvent) => {
  const el = chipsRef.value
  if (!el || el.scrollWidth <= el.clientWidth) return
  drag.active = true
  drag.moved = false
  drag.startX = e.clientX
  drag.startScroll = el.scrollLeft
  dragging.value = true
}

const onChipsPointerMove = (e: PointerEvent) => {
  if (!drag.active || !chipsRef.value) return
  const dx = e.clientX - drag.startX
  if (Math.abs(dx) > 4) drag.moved = true
  chipsRef.value.scrollLeft = drag.startScroll - dx
}

const endChipsDrag = () => {
  drag.active = false
  dragging.value = false
}

const onChipClick = (cat: string) => {
  if (drag.moved) return
  categoryModel.value = cat
  emit('categoryChange', cat)
}
</script>

<template>
  <div ref="rootRef" :class="['and-ig', open && 'and-ig--open']">
    <div class="and-ig__bar">
      <div class="and-ig__category">
        <button
          type="button"
          class="and-ig__category-trigger"
          aria-haspopup="listbox"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span class="and-ig__category-label">{{ categoryModel || categoryLabel }}</span>
          <span class="and-ig__chevron">
            <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
          </span>
        </button>
        <div class="and-ig__line" />
        <div v-if="open" class="and-ig__panel">
          <div v-if="categorySearchable" class="and-ig__panel-search">
            <input
              v-model="panelQuery"
              class="and-ig__panel-search-input"
              type="text"
              :placeholder="categorySearchPlaceholder"
            />
            <Icon name="search" :size="24" />
          </div>
          <div v-if="filteredCategories.length === 0" class="and-ig__empty">
            <Icon name="baseline-search-off" :size="24" />
            <span class="and-ig__empty-text">{{ noResultsText }}</span>
          </div>
          <ul v-else class="and-ig__list" role="listbox" :aria-label="categoryLabel">
            <li v-for="cat in filteredCategories" :key="cat">
              <button
                type="button"
                role="option"
                :aria-selected="cat === categoryModel"
                :class="[
                  'and-ig__option',
                  cat === categoryModel && 'and-ig__option--selected',
                ]"
                @click="selectCategory(cat)"
              >
                {{ cat }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="and-ig__search">
        <div class="and-ig__search-box">
          <input
            v-model="model"
            class="and-ig__search-input"
            type="text"
            :placeholder="placeholder"
            @keydown.enter="onSearch"
          />
        </div>
        <div class="and-ig__line" />
      </div>
      <button type="button" class="and-ig__button" aria-label="Buscar" @click="onSearch">
        <Icon name="search" :size="32" />
      </button>
    </div>
    <div
      v-if="categories.length > 0"
      ref="chipsRef"
      :class="['and-ig__chips', dragging && 'and-ig__chips--dragging']"
      @pointerdown="onChipsPointerDown"
      @pointermove="onChipsPointerMove"
      @pointerup="endChipsDrag"
      @pointerleave="endChipsDrag"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        :class="['and-ig__chip', cat === categoryModel && 'and-ig__chip--selected']"
        :aria-pressed="cat === categoryModel"
        @click="onChipClick(cat)"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>
