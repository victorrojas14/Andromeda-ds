<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { computed, ref } from 'vue'
import Checkbox from '../Controls/Checkbox.vue'
import Icon from '../Icon/Icon.vue'
import './Table.css'

/*
 * Table — DS Andromeda (Figma: sets "Título Columna" 14121:1560,
 * "Item Columna" 138:1658 y "Table items" 13661:10043, página Tables
 * 9811:37509). Header de 55px con títulos 12 Medium secondary-light
 * en mayúsculas y orden asc/desc (icono unfold en primary → chevron
 * up/down); celdas de 50px con 14px body y alineación Izq/Centrado/
 * Der; filas alternas con el estado Select (fondo background) y
 * columna opcional de Checkbox de la librería. Las celdas aceptan
 * cualquier componente vía el slot `cell`. Responsivo: en <768px
 * adopta las alturas del diseño Movil (40/36) con scroll horizontal.
 */

export type TableAlign = 'left' | 'center' | 'right'
export type TableSortDirection = 'asc' | 'desc'

export interface TableColumn {
  key: string
  title?: string
  align?: TableAlign
  sortable?: boolean
  width?: number | string
}

interface TableProps {
  columns: TableColumn[]
  data: Row[]
  /** Filas alternas con fondo background (estado Select de Figma). */
  zebra?: boolean
  /** Columna de selección con el Checkbox de la librería. */
  selectable?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  zebra: true,
  selectable: false,
})

const emit = defineEmits<{
  selectionChange: [selected: number[]]
  sortChange: [key: string | null, direction: TableSortDirection | null]
}>()

const sort = ref<{ key: string; direction: TableSortDirection } | null>(null)
const selected = ref<number[]>([])

// Click en el título: asc -> desc -> sin orden
const toggleSort = (key: string) => {
  if (sort.value?.key !== key) sort.value = { key, direction: 'asc' }
  else if (sort.value.direction === 'asc') sort.value = { key, direction: 'desc' }
  else sort.value = null
  emit('sortChange', sort.value?.key ?? null, sort.value?.direction ?? null)
}

const sortedIndexes = computed(() => {
  const indexes = props.data.map((_, i) => i)
  if (!sort.value) return indexes
  const { key, direction } = sort.value
  return [...indexes].sort((a, b) => {
    const va = props.data[a][key]
    const vb = props.data[b][key]
    let cmp: number
    if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb
    else cmp = String(va ?? '').localeCompare(String(vb ?? ''), 'es', { numeric: true })
    return direction === 'asc' ? cmp : -cmp
  })
})

const allSelected = computed(
  () => props.data.length > 0 && selected.value.length === props.data.length,
)

const toggleAll = (checked: boolean) => {
  selected.value = checked ? props.data.map((_, i) => i) : []
  emit('selectionChange', selected.value)
}

const toggleRow = (rowIndex: number, checked: boolean) => {
  selected.value = checked
    ? [...selected.value, rowIndex]
    : selected.value.filter((i) => i !== rowIndex)
  emit('selectionChange', selected.value)
}

const thClass = (align?: TableAlign) => [
  'and-table__th',
  align === 'left' && 'and-table__th--left',
  align === 'right' && 'and-table__th--right',
]

const tdClass = (align?: TableAlign) => [
  'and-table__td',
  align === 'center' && 'and-table__td--center',
  align === 'right' && 'and-table__td--right',
]
</script>

<template>
  <div class="and-table-wrap">
    <table :class="['and-table', zebra && 'and-table--zebra']">
      <thead>
        <tr>
          <th v-if="selectable" class="and-table__th and-table__check-cell">
            <Checkbox :model-value="allSelected" @change="toggleAll" />
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="thClass(col.align)"
            :style="col.width !== undefined ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width } : undefined"
            :aria-sort="
              sort?.key === col.key
                ? sort.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
            "
          >
            <span class="and-table__th-inner">
              {{ col.title }}
              <button
                v-if="col.sortable"
                type="button"
                class="and-table__sort"
                :aria-label="`Ordenar por ${col.title ?? col.key}`"
                @click="toggleSort(col.key)"
              >
                <Icon
                  :name="
                    sort?.key === col.key
                      ? sort.direction === 'asc'
                        ? 'chevron-up'
                        : 'chevron-down'
                      : 'unfold'
                  "
                  :size="24"
                />
              </button>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowIndex in sortedIndexes" :key="rowIndex">
          <td v-if="selectable" class="and-table__td and-table__check-cell">
            <Checkbox
              :model-value="selected.includes(rowIndex)"
              @change="(checked) => toggleRow(rowIndex, checked)"
            />
          </td>
          <td v-for="col in columns" :key="col.key" :class="tdClass(col.align)">
            <slot
              name="cell"
              :row="data[rowIndex]"
              :column="col"
              :row-index="rowIndex"
            >
              {{ data[rowIndex][col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
