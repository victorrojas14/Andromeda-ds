<script setup lang="ts">
import { computed } from 'vue'
import './Skeleton.css'

/*
 * Skeleton — placeholder de carga del DS Andromeda (Figma: página
 * Skeleton, set "Skeleton" 12739:2231). Bloque con degradado blanco →
 * gray-300 (radio 4) cuyo shimmer desliza el degradado entre las dos
 * variantes del set; mantiene la jerarquía visual y evita saltos de
 * layout mientras aparece el contenido real.
 */

interface SkeletonProps {
  /** Ancho del bloque (número en px o cualquier valor CSS; default 100%). */
  width?: number | string
  /** Alto del bloque (número en px o cualquier valor CSS; Figma: 40). */
  height?: number | string
  /** Radio del bloque (Figma: 4). */
  radius?: number | string
  /** Placeholder circular (avatares). */
  circle?: boolean
  /** Shimmer entre las dos fases de Figma (Group 1 ↔ Group 2). */
  animated?: boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: 40,
  radius: undefined,
  circle: false,
  animated: true,
})

const toCss = (v: number | string) => (typeof v === 'number' ? `${v}px` : v)

const inline = computed(() => ({
  width: toCss(props.width),
  height: toCss(props.height),
  ...(props.radius !== undefined && { borderRadius: toCss(props.radius) }),
}))
</script>

<template>
  <span
    :class="[
      'and-skeleton',
      circle && 'and-skeleton--circle',
      !animated && 'and-skeleton--static',
    ]"
    :style="inline"
    aria-hidden="true"
  />
</template>
