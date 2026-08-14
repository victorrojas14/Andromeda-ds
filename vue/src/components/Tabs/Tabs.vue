<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import './Tabs.css'

/*
 * Tabs — DS Andromeda (Figma: sets "Tabs-1" 175:4777 — tab primary
 * con subrayado de 4px (Default/Disabled/Active primary/Active
 * secundary) —, "Tab secundario" 14033:4376 — segmented control con
 * fondo gray-200 — y "Tab-atom" 14031:9608). Un solo componente
 * responsivo: en <768px el primary usa texto de 14px con iconos de
 * 20px y el segmented pierde el ancho mínimo y hace scroll.
 * v-model con el índice activo.
 */

export interface TabItem {
  /** Texto del tab (Figma: "Texto" / "Text content"). */
  label: string
  /** Icono izquierdo de la librería (Figma: "Cambiar Icono Izq"). */
  iconLeft?: AndIconName
  /** Icono derecho de la librería (Figma: "Cambiar Icono Der"). */
  iconRight?: AndIconName
  /** Estado Disabled (solo variante primary). */
  disabled?: boolean
}

interface TabsProps {
  /** Tabs (strings u objetos con iconos/disabled). */
  items: Array<string | TabItem>
  /** primary: Tabs-1 con subrayado · secondary: Tab secundario (segmented). */
  variant?: 'primary' | 'secondary'
  /** Color del subrayado activo (Figma: Active primary/Active secundary). */
  activeStyle?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'primary',
  activeStyle: 'primary',
})

const model = defineModel<number>({ default: 0 })

const emit = defineEmits<{
  change: [index: number, item: TabItem]
}>()

const tabs = computed<TabItem[]>(() =>
  props.items.map((i) => (typeof i === 'string' ? { label: i } : i)),
)

const select = (index: number) => {
  if (tabs.value[index].disabled) return
  model.value = index
  emit('change', index, tabs.value[index])
}
</script>

<template>
  <div
    v-if="variant === 'secondary'"
    class="and-tabs--segmented"
    role="tablist"
  >
    <button
      v-for="(tab, i) in tabs"
      :key="i"
      type="button"
      role="tab"
      :aria-selected="i === model"
      :class="['and-tabs__segment', i === model && 'and-tabs__segment--active']"
      @click="select(i)"
    >
      {{ tab.label }}
    </button>
  </div>
  <div
    v-else
    :class="['and-tabs', activeStyle === 'secondary' && 'and-tabs--secondary-style']"
    role="tablist"
  >
    <button
      v-for="(tab, i) in tabs"
      :key="i"
      type="button"
      role="tab"
      :aria-selected="i === model"
      :disabled="tab.disabled"
      :class="['and-tabs__tab', i === model && !tab.disabled && 'and-tabs__tab--active']"
      @click="select(i)"
    >
      <span class="and-tabs__tab-inner">
        <Icon v-if="tab.iconLeft" :name="tab.iconLeft" :size="24" />
        {{ tab.label }}
        <Icon v-if="tab.iconRight" :name="tab.iconRight" :size="24" />
      </span>
      <span class="and-tabs__bar" aria-hidden="true" />
    </button>
  </div>
</template>
