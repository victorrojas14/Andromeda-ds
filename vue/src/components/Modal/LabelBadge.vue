<script setup lang="ts">
import './Modal.css'

/*
 * LabelBadge — DS Andromeda (Figma: set "Label Badge" 191:2664).
 * Pastilla de 12px SemiBold (px 8 / py 4) con los 4 estados:
 * success/info/danger con texto blanco y warning con texto body.
 */

export type LabelBadgeEstado = 'success' | 'warning' | 'info' | 'danger'

interface LabelBadgeProps {
  /** Estado del badge (Figma: Label Success/Warning/Info/Danger). */
  estado?: LabelBadgeEstado
  /** Texto del badge (Figma: "Texto Badge"). */
  text?: string
}

withDefaults(defineProps<LabelBadgeProps>(), {
  estado: 'success',
  text: 'EJEMPLO',
})
</script>

<template>
  <span :class="['and-label-badge', estado !== 'success' && `and-label-badge--${estado}`]">
    {{ text }}
  </span>
</template>
