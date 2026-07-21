<script setup lang="ts">
import { computed } from 'vue'
import './Grid.css'

/*
 * Grid — retícula del DS Andromeda (fundamento "Grid" de Figma):
 * 12 columnas, gutter de 20px y contenedor de 1140px centrado.
 * Las celdas se colocan con GridCol.
 */

interface GridProps {
  /** Cantidad de columnas de la retícula. */
  columns?: number
  /** Sin ancho máximo: ocupa todo el contenedor padre. */
  fluid?: boolean
}

const props = withDefaults(defineProps<GridProps>(), {
  columns: 12,
  fluid: false,
})

const classes = computed(() => ['and-grid', props.fluid && 'and-grid--fluid'].filter(Boolean))
const styleVars = computed(() => ({ '--and-grid-columns': String(props.columns) }))
</script>

<template>
  <div :class="classes" :style="styleVars">
    <slot />
  </div>
</template>
