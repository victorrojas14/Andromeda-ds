<script setup lang="ts">
import { computed, useSlots } from 'vue'
import './Card.css'

/*
 * CardPhoto — card con imagen del DS Andromeda (Figma: "Card Photo").
 * Una sola card con variante vertical (default) u horizontal; la
 * horizontal se apila en vertical en viewport mobile (< 768px).
 * Slots: default (descripción) y #action (ej. Button ghost).
 */

interface CardPhotoProps {
  /** URL de la imagen de la card. */
  image: string
  /** Texto alternativo de la imagen. */
  imageAlt?: string
  /** Título (Poppins SemiBold h5). */
  title: string
  /**
   * Layout horizontal (Figma: Card Photo 600×210, imagen a la
   * izquierda). Responsive: bajo 768px vuelve al diseño vertical.
   */
  horizontal?: boolean
}

const props = withDefaults(defineProps<CardPhotoProps>(), {
  imageAlt: '',
  horizontal: false,
})

const slots = useSlots()
const classes = computed(() => [
  'and-card-photo',
  props.horizontal && 'and-card-photo--horizontal',
])
</script>

<template>
  <div :class="classes">
    <img class="and-card-photo__image" :src="image" :alt="imageAlt" />
    <div class="and-card-photo__body">
      <p class="and-card-photo__title">{{ title }}</p>
      <p v-if="slots.default" class="and-card-photo__text"><slot /></p>
      <div v-if="slots.action" class="and-card-photo__action"><slot name="action" /></div>
    </div>
  </div>
</template>
