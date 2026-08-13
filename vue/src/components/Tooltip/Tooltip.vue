<script setup lang="ts">
import { computed, ref } from 'vue'
import './Tooltip.css'

/*
 * Tooltip — DS Andromeda (Figma: set "Tooltips" 731:121, página
 * Tooltips 9454:21135). Globo de 12px (radius 4, padding 8/4, máx.
 * 254px) con flecha de 10x5 y sombra autolayout-sm; temas Light
 * (blanco/body) y Dark (secondary-dark/blanco). Envuelve cualquier
 * componente de la librería (slot) y aparece estrictamente en la
 * `position` indicada (top/bottom/left/right, centrado) al hacer
 * hover/focus, o controlado con `open`. La Direction de Figma nombra
 * el lado de la flecha (opuesto a la posición).
 */

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTheme = 'light' | 'dark'

interface TooltipProps {
  /** Texto del globo (Figma: "Ejemplo"). */
  content: string
  /** Lado donde aparece el tooltip respecto al elemento envuelto. */
  position?: TooltipPosition
  /** Tema (Figma: Theme=Light|Dark). */
  theme?: TooltipTheme
  /** Visibilidad controlada; sin definir se muestra con hover/focus. */
  open?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  theme: 'light',
  open: undefined,
})

const hovered = ref(false)
const visible = computed(() => (props.open !== undefined ? props.open : hovered.value))
</script>

<template>
  <span
    class="and-tooltip-wrap"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
  >
    <slot />
    <span
      v-if="visible"
      :class="[
        'and-tooltip',
        `and-tooltip--${position}`,
        theme === 'dark' && 'and-tooltip--dark',
      ]"
      role="tooltip"
    >
      <span class="and-tooltip__bubble">{{ content }}</span>
      <span class="and-tooltip__arrow" aria-hidden="true" />
    </span>
  </span>
</template>
