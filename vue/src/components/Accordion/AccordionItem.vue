<script setup lang="ts">
import { computed, useSlots } from 'vue'
import './Accordion.css'
import { Icon } from '../Icon'

/*
 * AccordionItem — fila tipo card del DS Andromeda (Figma: component set
 * "Item Accordion 2"): fondo blanco, radio md y sombra autolayout-sm.
 * Slots: #icon (izquierda) y #right (derecha, default chevron-down;
 * usá la prop `chevron=false` para ocultarlo).
 */

interface AccordionItemProps {
  /** Título del item (Figma: "Ttitulo"). */
  title: string
  /** Variante de tamaño (Figma: Size Desktop/Mobile). */
  size?: 'desktop' | 'mobile'
  /** Muestra el icono derecho por defecto (chevron-down). */
  chevron?: boolean
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  size: 'desktop',
  chevron: true,
})

const slots = useSlots()

const classes = computed(() => [
  'and-accordion-item',
  props.size === 'mobile' && 'and-accordion-item--mobile',
])
</script>

<template>
  <div :class="classes">
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
