<script setup lang="ts">
import Blanket from '../Blanket/Blanket.vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import LabelBadge, { type LabelBadgeEstado } from './LabelBadge.vue'
import './Modal.css'

/*
 * Modal — DS Andromeda (Figma: set "Modal" 191:2221, página
 * Pop up / Modals 9407:13212). Card blanca (radius 10, padding 20,
 * gap 20, sombra autolayout-md) montada sobre el Blanket. Tamaños
 * SM 350 (centrado, footer en columna con el primary arriba),
 * MD 576 y LG 992 (footer en fila). Header con Label Badge (4
 * estados, ocultable) y X de cierre; icono superior de la librería
 * (72px, o aro de 100px con Icon=CIrcle illustration); título y
 * cuerpo ocultables; botones ghost/solid del DS ocultables.
 */

export type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  /** Visibilidad del modal. */
  open?: boolean
  /** Tamaño (Figma: Tamano=Modal-SM 350 | Modal-MD 576 | Modal-LG 992). */
  size?: ModalSize
  /** Título (Figma: "Texto Titulo"). */
  title?: string
  /** Oculta el título. */
  showTitle?: boolean
  /** Oculta el cuerpo (slot). */
  showText?: boolean
  /** Muestra el Label Badge (Figma: "Mostrar Aviso"). */
  showBadge?: boolean
  /** Estado del badge (los 4 de Figma). */
  badgeEstado?: LabelBadgeEstado
  badgeText?: string
  /** Muestra el icono superior (Figma: "Mostrar Icono Top"). */
  showIcon?: boolean
  /** Icono de la librería (Figma: "Cambiar Icono Top"). */
  icon?: AndIconName
  /** Default: icono de 72px; circle: aro de 100px (Icon=CIrcle illustration). */
  iconVariant?: 'default' | 'circle'
  /** Botón izquierdo ghost (Figma: "Mostrar Boton Izq"). */
  showLeftButton?: boolean
  leftButtonLabel?: string
  /** Botón derecho primary (Figma: "Mostrar Boton Der"). */
  showRightButton?: boolean
  rightButtonLabel?: string
  /** Monta el modal sobre el Blanket (false = card inline). */
  blanket?: boolean
}

withDefaults(defineProps<ModalProps>(), {
  open: true,
  size: 'md',
  title: 'Título Modal',
  showTitle: true,
  showText: true,
  showBadge: true,
  badgeEstado: 'warning',
  badgeText: 'EJEMPLO',
  showIcon: true,
  icon: 'baseline-check-circle',
  iconVariant: 'default',
  showLeftButton: true,
  leftButtonLabel: 'Botón',
  showRightButton: true,
  rightButtonLabel: 'Botón',
  blanket: true,
})

const emit = defineEmits<{
  close: []
  leftButton: []
  rightButton: []
}>()
</script>

<template>
  <component
    :is="blanket ? Blanket : 'div'"
    v-if="open"
    :class="blanket ? undefined : 'and-modal-inline'"
    @close="emit('close')"
  >
    <div
      :class="['and-modal', size !== 'md' && `and-modal--${size}`]"
      role="dialog"
      :aria-modal="blanket || undefined"
      :aria-label="title"
    >
      <div class="and-modal__header">
        <LabelBadge v-if="showBadge" :estado="badgeEstado" :text="badgeText" />
        <span v-else class="and-modal__header-spacer" />
        <button type="button" class="and-modal__close" aria-label="Cerrar" @click="emit('close')">
          <Icon name="close" :size="24" />
        </button>
      </div>
      <div v-if="showIcon" class="and-modal__icon">
        <span v-if="iconVariant === 'circle'" class="and-modal__circle">
          <Icon :name="icon" :size="64" />
        </span>
        <Icon v-else :name="icon" :size="72" />
      </div>
      <h4 v-if="showTitle && title" class="and-modal__title">{{ title }}</h4>
      <div v-if="showText && $slots.default" class="and-modal__body">
        <slot />
      </div>
      <div v-if="showLeftButton || showRightButton" class="and-modal__footer">
        <Button
          v-if="showLeftButton"
          variant="primary"
          appearance="ghost"
          size="md"
          @click="emit('leftButton')"
        >
          {{ leftButtonLabel }}
        </Button>
        <Button
          v-if="showRightButton"
          variant="primary"
          appearance="solid"
          size="md"
          @click="emit('rightButton')"
        >
          {{ rightButtonLabel }}
        </Button>
      </div>
    </div>
  </component>
</template>
