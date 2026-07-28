<script setup lang="ts">
import { computed } from 'vue'
import './Text.css'

/*
 * Text — escala tipográfica del DS Andromeda (fundamento "Tipografía"
 * de Figma): Poppins con estilos Display 1–4, Heading h1–h6, Body
 * (Parrafo, Parrafo-SM, Parrafo-XS) y Small 1–2, en pesos regular,
 * medium y semibold.
 */

type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'parrafo'
  | 'parrafo-sm'
  | 'parrafo-xs'
  | 'small-1'
  | 'small-2'

type TextWeight = 'regular' | 'medium' | 'semibold'

interface TextProps {
  /** Estilo de la escala tipográfica (Figma: Typography/Web). */
  variant?: TextVariant
  /**
   * Peso. En los estilos Display, "regular" renderiza ExtraLight (275)
   * y "medium" renderiza Regular (400), fiel a Figma.
   */
  weight?: TextWeight
  /** Elemento HTML a renderizar; por defecto según la variante. */
  tag?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  variant: 'parrafo',
  weight: 'regular',
  tag: undefined,
})

const DEFAULT_TAG: Record<TextVariant, string> = {
  'display-1': 'h1',
  'display-2': 'h1',
  'display-3': 'h1',
  'display-4': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  parrafo: 'p',
  'parrafo-sm': 'p',
  'parrafo-xs': 'p',
  'small-1': 'small',
  'small-2': 'small',
}

const resolvedTag = computed(() => props.tag ?? DEFAULT_TAG[props.variant])
const classes = computed(() => [
  'and-text',
  `and-text--${props.variant}`,
  `and-text--${props.weight}`,
])
</script>

<template>
  <component :is="resolvedTag" :class="classes">
    <slot />
  </component>
</template>
