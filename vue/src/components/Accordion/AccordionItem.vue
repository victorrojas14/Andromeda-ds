<script setup lang="ts">
import { useSlots } from 'vue'
import './Accordion.css'
import { Icon } from '../Icon'

/*
 * AccordionItem — fila tipo card del DS Andromeda (Figma: component set
 * "Item Accordion 2"): fondo blanco, radio md y sombra autolayout-sm.
 * Slots: #icon (izquierda) y #right (derecha, default chevron-down;
 * usá la prop `chevron=false` para ocultarlo).
 * Responsive: en viewport mobile (< 768px) adopta el diseño Mobile.
 */

interface AccordionItemProps {
  /** Título del item (Figma: "Ttitulo"). */
  title: string
  /** Muestra el icono derecho por defecto (chevron-down). */
  chevron?: boolean
}

withDefaults(defineProps<AccordionItemProps>(), {
  chevron: true,
})

const slots = useSlots()
</script>

<template>
  <div class="and-accordion-item">
    <div class="and-accordion-item__lead">
      <span v-if="slots.icon" class="and-accordion-item__lead-icon" aria-hidden="true">
        <slot name="icon" />
      </span>
      <span class="and-accordion-item__title">{{ title }}</span>
    </div>
    <span v-if="slots.right || chevron" class="and-accordion-item__trail-icon" aria-hidden="true">
      <slot name="right">
        <Icon name="chevron-down" :size="24" />
      </slot>
    </span>
  </div>
</template>
