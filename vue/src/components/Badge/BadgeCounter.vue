<script setup lang="ts">
import './Badge.css'

/*
 * BadgeCounter — contador del DS Andromeda (Figma: "Badge/Counter"):
 * caja de 20x20 con fondo Secondary, número blanco SemiBold. Dentro de
 * un Badge escala automáticamente según el tamaño del Badge.
 */

interface BadgeCounterProps {
  /** Número a mostrar (Figma: "Number"). */
  count?: number | string
}

withDefaults(defineProps<BadgeCounterProps>(), {
  count: 1,
})
</script>

<template>
  <span class="and-badge-counter">{{ count }}</span>
</template>
