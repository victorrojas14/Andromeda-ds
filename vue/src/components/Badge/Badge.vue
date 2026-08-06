<script setup lang="ts">
import { computed } from 'vue'
import './Badge.css'
import BadgeCounter from './BadgeCounter.vue'

/*
 * Badge — badge del DS Andromeda (Figma: component set "Badge"):
 * fondo Info, texto blanco Poppins Medium escalado por tamaño (h1–h6)
 * y contador opcional (Badge/Counter) que escala con el badge.
 */

type BadgeSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface BadgeProps {
  /** Escala del badge, pensada para acompañar headings (Figma: Tamaño Badge h1..h6). */
  size?: BadgeSize
  /** Contador a la derecha (Figma: "Mostrar counter" + Number). Sin valor no se muestra. */
  count?: number | string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  size: 'h1',
  count: undefined,
})

const classes = computed(() => ['and-badge', `and-badge--${props.size}`])
</script>

<template>
  <span :class="classes">
    <slot />
    <BadgeCounter v-if="count !== undefined && count !== null" :count="count" />
  </span>
</template>
