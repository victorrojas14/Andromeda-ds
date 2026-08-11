<script setup lang="ts">
import { useSlots } from 'vue'
import './ButtonVariants.css'
import { Icon } from '../Icon'

/*
 * ButtonRounded — botón redondeado grande del DS Andromeda (Figma:
 * btn/Rounded-LG): borde 2px gray-300 con radio 40, icono superior
 * (slot #topIcon, default android) y fila icono/texto/icono (slots
 * #leftIcon, default, #rightIcon). En hover el borde pasa a tertiary
 * con sombra autolayout-md y el texto a secondary-dark. Sin texto ni
 * iconos laterales queda la variante cuadrada de solo icono (72×72).
 */

interface ButtonRoundedProps {
  /** Oculta el icono superior (Figma: "Mostrar Icono Top"). */
  hideTopIcon?: boolean
}

withDefaults(defineProps<ButtonRoundedProps>(), {
  hideTopIcon: false,
})

const slots = useSlots()
</script>

<template>
  <button type="button" class="and-btn-rounded">
    <span v-if="!hideTopIcon" class="and-btn-rounded__icon" :aria-hidden="slots.default ? 'true' : undefined">
      <slot name="topIcon">
        <Icon name="android" :size="24" />
      </slot>
    </span>
    <span v-if="slots.leftIcon || slots.default || slots.rightIcon" class="and-btn-rounded__row">
      <span v-if="slots.leftIcon" class="and-btn-rounded__icon" aria-hidden="true">
        <slot name="leftIcon" />
      </span>
      <span v-if="slots.default" class="and-btn-rounded__label"><slot /></span>
      <span v-if="slots.rightIcon" class="and-btn-rounded__icon" aria-hidden="true">
        <slot name="rightIcon" />
      </span>
    </span>
  </button>
</template>
