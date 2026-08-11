<script setup lang="ts">
import { useSlots } from 'vue'
import './Card.css'

/*
 * CardAction — card de acción del DS Andromeda (Figma: "Card Action"):
 * fecha con separador, título h4 y acción a lo ancho (slot #action),
 * con sombra LG2.
 */

interface CardActionProps {
  /** Fecha superior con borde inferior (Figma: "24 jul 2022"). */
  date?: string
  /** Título (Poppins Medium h4). */
  title: string
}

withDefaults(defineProps<CardActionProps>(), {
  date: undefined,
})

const slots = useSlots()
</script>

<template>
  <div class="and-card-action">
    <div v-if="date" class="and-card-action__date">{{ date }}</div>
    <p class="and-card-action__title">{{ title }}</p>
    <div v-if="slots.action" class="and-card-action__action"><slot name="action" /></div>
  </div>
</template>
