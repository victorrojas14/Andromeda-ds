<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import './Dropdown.css'

/*
 * Dropdown — DS Andromeda (Figma: página Dropdown 9477:15495).
 * Trigger "Form option" con label flotante y chevron, panel
 * "Dropdown--full--new" con buscador que filtra entre los items,
 * items "Item Opcion New" con check cuadrado/circular a la
 * izquierda o derecha, y estado "No results". Soporta v-model.
 */

export interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  /** Etiqueta flotante del trigger (Figma: "Seleccionar"). */
  label?: string
  /** Opciones: strings u objetos { label, value }. */
  options?: Array<string | DropdownOption>
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda). */
  searchable?: boolean
  searchPlaceholder?: string
  /** Forma del check del item (Figma Variant: Square/Circle). */
  checkShape?: 'square' | 'circle'
  /** Posición del check en el item (Figma Variant: left/right). */
  checkPosition?: 'left' | 'right'
  disabled?: boolean
  /** Texto del estado sin resultados (Figma: No results). */
  noResultsText?: string
}

const props = withDefaults(defineProps<DropdownProps>(), {
  label: 'Seleccionar',
  options: () => [],
  searchable: true,
  searchPlaceholder: 'Buscar',
  checkShape: 'square',
  checkPosition: 'right',
  disabled: false,
  noResultsText: 'No se encontraron resultados',
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  change: [value: string, option: DropdownOption]
}>()

const open = ref(false)
const query = ref('')
const rootRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)

const items = computed<DropdownOption[]>(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)

const COMBINING_MARKS = /[̀-ͯ]/g
const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(COMBINING_MARKS, '')

const filtered = computed(() =>
  query.value
    ? items.value.filter((o) => normalize(o.label).includes(normalize(query.value)))
    : items.value,
)

const selected = computed(() => items.value.find((o) => o.value === model.value))

const classes = computed(() => [
  'and-dropdown',
  open.value && 'and-dropdown--open',
  (open.value || selected.value) && 'and-dropdown--float',
  props.disabled && 'and-dropdown--disabled',
])

const onPointerDown = (e: PointerEvent) => {
  if (!rootRef.value?.contains(e.target as Node)) open.value = false
}
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => searchRef.value?.focus())
  } else {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
    query.value = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeyDown)
})

const toggle = () => {
  if (!props.disabled) open.value = !open.value
}

const select = (option: DropdownOption) => {
  model.value = option.value
  emit('change', option.value, option)
  open.value = false
}
</script>

<template>
  <div ref="rootRef" :class="classes">
    <button
      type="button"
      class="and-dropdown__trigger"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="and-dropdown__label">{{ label }}</span>
      <span class="and-dropdown__value">{{ selected?.label ?? '' }}</span>
      <span class="and-dropdown__chevron">
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
      </span>
    </button>
    <div class="and-dropdown__line" />
    <div v-if="open" class="and-dropdown__panel">
      <div v-if="searchable" class="and-dropdown__search">
        <input
          ref="searchRef"
          v-model="query"
          class="and-dropdown__search-input"
          type="text"
          :placeholder="searchPlaceholder"
        />
        <Icon name="search" :size="24" />
      </div>
      <div v-if="filtered.length === 0" class="and-dropdown__empty">
        <Icon name="baseline-search-off" :size="24" />
        <span class="and-dropdown__empty-text">{{ noResultsText }}</span>
      </div>
      <ul v-else class="and-dropdown__list" role="listbox" :aria-label="label">
        <li v-for="option in filtered" :key="option.value">
          <button
            type="button"
            role="option"
            :aria-selected="option.value === model"
            :class="[
              'and-dropdown__option',
              checkPosition === 'left' && 'and-dropdown__option--check-left',
              option.value === model && 'and-dropdown__option--selected',
            ]"
            @click="select(option)"
          >
            <span class="and-dropdown__option-label">{{ option.label }}</span>
            <span
              :class="[
                'and-dropdown__check',
                checkShape === 'circle' && 'and-dropdown__check--circle',
                option.value === model && 'and-dropdown__check--checked',
              ]"
              aria-hidden="true"
            >
              <svg
                v-if="option.value === model && checkShape === 'square'"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.5 7.5L5.5 10.5L11.5 3.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
