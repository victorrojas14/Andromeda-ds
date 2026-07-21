<script setup lang="ts">
import './ColorCard.css'

/*
 * ColorCard — card de documentación de color del DS Andromeda.
 * Réplica en código del componente "DS/Color Card" de Figma; se usa
 * en las páginas de Fundamentos de Storybook.
 */

interface ColorCardProps {
  /** Nombre del token tal como aparece en Figma (ej. "Primary--Dark"). */
  name: string
  /** Valor del color: hex o `var(--token)`. */
  value: string
  /** Uso recomendado; se muestra debajo de la card. */
  description?: string
}

defineProps<ColorCardProps>()
</script>

<template>
  <div class="and-color-card">
    <div class="and-color-card__card">
      <div class="and-color-card__swatch" :style="{ background: value }" />
      <div class="and-color-card__meta">
        <span class="and-color-card__name">{{ name }}</span>
        <span class="and-color-card__value">{{ value }}</span>
      </div>
    </div>
    <p v-if="description" class="and-color-card__description">{{ description }}</p>
  </div>
</template>
