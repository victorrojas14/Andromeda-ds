<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '../Button/Button.vue'
import Checkbox from '../Controls/Checkbox.vue'
import Icon from '../Icon/Icon.vue'
import './DualList.css'

/*
 * DualList — lista dual de transferencia del DS Andromeda (Figma:
 * página Duallist — organismo "Duallist" 14258:76392, paneles
 * "Dual-list-atom" 14254:67419 y "Botones" 14255:73941). Dos paneles
 * de 518px con buscador, "Seleccionar todo" e items con Checkbox del
 * DS; los botones Agregar/Quitar (Button del DS con contador)
 * transfieren los items marcados de una lista a la otra. Full width:
 * ocupa el 100% del contenedor y en <768px las columnas se apilan.
 * v-model con los valores transferidos a la lista derecha.
 */

export interface DualListItem {
  /** Valor único del item. */
  value: string
  /** Texto visible del item. */
  label: string
}

interface DualListProps {
  /** Items disponibles (strings u objetos { value, label }). */
  items: Array<string | DualListItem>
  /** Título del panel izquierdo (Figma: "Title-Text-Content"). */
  leftTitle?: string
  /** Título del panel derecho. */
  rightTitle?: string
  /** Texto del botón Agregar (Figma: Botones Action=Add). */
  addLabel?: string
  /** Texto del botón Quitar (Figma: Botones Action=Remove). */
  removeLabel?: string
  searchPlaceholder?: string
  selectAllLabel?: string
  /** Texto del panel izquierdo vacío (Figma: "Content text"). */
  emptyLeftText?: string
  /** Texto del panel derecho vacío. */
  emptyRightText?: string
  /** Muestra los buscadores. */
  showSearch?: boolean
}

const props = withDefaults(defineProps<DualListProps>(), {
  leftTitle: 'Selecciona permisos para el usuario',
  rightTitle: 'Permisos habilitados para el usuario',
  addLabel: 'Agregar',
  removeLabel: 'Quitar',
  searchPlaceholder: 'Buscar',
  selectAllLabel: 'Seleccionar todo',
  emptyLeftText: 'Todos los elementos han sido agregados.',
  emptyRightText: 'No hay elementos seleccionados aún',
  showSearch: true,
})

/** Valores transferidos a la lista derecha. */
const model = defineModel<string[]>({ default: () => [] })

const emit = defineEmits<{
  change: [values: string[], items: DualListItem[]]
}>()

const leftChecked = ref<string[]>([])
const rightChecked = ref<string[]>([])
const leftQuery = ref('')
const rightQuery = ref('')

const all = computed<DualListItem[]>(() =>
  props.items.map((i) => (typeof i === 'string' ? { value: i, label: i } : i)),
)
const leftItems = computed(() =>
  all.value.filter((i) => !model.value.includes(i.value)),
)
const rightItems = computed(() =>
  all.value.filter((i) => model.value.includes(i.value)),
)

/** Búsqueda sin acentos (mismo normalizado que el resto del DS). */
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const filtered = (list: DualListItem[], query: string) =>
  query ? list.filter((i) => norm(i.label).includes(norm(query))) : list

const leftVisible = computed(() => filtered(leftItems.value, leftQuery.value))
const rightVisible = computed(() => filtered(rightItems.value, rightQuery.value))

const allChecked = (visible: DualListItem[], checked: string[]) =>
  visible.length > 0 && visible.every((i) => checked.includes(i.value))

const toggleIn = (checked: string[], v: string, on: boolean) =>
  on ? [...checked, v] : checked.filter((c) => c !== v)

const toggleAllIn = (checked: string[], visible: DualListItem[], on: boolean) => {
  const values = visible.map((i) => i.value)
  return on
    ? [...new Set([...checked, ...values])]
    : checked.filter((c) => !values.includes(c))
}

const toggleLeft = (v: string, on: boolean) => {
  leftChecked.value = toggleIn(leftChecked.value, v, on)
}
const toggleAllLeft = (on: boolean) => {
  leftChecked.value = toggleAllIn(leftChecked.value, leftVisible.value, on)
}
const toggleRight = (v: string, on: boolean) => {
  rightChecked.value = toggleIn(rightChecked.value, v, on)
}
const toggleAllRight = (on: boolean) => {
  rightChecked.value = toggleAllIn(rightChecked.value, rightVisible.value, on)
}

