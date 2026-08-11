<script setup lang="ts">
import { useSlots } from 'vue'
import './ButtonVariants.css'

/*
 * ButtonRoundedCard — botón tipo card del DS Andromeda (Figma:
 * btn/Rounded-MD): borde 2px gray-300 con radio lg, título h5 en body
 * y contenido 14 en secondary-light (slot default). En hover el borde
 * pasa a tertiary con sombra autolayout-md.
 */

interface ButtonRoundedCardProps {
  /** Título (Figma: "Texto Titulo"). */
  title?: string
}

withDefaults(defineProps<ButtonRoundedCardProps>(), {
  title: undefined,
})

const slots = useSlots()
</script>

<template>
  <button type="button" class="and-btn-rounded-card">
    <span v-if="title" class="and-btn-rounded-card__title">{{ title }}</span>
    <span v-if="slots.default" class="and-btn-rounded-card__content"><slot /></span>
  </button>
</template>
