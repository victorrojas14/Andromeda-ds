<script setup lang="ts">
import { computed } from 'vue'
import './Divider.css'

/*
 * Divider — separador del DS Andromeda (Figma: componentes "Divider" y
 * "Divider 10–90px"): línea de 1px en gray-300 con espaciado vertical
 * opcional de la escala Spacing. Se renderiza como <hr>.
 */

type DividerSpacing = 0 | 10 | 20 | 30 | 40 | 50 | 70 | 90

interface DividerProps {
  /**
   * Espaciado vertical a cada lado de la línea, de la escala Spacing
   * (Figma: "Divider 10px" … "Divider 90px"). 0 renderiza solo la
   * línea (Figma: "Divider").
   */
  spacing?: DividerSpacing
}

const props = withDefaults(defineProps<DividerProps>(), {
  spacing: 0,
})

const classes = computed(() => [
  'and-divider',
  props.spacing !== 0 && `and-divider--${props.spacing}`,
])
</script>

<template>
  <hr :class="classes" />
</template>