const setTransferred = (next: string[]) => {
  model.value = next
  emit(
    'change',
    next,
    all.value.filter((i) => next.includes(i.value)),
  )
}

const add = () => {
  setTransferred([...model.value, ...leftChecked.value])
  leftChecked.value = []
}

const remove = () => {
  setTransferred(model.value.filter((v) => !rightChecked.value.includes(v)))
  rightChecked.value = []
}
</script>

<template>
  <div class="and-duallist">
    <div class="and-duallist__col">
      <div class="and-duallist__panel">
        <div class="and-duallist__head">
          <span class="and-duallist__title">{{ leftTitle }}</span>
          <span class="and-duallist__count">
            {{ leftItems.length }} elemento{{ leftItems.length === 1 ? '' : 's' }}
          </span>
        </div>
        <div v-if="leftItems.length === 0" class="and-duallist__empty">
          {{ emptyLeftText }}
        </div>
        <div v-else class="and-duallist__body">
          <label v-if="showSearch" class="and-duallist__search">
            <input v-model="leftQuery" type="text" :placeholder="searchPlaceholder" />
            <Icon name="search" :size="24" />
          </label>
          <label class="and-duallist__select-all">
            <Checkbox
              :model-value="allChecked(leftVisible, leftChecked)"
              :aria-label="selectAllLabel"
              @update:model-value="toggleAllLeft"
            />
            {{ selectAllLabel }}
          </label>
          <div class="and-duallist__list">
            <label
              v-for="item in leftVisible"
              :key="item.value"
              :class="[
                'and-duallist__item',
                leftChecked.includes(item.value) && 'and-duallist__item--checked',
              ]"
            >
              <Checkbox
                :model-value="leftChecked.includes(item.value)"
                :aria-label="item.label"
                @update:model-value="(on: boolean) => toggleLeft(item.value, on)"
              />
              {{ item.label }}
            </label>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        appearance="solid"
        size="sm"
        :disabled="leftChecked.length === 0"
        @click="add"
      >
        {{ addLabel }}{{ leftChecked.length > 0 ? ` (${leftChecked.length})` : '' }}
        <template #rightIcon>
          <Icon name="chevron-right" :size="24" />
        </template>
      </Button>
    </div>
    <div class="and-duallist__col">
      <div class="and-duallist__panel">
        <div class="and-duallist__head">
          <span class="and-duallist__title">{{ rightTitle }}</span>
          <span class="and-duallist__count">
            {{ rightItems.length }} elemento{{ rightItems.length === 1 ? '' : 's' }}
          </span>
        </div>
        <div v-if="rightItems.length === 0" class="and-duallist__empty">
          {{ emptyRightText }}
        </div>
        <div v-else class="and-duallist__body">
          <label v-if="showSearch" class="and-duallist__search">
            <input v-model="rightQuery" type="text" :placeholder="searchPlaceholder" />
            <Icon name="search" :size="24" />
          </label>
          <label class="and-duallist__select-all">
            <Checkbox
              :model-value="allChecked(rightVisible, rightChecked)"
              :aria-label="selectAllLabel"
              @update:model-value="toggleAllRight"
            />
            {{ selectAllLabel }}
          </label>
          <div class="and-duallist__list">
            <label
              v-for="item in rightVisible"
              :key="item.value"
              :class="[
                'and-duallist__item',
                rightChecked.includes(item.value) && 'and-duallist__item--checked',
              ]"
            >
              <Checkbox
                :model-value="rightChecked.includes(item.value)"
                :aria-label="item.label"
                @update:model-value="(on: boolean) => toggleRight(item.value, on)"
              />
              {{ item.label }}
            </label>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        appearance="solid"
        size="sm"
        :disabled="rightChecked.length === 0"
        @click="remove"
      >
        <template #leftIcon>
          <Icon name="chevron-left" :size="24" />
        </template>
        {{ removeLabel }}{{ rightChecked.length > 0 ? ` (${rightChecked.length})` : '' }}
      </Button>
    </div>
  </div>
</template>
