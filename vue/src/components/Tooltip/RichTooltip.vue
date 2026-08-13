<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '../Button/Button.vue'
import type { TooltipPosition, TooltipTheme } from './Tooltip.vue'
import './Tooltip.css'

/*
 * RichTooltip — DS Andromeda (Figma: set "Rich Tooltip" 12679:284).
 * Globo de 254px (radius 10, padding 16, gap 8) con título 12
 * Medium, texto 12 y fila de botones ghost-secondary SM del DS
 * (ocultables con Show Buttons / Show Button Right). Mismas reglas de
 * posicionamiento y temas que el Tooltip.
 */

interface RichTooltipProps {
  /** Título del globo (Figma: "Rich tooltip"). */
  title?: string
  /** Texto del globo. */
  content: string
  /** Lado donde aparece el tooltip respecto al elemento envuelto. */
  position?: TooltipPosition
  /** Tema (Figma: Tipo=Light/Dark). */
  theme?: TooltipTheme
  /** Muestra la fila de botones (Figma: "Show Buttons"). */
  showButtons?: boolean
  /** Muestra el botón derecho (Figma: "Show Button Right"). */
  showButtonRight?: boolean
  leftButtonLabel?: string
  rightButtonLabel?: string
  /** Visibilidad controlada; sin definir se muestra con hover/focus. */
  open?: boolean
}

const props = withDefaults(defineProps<RichTooltipProps>(), {
  title: 'Rich tooltip',
  position: 'top',
  theme: 'light',
  showButtons: true,
  showButtonRight: true,
  leftButtonLabel: 'Button',
  rightButtonLabel: 'Button',
  open: undefined,
})

const emit = defineEmits<{
  leftButton: []
  rightButton: []
}>()

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
        'and-tooltip--rich',
        `and-tooltip--${position}`,
        theme === 'dark' && 'and-tooltip--dark',
      ]"
      role="tooltip"
    >
      <span class="and-tooltip__bubble">
        <p v-if="title" class="and-tooltip__title">{{ title }}</p>
        <p class="and-tooltip__text">{{ content }}</p>
        <span v-if="showButtons" class="and-tooltip__buttons">
          <Button
            variant="secondary"
            appearance="ghost"
            size="sm"
            @click="emit('leftButton')"
          >
            {{ leftButtonLabel }}
          </Button>
          <Button
            v-if="showButtonRight"
            variant="secondary"
            appearance="ghost"
            size="sm"
            @click="emit('rightButton')"
          >
            {{ rightButtonLabel }}
          </Button>
        </span>
      </span>
      <span class="and-tooltip__arrow" aria-hidden="true" />
    </span>
  </span>
</template>
