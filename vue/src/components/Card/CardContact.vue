<script setup lang="ts">
import { useSlots } from 'vue'
import './Card.css'

/*
 * CardContact — card de contacto del DS Andromeda (Figma: "Card
 * Action" de contacto): título h4, correo en primario y contenido
 * centrado (slot default; usar <strong> para etiquetas), con sombra
 * MD2.
 */

interface CardContactProps {
  /** Título (Poppins SemiBold h4). */
  title: string
  /** Correo de contacto; se renderiza como link mailto en primario. */
  email?: string
}

withDefaults(defineProps<CardContactProps>(), {
  email: undefined,
})

const slots = useSlots()
</script>

<template>
  <div class="and-card-contact">
    <p class="and-card-contact__title">{{ title }}</p>
    <a v-if="email" class="and-card-contact__email" :href="`mailto:${email}`">{{ email }}</a>
    <div v-if="slots.default" class="and-card-contact__body"><slot /></div>
  </div>
</template>
