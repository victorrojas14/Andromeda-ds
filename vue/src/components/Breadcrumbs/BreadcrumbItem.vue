<script setup lang="ts">
import { computed } from 'vue'
import './Breadcrumbs.css'
import { Icon } from '../Icon'

/*
 * BreadcrumbItem — item de la miga (Figma: component set "Breadcrumbs"):
 * separador chevron-right opcional + texto Regular en `body` (Default)
 * o primario subrayado (Active).
 */

interface BreadcrumbItemProps {
  /** Página actual (Figma: Estado Active); se resalta en primario con subrayado. */
  active?: boolean
  /** Muestra el separador chevron-right (Figma: "Mostrar Icono"). */
  icon?: boolean
  /** Destino del link; sin href se renderiza como texto. */
  href?: string
}

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  active: false,
  icon: true,
  href: undefined,
})

const isLink = computed(() => Boolean(props.href) && !props.active)
const classes = computed(() => ['and-breadcrumb', props.active && 'and-breadcrumb--active'])
</script>

<template>
  <component
    :is="isLink ? 'a' : 'span'"
    :class="classes"
    :href="isLink ? href : undefined"
    :aria-current="active ? 'page' : undefined"
  >
    <span v-if="icon" class="and-breadcrumb__icon" aria-hidden="true">
      <Icon name="chevron-right" :size="24" />
    </span>
    <span class="and-breadcrumb__label"><slot /></span>
  </component>
</template>
