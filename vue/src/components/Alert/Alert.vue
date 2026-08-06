<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import './Alert.css'
import { Icon } from '../Icon'
import type { AndIconName } from '../Icon'

/*
 * Alert — alerta en línea del DS Andromeda (Figma: component set
 * "Alerta"): fondo semántico light, textos e iconos en el tono dark,
 * mensaje destacado con divisor, acción opcional (slot #action) y
 * botón de cerrar. Slot #icon reemplaza el icono del variant.
 */

type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

const VARIANT_ICON: Record<AlertVariant, AndIconName> = {
  success: 'check-circle-outline',
  warning: 'alert',
  danger: 'close-outline',
  // En Figma el icono de Info es alert-outline rotado 180° (vía CSS).
  info: 'alert-outline',
}

interface AlertProps {
  /** Estado semántico de la alerta (Figma: Estado). */
  variant?: AlertVariant
  /** Mensaje destacado en SemiBold (Figma: "Mensaje Alerta"). */
  message?: string
  /** Oculta el icono izquierdo (Figma: "Mostrar Icono Izq"). */
  hideIcon?: boolean
  /** Muestra el botón de cerrar (Figma: "Mostrar Icon Der"). */
  closable?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'success',
  message: undefined,
  hideIcon: false,
  closable: true,
})

const emit = defineEmits<{ (e: 'close'): void }>()

const slots = useSlots()
const visible = ref(true)

const iconName = computed(() => VARIANT_ICON[props.variant])
const classes = computed(() => ['and-alert', `and-alert--${props.variant}`])

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div v-if="visible" :class="classes" role="alert">
    <div class="and-alert__lead">
      <span v-if="!hideIcon" class="and-alert__icon" aria-hidden="true">
        <slot name="icon">
          <Icon :name="iconName" :size="24" />
        </slot>
      </span>
      <span v-if="message" class="and-alert__message">
        {{ message }}
        <span class="and-alert__message-divider" aria-hidden="true" />
      </span>
      <span class="and-alert__content"><slot /></span>
    </div>
    <div v-if="slots.action || closable" class="and-alert__trail">
      <slot name="action" />
      <button v-if="closable" type="button" class="and-alert__close" aria-label="Cerrar" @click="close">
        <Icon name="close" :size="24" />
      </button>
    </div>
  </div>
</template>
