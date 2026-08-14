<script setup lang="ts">
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import './Menu.css'

/*
 * MenuEstatus — menú de secciones con estatus del DS Andromeda
 * (Figma: set "ItemMenu_Estatus" 3379:2647 de la página Menu). Lista
 * de cards de 57px (padding 10, radio 10, borde 1px, sombra
 * Sombra-Per) con icono, título, estatus y chevron. El estado por
 * item respeta las variantes de Figma (Default / Estatus todos /
 * Completo / Activa / Deshabilitada); los items Deshabilitada no se
 * pueden seleccionar. v-model con el índice activo (Estado Activa).
 */

/** Estados del ItemMenu_Estatus (Figma: variante "Estado"). */
export type MenuEstatusEstado =
  | 'default'
  | 'estatus-todos'
  | 'completo'
  | 'activa'
  | 'deshabilitada'

export interface MenuEstatusItem {
  /** Título de la sección (Figma: "Titulo seccion"). */
  title: string
  /** Texto del Estatus seccion (default según el estado). */
  status?: string
  /** Icono izquierdo (Figma: "Cambiar Icono Izq"; default file-document-outline). */
  icon?: AndIconName
  /**
   * Estado del item (Figma: Default / Estatus todos / Completo /
   * Activa / Deshabilitada). Sin definirlo, el item activo se pinta
   * como Activa y el resto como Default.
   */
  estado?: MenuEstatusEstado
}

interface MenuEstatusProps {
  /** Items del menú de estatus. */
  items: MenuEstatusItem[]
}

const props = defineProps<MenuEstatusProps>()

const model = defineModel<number>({ default: 0 })

const emit = defineEmits<{
  change: [index: number, item: MenuEstatusItem]
}>()

/** Texto default del Estatus seccion por estado (Figma). */
const DEFAULT_STATUS: Record<MenuEstatusEstado, string> = {
  default: 'Por iniciar',
  'estatus-todos': 'Captura completa',
  completo: 'Completa',
  activa: '',
  deshabilitada: 'Completa',
}

const ESTADO_CLASS: Record<MenuEstatusEstado, string> = {
  default: '',
  'estatus-todos': 'and-menu-estatus__item--todos',
  completo: 'and-menu-estatus__item--completo',
  activa: 'and-menu-estatus__item--activa',
  deshabilitada: 'and-menu-estatus__item--deshabilitada',
}

const estadoOf = (item: MenuEstatusItem, index: number): MenuEstatusEstado =>
  item.estado ?? (index === model.value ? 'activa' : 'default')

const statusOf = (item: MenuEstatusItem, index: number): string => {
  const estado = estadoOf(item, index)
  return estado === 'activa' ? '' : (item.status ?? DEFAULT_STATUS[estado])
}

const iconOf = (item: MenuEstatusItem, index: number): AndIconName =>
  estadoOf(item, index) === 'completo'
    ? 'baseline-check-circle'
    : (item.icon ?? 'file-document-outline')

const select = (index: number) => {
  if (estadoOf(props.items[index], index) === 'deshabilitada') return
  model.value = index
  emit('change', index, props.items[index])
}
</script>

<template>
  <nav class="and-menu-estatus">
    <button
      v-for="(item, i) in items"
      :key="i"
      type="button"
      :class="['and-menu-estatus__item', ESTADO_CLASS[estadoOf(item, i)]]"
      :aria-current="estadoOf(item, i) === 'activa' ? 'page' : undefined"
      :disabled="estadoOf(item, i) === 'deshabilitada'"
      @click="select(i)"
    >
      <span class="and-menu-estatus__body">
        <span class="and-menu-estatus__icon" aria-hidden="true">
          <Icon :name="iconOf(item, i)" :size="24" />
        </span>
        <span class="and-menu-estatus__texts">
          <span class="and-menu-estatus__title">{{ item.title }}</span>
          <span v-if="statusOf(item, i)" class="and-menu-estatus__status">
            {{ statusOf(item, i) }}
          </span>
        </span>
      </span>
      <span class="and-menu-estatus__chevron" aria-hidden="true">
        <Icon name="chevron-right" :size="24" />
      </span>
    </button>
  </nav>
</template>
