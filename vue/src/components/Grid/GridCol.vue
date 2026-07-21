<script setup lang="ts">
import { computed } from 'vue'
import './Grid.css'

/* Celda de la retícula: ocupa `span` columnas del Grid padre. */

interface GridColProps {
  /** Cantidad de columnas que ocupa la celda. */
  span?: number
}

const props = withDefaults(defineProps<GridColProps>(), {
  span: 1,
})

const styleVars = computed(() => ({ '--and-col-span': String(props.span) }))
</script>

<template>
  <div class="and-grid__col" :style="styleVars">
    <slot />
  </div>
</template>
