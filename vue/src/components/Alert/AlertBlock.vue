<script setup lang="ts">
import { computed, useSlots } from 'vue'
import './Alert.css'

/*
 * AlertBlock — alerta en bloque del DS Andromeda (Figma: component set
 * "Alertas con accion"): título h5 SemiBold, cuerpo (slot default) y
 * texto final (slot #footer) separados por un divisor, sobre fondo
 * semántico light.
 */

type AlertBlockVariant = 'success' | 'warning' | 'info'

const BLOCK_TITLE: Record<AlertBlockVariant, string> = {
  success: '¡Bien hecho!',
  warning: '¡Alerta!',
  info: '¡Info!',
}

interface AlertBlockProps {
  /** Estado semántico (Figma: Estado — sin Danger). */
  variant?: AlertBlockVariant
  /** Título en SemiBold h5; por defecto el del variant. */
  title?: string
}

const props = withDefaults(defineProps<AlertBlockProps>(), {
  variant: 'success',
  title: undefined,
})

const slots = useSlots()
const resolvedTitle = computed(() => props.title ?? BLOCK_TITLE[props.variant])
const classes = computed(() => ['and-alert-block', `and-alert-block--${props.variant}`])
</script>

<template>
  <div :class="classes" role="alert">
    <p class="and-alert-block__title">{{ resolvedTitle }}</p>
    <div class="and-alert-block__body">
      <p><slot /></p>
      <template v-if="slots.footer">
        <span class="and-alert-block__divider" aria-hidden="true" />
        <p><slot name="footer" /></p>
      </template>
    </div>
  </div>
</template>
