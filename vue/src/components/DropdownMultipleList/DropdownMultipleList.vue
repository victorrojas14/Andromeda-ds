<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import './DropdownMultipleList.css'

/*
 * DropdownMultipleList — DS Andromeda (Figma: set
 * "DropDown-lista-multiple" 9574:4161, documentación "Dropdown
 * multiple-list" 9516:6575). Trigger Form-LG de 60px con label
 * flotante; abierto muestra el panel con buscador que filtra por
 * nombre o cuenta e items "Item Opcion Cuenta/Saldo" (dos líneas:
 * nombre/Saldo y cuenta/cantidad); al seleccionar, el trigger pasa a
 * "Form datos cuenta selected". Línea inferior de 2px: gray-400
 * default, tertiary abierto, secondary-light con selección.
 * v-model con el valor (por defecto la cuenta) del item.
 */

export interface DropdownMultipleListOption {
  /** Figma: "Nombre" / "Nombre Cliente". */
  name: string
  /** Figma: "Cuenta" / "Numero Cuenta". */
  account: string
  /** Figma: "Saldo" (texto formateado, p. ej. "$ 1,000.00"). */
  balance?: string
  /** Identificador del item; por defecto se usa `account`. */
  value?: string
}

interface DropdownMultipleListProps {
  /** Label flotante y placeholder (Figma: "Selecciona la cuenta de retiro"). */
  label?: string
  options?: DropdownMultipleListOption[]
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda). */
  searchable?: boolean
  searchPlaceholder?: string
  /** Muestra la columna Saldo (Figma: "Mostrar Saldo"). */
  showBalance?: boolean
  /** Encabezado de la columna derecha (Figma: "Saldo"). */
  balanceHeading?: string
  /** Texto del estado sin resultados. */
  noResultsText?: string
}

const props = withDefaults(defineProps<DropdownMultipleListProps>(), {
  label: 'Selecciona la cuenta de retiro',
  options: () => [],
  searchable: true,
  searchPlaceholder: 'Buscar',
  showBalance: true,
  balanceHeading: 'Saldo',
  noResultsText: 'No se encontraron resultados',
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  change: [value: string, option: DropdownMultipleListOption]
}>()

const open = ref(false)
const query = ref('')
const rootRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLInputElement | null>(null)

const keyOf = (option: DropdownMultipleListOption) => option.value ?? option.account

const COMBINING_MARKS = /[̀-ͯ]/g
const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(COMBINING_MARKS, '')

const selected = computed(
  () => props.options.find((o) => keyOf(o) === model.value) ?? null,
)

const filtered = computed(() =>
  query.value
    ? props.options.filter(
        (o) =>
          normalize(o.name).includes(normalize(query.value)) ||
          normalize(o.account).includes(normalize(query.value)),
      )
    : props.options,
)

const classes = computed(() => [
  'and-dml',
  open.value && 'and-dml--open',
  selected.value && 'and-dml--selected',
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

const select = (option: DropdownMultipleListOption) => {
  model.value = keyOf(option)
  emit('change', keyOf(option), option)
  open.value = false
}
</script>

<template>
  <div ref="rootRef" :class="classes">
    <button
      v-if="selected"
      type="button"
      class="and-dml__trigger and-dml__trigger--selected"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="and-dml__data">
        <span class="and-dml__data-row">
          <span class="and-dml__data-name">{{ selected.name }}</span>
          <span v-if="showBalance" class="and-dml__data-balance">{{ balanceHeading }}</span>
        </span>
        <span class="and-dml__data-row">
          <span class="and-dml__data-account">{{ selected.account }}</span>
          <span v-if="showBalance" class="and-dml__data-balance">{{ selected.balance ?? '' }}</span>
        </span>
      </span>
      <span class="and-dml__chevron">
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
      </span>
    </button>
    <button
      v-else
      type="button"
      class="and-dml__trigger"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="and-dml__label">{{ label }}</span>
      <span class="and-dml__placeholder">{{ label }}</span>
      <span class="and-dml__chevron">
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
      </span>
    </button>
    <div class="and-dml__line" />
    <div v-if="open" class="and-dml__panel">
      <div v-if="searchable" class="and-dml__search-wrap">
        <div class="and-dml__search">
          <input
            ref="searchRef"
            v-model="query"
            class="and-dml__search-input"
            type="text"
            :placeholder="searchPlaceholder"
          />
          <Icon name="search" :size="24" />
        </div>
      </div>
      <div v-if="filtered.length === 0" class="and-dml__empty">
        <Icon name="baseline-search-off" :size="24" />
        <span class="and-dml__empty-text">{{ noResultsText }}</span>
      </div>
      <ul v-else class="and-dml__list" role="listbox" :aria-label="label">
        <li v-for="option in filtered" :key="keyOf(option)">
          <button
            type="button"
            role="option"
            :aria-selected="keyOf(option) === model"
            class="and-dml__option"
            @click="select(option)"
          >
            <span class="and-dml__data">
              <span class="and-dml__data-row">
                <span class="and-dml__data-name">{{ option.name }}</span>
                <span v-if="showBalance" class="and-dml__data-balance">{{ balanceHeading }}</span>
              </span>
              <span class="and-dml__data-row">
                <span class="and-dml__data-account">{{ option.account }}</span>
                <span v-if="showBalance" class="and-dml__data-balance">{{ option.balance ?? '' }}</span>
              </span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
