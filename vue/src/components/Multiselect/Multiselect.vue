<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import './Multiselect.css'

/*
 * Multiselect — DS Andromeda (Figma: set "Multiselect dropdown"
 * 13299:2287, documentación "Dropdown checkbox left" 13012:8197).
 * Trigger con label flotante "Selecciona", chips Pill de los
 * seleccionados (con × individual y × global de 20px), panel con
 * buscador que filtra items, fila "Seleccionar todo" e items con
 * checkbox de 20px a la izquierda. Soporta v-model (string[]).
 */

export interface MultiselectOption {
  label: string
  value: string
}

interface MultiselectProps {
  /** Etiqueta flotante del trigger (Figma: "Selecciona"). */
  label?: string
  /** Opciones: strings u objetos { label, value }. */
  options?: Array<string | MultiselectOption>
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda). */
  searchable?: boolean
  searchPlaceholder?: string
  /** Muestra la fila "Seleccionar todo". */
  selectAll?: boolean
  selectAllLabel?: string
  disabled?: boolean
  /** Texto del estado sin resultados (Figma: No results). */
  noResultsText?: string
}

const props = withDefaults(defineProps<MultiselectProps>(), {
  label: 'Selecciona',
  options: () => [],
  searchable: true,
  searchPlaceholder: 'Buscar',
  selectAll: true,
  selectAllLabel: 'Seleccionar todo',
  disabled: false,
  noResultsText: 'No se encontraron resultados',
})

const model = defineModel<string[]>({ default: () => [] })

const emit = defineEmits<{
  change: [values: string[]]
}>()

const open = ref(false)
const query = ref('')
const rootRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)

const items = computed<MultiselectOption[]>(() =>
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

const selected = computed(() =>
  items.value.filter((o) => model.value.includes(o.value)),
)
const hasSelection = computed(() => selected.value.length > 0)
const allSelected = computed(
  () => items.value.length > 0 && selected.value.length === items.value.length,
)

const classes = computed(() => [
  'and-multiselect',
  open.value && 'and-multiselect--open',
  (open.value || hasSelection.value) && 'and-multiselect--float',
  props.disabled && 'and-multiselect--disabled',
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

const toggleOpen = () => {
  if (!props.disabled) open.value = !open.value
}

const commit = (values: string[]) => {
  model.value = values
  emit('change', values)
}

const toggle = (option: MultiselectOption) => {
  commit(
    model.value.includes(option.value)
      ? model.value.filter((v) => v !== option.value)
      : [...model.value, option.value],
  )
}

const toggleAll = () => {
  commit(allSelected.value ? [] : items.value.map((o) => o.value))
}

const clearAll = () => {
  commit([])
}
</script>

<template>
  <div ref="rootRef" :class="classes">
    <div
      class="and-multiselect__trigger"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      @click="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen"
    >
      <span class="and-multiselect__label">{{ label }}</span>
      <span v-if="hasSelection" class="and-multiselect__chips">
        <span
          v-for="option in selected"
          :key="option.value"
          class="and-multiselect__chip"
        >
          {{ option.label }}
          <button
            type="button"
            class="and-multiselect__chip-remove"
            :aria-label="`Quitar ${option.label}`"
            @click.stop="toggle(option)"
          >
            <Icon name="close" :size="16" />
          </button>
        </span>
      </span>
      <span v-else class="and-multiselect__placeholder" />
      <button
        v-if="hasSelection && !disabled"
        type="button"
        class="and-multiselect__clear"
        aria-label="Quitar todas las selecciones"
        @click.stop="clearAll"
      >
        <Icon name="close" :size="20" />
      </button>
      <span class="and-multiselect__chevron">
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
      </span>
    </div>
    <div class="and-multiselect__line" />
    <div v-if="open" class="and-multiselect__panel">
      <div v-if="searchable" class="and-multiselect__search">
        <input
          ref="searchRef"
          v-model="query"
          class="and-multiselect__search-input"
          type="text"
          :placeholder="searchPlaceholder"
        />
        <Icon name="search" :size="24" />
      </div>
      <button
        v-if="selectAll && !query && items.length > 0"
        type="button"
        class="and-multiselect__option"
        :aria-pressed="allSelected"
        @click="toggleAll"
      >
        <span
          :class="[
            'and-multiselect__check',
            allSelected && 'and-multiselect__check--checked',
          ]"
          aria-hidden="true"
        >
          <svg v-if="allSelected" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7.5L5.5 10.5L11.5 3.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="and-multiselect__option-label">{{ selectAllLabel }}</span>
      </button>
      <div v-if="filtered.length === 0" class="and-multiselect__empty">
        <Icon name="baseline-search-off" :size="24" />
        <span class="and-multiselect__empty-text">{{ noResultsText }}</span>
      </div>
      <ul
        v-else
        class="and-multiselect__list"
        role="listbox"
        aria-multiselectable="true"
        :aria-label="label"
      >
        <li v-for="option in filtered" :key="option.value">
          <button
            type="button"
            role="option"
            :aria-selected="model.includes(option.value)"
            class="and-multiselect__option"
            @click="toggle(option)"
          >
            <span
              :class="[
                'and-multiselect__check',
                model.includes(option.value) && 'and-multiselect__check--checked',
              ]"
              aria-hidden="true"
            >
              <svg
                v-if="model.includes(option.value)"
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
            <span class="and-multiselect__option-label">{{ option.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
